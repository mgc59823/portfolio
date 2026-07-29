/**
 * ==========================================================================
 * 민경천 포트폴리오 - 데이터 저장소 유틸리티 (storage.js)
 * LocalStorage 및 Supabase DB 데이터를 관리하는 모듈
 * ==========================================================================
 */

import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from '../data/defaultData.js';

const STORAGE_KEY_PROFILE = 'mgc_portfolio_profile';
const STORAGE_KEY_PROJECTS = 'mgc_portfolio_projects_v4';

// 구버전 캐시 전면 정리
try {
    localStorage.removeItem('mgc_portfolio_projects');
    localStorage.removeItem('mgc_portfolio_projects_v2');
    localStorage.removeItem('mgc_portfolio_projects_v3');
} catch (e) {}

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
 * 프로젝트 목록 데이터를 로드합니다 (1번 카드는 성향 테스트로 100% 강제 고정)
 * @returns {Array} 프로젝트 데이터 배열
 */
export function loadProjectsData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
        let projects = saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
        
        if (!Array.isArray(projects) || projects.length === 0) {
            projects = DEFAULT_PROJECTS;
        }

        // 첫 번째 카드는 무조건 최신 DEFAULT_PROJECTS[0] (창업 성향 테스트)로 덮어쓰기
        projects[0] = DEFAULT_PROJECTS[0];

        saveProjectsData(projects);
        return projects;
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
