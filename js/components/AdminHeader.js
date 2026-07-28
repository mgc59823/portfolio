/**
 * ==========================================================================
 * 민경천 포트폴리오 - 관리자 상단 헤더 컴포넌트 (AdminHeader.js)
 * 대시보드 타이틀, 메인 웹사이트 바로가기 및 로그아웃 동작 제공
 * ==========================================================================
 */

import { showToast } from '../utils/helpers.js';

export class AdminHeaderComponent {
    /**
     * @param {Object} props onLogout 로그아웃 콜백
     */
    constructor(props) {
        this.onLogout = props.onLogout || (() => {});
    }

    /**
     * 헤더 컴포넌트 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <header class="admin-header" style="background: rgba(11, 14, 27, 0.95); backdrop-filter: blur(12px); border-bottom: 2px solid var(--color-gold-primary); padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.5rem;">🔑</span>
                    <div>
                        <h1 style="font-size: 1.2rem; font-weight: 800; color: var(--color-gold-primary); font-family: var(--font-heading);">
                            민경천 포트폴리오 관리자 대시보드
                        </h1>
                        <p style="font-size: 0.8rem; color: var(--text-secondary);">
                            자기소개 수정 & 작업물(프로젝트) 신규 등록 관리자 포털
                        </p>
                    </div>
                </div>
                <div style="display: flex; gap: 0.75rem;">
                    <a href="index.html" class="btn btn-outline btn-sm">
                        <i class="fa-solid fa-eye"></i> 메인 포트폴리오 보기
                    </a>
                    <button id="admin-logout-btn" class="btn btn-primary btn-sm">
                        <i class="fa-solid fa-right-from-bracket"></i> 로그아웃
                    </button>
                </div>
            </header>
        `;
    }

    /**
     * 컴포넌트 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        const logoutBtn = containerEl.querySelector('#admin-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('adminSession');
                showToast('🔒 관리자 세션이 종료되었습니다.');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            });
        }
    }
}
