/**
 * ==========================================================================
 * 민경천 포트폴리오 - 공통 헬퍼 유틸리티 (helpers.js)
 * 토스트 알림, 이력서 다운로드 및 관리자 비밀번호 검증 모듈
 * ==========================================================================
 */

let toastTimer = null;

/**
 * 화면 중앙 하단에 토스트 알림 메시지를 표시합니다
 * @param {string} message 표시할 메세지 텍스트
 */
export function showToast(message) {
    const toastEl = document.getElementById('toast');
    const toastMsgEl = document.getElementById('toast-msg');
    if (!toastEl || !toastMsgEl) return;

    toastMsgEl.textContent = message;
    toastEl.classList.remove('hidden');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastEl.classList.add('hidden');
    }, 2500);
}

/**
 * 국문 이력서 PDF 가상 다운로드를 실행합니다
 */
export function downloadResumePDF() {
    showToast('📄 민경천 국문 이력서(PDF) 다운로드가 시작되었습니다!');
    // 가상 다운로드 앵커 트라이
    const link = document.createElement('a');
    link.href = '#';
    link.download = '민경천_반도체_회로_이력서.pdf';
    // 실무 다운로드 연동 시 PDF 레포지토리 URL 지정 가능
}

/**
 * 관리자 인증 암호 검증 함수 (기본 암호: "1234")
 * @param {string} inputPassword 입력된 비밀번호
 * @returns {boolean} 검증 성공 여부
 */
export function verifyAdminPassword(inputPassword) {
    // 실무 보안 연동 시 해시 암호화 또는 Supabase Auth 연동 가능
    const ADMIN_PASS = "1234";
    return inputPassword === ADMIN_PASS;
}
