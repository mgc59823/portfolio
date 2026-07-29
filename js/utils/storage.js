/**
 * ==========================================================================
 * 민경천 포트폴리오 - 데이터 저장소 유틸리티 (storage.js)
 * LocalStorage 및 Supabase DB 데이터를 관리하는 모듈
 * ==========================================================================
 */

import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from '../data/defaultData.js';

const STORAGE_KEY_PROFILE = 'mgc_portfolio_profile';
const STORAGE_KEY_PROJECTS = 'mgc_portfolio_projects';

/**
 * 프로필 데이터를 로드합니다 (LocalStorage 선조회 후 없으면 기본값 반환)
 * @returns {Object} 프로필 데이터 객체
 */
export function loadProfileData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
        return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch (e) {
        console.error("프로필 데이터 로드 중 오류 발생:", e);
        return DEFAULT_PROFILE;
    }
}

/**
 * 변경된 프로필 데이터를 저장합니다
 * @param {Object} profileData 저장할 프로필 객체
 */
export function saveProfileData(profileData) {
    try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileData));
        return true;
    } catch (e) {
        console.error("프로필 데이터 저장 중 오류 발생:", e);
        return false;
    }
}

/**
 * 프로젝트 목록 데이터를 로드합니다
 * @returns {Array} 프로젝트 데이터 배열
 */
export function loadProjectsData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
        if (saved) {
            const projects = JSON.parse(saved);
            // proj-1이 구 버전 데이터이거나 externalUrl이 없으면 최신 DEFAULT_PROJECTS[0]으로 마이그레이션
            const proj1Index = projects.findIndex(p => p.id === 'proj-1');
            if (proj1Index !== -1 && (!projects[proj1Index].externalUrl || projects[proj1Index].title.includes('Verilog'))) {
                projects[proj1Index] = DEFAULT_PROJECTS[0];
                saveProjectsData(projects);
            }
            return projects;
        }
        return DEFAULT_PROJECTS;
    } catch (e) {
        console.error("프로젝트 데이터 로드 중 오류 발생:", e);
        return DEFAULT_PROJECTS;
    }
}


/**
 * 프로젝트 목록 데이터를 저장합니다
 * @param {Array} projectsData 저장할 프로젝트 배열
 */
export function saveProjectsData(projectsData) {
    try {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projectsData));
        return true;
    } catch (e) {
        console.error("프로젝트 데이터 저장 중 오류 발생:", e);
        return false;
    }
}
