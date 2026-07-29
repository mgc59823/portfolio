/* ==========================================================================
   Personality Test - Question Screen Component (테스트 진행 화면)
   ========================================================================== */

export function renderQuestionScreen({ question, selectedOption, onSelect, onPrev, isFirst }) {
  const container = document.createElement('div');
  container.className = 'question-container animate-slide-up';

  const optionsHtml = question.options.map((opt) => {
    const isSelected = selectedOption && selectedOption.label === opt.label;
    return `
      <div class="option-card ${isSelected ? 'selected' : ''}" data-label="${opt.label}" data-type="${opt.type}" tabindex="0" role="button">
        <div class="option-label">${opt.label}</div>
        <div class="option-text">${opt.text}</div>
        ${isSelected ? '<div class="option-checkmark">✓</div>' : '<div class="option-checkmark-placeholder"></div>'}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="question-card-wrapper">
      <div class="question-badge">Q${question.id}. 상황 몰입 질문</div>
      <h2 class="question-title">${question.title}</h2>
      
      <div class="option-list">
        ${optionsHtml}
      </div>
    </div>

    <div class="question-actions">
      ${!isFirst ? `
        <button id="btn-prev-question" class="btn btn-outline btn-prev">
          ← 이전 질문
        </button>
      ` : '<div></div>'}
    </div>
  `;

  // Attach Event Handlers
  setTimeout(() => {
    let isProcessing = false;
    const optionCards = container.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
      const handleSelect = () => {
        if (isProcessing) return;
        isProcessing = true;

        // Visual feedback
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const label = card.getAttribute('data-label');
        const chosen = question.options.find(o => o.label === label);

        if (chosen) {
          // Brief 220ms delay for user feedback satisfaction
          setTimeout(() => {
            onSelect(chosen);
          }, 220);
        }
      };

      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    // Prev Button Handler
    const prevBtn = container.querySelector('#btn-prev-question');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onPrev();
      });
    }
  }, 0);

  return container;
}

