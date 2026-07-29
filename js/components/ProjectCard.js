/**
 * ==========================================================================
 * 민경천 포트폴리오 - 작업물 갤러리 및 카테고리 필터 컴포넌트 (ProjectCard.js)
 * 요구사항 F-2 준수: 반도체 공정/회로/코딩 필터탭 및 3단 카드 그리드
 * ==========================================================================
 */

export class ProjectCardComponent {
    /**
     * @param {Object} props 프로젝트 목록 배열, 현재 카테고리, onSelectProject 모달 오픈 콜백
     */
    constructor(props) {
        this.projects = props.projects || [];
        this.activeCategory = props.activeCategory || 'all';
        this.onSelectProject = props.onSelectProject || (() => {});
    }

    /**
     * 필터링된 프로젝트 목록을 반환합니다
     * @returns {Array} 카테고리에 맞는 프로젝트 배열
     */
    getFilteredProjects() {
        if (this.activeCategory === 'all') return this.projects;
        return this.projects.filter(p => p.category === this.activeCategory);
    }

    /**
     * 작업물 컴포넌트 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        const filtered = this.getFilteredProjects();

        return `
            <section id="projects" class="section" style="background: rgba(11, 14, 27, 0.4);">
                <div class="container">
                    <h2 class="section-title">
                        엔지니어링 작업물 프로젝트 (Engineering Projects)
                    </h2>

                    <!-- 카테고리 필터 탭 바 -->
                    <div class="category-filter-bar">
                        <button class="cat-pill ${this.activeCategory === 'all' ? 'active' : ''}" data-category="all">
                            🔮 전체 보기
                        </button>
                        <button class="cat-pill ${this.activeCategory === 'process' ? 'active' : ''}" data-category="process">
                            🧪 반도체 공정 (Process)
                        </button>
                        <button class="cat-pill ${this.activeCategory === 'circuit' ? 'active' : ''}" data-category="circuit">
                            ⚡️ 회로 설계 & 분석 (Circuit)
                        </button>
                        <button class="cat-pill ${this.activeCategory === 'coding' ? 'active' : ''}" data-category="coding">
                            💻 디지털 회로 & 코딩 (Coding)
                        </button>
                    </div>

                    <!-- 프로젝트 카드 그리드 (3열) -->
                    <div class="project-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
                        ${filtered.length === 0 ? `
                            <div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary); padding: 4rem 1rem;">
                                <p>해당 카테고리에 등록된 프로젝트가 없습니다.</p>
                            </div>
                        ` : filtered.map(proj => `
                            <article class="glass-card project-card" data-id="${proj.id}" style="display: flex; flex-direction: column; cursor: pointer; height: 100%;">
                                <!-- 프로젝트 대표 이미지/회로도 썸네일 -->
                                <div style="width: 100%; height: 190px; border-radius: 10px; overflow: hidden; margin-bottom: 1.25rem; background: #141a30; border: 1px solid var(--border-glass);">
                                    <img src="${proj.image}" alt="${proj.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>

                                <!-- 카테고리 뱃지 -->
                                <span style="align-self: flex-start; background: rgba(255, 215, 0, 0.15); color: var(--color-gold-primary); font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 12px; margin-bottom: 0.75rem;">
                                    ${proj.categoryName}
                                </span>

                                <!-- 프로젝트 제목 및 설명 -->
                                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; word-break: keep-all;">
                                    ${proj.title}
                                </h3>
                                <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1.25rem; flex: 1; word-break: keep-all;">
                                    ${proj.summary}
                                </p>

                                <!-- 태그 목록 및 자세히 보기 버튼 -->
                                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 1rem; margin-top: auto;">
                                    <div style="display: flex; gap: 0.3rem; flex-wrap: wrap;">
                                        ${proj.tags.slice(0, 3).map(t => `<span class="tag-badge" style="font-size: 0.75rem;">${t}</span>`).join('')}
                                    </div>
                                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--color-cyan-accent); display: flex; align-items: center; gap: 0.3rem;">
                                        자세히 보기 <i class="fa-solid fa-arrow-right"></i>
                                    </span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * 필터 탭 클릭 및 프로젝트 카드 선택 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     * @param {Function} onFilterChange 카테고리 변경 이벤트 콜백
     */
    bindEvents(containerEl, onFilterChange) {
        // 필터 버튼 이벤트
        containerEl.querySelectorAll('.cat-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const category = pill.dataset.category;
                onFilterChange(category);
            });
        });

        // 카드 클릭 이벤트 (외부 링크가 있으면 바로 이동, 없으면 상세 모달 오픈)
        containerEl.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                const project = this.projects.find(p => p.id === id);
                if (project) {
                    if (project.externalUrl) {
                        window.location.href = project.externalUrl;
                    } else {
                        this.onSelectProject(project);
                    }
                }
            });
        });
    }
}

