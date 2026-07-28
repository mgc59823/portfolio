/**
 * ==========================================================================
 * 민경천 포트폴리오 - 관리자 탭 네비게이션 컴포넌트 (AdminTabs.js)
 * 자기소개 관리 탭과 작업물 관리/추가 탭 간의 전환을 처리함
 * ==========================================================================
 */

export class AdminTabsComponent {
    /**
     * @param {Object} props activeTab 현재 활성화된 탭 ID, onTabChange 탭 전환 콜백
     */
    constructor(props) {
        this.activeTab = props.activeTab || 'bio';
        this.onTabChange = props.onTabChange || (() => {});
    }

    /**
     * 탭 컴포넌트 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <div class="admin-tab-bar" style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 1rem;">
                <button class="admin-tab ${this.activeTab === 'bio' ? 'active' : ''}" data-tab="bio">
                    <i class="fa-solid fa-user-pen"></i> 1. 자기소개 & 프로필 관리
                </button>
                <button class="admin-tab ${this.activeTab === 'projects' ? 'active' : ''}" data-tab="projects">
                    <i class="fa-solid fa-folder-plus"></i> 2. 작업물 관리 & ➕ 새 프로젝트 등록
                </button>
            </div>
        `;
    }

    /**
     * 탭 클릭 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        containerEl.querySelectorAll('.admin-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.onTabChange(tab);
            });
        });
    }
}
