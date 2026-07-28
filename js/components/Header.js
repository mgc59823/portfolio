/**
 * ==========================================================================
 * 민경천 포트폴리오 - 상단 네비게이션 헤더 컴포넌트 (Header.js)
 * 로고, 네비게이션 메뉴, PDF 이력서 다운로드 및 관리자 암호 인증 버튼 제공
 * 관리자 로그인 시 admin.html 대시보드로 접속 지원
 * ==========================================================================
 */

import { downloadResumePDF, verifyAdminPassword, showToast } from '../utils/helpers.js';

export class HeaderComponent {
    /**
     * @param {Object} props 컴포넌트 전달 속성 (isAdmin, onAdminToggle 콜백)
     */
    constructor(props) {
        this.isAdmin = props.isAdmin || false;
        this.onAdminToggle = props.onAdminToggle || (() => {});
    }

    /**
     * 헤더 컴포넌트 HTML 템플릿을 생성합니다
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <header class="app-header" style="position: sticky; top: 0; background: rgba(11, 14, 27, 0.85); backdrop-filter: blur(12px); z-index: 100; border-bottom: 1px solid var(--border-glass);">
                <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; padding-bottom: 1rem;">
                    <!-- 브랜드 로고 -->
                    <a href="index.html" class="logo" style="display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; color: var(--text-primary);">
                        <span style="color: var(--color-cyan-accent);">MGC.AI</span> 민경천
                    </a>

                    <!-- 네비게이션 링크 -->
                    <nav class="nav-links" style="display: flex; gap: 1.5rem; align-items: center; font-size: 0.95rem; color: var(--text-secondary);">
                        <a href="#about" style="transition: var(--transition-smooth);" onmouseover="this.style.color='var(--color-gold-primary)'" onmouseout="this.style.color='var(--text-secondary)'">자기소개</a>
                        <a href="#projects" style="transition: var(--transition-smooth);" onmouseover="this.style.color='var(--color-gold-primary)'" onmouseout="this.style.color='var(--text-secondary)'">작업물</a>
                        <a href="#contact" style="transition: var(--transition-smooth);" onmouseover="this.style.color='var(--color-gold-primary)'" onmouseout="this.style.color='var(--text-secondary)'">연락처</a>
                    </nav>

                    <!-- 액션 버튼 영역 -->
                    <div class="header-actions" style="display: flex; align-items: center; gap: 0.75rem;">
                        <!-- PDF 이력서 다운로드 버튼 -->
                        <button id="download-resume-btn" class="btn btn-primary btn-md">
                            <i class="fa-solid fa-file-pdf"></i> PDF 이력서 다운로드
                        </button>

                        <!-- 관리자 로그인 / 전용 대시보드 접속 버튼 -->
                        <a href="admin.html" id="admin-lock-btn" class="btn btn-icon" title="관리자 페이지 (자기소개 수정 & 작업물 추가)">
                            <i class="fa-solid fa-user-gear" style="color: var(--color-gold-primary);"></i>
                        </a>
                    </div>
                </div>
            </header>
        `;
    }

    /**
     * 컴포넌트 DOM 이벤트 바인딩
     * @param {HTMLElement} containerEl 컴포넌트가 마운트된 부모 요소
     */
    bindEvents(containerEl) {
        // PDF 이력서 다운로드 이벤트 연결
        const resumeBtn = containerEl.querySelector('#download-resume-btn');
        if (resumeBtn) {
            resumeBtn.addEventListener('click', downloadResumePDF);
        }
    }
}
