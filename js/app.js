/**
 * ==========================================================================
 * 민경천 포트폴리오 - 메인 애플리케이션 엔트리 포인트 (app.js)
 * Supabase DB 및 LocalStorage 비동기 데이터를 가져와
 * 방문자 화면(index.html)의 모든 UI 컴포넌트를 구동함.
 * ==========================================================================
 */

import { 
    loadProfileDataAsync, 
    saveProfileDataAsync, 
    loadProjectsDataAsync,
    loadProfileData,
    loadProjectsData
} from './utils/storage.js';
import { HeaderComponent } from './components/Header.js';
import { HeroComponent } from './components/Hero.js';
import { BioEditorComponent } from './components/BioEditor.js';
import { ProjectCardComponent } from './components/ProjectCard.js';
import { ProjectModalComponent } from './components/ProjectModal.js';
import { FooterComponent } from './components/Footer.js';

class App {
    constructor() {
        // 동기식 캐시 우선 로드
        this.profile = loadProfileData();
        this.projects = loadProjectsData();
        this.isAdmin = false;
        this.activeCategory = 'all';
        this.selectedProject = null;

        this.appEl = document.getElementById('app');
    }

    /**
     * 구동 시 Supabase DB 최신 데이터 비동기 수신 후 화면 갱신
     */
    async init() {
        this.render();

        // Supabase DB 비동기 로드
        try {
            const dbProfile = await loadProfileDataAsync();
            const dbProjects = await loadProjectsDataAsync();

            if (dbProfile) this.profile = dbProfile;
            if (dbProjects && dbProjects.length > 0) this.projects = dbProjects;

            this.render();
        } catch (e) {
            console.warn("Supabase 비동기 로드 중 예외 발생 (로컬 캐시 사용):", e);
        }
    }

    /**
     * 상태 변경에 따른 전체 UI 컴포넌트 재렌더링 및 이벤트 바인딩
     */
    render() {
        if (!this.appEl) return;

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
            onSaveProfile: async (updatedProfile, isPermanentSave) => {
                this.profile = updatedProfile;
                if (isPermanentSave) {
                    await saveProfileDataAsync(this.profile);
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

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
