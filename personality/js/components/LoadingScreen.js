/* ==========================================================================
   Personality Test - Loading Screen Component (결과 분석 로딩 화면)
   ========================================================================== */

const LOADING_MESSAGES = [
  "🔍 12가지 상황 질문 응답 데이터 집계 중...",
  "💡 아이디어·제작·전략·실행 가중치 계산 중...",
  "💬 멘토 피드백 반응과 현장 스타일 분석 중...",
  "🤝 환상의 팀원 콤비 및 팀 빌딩 팁 매칭 중...",
  "✨ 당신만의 창업 DNA 결과 카드 생성 완료!"
];

export function renderLoadingScreen({ onComplete }) {
  const container = document.createElement('div');
  container.className = 'loading-container animate-slide-up';

  container.innerHTML = `
    <!-- Glowing Pulse & Spinner Circle -->
    <div class="loading-spinner-box">
      <div class="loading-spinner-ring"></div>
      <div class="loading-icon">🚀</div>
    </div>

    <!-- Title & Animated Status -->
    <div class="loading-text-wrapper">
      <h2 class="loading-title">
        당신의 창업 DNA를<br>
        <span class="highlight-loading">열심히 분석하고 있어요!</span>
      </h2>
      
      <div class="loading-progress-badge">
        <span id="loading-percent">0</span>% 완료
      </div>

      <p id="loading-subtitle" class="loading-subtitle">${LOADING_MESSAGES[0]}</p>
    </div>
  `;

  // Percentage Counter & Status Message Interval
  let percent = 0;
  let msgIndex = 0;

  const percentInterval = setInterval(() => {
    percent += 2;
    if (percent > 100) percent = 100;
    const percentEl = container.querySelector('#loading-percent');
    if (percentEl) {
      percentEl.textContent = percent;
    }
  }, 50);

  const messageInterval = setInterval(() => {
    msgIndex = Math.min(msgIndex + 1, LOADING_MESSAGES.length - 1);
    const sub = container.querySelector('#loading-subtitle');
    if (sub) {
      sub.style.opacity = '0';
      setTimeout(() => {
        sub.textContent = LOADING_MESSAGES[msgIndex];
        sub.style.opacity = '1';
      }, 150);
    }
  }, 500);

  // Complete Callback after 2.6 seconds
  setTimeout(() => {
    clearInterval(percentInterval);
    clearInterval(messageInterval);
    onComplete();
  }, 2600);

  return container;
}

