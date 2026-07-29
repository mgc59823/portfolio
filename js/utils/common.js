/**
 * ==========================================================================
 * 민경천 포트폴리오 - 통합 공통 유틸리티 모듈 (common.js)
 * HTML 이스케이프, 토스트 메시지, 날짜 포맷팅, 암호 검증 등 공통 기능 집약
 * ==========================================================================
 */

export { showToast, downloadResumePDF, verifyAdminPassword } from './helpers.js';
export { 
  loadProfileData, 
  saveProfileData, 
  loadProfileDataAsync, 
  saveProfileDataAsync,
  loadProjectsData,
  loadProjectsDataAsync,
  saveProjectsDataAsync,
  deleteProjectDataAsync
} from './storage.js';
export { initSupabase, getSupabaseClient } from './supabaseClient.js';

/**
 * XSS 공격 방지를 위한 HTML 이스케이프 공통 처리 함수
 * @param {string} str 안전하게 변환할 문자열
 * @returns {string} 이스케이프된 문자열
 */
export function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * 날짜 문자열을 읽기 쉬운 한국어 표준 연월일로 변환
 * @param {string|Date} dateInput 날짜 값
 * @returns {string} 예: "2026년 7월 29일"
 */
export function formatDateKorean(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
