/**
 * UI & State Management Component for Eye Care Dashboard
 */
export class UIManager {
  constructor(options = {}) {
    this.serial = options.serial;

    // DOM Elements
    this.timerEl = document.getElementById('timer-display');
    this.badgeEl = document.getElementById('status-badge');
    this.progressFillEl = document.getElementById('progress-fill');
    this.statusCardEl = document.getElementById('status-card');
    this.logConsoleEl = document.getElementById('terminal-logs');
    this.alertOverlayEl = document.getElementById('video-alert');
    this.earDisplayEl = document.getElementById('ear-value');

    this.currentLevel = 0;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.buzzerInterval = null;

    // 4-Stage Config
    this.STAGES = {
      1: { name: '🟢 촉촉함 (정상)', color: '#10B981', rgb: [0, 255, 0], freq: 0 },
      2: { name: '🔵 주의 필요', color: '#0EA5E9', rgb: [0, 150, 255], freq: 0 },
      3: { name: '🟠 경고 (눈 건조)', color: '#F59E0B', rgb: [255, 165, 0], freq: 262 },
      4: { name: '🔴 위험! 눈을 깜빡이세요', color: '#F43F5E', rgb: [255, 0, 0], freq: 1046 }
    };
  }

  /**
   * Start Timer (0.1s tick)
   */
  startTimer() {
    this.resetTimer();
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds += 0.1;
      this.updateDisplay();
    }, 100);
  }

  /**
   * Stop & Reset Timer
   */
  resetTimer() {
    this.elapsedSeconds = 0;
    this.triggerBlinkFlash();
    this.updateDisplay();
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.stopBuzzerLoop();
  }

  /**
   * Visual Blink Flash Effect
   */
  triggerBlinkFlash() {
    if (this.statusCardEl) {
      this.statusCardEl.classList.remove('blink-flash');
      void this.statusCardEl.offsetWidth; // Trigger reflow
      this.statusCardEl.classList.add('blink-flash');
    }
  }

  /**
   * Update Timer, Badge & Progress Bar State
   */
  updateDisplay() {
    const secs = this.elapsedSeconds;
    if (this.timerEl) {
      this.timerEl.textContent = `${secs.toFixed(1)}s`;
    }

    // Determine Stage
    let newLevel = 1;
    if (secs >= 7.0) newLevel = 4;
    else if (secs >= 5.0) newLevel = 3;
    else if (secs >= 3.0) newLevel = 2;
    else newLevel = 1;

    // Progress percentage (Max 7s = 100%)
    const pct = Math.min((secs / 7.0) * 100, 100);
    if (this.progressFillEl) {
      this.progressFillEl.style.width = `${pct}%`;
      this.progressFillEl.style.backgroundColor = this.STAGES[newLevel].color;
    }

    // Handle Stage Level Change
    if (newLevel !== this.currentLevel) {
      this.setLevel(newLevel);
    }
  }

  /**
   * Set & Sync Stage Level with Arduino Hardware
   */
  async setLevel(level) {
    this.currentLevel = level;
    const stage = this.STAGES[level];

    if (this.statusCardEl) {
      this.statusCardEl.setAttribute('data-level', level);
    }

    if (this.badgeEl) {
      this.badgeEl.textContent = stage.name;
    }

    // Sync with Arduino Hardware via Serial
    if (this.serial && this.serial.isConnected) {
      // 1. Set NeoPixel RGB
      await this.serial.setNeoPixel(...stage.rgb);

      // 2. Set Buzzer Tone
      this.stopBuzzerLoop();
      if (level === 3) {
        // 5~7초 (경고): 4옥타브 도(262Hz) 짧게 1회
        await this.serial.setBuzzer(262, 200);
      } else if (level === 4) {
        // 7초 이상 (위험): 6옥타브 도(1046Hz) 1초 간격 알림
        await this.serial.setBuzzer(1046, 400);
        this.buzzerInterval = setInterval(async () => {
          if (this.currentLevel === 4 && this.serial.isConnected) {
            await this.serial.setBuzzer(1046, 400);
          }
        }, 1000);
      } else {
        await this.serial.setBuzzer(0, 0);
      }
    }
  }

  stopBuzzerLoop() {
    if (this.buzzerInterval) {
      clearInterval(this.buzzerInterval);
      this.buzzerInterval = null;
    }
  }

  /**
   * Face Detection Overlay Toggle
   */
  setFaceDetected(isDetected) {
    if (this.alertOverlayEl) {
      if (isDetected) {
        this.alertOverlayEl.classList.remove('active');
      } else {
        this.alertOverlayEl.classList.add('active');
      }
    }
  }

  /**
   * Update EAR Value Display
   */
  setEARValue(ear) {
    if (this.earDisplayEl) {
      this.earDisplayEl.textContent = ear.toFixed(3);
    }
  }

  /**
   * Log Console Renderer
   */
  addLog(type, message) {
    if (!this.logConsoleEl) return;

    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    const time = new Date().toLocaleTimeString();

    let prefix = '[INFO]';
    if (type === 'tx') prefix = '[TX ➔]';
    if (type === 'rx') prefix = '[RX ⬅]';
    if (type === 'error') prefix = '[ERROR]';

    line.textContent = `${time} ${prefix} ${message}`;
    this.logConsoleEl.appendChild(line);
    this.logConsoleEl.scrollTop = this.logConsoleEl.scrollHeight;
  }
}
