/**
 * Step 4 Implementation: Arduino Web Serial Integration & Hardware Controls (NeoPixel & Buzzer)
 * Design Spec: design.md / PRD Spec: prd.md Step 4
 * Firmware Protocol: @Webserialtest (115200 bps)
 */
import { ArduinoSerial } from './serial.js';
import { EyeBlinkDetector } from './detector.js';
import { UIManager } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const videoEl = document.getElementById('webcam-video');
  const canvasEl = document.getElementById('output-canvas');
  const btnStart = document.getElementById('btn-webcam-start');
  const btnStop = document.getElementById('btn-webcam-stop');
  const btnConnect = document.getElementById('btn-connect');
  const earValueEl = document.getElementById('ear-value');
  const alertOverlayEl = document.getElementById('video-alert');
  const sliderSensitivity = document.getElementById('slider-sensitivity');
  const sensitivityValue = document.getElementById('sensitivity-value');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');

  // 1. Instantiate Web Serial Communication Component
  const serial = new ArduinoSerial({
    baudRate: 115200,
    onStatusChange: (isConnected, message) => {
      if (isConnected) {
        if (statusDot) statusDot.classList.add('connected');
        if (statusText) statusText.textContent = '아두이노 연결됨 (115200bps)';
        if (btnConnect) {
          btnConnect.textContent = '🔌 연결 해제';
          btnConnect.classList.replace('btn-primary', 'btn-danger');
        }
      } else {
        if (statusDot) statusDot.classList.remove('connected');
        if (statusText) statusText.textContent = '연결 안 됨';
        if (btnConnect) {
          btnConnect.textContent = '🔌 아두이노 연결';
          btnConnect.classList.replace('btn-danger', 'btn-primary');
        }
      }
      ui.addLog('system', message);
    },
    onLog: (type, message) => {
      ui.addLog(type, message);
    }
  });

  // 2. Instantiate UI & Hardware State Controller Component
  const ui = new UIManager({ serial });

  // 3. Instantiate MediaPipe Detector Component
  const detector = new EyeBlinkDetector({
    videoElement: videoEl,
    canvasElement: canvasEl,
    initialThreshold: 0.21,
    onBlink: () => {
      ui.resetTimer();
      ui.addLog('system', '⚡ 눈 깜빡임(Blink) 감지 ➔ 타이머 리셋 및 직코실드 초기화');
    },
    onFrameUpdate: ({ avgEAR }) => {
      ui.setEARValue(avgEAR);
    },
    onFaceStatusChange: (isDetected) => {
      ui.setFaceDetected(isDetected);
    }
  });

  // 4. Arduino Serial Connection Button Click Event Listener
  btnConnect.addEventListener('click', async () => {
    if (serial.isConnected) {
      await serial.disconnect();
    } else {
      try {
        ui.addLog('system', '아두이노 시리얼 포트 선택 요청 중...');
        await serial.connect();
      } catch (err) {
        alert(`시리얼 연결 실패: ${err.message}`);
        ui.addLog('error', `연결 시도 실패: ${err.message}`);
      }
    }
  });

  // 5. Webcam Start & Monitoring
  btnStart.addEventListener('click', async () => {
    try {
      ui.addLog('system', '웹캠 권한 요청 및 비디오 스트림 연결 중...');
      await detector.startWebcam();
      ui.startTimer();
      btnStart.disabled = true;
      btnStop.disabled = false;
      ui.addLog('system', '🟢 4단계: 안구건조 모니터링 & 직코실드 하드웨어 제어 활성화');
    } catch (err) {
      alert(`웹캠 실행 오류: ${err.message}`);
      ui.addLog('error', `웹캠 실행 실패: ${err.message}`);
    }
  });

  // 6. Webcam Stop
  btnStop.addEventListener('click', () => {
    detector.stopWebcam();
    ui.stopTimer();
    btnStart.disabled = false;
    btnStop.disabled = true;
    if (earValueEl) earValueEl.textContent = '0.000';
    if (alertOverlayEl) alertOverlayEl.classList.remove('active');
    ui.addLog('system', '🛑 모니터링 중지됨');
  });

  // 7. Sensitivity Slider
  sliderSensitivity.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value).toFixed(2);
    if (sensitivityValue) sensitivityValue.textContent = val;
    detector.setThreshold(val);
    ui.addLog('system', `눈 감음 감도(EAR Threshold)가 ${val}(으)로 변경되었습니다.`);
  });

  ui.addLog('system', '🎉 4단계 완료: 전체 안구건조증 알림이 시스템이 준비되었습니다.');
});
