/**
 * ==========================================================================
 * 민경천 포트폴리오 - 데이터 저장소 유틸리티 (storage.js)
 * Supabase 클라우드 데이터베이스 및 LocalStorage 이중 동기화 관리 모듈
 * ==========================================================================
 */

import { DEFAULT_PROFILE, DEFAULT_PROJECTS } from '../data/defaultData.js';
import { 
    fetchProfileFromSupabase, 
    saveProfileToSupabase, 
    fetchProjectsFromSupabase, 
    saveProjectToSupabase, 
    deleteProjectFromSupabase 
} from './supabaseClient.js';

const STORAGE_KEY_PROFILE = 'mgc_portfolio_profile';
const STORAGE_KEY_PROJECTS = 'mgc_portfolio_projects';

/**
 * 프로필 데이터를 로드합니다 (Supabase DB 우선 조회 ➔ 실패 시 LocalStorage ➔ 최종 기본 데이터)
 * @returns {Promise<Object>} 프로필 데이터 객체
 */
export async function loadProfileDataAsync() {
    // 1. Supabase 데이터베이스 조회 시도
    const dbProfile = await fetchProfileFromSupabase();
    if (dbProfile) {
        // 캐시용으로 LocalStorage에도 저장
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(dbProfile));
        return dbProfile;
    }

    // 2. Supabase 오프라인/테이블 구성 전 시 LocalStorage 활용
    return loadProfileData();
}

/**
 * 로컬스토리지 전용 프로필 데이터 로드
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
 * 프로필 데이터를 Supabase DB와 LocalStorage 모두에 동시 저장합니다
 * @param {Object} profileData 
 */
export async function saveProfileDataAsync(profileData) {
    // LocalStorage 동기화
    saveProfileData(profileData);
    // Supabase DB 동기화
    await saveProfileToSupabase(profileData);
}

export function saveProfileData(profileData) {
    try {
        localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profileData));
        return true;
    } catch (e) {
        console.error("프로필 저장 실패:", e);
        return false;
    }
}

/**
 * 프로젝트 목록 데이터를 로드합니다 (Supabase DB 우선 조회 ➔ 실패 시 LocalStorage)
 * @returns {Promise<Array>} 프로젝트 목록 배열
 */
export async function loadProjectsDataAsync() {
    const dbProjects = await fetchProjectsFromSupabase();
    if (dbProjects && dbProjects.length > 0) {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(dbProjects));
        return dbProjects;
    }

    return loadProjectsData();
}

export function loadProjectsData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
        return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch (e) {
        console.error("프로젝트 데이터 로드 실패:", e);
        return DEFAULT_PROJECTS;
    }
}

/**
 * 프로젝트 단건 또는 전체를 Supabase DB와 LocalStorage에 이중 저장합니다
 * @param {Array} projectsData 
 * @param {Object|null} targetProject 
 */
export async function saveProjectsDataAsync(projectsData, targetProject = null) {
    saveProjectsData(projectsData);

    if (targetProject) {
        await saveProjectToSupabase(targetProject);
    } else {
        // 전체 프로젝트 리스트 Supabase 개별 저장
        for (const proj of projectsData) {
            await saveProjectToSupabase(proj);
        }
    }
}

export function saveProjectsData(projectsData) {
    try {
        localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projectsData));
        return true;
    } catch (e) {
        console.error("프로젝트 목록 저장 실패:", e);
        return false;
    }
}

/**
 * Supabase DB 및 LocalStorage에서 특정 프로젝트 삭제
 * @param {Array} projectsData 
 * @param {string} deletedProjectId 
 */
export async function deleteProjectDataAsync(projectsData, deletedProjectId) {
    saveProjectsData(projectsData);
    if (deletedProjectId) {
        await deleteProjectFromSupabase(deletedProjectId);
    }
}
