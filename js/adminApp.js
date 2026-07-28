/**
 * ==========================================================================
 * 민경천 포트폴리오 - 모듈형 관리자 대시보드 애플리케이션 (adminApp.js)
 * Supabase 데이터베이스와 LocalStorage에 자기소개 및 신규 작업물을
 * 이중으로 안전하게 저장하고 동기화함.
 * ==========================================================================
 */

import { 
    loadProfileDataAsync, 
    saveProfileDataAsync, 
    loadProjectsDataAsync, 
    saveProjectsDataAsync,
    deleteProjectDataAsync,
    loadProfileData, 
    loadProjectsData,
    saveProfileData,
    saveProjectsData
} from './utils/storage.js';
import { verifyAdminPassword, showToast } from './utils/helpers.js';
import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from './data/defaultData.js';
import { AdminHeaderComponent } from './components/AdminHeader.js';
import { AdminTabsComponent } from './components/AdminTabs.js';
import { AdminBioFormComponent } from './components/AdminBioForm.js';
import { AdminProjectFormComponent } from './components/AdminProjectForm.js';
import { AdminProjectListComponent } from './components/AdminProjectList.js';

class AdminApp {
    constructor() {
        this.profile = loadProfileData();
        this.projects = loadProjectsData();
        this.activeTab = 'bio';

        this.appEl = document.getElementById('admin-app');
    }

    /**
     * 구동 시 비밀번호 세션 검증 후 Supabase 최신 데이터 수신
     */
    async init() {
        const isAuth = sessionStorage.getItem('adminSession') === 'true';
        if (!isAuth) {
            const pass = prompt('관리자 비밀번호를 입력하세요 (기본 암호: 1234):');
            if (pass !== null && verifyAdminPassword(pass)) {
                sessionStorage.setItem('adminSession', 'true');
                showToast('🔓 관리자 인증에 성공하였습니다!');
            } else {
                alert('비밀번호가 올바르지 않습니다. 메인 페이지로 이동합니다.');
                window.location.href = 'index.html';
                return;
            }
        }

        this.render();

        // Supabase DB 비동기 데이터 최신화
        try {
            const dbProfile = await loadProfileDataAsync();
            const dbProjects = await loadProjectsDataAsync();

            if (dbProfile) this.profile = dbProfile;
            if (dbProjects && dbProjects.length > 0) this.projects = dbProjects;

            this.render();
        } catch (e) {
            console.warn("Supabase 비동기 데이터 수신 예외 (로컬 캐시 사용):", e);
        }
    }

    /**
     * 관리자 컴포넌트 전체 조립 렌더링
     */
    render() {
        if (!this.appEl) return;

        const headerComp = new AdminHeaderComponent({
            onLogout: () => {
                sessionStorage.removeItem('adminSession');
                window.location.href = 'index.html';
            }
        });

        const tabsComp = new AdminTabsComponent({
            activeTab: this.activeTab,
            onTabChange: (newTab) => {
                this.activeTab = newTab;
                this.render();
            }
        });

        const bioFormComp = new AdminBioFormComponent({
            profile: this.profile,
            onSaveProfile: async (updatedProfile) => {
                this.profile = updatedProfile;
                await saveProfileDataAsync(this.profile);
                showToast('💾 Supabase DB 및 LocalStorage에 자기소개가 성공적으로 저장되었습니다!');
                this.render();
            }
        });

        const projectFormComp = new AdminProjectFormComponent({
            onAddProject: async (newProject) => {
                this.projects.unshift(newProject);
                await saveProjectsDataAsync(this.projects, newProject);
                showToast('🎉 Supabase DB 및 LocalStorage에 새 작업물이 저장되었습니다!');
                this.render();
            }
        });

        const projectListComp = new AdminProjectListComponent({
            projects: this.projects,
            onDeleteProject: async (idx) => {
                const deletedId = this.projects[idx].id;
                this.projects.splice(idx, 1);
                await deleteProjectDataAsync(this.projects, deletedId);
                showToast('🗑 Supabase DB 및 LocalStorage에서 프로젝트가 삭제되었습니다.');
                this.render();
            }
        });

        this.appEl.innerHTML = `
            ${headerComp.render()}
            <main class="container" style="padding-top: 2.5rem; padding-bottom: 5rem;">
                ${tabsComp.render()}

                <div id="tab-panel-bio" style="display: ${this.activeTab === 'bio' ? 'block' : 'none'};">
                    ${bioFormComp.render()}
                </div>

                <div id="tab-panel-projects" style="display: ${this.activeTab === 'projects' ? 'block' : 'none'};">
                    <section class="admin-form-card">
                        ${projectFormComp.render()}
                        ${projectListComp.render()}
                    </section>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 1.5rem; margin-top: 2rem;">
                    <button id="reset-default-btn" class="btn btn-outline btn-sm" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
                        <i class="fa-solid fa-rotate-left"></i> 기본 샘플 데이터로 초기화
                    </button>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">
                        <i class="fa-solid fa-cloud-bolt" style="color: var(--color-cyan-accent);"></i> Supabase 데이터베이스와 LocalStorage에 이중 저장됩니다.
                    </span>
                </div>
            </main>
        `;

        headerComp.bindEvents(this.appEl);
        tabsComp.bindEvents(this.appEl);
        bioFormComp.bindEvents(this.appEl);
        projectFormComp.bindEvents(this.appEl);
        projectListComp.bindEvents(this.appEl);

        const resetBtn = this.appEl.querySelector('#reset-default-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', async () => {
                if (confirm('모든 변경사항을 지우고 기본 샘플 데이터로 초기화하시겠습니까?')) {
                    this.profile = DEFAULT_PROFILE;
                    this.projects = DEFAULT_PROJECTS;
                    saveProfileData(DEFAULT_PROFILE);
                    saveProjectsData(DEFAULT_PROJECTS);
                    await saveProfileDataAsync(DEFAULT_PROFILE);
                    await saveProjectsDataAsync(DEFAULT_PROJECTS);
                    this.render();
                    showToast('🔄 기본 샘플 데이터로 복원되었습니다.');
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const adminApp = new AdminApp();
    adminApp.init();
});
