/**
 * ==========================================================================
 * 민경천 포트폴리오 - 이메일 서비스 유틸리티 (emailService.js)
 * 브라우저에 API Key 노출 없이 서버 API (/api/send-email)를 통해 이메일 발송
 * ==========================================================================
 */

/**
 * 프론트엔드에서 서버 엔드포인트를 호출하여 안전하게 이메일을 발송합니다.
 * @param {Object} data 입력폼 데이터 ({ name, email, number, message })
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendContactEmail({ name, email, number, message }) {
    try {
        // 프론트엔드에서는 API 키 없이 서버 API 엔드포인트만 호출
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, number, message })
        });

        if (response.ok) {
            const resData = await response.json();
            return {
                success: true,
                message: resData.message || '문의 메일이 성공적으로 전송되었습니다!'
            };
        } else {
            const errData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errData.message || `전송 실패 (상태 코드: ${response.status})`
            };
        }
    } catch (error) {
        console.error('Email API 호출 오류:', error);
        return {
            success: false,
            message: '이메일 전송 요청 중 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        };
    }
}
