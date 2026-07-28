/**
 * ==========================================================================
 * 민경천 포트폴리오 - 메인 애플리케이션 엔트리 포인트 (app.js)
 * 모든 UI 컴포넌트(Header, Hero, BioEditor, ProjectCard, ProjectModal, Footer)를
 * 조립하고 상태(State) 및 이벤트를 수명주기 전반에 걸쳐 총괄 관리함.
 * ==========================================================================
 */

import { loadProfileData, saveProfileData, loadProjectsData } from './utils/storage.js';
import { HeaderComponent } from './components/Header.js';
import { HeroComponent } from './components/Hero.js';
import { BioEditorComponent } from './components/BioEditor.js';
import { ProjectCardComponent } from './components/ProjectCard.js';
import { ProjectModalComponent } from './components/ProjectModal.js';
import { FooterComponent } from './components/Footer.js';

class App {
    constructor() {
        // 1. 애플리케이션 상태 (State) 초기화
        this.profile = loadProfileData();
        this.projects = loadProjectsData();
        this.isAdmin = false;             // 관리자 암호 인증 여부
        this.activeCategory = 'all';      // 현재 선택된 프로젝트 카테고리
        this.selectedProject = null;     // 현재 오픈된 상세 프로젝트 (모달용)

        // 2. 최상위 마운트 DOM 요소 참조
        this.appEl = document.getElementById('app');
    }

    /**
     * 애플리케이션 구동 시 초기화 및 첫 렌더링
     */
    init() {
        this.render();
    }

    /**
     * 상태 변경에 따른 전체 UI 컴포넌트 재렌더링 및 이벤트 바인딩
     */
    render() {
        if (!this.appEl) return;

        // 1. 각 컴포넌트 인스턴스 생성
        const headerComp = new HeaderComponent({
            isAdmin: this.isAdmin,
            onAdminToggle: (adminState) => {
                this.isAdmin = adminState;
                this.render();
            }
        });

        const heroComp = new HeroComponent({
            headline: this.profile.headline
        });

        const bioEditorComp = new BioEditorComponent({
            profile: this.profile,
            isAdmin: this.isAdmin,
            onSaveProfile: (updatedProfile, isPermanentSave) => {
                this.profile = updatedProfile;
                if (isPermanentSave) {
                    saveProfileData(this.profile);
                }
                this.render();
            }
        });

        const projectCardComp = new ProjectCardComponent({
            projects: this.projects,
            activeCategory: this.activeCategory,
            onSelectProject: (project) => {
                this.selectedProject = project;
                this.render();
            }
        });

        const projectModalComp = new ProjectModalComponent({
            project: this.selectedProject,
            onClose: () => {
                this.selectedProject = null;
                this.render();
            }
        });

        const footerComp = new FooterComponent({
            email: this.profile.email,
            github: this.profile.github
        });

        // 2. 전체 컴포넌트 조립 HTML 생성
        this.appEl.innerHTML = `
            ${headerComp.render()}
            <main>
                ${heroComp.render()}
                ${bioEditorComp.render()}
                ${projectCardComp.render()}
            </main>
            ${footerComp.render()}
            <div id="modal-mount">${projectModalComp.render()}</div>
        `;

        // 3. 각 컴포넌트의 DOM 이벤트 핸들러 바인딩
        headerComp.bindEvents(this.appEl);
        heroComp.bindEvents(this.appEl);
        bioEditorComp.bindEvents(this.appEl);
        projectCardComp.bindEvents(this.appEl, (newCategory) => {
            this.activeCategory = newCategory;
            this.render();
        });
        projectModalComp.bindEvents(this.appEl);
        footerComp.bindEvents(this.appEl);
    }
}

// DOM 콘텐츠 로드 완료 시 애플리케이션 구동
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
