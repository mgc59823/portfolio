/**
 * ==========================================================================
 * 민경천 포트폴리오 - 데이터 저장소 유틸리티 (storage.js)
 * LocalStorage 및 Supabase DB 데이터를 관리하는 모듈
 * ==========================================================================
 */

import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from '../data/defaultData.js';

const STORAGE_KEY_PROFILE = 'mgc_portfolio_profile';
const STORAGE_KEY_PROJECTS = 'mgc_portfolio_projects_v5'; // v5 버전으로 업데이트하여 구버전 브라우저 캐시 전면 갱신

// 구버전 브라우저 캐시 전면 자동 삭제
try {
    localStorage.removeItem('mgc_portfolio_projects');
    localStorage.removeItem('mgc_portfolio_projects_v2');
    localStorage.removeItem('mgc_portfolio_projects_v3');
    localStorage.removeItem('mgc_portfolio_projects_v4');
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
 * 프로젝트 목록 데이터를 로드합니다 (항상 최신 DEFAULT_PROJECTS 갱신 보장)
 * @returns {Array} 프로젝트 데이터 배열
 */
export function loadProjectsData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
        let projects = saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
        
        if (!Array.isArray(projects) || projects.length < DEFAULT_PROJECTS.length) {
            projects = DEFAULT_PROJECTS;
        }

        // 1번(창업성향) 및 2번(안구건조증) 프로젝트 최신화 보장
        projects[0] = DEFAULT_PROJECTS[0];
        projects[1] = DEFAULT_PROJECTS[1];

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
