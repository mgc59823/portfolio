/**
 * ==========================================================================
 * 민경천 포트폴리오 - 모듈형 관리자 대시보드 애플리케이션 (adminApp.js)
 * AdminHeader, AdminTabs, AdminBioForm, AdminProjectForm, AdminProjectList
 * 컴포넌트들을 조립하여 관리자 화면 조작 및 LocalStorage 수명주기를 관리함.
 * ==========================================================================
 */

import { loadProfileData, saveProfileData, loadProjectsData, saveProjectsData } from './utils/storage.js';
import { verifyAdminPassword, showToast } from './utils/helpers.js';
import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from './data/defaultData.js';
import { AdminHeaderComponent } from './components/AdminHeader.js';
import { AdminTabsComponent } from './components/AdminTabs.js';
import { AdminBioFormComponent } from './components/AdminBioForm.js';
import { AdminProjectFormComponent } from './components/AdminProjectForm.js';
import { AdminProjectListComponent } from './components/AdminProjectList.js';

class AdminApp {
    constructor() {
        // 1. 애플리케이션 상태 (State) 초기화
        this.profile = loadProfileData();
        this.projects = loadProjectsData();
        this.activeTab = 'bio'; // 'bio' | 'projects'

        this.appEl = document.getElementById('admin-app');
    }

    /**
     * 초기 구동 시 관리자 암호 세션 검증
     */
    init() {
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
    }

    /**
     * 관리자 컴포넌트 전체 조립 렌더링
     */
    render() {
        if (!this.appEl) return;

        // 1. 컴포넌트 인스턴스 생성
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
            onSaveProfile: (updatedProfile) => {
                this.profile = updatedProfile;
                saveProfileData(this.profile);
            }
        });

        const projectFormComp = new AdminProjectFormComponent({
            onAddProject: (newProject) => {
                this.projects.unshift(newProject);
                saveProjectsData(this.projects);
                this.render();
            }
        });

        const projectListComp = new AdminProjectListComponent({
            projects: this.projects,
            onDeleteProject: (idx) => {
                this.projects.splice(idx, 1);
                saveProjectsData(this.projects);
                this.render();
            }
        });

        // 2. 관리자 화면 렌더링 HTML 생성
        this.appEl.innerHTML = `
            ${headerComp.render()}
            <main class="container" style="padding-top: 2.5rem; padding-bottom: 5rem;">
                ${tabsComp.render()}

                <!-- TAB 1: 자기소개 & 프로필 관리 -->
                <div id="tab-panel-bio" style="display: ${this.activeTab === 'bio' ? 'block' : 'none'};">
                    ${bioFormComp.render()}
                </div>

                <!-- TAB 2: 작업물 관리 & ➕ 새 프로젝트 등록 -->
                <div id="tab-panel-projects" style="display: ${this.activeTab === 'projects' ? 'block' : 'none'};">
                    <section class="admin-form-card">
                        ${projectFormComp.render()}
                        ${projectListComp.render()}
                    </section>
                </div>

                <!-- 하단 초기화 조작 컨트롤 -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-glass); padding-top: 1.5rem; margin-top: 2rem;">
                    <button id="reset-default-btn" class="btn btn-outline btn-sm" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">
                        <i class="fa-solid fa-rotate-left"></i> 기본 샘플 데이터로 초기화
                    </button>
                    <span style="font-size: 0.85rem; color: var(--text-muted);">
                        <i class="fa-solid fa-database"></i> 모든 데이터는 브라우저 LocalStorage에 자동 동기화됩니다.
                    </span>
                </div>
            </main>
        `;

        // 3. 컴포넌트 이벤트 바인딩
        headerComp.bindEvents(this.appEl);
        tabsComp.bindEvents(this.appEl);
        bioFormComp.bindEvents(this.appEl);
        projectFormComp.bindEvents(this.appEl);
        projectListComp.bindEvents(this.appEl);

        // 초기화 버튼 이벤트
        const resetBtn = this.appEl.querySelector('#reset-default-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('모든 변경사항을 지우고 기본 샘플 데이터로 초기화하시겠습니까?')) {
                    saveProfileData(DEFAULT_PROFILE);
                    saveProjectsData(DEFAULT_PROJECTS);
                    this.profile = DEFAULT_PROFILE;
                    this.projects = DEFAULT_PROJECTS;
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
