/**
 * ==========================================================================
 * 민경천 포트폴리오 - 하단 푸터 및 연락처 컴포넌트 (Footer.js)
 * 이메일 복사, GitHub 프로필 링크 및 카피라이트 정보 제공
 * ==========================================================================
 */

import { showToast } from '../utils/helpers.js';

export class FooterComponent {
    /**
     * @param {Object} props 이메일, github 주소 등
     */
    constructor(props) {
        this.email = props.email || "mgc59823@gmail.com";
        this.github = props.github || "https://github.com/mgc59823";
    }

    /**
     * 푸터 컴포넌트 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <footer id="contact" class="app-footer" style="background: rgba(11, 14, 27, 0.95); border-top: 1px solid var(--border-glass); padding: 4rem 0 2rem; margin-top: auto;">
                <div class="container" style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 2rem;">
                    <!-- 연락처 구역 타이틀 -->
                    <div>
                        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
                            Contact & Network
                        </h2>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">
                            반도체 공정 및 디지털 회로 분야 엔지니어 채용 관련 문의는 아래 이메일로 연락주시면 빠르게 답변 드리겠습니다.
                        </p>
                    </div>

                    <!-- 이메일 및 GitHub 버튼 그룹 -->
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                        <button id="copy-email-btn" class="btn btn-primary btn-md">
                            <i class="fa-solid fa-envelope"></i> 이메일 주소 복사 (${this.email})
                        </button>
                        <a href="${this.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-md">
                            <i class="fa-brands fa-github"></i> GitHub 프로필 방문
                        </a>
                    </div>

                    <!-- 카피라이트 텍스트 -->
                    <div style="border-top: 1px solid var(--border-glass); width: 100%; padding-top: 1.5rem; color: var(--text-muted); font-size: 0.85rem;">
                        <p>© 2026 민경천 (Min Gyeongcheon). All rights reserved.</p>
                        <p style="font-size: 0.75rem; margin-top: 0.25rem;">Built with HTML5, Vanilla CSS3, ES6 Modules & Supabase.</p>
                    </div>
                </div>
            </footer>
        `;
    }

    /**
     * 이메일 클립보드 복사 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        const copyBtn = containerEl.querySelector('#copy-email-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(this.email).then(() => {
                    showToast(`✨ 이메일 주소 (${this.email})가 복사되었습니다!`);
                }).catch(() => {
                    showToast('이메일 복사에 실패했습니다.');
                });
            });
        }
    }
}
