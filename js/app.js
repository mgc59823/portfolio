/**
 * ==========================================================================
 * LocalMate - 메인 애플리케이션 진입점 (app.js)
 * Header, Hero, TrustBanner, FilterBar, CourseCard, HostProfile, Modal 통합 구동
 * ==========================================================================
 */

import { HeaderComponent } from './components/Header.js';
import { HeroComponent } from './components/Hero.js';
import { TrustBannerComponent } from './components/TrustBanner.js';
import { FilterBarComponent } from './components/FilterBar.js';
import { CourseCardComponent } from './components/CourseCard.js';
import { BookingModalComponent } from './components/BookingModal.js';
import { FooterComponent } from './components/Footer.js';
import { DEFAULT_COURSES } from './data/defaultData.js';
import { showToast } from './utils/common.js';

class LocalMateApp {
    constructor() {
        this.courses = DEFAULT_COURSES;
        this.filteredCourses = [...DEFAULT_COURSES];
        this.activeCategory = 'all';
        this.activeLanguage = 'all';
        this.activeTab = 'home';
        this.selectedCourse = null;
        this.isUserVerified = true;

        this.appEl = document.getElementById('app');
        this.modalContainerEl = document.getElementById('modal-mount');
    }

    /**
     * 앱 초기화 실행
     */
    init() {
        this.render();
    }

    /**
     * 필터링 조건 변경 적용
     */
    handleFilterChange({ category, language }) {
        this.activeCategory = category || 'all';
        this.activeLanguage = language || 'all';

        this.filteredCourses = this.courses.filter(course => {
            const matchesCat = (this.activeCategory === 'all') || (course.category === this.activeCategory);
            const matchesLang = (this.activeLanguage === 'all') || (course.languageCode === this.activeLanguage);
            return matchesCat && matchesLang;
        });

        this.renderCourseGrid();
    }

    /**
     * 전체 애플리케이션 UI 컴포넌트 마운트
     */
    render() {
        if (!this.appEl) return;

        this.appEl.innerHTML = '';

        // 1. 헤더 컴포넌트 마운트
        const headerComp = new HeaderComponent({
            isVerified: this.isUserVerified,
            activeTab: this.activeTab,
            onNavTabChange: (tab) => {
                this.activeTab = tab;
                showToast(`📌 '${tab}' 탭으로 이동했습니다.`);
            },
            onOpenLogin: () => {
                showToast('🎓 대학교 이메일(.ac.kr) 인증 안내 모달을 엽니다.');
            }
        });
        this.appEl.appendChild(headerComp.render());

        // 2. 히어로 컴포넌트 마운트
        const heroComp = new HeroComponent({
            onExploreClick: () => {
                const exploreSection = document.getElementById('explore-section');
                if (exploreSection) exploreSection.scrollIntoView({ behavior: 'smooth' });
            },
            onHostClick: () => {
                showToast('✍️ 내 일상 코스 등록 페이지로 이동합니다.');
            }
        });
        this.appEl.appendChild(heroComp.render());

        // 3. 신뢰 시스템 배너 마운트
        const trustComp = new TrustBannerComponent();
        this.appEl.appendChild(trustComp.render());

        // 4. 탐색 섹션 컨테이너 생성
        const exploreSectionEl = document.createElement('section');
        exploreSectionEl.id = 'explore-section';
        exploreSectionEl.style.padding = '3.5rem 0';

        const containerEl = document.createElement('div');
        containerEl.className = 'container';

        // 섹션 헤더
        containerEl.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <span class="tag-chip" style="margin-bottom: 0.5rem;">🔥 Real Local Experiences</span>
                <h2 style="font-family: var(--font-main); font-size: 2rem; font-weight: 800; color: var(--text-primary);">
                    지금 예약 가능한 <span style="color: var(--color-primary);">로컬 일상 코스</span>
                </h2>
            </div>
        `;

        // 5. 필터바 컴포넌트 마운트
        const filterBarComp = new FilterBarComponent({
            activeCategory: this.activeCategory,
            activeLanguage: this.activeLanguage,
            onFilterChange: (filters) => this.handleFilterChange(filters)
        });
        containerEl.appendChild(filterBarComp.render());

        // 6. 코스 카드리스트 그리드 컨테이너
        const gridEl = document.createElement('div');
        gridEl.id = 'course-grid-container';
        gridEl.className = 'grid-3';
        containerEl.appendChild(gridEl);

        exploreSectionEl.appendChild(containerEl);
        this.appEl.appendChild(exploreSectionEl);

        // 7. 코스 그리드 내부 렌더링
        this.renderCourseGrid();

        // 8. 푸터 컴포넌트 마운트
        const footerComp = new FooterComponent();
        this.appEl.appendChild(footerComp.render());

        // 9. 모달 렌더링
        this.renderModal();
    }

    /**
     * 코스 카드 그리드 갱신
     */
    renderCourseGrid() {
        const gridEl = document.getElementById('course-grid-container');
        if (!gridEl) return;

        gridEl.innerHTML = '';

        if (this.filteredCourses.length === 0) {
            gridEl.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1.5rem; background: var(--bg-surface-solid); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">조건에 일치하는 로컬 코스가 없습니다.</h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary);">다른 언어 또는 카테고리 필터를 선택해보세요!</p>
                </div>
            `;
            return;
        }

        this.filteredCourses.forEach(course => {
            const courseCardComp = new CourseCardComponent({
                course,
                onSelectCourse: (selected) => {
                    this.selectedCourse = selected;
                    this.renderModal();
                },
                onToggleLike: (id) => {
                    showToast(`❤️ '${course.title}' 코스를 찜했습니다!`);
                }
            });
            gridEl.appendChild(courseCardComp.render());
        });
    }

    /**
     * 예약 신청 모달 마운트
     */
    renderModal() {
        if (!this.modalContainerEl) {
            this.modalContainerEl = document.createElement('div');
            this.modalContainerEl.id = 'modal-mount';
            document.body.appendChild(this.modalContainerEl);
        }

        this.modalContainerEl.innerHTML = '';

        if (this.selectedCourse) {
            const bookingModalComp = new BookingModalComponent({
                course: this.selectedCourse,
                onClose: () => {
                    this.selectedCourse = null;
                    this.renderModal();
                },
                onSubmitBooking: (bookingData) => {
                    showToast(`🎉 '${this.selectedCourse.hostName}' 호스트에게 매칭 신청서가 성공적으로 전송되었습니다!`);
                    this.selectedCourse = null;
                    this.renderModal();
                }
            });

            const modalNode = bookingModalComp.render();
            if (modalNode) this.modalContainerEl.appendChild(modalNode);
        }
    }
}

// DOM 로드 시 앱 구동
document.addEventListener('DOMContentLoaded', () => {
    const app = new LocalMateApp();
    app.init();
});
