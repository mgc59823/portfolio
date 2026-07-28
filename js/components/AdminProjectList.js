/**
 * ==========================================================================
 * 민경천 포트폴리오 - 관리자 프로젝트 목록 컴포넌트 (AdminProjectList.js)
 * 현재 등록된 프로젝트 리스트 조회 및 삭제 삭제 기능을 제공함
 * ==========================================================================
 */

import { showToast } from '../utils/helpers.js';

export class AdminProjectListComponent {
    /**
     * @param {Object} props 프로젝트 배열, onDeleteProject 삭제 콜백
     */
    constructor(props) {
        this.projects = props.projects || [];
        this.onDeleteProject = props.onDeleteProject || (() => {});
    }

    /**
     * 프로젝트 목록 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <div>
                <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-list-check" style="color: var(--color-gold-primary);"></i> 현재 등록된 작업물 프로젝트 목록 (${this.projects.length}개)
                </h3>

                <div class="admin-project-list-container">
                    ${this.projects.length === 0 ? `
                        <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">등록된 프로젝트가 없습니다. 위의 폼에서 신규 작업물을 추가해보세요.</p>
                    ` : this.projects.map((proj, index) => `
                        <div class="admin-project-item" style="background: rgba(11, 14, 27, 0.6); border: 1px solid var(--border-glass); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <img src="${proj.image}" alt="${proj.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; border: 1px solid var(--border-glass);">
                                <div>
                                    <span style="font-size: 0.75rem; color: var(--color-gold-primary); font-weight: 700;">[${proj.categoryName}]</span>
                                    <h4 style="font-size: 1.05rem; color: var(--text-primary); margin: 0.2rem 0;">${proj.title}</h4>
                                    <p style="font-size: 0.85rem; color: var(--text-secondary);">${proj.summary}</p>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-outline btn-sm delete-proj-btn" data-index="${index}" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
                                    <i class="fa-solid fa-trash-can"></i> 삭제
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 삭제 버튼 클릭 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        containerEl.querySelectorAll('.delete-proj-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.index);
                if (confirm(`'${this.projects[idx].title}' 프로젝트를 삭제하시겠습니까?`)) {
                    this.onDeleteProject(idx);
                    showToast('🗑 프로젝트가 정상적으로 삭제되었습니다.');
                }
            });
        });
    }
}
