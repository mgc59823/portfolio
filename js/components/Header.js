/**
 * ==========================================================================
 * LocalMate - 네비게이션 헤더 컴포넌트 (Header.js)
 * 서비스 로고, 상단 탭 메인 메뉴, 신뢰 인증 상태 표시 및 마이페이지 버튼
 * ==========================================================================
 */

export class HeaderComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {boolean} props.isVerified 유저 대학교 인증 완료 여부
     * @param {string} props.activeTab 현재 선택된 탭 ('home' | 'explore' | 'profile')
     * @param {Function} props.onNavTabChange 탭 변경 시 호출될 콜백 함수
     * @param {Function} props.onOpenLogin 로그인/인증 모달 열기 콜백 함수
     */
    constructor(props = {}) {
        this.isVerified = props.isVerified || false;
        this.activeTab = props.activeTab || 'home';
        this.onNavTabChange = props.onNavTabChange || (() => {});
        this.onOpenLogin = props.onOpenLogin || (() => {});
    }

    /**
     * Header HTML 요소를 렌더링하고 이벤트 바인딩을 적용합니다.
     * @returns {HTMLElement} 헤더 DOM 요소
     */
    render() {
        const headerEl = document.createElement('header');
        headerEl.className = 'glass-surface';
        headerEl.style.cssText = `
            position: sticky;
            top: 0;
            z-index: 100;
            border-radius: 0;
            border-top: none;
            border-left: none;
            border-right: none;
            padding: 0.85rem 0;
        `;

        headerEl.innerHTML = `
            <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
                <!-- 1. 서비스 브랜드 로고 -->
                <a href="#" id="brand-logo" style="display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: var(--color-primary);">
                    <img src="assets/images/logo.svg" alt="LocalMate Logo" style="width: 34px; height: 34px;" />
                    <span>Local<span style="color: var(--color-secondary);">Mate</span></span>
                </a>

                <!-- 2. 중앙 메인 탐색 네비게이션 -->
                <nav style="display: flex; gap: 1.5rem; align-items: center;">
                    <button class="nav-btn ${this.activeTab === 'home' ? 'active' : ''}" data-tab="home" style="background: none; border: none; font-weight: 600; cursor: pointer; color: ${this.activeTab === 'home' ? 'var(--color-primary)' : 'var(--text-secondary)'}; font-size: 0.95rem;">
                        홈 (Home)
                    </button>
                    <button class="nav-btn ${this.activeTab === 'explore' ? 'active' : ''}" data-tab="explore" style="background: none; border: none; font-weight: 600; cursor: pointer; color: ${this.activeTab === 'explore' ? 'var(--color-primary)' : 'var(--text-secondary)'}; font-size: 0.95rem;">
                        로컬 코스 탐색
                    </button>
                    <button class="nav-btn ${this.activeTab === 'about' ? 'active' : ''}" data-tab="about" style="background: none; border: none; font-weight: 600; cursor: pointer; color: ${this.activeTab === 'about' ? 'var(--color-primary)' : 'var(--text-secondary)'}; font-size: 0.95rem;">
                        🎓 대학생 인증 안내
                    </button>
                    <a href="contact.html" class="nav-btn ${this.activeTab === 'contact' ? 'active' : ''}" data-tab="contact" style="text-decoration: none; font-weight: 600; cursor: pointer; color: ${this.activeTab === 'contact' ? 'var(--color-primary)' : 'var(--text-secondary)'}; font-size: 0.95rem;">
                        ✉️ 문의하기
                    </a>
                </nav>


                <!-- 3. 우측 액션 버튼 및 유저 상태 정보 -->
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    ${this.isVerified ? `
                        <span class="badge-student-verified">
                            🎓 한국대학교 인증 완료
                        </span>
                    ` : `
                        <button id="header-verify-btn" class="btn btn-verified btn-sm">
                            🎓 대학교 이메일 인증
                        </button>
                    `}
                    
                    <button id="header-host-btn" class="btn btn-primary btn-sm">
                        + 로컬 코스 올리기
                    </button>
                </div>
            </div>
        `;

        // 네비게이션 버튼 이벤트 바인딩
        headerEl.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.getAttribute('data-tab');
                this.onNavTabChange(targetTab);
            });
        });

        // 이메일 인증 버튼 클릭 이벤트
        const verifyBtn = headerEl.querySelector('#header-verify-btn');
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => this.onOpenLogin());
        }

        return headerEl;
    }
}
