/* ==========================================================================
   Personality Test - Result Screen Component (최종 결과 화면)
   ========================================================================== */

export function renderResultScreen({ resultData, onRestart, onShare, onKakaoShare }) {

  const container = document.createElement('div');
  container.className = 'result-container animate-slide-up';

  const tagsHtml = resultData.tags.map(t => `<span class="badge badge-tag">${t}</span>`).join('');
  const strengthsHtml = resultData.strengths.map(s => `
    <div class="analysis-item">
      <span class="analysis-bullet">✓</span>
      <span>${s}</span>
    </div>
  `).join('');

  const improvementsHtml = resultData.improvements.map(i => `
    <div class="analysis-item">
      <span class="analysis-bullet alert">!</span>
      <span>${i}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <!-- Top Celebration Announcement -->
    <div class="result-top-banner">
      🎉 당신의 창업 DNA 분석이 완료되었습니다!
    </div>

    <!-- 1. Result Header Card (Theme Aware) -->
    <div class="result-header-card ui-card" style="background-color: ${resultData.themeBg}; border-color: ${resultData.themePrimary};">
      <div class="result-subtitle">2026 대학생 창업 성향 분석 결과</div>
      
      <span class="badge ${resultData.themeClass}">
        ${resultData.title}
      </span>

      <div class="result-character-box" style="background-color: var(--color-surface);">
        ${resultData.icon}
      </div>

      <div class="result-one-liner">
        "${resultData.oneLiner}"
      </div>

      <div class="result-tags">
        ${tagsHtml}
      </div>
    </div>

    <!-- 2. Detailed Analysis Card -->
    <div class="ui-card">
      <div class="section-title">
        <span>💪</span> 내 핵심 창업 강점
      </div>
      <div class="analysis-list">
        ${strengthsHtml}
      </div>

      <div class="section-title" style="margin-top: 20px;">
        <span>🎯</span> 신경 쓰면 좋은 보완 포인트
      </div>
      <div class="analysis-list">
        ${improvementsHtml}
      </div>
    </div>

    <!-- 3. ⭐ Team Building Combination Grid -->
    <div class="combi-grid">
      <div class="combi-card best">
        <div class="combi-header">
          <span>✨</span> 환상의 콤비
        </div>
        <div class="combi-target">${resultData.bestCombo.title}</div>
        <div class="combi-desc">${resultData.bestCombo.desc}</div>
      </div>

      <div class="combi-card worst">
        <div class="combi-header">
          <span>⚡</span> 상극/보완 콤비
        </div>
        <div class="combi-target">${resultData.worstCombo.title}</div>
        <div class="combi-desc">${resultData.worstCombo.desc}</div>
      </div>
    </div>

    <!-- 4. Team Building Tips Box -->
    <div class="tip-box">
      <strong style="display: block; margin-bottom: 4px;">🤝 캠프 현장 팀원 찾기 팁</strong>
      ${resultData.teamTip}
    </div>

    <!-- 5. Action Buttons -->
    <div class="result-footer-actions">
      <button id="btn-share-kakao" class="btn btn-kakao animate-pop">
        <span>💬</span> 카카오톡으로 공유하기
      </button>

      <button id="btn-share-result" class="btn btn-primary">
        <span>🔗</span> 결과 링크 복사하기
      </button>

      <button id="btn-restart-test" class="btn btn-secondary">
        <span>🔄</span> 테스트 다시하기
      </button>
    </div>
  `;

  // Attach Event Handlers
  setTimeout(() => {
    const kakaoBtn = container.querySelector('#btn-share-kakao');
    if (kakaoBtn && onKakaoShare) {
      kakaoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onKakaoShare();
      });
    }

    const shareBtn = container.querySelector('#btn-share-result');
    if (shareBtn) {
      shareBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onShare();
      });
    }

    const restartBtn = container.querySelector('#btn-restart-test');
    if (restartBtn) {
      restartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onRestart();
      });
    }
  }, 0);

  return container;
}


