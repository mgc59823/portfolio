/**
 * MediaPipe Face Mesh & Eye Aspect Ratio (EAR) Detection Component
 * Pure Native getUserMedia & Robust Pipeline for standard Web / Vercel
 */
export class EyeBlinkDetector {
  constructor(options = {}) {
    this.videoElement = options.videoElement;
    this.canvasElement = options.canvasElement;
    this.canvasCtx = this.canvasElement ? this.canvasElement.getContext('2d') : null;

    this.earThreshold = options.initialThreshold || 0.21;
    this.onBlink = options.onBlink || (() => {});
    this.onFrameUpdate = options.onFrameUpdate || (() => {});
    this.onFaceStatusChange = options.onFaceStatusChange || (() => {});

    this.isBlinking = false;
    this.faceMesh = null;
    this.stream = null;
    this.animFrameId = null;
    this.isRunning = false;

    // MediaPipe Eye Landmark Indices
    this.LEFT_EYE = [33, 133, 160, 158, 153, 144];
    this.RIGHT_EYE = [362, 263, 385, 387, 373, 380];
  }

  setThreshold(val) {
    this.earThreshold = parseFloat(val);
  }

  distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  calculateEAR(landmarks, eyeIndices) {
    const p1 = landmarks[eyeIndices[0]];
    const p4 = landmarks[eyeIndices[1]];
    const p2 = landmarks[eyeIndices[2]];
    const p3 = landmarks[eyeIndices[3]];
    const p5 = landmarks[eyeIndices[4]];
    const p6 = landmarks[eyeIndices[5]];

    const vertical1 = this.distance(p2, p6);
    const vertical2 = this.distance(p3, p5);
    const horizontal = this.distance(p1, p4);

    if (horizontal === 0) return 0;
    return (vertical1 + vertical2) / (2.0 * horizontal);
  }

  /**
   * Initialize MediaPipe FaceMesh
   */
  async initFaceMesh() {
    if (this.faceMesh) return;

    if (!window.FaceMesh) {
      throw new Error('MediaPipe FaceMesh 라이브러리를 불러오지 못했습니다. 네트워크 상태나 스크립트 연결을 확인하세요.');
    }

    this.faceMesh = new window.FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
    });

    this.faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.faceMesh.onResults((results) => this.onResults(results));
  }

  /**
   * Start Webcam Stream using Native getUserMedia (100% Reliable)
   */
  async startWebcam() {
    if (this.isRunning) return;

    await this.initFaceMesh();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('이 브라우저는 웹캠 접근(getUserMedia)을 지원하지 않거나 보안 컨텍스트(HTTP/HTTPS)가 아닙니다.');
    }

    // Get Native UserMedia Stream
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 360 },
        facingMode: 'user'
      },
      audio: false
    });

    this.videoElement.srcObject = this.stream;
    await this.videoElement.play();

    this.isRunning = true;
    this.processFrame();
  }

  /**
   * Process Video Frames Continuously with requestAnimationFrame
   */
  async processFrame() {
    if (!this.isRunning) return;

    if (this.videoElement && this.videoElement.readyState >= 2 && this.faceMesh) {
      try {
        await this.faceMesh.send({ image: this.videoElement });
      } catch (e) {
        console.warn('FaceMesh frame send error:', e);
      }
    }

    this.animFrameId = requestAnimationFrame(() => this.processFrame());
  }

  /**
   * Stop Webcam Stream & Reset Loop
   */
  stopWebcam() {
    this.isRunning = false;

    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }

    this.clearCanvas();
  }

  /**
   * MediaPipe Output Results Handler
   */
  onResults(results) {
    if (!this.canvasCtx || !this.canvasElement) return;

    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
      this.onFaceStatusChange(true);
      const landmarks = results.multiFaceLandmarks[0];

      const leftEAR = this.calculateEAR(landmarks, this.LEFT_EYE);
      const rightEAR = this.calculateEAR(landmarks, this.RIGHT_EYE);
      const avgEAR = (leftEAR + rightEAR) / 2.0;

      // Draw Cyan Dots on Eyes
      this.drawEyeLandmarks(landmarks, this.LEFT_EYE);
      this.drawEyeLandmarks(landmarks, this.RIGHT_EYE);

      // Check Eye Blink Event
      if (avgEAR < this.earThreshold) {
        if (!this.isBlinking) {
          this.isBlinking = true;
          this.onBlink();
        }
      } else {
        this.isBlinking = false;
      }

      this.onFrameUpdate({ avgEAR, isBlinking: this.isBlinking });
    } else {
      this.onFaceStatusChange(false);
    }

    this.canvasCtx.restore();
  }

  drawEyeLandmarks(landmarks, indices) {
    const w = this.canvasElement.width;
    const h = this.canvasElement.height;

    this.canvasCtx.fillStyle = '#06B6D4';
    this.canvasCtx.shadowColor = '#06B6D4';
    this.canvasCtx.shadowBlur = 8;

    for (const idx of indices) {
      const pt = landmarks[idx];
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(pt.x * w, pt.y * h, 3.0, 0, 2 * Math.PI);
      this.canvasCtx.fill();
    }
  }

  clearCanvas() {
    if (this.canvasCtx && this.canvasElement) {
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }
}
