/* ==========================================================================
   Personality Test - Intro Screen Component (시작 화면 컴포넌트)
   ========================================================================== */

export function renderIntroScreen({ onStart }) {
  const container = document.createElement('div');
  container.className = 'intro-container animate-slide-up';

  container.innerHTML = `
    <div class="intro-content">
      <!-- 1. Top Event Badge -->
      <div class="intro-badge">
        <span>✨</span> 2026 대학생 창업 캠프 공식 진단
      </div>

      <!-- 2. Headline Title -->
      <h1 class="intro-title">
        🚀 나의 창업 DNA는?<br>
        <span class="highlight-text">대학생 창업 성향 테스트</span>
      </h1>

      <!-- 3. Subtitle -->
      <p class="intro-subtitle">
        3분 만에 알아보는 나만의 창업 강점과<br>
        <strong>환상의 팀원 조합 & 팀 빌딩 팁!</strong>
      </p>

      <!-- 4. Hero Illustration & Type Badges Box -->
      <div class="intro-hero-box ui-card">
        <div class="hero-orbit-icon">🚀</div>
        <div class="hero-sparkle spark-1">✨</div>
        <div class="hero-sparkle spark-2">💡</div>

        <div class="intro-hero-tags">
          <span class="badge badge-visionary animate-float-1">💡 아이디어형</span>
          <span class="badge badge-maker animate-float-2">🛠️ 제작형</span>
          <span class="badge badge-strategist animate-float-3">📈 전략형</span>
          <span class="badge badge-connector animate-float-1">🤝 협업형</span>
          <span class="badge badge-analyst animate-float-2">📊 분석형</span>
          <span class="badge badge-action animate-float-3">🎯 실행형</span>
        </div>
      </div>
    </div>

    <!-- 5. Footer & CTA Start Button -->
    <div class="intro-footer">
      <button id="btn-start-test" class="btn btn-primary animate-pop">
        <span>🚀</span> 내 창업 성향 확인하기
      </button>

      <div class="intro-counter">
        <span class="fire-icon">🔥</span> 현재까지 <span id="participant-count">1,420</span>명의 대학생이 참여했어요!
      </div>
    </div>
  `;

  // Attach Start Button Event Listener
  setTimeout(() => {
    const startBtn = container.querySelector('#btn-start-test');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onStart();
      });
    }
  }, 0);

  return container;
}

