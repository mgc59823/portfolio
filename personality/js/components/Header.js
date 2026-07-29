/* ==========================================================================
   Personality Test - Header Component
   ========================================================================== */

export function renderHeader({ currentStep, totalSteps }) {
  if (!currentStep || currentStep <= 0) {
    return '';
  }

  const percentage = Math.round((currentStep / totalSteps) * 100);

  return `
    <header class="header-bar animate-slide-up">
      <div class="header-top">
        <div class="header-title">
          <span>🚀</span> 나의 창업 DNA 분석
        </div>
        <div class="step-counter">
          ${currentStep} / ${totalSteps} (${percentage}%)
        </div>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width: ${percentage}%;"></div>
      </div>
    </header>
  `;
}
