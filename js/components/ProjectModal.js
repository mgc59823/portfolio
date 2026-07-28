/**
 * ==========================================================================
 * 민경천 포트폴리오 - 프로젝트 상세 레이어 모달 컴포넌트 (ProjectModal.js)
 * 클릭 시 회로도, 실험 파형, 담당 역할 및 성과 데이터를 크게 팝업으로 표시
 * ==========================================================================
 */

export class ProjectModalComponent {
    /**
     * @param {Object} props 프로젝트 객체 (null일 경우 숨김), onClose 닫기 콜백
     */
    constructor(props) {
        this.project = props.project || null;
        this.onClose = props.onClose || (() => {});
    }

    /**
     * 모달 팝업 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        if (!this.project) return '';

        const { title, categoryName, details, tags, image } = this.project;

        return `
            <div id="project-modal-overlay" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(5, 7, 18, 0.85); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem;">
                <div class="modal-content" style="background: var(--bg-elevated); border: 1px solid var(--border-circuit); border-radius: 20px; width: 100%; max-width: 780px; max-height: 85vh; overflow-y: auto; box-shadow: 0 25px 50px rgba(0,0,0,0.8), var(--shadow-cyan-glow); padding: 2rem; position: relative;">
                    <!-- 닫기 버튼 -->
                    <button id="close-modal-btn" class="btn btn-icon" style="position: absolute; top: 1.25rem; right: 1.25rem;">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <!-- 카테고리 태그 및 제목 -->
                    <span class="tag-badge" style="margin-bottom: 0.75rem; background: rgba(255, 215, 0, 0.15); color: var(--color-gold-primary); border-color: var(--border-gold);">
                        ${categoryName}
                    </span>
                    <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; word-break: keep-all;">
                        ${title}
                    </h2>

                    <!-- 수행 기간 및 담당 역할 -->
                    <div style="display: flex; gap: 1.5rem; background: rgba(11, 14, 27, 0.6); padding: 0.85rem 1.25rem; border-radius: 10px; margin-bottom: 1.5rem; font-size: 0.9rem; border: 1px solid var(--border-glass); flex-wrap: wrap;">
                        <div><strong style="color: var(--text-muted);">수행 기간:</strong> ${details.period}</div>
                        <div><strong style="color: var(--text-muted);">담당 역할:</strong> ${details.role}</div>
                    </div>

                    <!-- 회로도 / 마이크로그래프 프리뷰 이미지 -->
                    <div style="width: 100%; border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-glass); background: #0b0e1b;">
                        <img src="${image}" alt="${title}" style="width: 100%; max-height: 360px; object-fit: contain;">
                    </div>

                    <!-- 프로젝트 상세 설명 -->
                    <div style="margin-bottom: 1.5rem;">
                        <h3 style="font-size: 1.1rem; color: var(--color-cyan-accent); margin-bottom: 0.5rem;">
                            <i class="fa-solid fa-list-check"></i> 프로젝트 세부 내용
                        </h3>
                        <p style="color: var(--text-secondary); line-height: 1.7; word-break: keep-all; margin-bottom: 1rem;">
                            ${details.description}
                        </p>
                    </div>

                    <!-- 정량적 핵심 성과 -->
                    <div style="background: rgba(0, 242, 254, 0.08); border: 1px dashed var(--color-cyan-accent); padding: 1.1rem; border-radius: 12px; margin-bottom: 1.5rem;">
                        <h4 style="color: var(--color-cyan-accent); font-size: 0.95rem; margin-bottom: 0.3rem;">
                            <i class="fa-solid fa-trophy"></i> 핵심 엔지니어링 성과 (Engineering Outcome)
                        </h4>
                        <p style="color: var(--text-primary); font-weight: 600;">
                            ${details.outcome}
                        </p>
                    </div>

                    <!-- 하단 태그 및 닫기 버튼 -->
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 1.25rem;">
                        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                            ${tags.map(t => `<span class="tag-badge">${t}</span>`).join('')}
                        </div>
                        <button id="modal-confirm-btn" class="btn btn-primary btn-md">
                            확인 및 닫기
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 모달 닫기 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        const overlay = containerEl.querySelector('#project-modal-overlay');
        const closeBtn = containerEl.querySelector('#close-modal-btn');
        const confirmBtn = containerEl.querySelector('#modal-confirm-btn');

        const handleClose = () => this.onClose();

        if (closeBtn) closeBtn.addEventListener('click', handleClose);
        if (confirmBtn) confirmBtn.addEventListener('click', handleClose);
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) handleClose();
            });
        }
    }
}
