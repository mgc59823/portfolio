/**
 * ==========================================================================
 * 민경천 포트폴리오 - 관리자 대시보드 로직 스크립트 (adminApp.js)
 * 자기소개 수정, 신규 작업물(프로젝트) 등록, 이미지 파일 변환 및
 * LocalStorage 자동 저장을 총괄 처리하는 관리자 모듈
 * ==========================================================================
 */

import { loadProfileData, saveProfileData, loadProjectsData, saveProjectsData } from './utils/storage.js';
import { verifyAdminPassword, showToast } from './utils/helpers.js';
import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from './data/defaultData.js';

class AdminApp {
    constructor() {
        this.profile = loadProfileData();
        this.projects = loadProjectsData();

        this.tabBioBtn = document.getElementById('tab-bio-btn');
        this.tabProjectsBtn = document.getElementById('tab-projects-btn');
        this.panelBio = document.getElementById('panel-bio');
        this.panelProjects = document.getElementById('panel-projects');

        this.profileForm = document.getElementById('profile-form');
        this.newProjectForm = document.getElementById('new-project-form');
        this.adminProjectList = document.getElementById('admin-project-list');
        this.logoutBtn = document.getElementById('logout-btn');
        this.resetDefaultBtn = document.getElementById('reset-default-btn');
    }

    /**
     * 관리자 대시보드 구동 초기화 및 비밀번호 세션 검증
     */
    init() {
        // 관리자 인증 세션 검사 (세션 없으면 비밀번호 팝업)
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

        // 폼 초기 데이터 채우기 및 바인딩
        this.populateProfileForm();
        this.renderProjectList();
        this.bindEvents();
    }

    /**
     * 자기소개 & 프로필 폼에 기존 데이터를 채웁니다
     */
    populateProfileForm() {
        document.getElementById('prof-name').value = this.profile.name || '';
        document.getElementById('prof-title').value = this.profile.title || '';
        document.getElementById('prof-headline').value = this.profile.headline || '';
        document.getElementById('prof-education').value = this.profile.education || '';
        document.getElementById('prof-bio').value = this.profile.bio || '';
    }

    /**
     * 등록된 프로젝트 목록을 렌더링합니다
     */
    renderProjectList() {
        if (!this.adminProjectList) return;

        if (this.projects.length === 0) {
            this.adminProjectList.innerHTML = `
                <p style="color: var(--text-secondary); text-align: center; padding: 2rem;">등록된 프로젝트가 없습니다. 위의 폼에서 신규 작업물을 추가해보세요.</p>
            `;
            return;
        }

        this.adminProjectList.innerHTML = this.projects.map((proj, index) => `
            <div class="admin-project-item">
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
        `).join('');

        // 삭제 버튼 이벤트 연결
        this.adminProjectList.querySelectorAll('.delete-proj-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.dataset.index);
                if (confirm(`'${this.projects[idx].title}' 프로젝트를 삭제하시겠습니까?`)) {
                    this.projects.splice(idx, 1);
                    saveProjectsData(this.projects);
                    this.renderProjectList();
                    showToast('🗑 프로젝트가 성공적으로 삭제되었습니다.');
                }
            });
        });
    }

    /**
     * 탭 전환 및 이벤트 바인딩
     */
    bindEvents() {
        // 1. 탭 전환 이벤트
        this.tabBioBtn.addEventListener('click', () => {
            this.tabBioBtn.classList.add('active');
            this.tabProjectsBtn.classList.remove('active');
            this.panelBio.style.display = 'block';
            this.panelProjects.style.display = 'none';
        });

        this.tabProjectsBtn.addEventListener('click', () => {
            this.tabProjectsBtn.classList.add('active');
            this.tabBioBtn.classList.remove('active');
            this.panelBio.style.display = 'none';
            this.panelProjects.style.display = 'block';
        });

        // 2. 자기소개 폼 저장 이벤트
        this.profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.profile.name = document.getElementById('prof-name').value.trim();
            this.profile.title = document.getElementById('prof-title').value.trim();
            this.profile.headline = document.getElementById('prof-headline').value.trim();
            this.profile.education = document.getElementById('prof-education').value.trim();
            this.profile.bio = document.getElementById('prof-bio').value.trim();

            saveProfileData(this.profile);
            showToast('💾 자기소개 및 프로필 데이터가 LocalStorage에 저장되었습니다!');
        });

        // 3. ➕ 신규 작업물(프로젝트) 추가 폼 처리
        this.newProjectForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const title = document.getElementById('proj-title').value.trim();
            const category = document.getElementById('proj-category').value;
            const summary = document.getElementById('proj-summary').value.trim();
            const period = document.getElementById('proj-period').value.trim();
            const role = document.getElementById('proj-role').value.trim();
            const outcome = document.getElementById('proj-outcome').value.trim();
            const description = document.getElementById('proj-description').value.trim();
            const tagsInput = document.getElementById('proj-tags').value.trim();

            // 이미지 처리: 파일 첨부 우선 ➔ 없으면 URL 사용
            let imageSrc = document.getElementById('proj-image-url').value.trim() || 'assets/images/portfolio_ui_mockup.png';
            const fileInput = document.getElementById('proj-image-file');

            if (fileInput && fileInput.files && fileInput.files[0]) {
                imageSrc = await this.convertFileToBase64(fileInput.files[0]);
            }

            // 카테고리 명칭 매핑
            const categoryNameMap = {
                process: '🧪 반도체 공정',
                circuit: '⚡️ 회로 설계 & 분석',
                coding: '💻 디지털 회로 & 코딩'
            };

            const tagsArray = tagsInput.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`);

            const newProject = {
                id: `proj-${Date.now()}`,
                title,
                category,
                categoryName: categoryNameMap[category] || '기술 프로젝트',
                summary,
                tags: tagsArray,
                image: imageSrc,
                details: {
                    role,
                    period,
                    outcome,
                    description,
                    schematicUrl: imageSrc
                }
            };

            this.projects.unshift(newProject);
            saveProjectsData(this.projects);

            // 폼 초기화 및 렌더링
            this.newProjectForm.reset();
            document.getElementById('proj-image-url').value = 'assets/images/portfolio_ui_mockup.png';
            this.renderProjectList();

            showToast('🎉 새로운 작업물이 등록되고 LocalStorage에 동기화 저장되었습니다!');
        });

        // 4. 로그아웃 버튼
        this.logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('adminSession');
            showToast('🔒 관리자 세션이 종료되었습니다.');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });

        // 5. 기본 데이터로 초기화
        this.resetDefaultBtn.addEventListener('click', () => {
            if (confirm('모든 변경사항을 지우고 기본 샘플 데이터로 되돌리시겠습니까?')) {
                saveProfileData(DEFAULT_PROFILE);
                saveProjectsData(DEFAULT_PROJECTS);
                this.profile = DEFAULT_PROFILE;
                this.projects = DEFAULT_PROJECTS;
                this.populateProfileForm();
                this.renderProjectList();
                showToast('🔄 기본 데이터로 초기화되었습니다.');
            }
        });
    }

    /**
     * 이미지 파일을 Base64/DataURL 문자열로 변환합니다
     * @param {File} file 
     * @returns {Promise<string>}
     */
    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const adminApp = new AdminApp();
    adminApp.init();
});
