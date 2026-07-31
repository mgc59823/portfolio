/**
 * Arduino Serial Communication Manager (Web Serial API)
 * Firmware Protocol: @Webserialtest (115200 bps)
 */
export class ArduinoSerial {
  constructor(options = {}) {
    this.port = null;
    this.writer = null;
    this.reader = null;
    this.isConnected = false;
    this.baudRate = options.baudRate || 115200;
    this.onStatusChange = options.onStatusChange || (() => {});
    this.onLog = options.onLog || (() => {});
  }

  /**
   * Check if Web Serial API is supported in current browser
   */
  static isSupported() {
    return 'serial' in navigator;
  }

  /**
   * Request serial port from user & connect
   */
  async connect() {
    if (!ArduinoSerial.isSupported()) {
      throw new Error('이 브라우저는 Web Serial API를 지원하지 않습니다. Chrome/Edge를 사용해 주세요.');
    }

    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: this.baudRate });

      const textEncoder = new TextEncoderStream();
      textEncoder.readable.pipeTo(this.port.writable);
      this.writer = textEncoder.writable.getWriter();

      this.isConnected = true;
      this.onStatusChange(true, '아두이노 연결됨');
      this.onLog('system', `시리얼 포트 연결 성공 (${this.baudRate} bps)`);

      this.listen();
      return true;
    } catch (err) {
      this.isConnected = false;
      this.onStatusChange(false, '연결 실패');
      this.onLog('error', `연결 오류: ${err.message}`);
      throw err;
    }
  }

  /**
   * Disconnect from serial port safely
   */
  async disconnect() {
    if (!this.port) return;

    try {
      if (this.reader) {
        await this.reader.cancel();
        this.reader = null;
      }
      if (this.writer) {
        await this.writer.close();
        this.writer = null;
      }
      await this.port.close();
      this.port = null;
    } catch (err) {
      console.warn('포트 닫기 중 경고:', err);
    } finally {
      this.isConnected = false;
      this.onStatusChange(false, '연결 해제됨');
      this.onLog('system', '아두이노 시리얼 연결이 해제되었습니다.');
    }
  }

  /**
   * Send raw string command to Arduino
   * @param {string} command - Raw text command (e.g., SET,NEO,255,255,0,0)
   */
  async sendRaw(command) {
    if (!this.isConnected || !this.writer) return;

    try {
      const formattedCmd = command.endsWith('\n') ? command : command + '\n';
      await this.writer.write(formattedCmd);
      this.onLog('tx', command);
    } catch (err) {
      this.onLog('error', `전송 실패: ${err.message}`);
    }
  }

  /**
   * Set All NeoPixel Colors (SET,NEO,255,R,G,B)
   */
  async setNeoPixel(r, g, b) {
    await this.sendRaw(`SET,NEO,255,${r},${g},${b}`);
  }

  /**
   * Set Buzzer Tone (SET,BUZZER,freq,duration)
   */
  async setBuzzer(freq, duration = 200) {
    await this.sendRaw(`SET,BUZZER,${freq},${duration}`);
  }

  /**
   * Read incoming responses asynchronously
   */
  async listen() {
    while (this.port && this.port.readable && this.isConnected) {
      try {
        const textDecoder = new TextDecoderStream();
        this.port.readable.pipeTo(textDecoder.writable);
        this.reader = textDecoder.readable.getReader();

        while (true) {
          const { value, done } = await this.reader.read();
          if (done) break;
          if (value) {
            this.onLog('rx', value.trim());
          }
        }
      } catch (err) {
        if (this.isConnected) {
          this.onLog('error', `수신 오류: ${err.message}`);
        }
        break;
      }
    }
  }
}
