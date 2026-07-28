/**
 * ==========================================================================
 * 민경천 포트폴리오 - UI 컴포넌트 데모 쇼케이스 전용 앱 (demoApp.js)
 * demo.html 화면의 각 섹션 마운트 위치에 독립된 컴포넌트들을 각각 배치하고
 * 실시간 클릭, 필터 변경, 관리자 편집 암호 테스트를 개별 검증함.
 * ==========================================================================
 */

import { loadProfileData, loadProjectsData } from './utils/storage.js';
import { HeaderComponent } from './components/Header.js';
import { HeroComponent } from './components/Hero.js';
import { BioEditorComponent } from './components/BioEditor.js';
import { ProjectCardComponent } from './components/ProjectCard.js';
import { ProjectModalComponent } from './components/ProjectModal.js';
import { FooterComponent } from './components/Footer.js';
import { showToast } from './utils/helpers.js';

class DemoApp {
    constructor() {
        this.profile = loadProfileData();
        this.projects = loadProjectsData();
        this.demoIsAdmin = false;
        this.demoCategory = 'all';
        this.demoSelectedProject = null;
    }

    init() {
        this.renderHeader();
        this.renderHero();
        this.renderBio();
        this.renderProjects();
        this.renderFooter();
        this.bindGlobalEvents();
    }

    /**
     * 1. 헤더 컴포넌트 마운트
     */
    renderHeader() {
        const mount = document.getElementById('mount-header');
        if (!mount) return;

        const header = new HeaderComponent({
            isAdmin: this.demoIsAdmin,
            onAdminToggle: (state) => {
                this.demoIsAdmin = state;
                this.renderHeader();
                this.renderBio();
            }
        });

        mount.innerHTML = header.render();
        header.bindEvents(mount);
    }

    /**
     * 2. 히어로 컴포넌트 마운트
     */
    renderHero() {
        const mount = document.getElementById('mount-hero');
        if (!mount) return;

        const hero = new HeroComponent({
            headline: this.profile.headline
        });

        mount.innerHTML = hero.render();
        hero.bindEvents(mount);
    }

    /**
     * 3. 자기소개 에디터 컴포넌트 마운트 (관리자 편집 기능 테스트)
     */
    renderBio() {
        const mount = document.getElementById('mount-bio');
        if (!mount) return;

        const bio = new BioEditorComponent({
            profile: this.profile,
            isAdmin: this.demoIsAdmin,
            onSaveProfile: (updatedProfile, isPermanentSave) => {
                this.profile = updatedProfile;
                this.renderBio();
            }
        });

        mount.innerHTML = bio.render();
        bio.bindEvents(mount);
    }

    /**
     * 4. 작업물 갤러리 컴포넌트 마운트
     */
    renderProjects() {
        const mount = document.getElementById('mount-projects');
        if (!mount) return;

        const projectCard = new ProjectCardComponent({
            projects: this.projects,
            activeCategory: this.demoCategory,
            onSelectProject: (proj) => {
                this.demoSelectedProject = proj;
                this.renderModal();
            }
        });

        mount.innerHTML = projectCard.render();
        projectCard.bindEvents(mount, (newCat) => {
            this.demoCategory = newCat;
            this.renderProjects();
        });
    }

    /**
     * 5. 상세 레이어 모달 컴포넌트 마운트
     */
    renderModal() {
        const mount = document.getElementById('mount-modal');
        if (!mount) return;

        const modal = new ProjectModalComponent({
            project: this.demoSelectedProject,
            onClose: () => {
                this.demoSelectedProject = null;
                this.renderModal();
            }
        });

        mount.innerHTML = modal.render();
        modal.bindEvents(mount);
    }

    /**
     * 6. 푸터 컴포넌트 마운트
     */
    renderFooter() {
        const mount = document.getElementById('mount-footer');
        if (!mount) return;

        const footer = new FooterComponent({
            email: this.profile.email,
            github: this.profile.github
        });

        mount.innerHTML = footer.render();
        footer.bindEvents(mount);
    }

    /**
     * 데모 전용 이벤트 바인딩
     */
    bindGlobalEvents() {
        // 관리자 모드 토글 테스트 버튼
        const toggleBtn = document.getElementById('toggle-admin-demo-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.demoIsAdmin = !this.demoIsAdmin;
                this.renderHeader();
                this.renderBio();
                showToast(this.demoIsAdmin ? '🔓 데모 관리자 모드가 활성화되었습니다! 수정 버튼을 클릭해보세요.' : '🔒 데모 관리자 모드가 해제되었습니다.');
            });
        }

        // 모달 테스트 오픈 버튼
        const openModalBtn = document.getElementById('open-demo-modal-btn');
        if (openModalBtn) {
            openModalBtn.addEventListener('click', () => {
                this.demoSelectedProject = this.projects[0];
                this.renderModal();
                showToast('🔍 1번 프로젝트 상세 모달이 열렸습니다.');
            });
        }
    }
}

// DOMContentLoaded 시 데모 앱 구동
document.addEventListener('DOMContentLoaded', () => {
    const demo = new DemoApp();
    demo.init();
});
