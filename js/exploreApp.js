/**
 * ==========================================================================
 * LocalMate - 투어 탐색 페이지 컨트롤러 (exploreApp.js)
 * 스마트 필터바, 실시간 다중 조건 탐색, 코스 카드 그리드 및 예약 모달 바인딩
 * ==========================================================================
 */

import { HeaderComponent } from './components/Header.js';
import { FilterBarComponent } from './components/FilterBar.js';
import { CourseCardComponent } from './components/CourseCard.js';
import { BookingModalComponent } from './components/BookingModal.js';
import { FooterComponent } from './components/Footer.js';
import { DEFAULT_COURSES } from './data/defaultData.js';
import { showToast } from './utils/common.js';

class ExplorePageApp {
    constructor() {
        this.courses = DEFAULT_COURSES;
        this.filteredCourses = [...DEFAULT_COURSES];
        this.activeCategory = 'all';
        this.activeLanguage = 'all';
        this.selectedCourse = null;

        this.appEl = document.getElementById('explore-app');
        this.modalContainerEl = document.getElementById('modal-mount');
    }

    init() {
        this.render();
    }

    handleFilterChange({ category, language }) {
        this.activeCategory = category || 'all';
        this.activeLanguage = language || 'all';

        this.filteredCourses = this.courses.filter(course => {
            const matchesCat = (this.activeCategory === 'all') || (course.category === this.activeCategory);
            const matchesLang = (this.activeLanguage === 'all') || (course.languageCode === this.activeLanguage);
            return matchesCat && matchesLang;
        });

        this.renderGrid();
    }

    render() {
        if (!this.appEl) return;
        this.appEl.innerHTML = '';

        // 1. 헤더 마운트 (탐색 탭 활성화)
        const headerComp = new HeaderComponent({
            isVerified: true,
            activeTab: 'explore',
            onNavTabChange: (tab) => {
                if (tab === 'home') window.location.href = 'index.html';
                else if (tab === 'explore') window.location.href = 'explore.html';
                else showToast(`📌 '${tab}' 탭으로 이동합니다.`);
            },
            onOpenLogin: () => showToast('🎓 대학교 이메일(.ac.kr) 인증 가이드를 엽니다.')
        });
        this.appEl.appendChild(headerComp.render());

        // 2. 탐색 페이지 상단 서브 헤더
        const subHeaderEl = document.createElement('div');
        subHeaderEl.style.cssText = `
            background: linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(255, 107, 53, 0.05) 100%);
            padding: 3rem 0 2rem 0;
            border-bottom: 1px solid var(--border-glass);
        `;
        subHeaderEl.innerHTML = `
            <div class="container">
                <span class="badge-student-verified" style="margin-bottom: 0.5rem;">
                    🔍 Explore Local Experiences
                </span>
                <h1 style="font-family: var(--font-heading); font-size: 2.25rem; font-weight: 800; color: var(--text-primary);">
                    내 취향에 딱 맞는 <span style="color: var(--color-primary);">로컬 일상 탐색</span>
                </h1>
                <p style="font-size: 1rem; color: var(--text-secondary); margin-top: 0.4rem;">
                    날짜, 선호 언어 및 액티비티 카테고리로 나에게 가장 유익한 호스트의 코스를 찾아보세요.
                </p>
            </div>
        `;
        this.appEl.appendChild(subHeaderEl);

        // 3. 메인 콘텐츠 컨테이너 (필터바 + 카드리스트)
        const mainContentEl = document.createElement('main');
        mainContentEl.style.padding = '2.5rem 0 4rem 0';

        const containerEl = document.createElement('div');
        containerEl.className = 'container';

        // 필터바 마운트
        const filterBarComp = new FilterBarComponent({
            activeCategory: this.activeCategory,
            activeLanguage: this.activeLanguage,
            onFilterChange: (filters) => this.handleFilterChange(filters)
        });
        containerEl.appendChild(filterBarComp.render());

        // 그리드 컨테이너
        const gridEl = document.createElement('div');
        gridEl.id = 'explore-grid-container';
        gridEl.className = 'grid-3';
        containerEl.appendChild(gridEl);

        mainContentEl.appendChild(containerEl);
        this.appEl.appendChild(mainContentEl);

        // 그리드 내부 카드리스트 렌더링
        this.renderGrid();

        // 4. 푸터 마운트
        const footerComp = new FooterComponent();
        this.appEl.appendChild(footerComp.render());

        // 5. 모달 마운트
        this.renderModal();
    }

    renderGrid() {
        const gridEl = document.getElementById('explore-grid-container');
        if (!gridEl) return;

        gridEl.innerHTML = '';

        if (this.filteredCourses.length === 0) {
            gridEl.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface-solid); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">선택하신 조건의 로컬 코스가 없습니다.</h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">언어 필터를 '모든 언어 가능'으로 변경해보세요!</p>
                </div>
            `;
            return;
        }

        this.filteredCourses.forEach(course => {
            const cardComp = new CourseCardComponent({
                course,
                onSelectCourse: (selected) => {
                    // 상세 페이지로 이동하거나 모달 팝업 실행
                    window.location.href = `detail.html?id=${selected.id}`;
                },
                onToggleLike: (id) => {
                    showToast(`❤️ '${course.title}' 코스를 찜 목록에 저장했습니다.`);
                }
            });
            gridEl.appendChild(cardComp.render());
        });
    }

    renderModal() {
        if (!this.modalContainerEl) {
            this.modalContainerEl = document.createElement('div');
            this.modalContainerEl.id = 'modal-mount';
            document.body.appendChild(this.modalContainerEl);
        }

        this.modalContainerEl.innerHTML = '';

        if (this.selectedCourse) {
            const modalComp = new BookingModalComponent({
                course: this.selectedCourse,
                onClose: () => {
                    this.selectedCourse = null;
                    this.renderModal();
                },
                onSubmitBooking: () => {
                    showToast(`🎉 호스트에게 매칭 신청서가 전송되었습니다!`);
                    this.selectedCourse = null;
                    this.renderModal();
                }
            });
            const node = modalComp.render();
            if (node) this.modalContainerEl.appendChild(node);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new ExplorePageApp();
    app.init();
});
