/**
 * ==========================================================================
 * LocalMate - EmailJS 이메일 전송 서비스 유틸리티 (emailService.js)
 * EmailJS SDK 로드 및 사용자 문의폼 이메일 자동 발송 처리 모듈
 * ==========================================================================
 */

const EMAILJS_PUBLIC_KEY = (typeof process !== 'undefined' && process.env?.EMAILJS_PUBLIC_KEY) || "KVr1Vfy_3SqF5Pbt0";
const EMAILJS_SERVICE_ID = (typeof process !== 'undefined' && process.env?.EMAILJS_SERVICE_ID) || "service_3v1a6w8";
const EMAILJS_TEMPLATE_ID = (typeof process !== 'undefined' && process.env?.EMAILJS_TEMPLATE_ID) || "template_mm0m86s";


let isSdkLoaded = false;

/**
 * EmailJS SDK CDN 스크립트를 동적으로 로드하고 초기화합니다.
 * @returns {Promise<boolean>}
 */
export async function initEmailJs() {
    if (window.emailjs) {
        if (!isSdkLoaded) {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
            isSdkLoaded = true;
        }
        return true;
    }

    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        script.onload = () => {
            if (window.emailjs) {
                window.emailjs.init(EMAILJS_PUBLIC_KEY);
                isSdkLoaded = true;
                resolve(true);
            } else {
                resolve(false);
            }
        };
        script.onerror = () => {
            console.error('EmailJS SDK 로드 실패');
            resolve(false);
        };
        document.head.appendChild(script);
    });
}

/**
 * 사용자 입력 정보를 바탕으로 EmailJS를 사용하여 이메일을 전송합니다.
 * @param {Object} data 입력폼 데이터
 * @param {string} data.name 작성자 이름
 * @param {string} data.email 작성자 이메일 주소
 * @param {string|number} data.number 작성자 연락처/전화번호
 * @param {string} data.message 메시지 내용
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendContactEmail({ name, email, number, message }) {
    try {
        const loaded = await initEmailJs();
        if (!loaded || !window.emailjs) {
            return {
                success: false,
                message: '이메일 전송 모듈(EmailJS)을 초기화하지 못했습니다. 잠시 후 다시 시도해주세요.'
            };
        }

        const templateParams = {
            name: name,
            email: email,
            number: number,
            message: message
        };

        const response = await window.emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        if (response.status === 200) {
            return {
                success: true,
                message: '문의 메일이 성공적으로 전송되었습니다! 빠르게 답변드리겠습니다.'
            };
        } else {
            return {
                success: false,
                message: `전송 실패 (상태 코드: ${response.status})`
            };
        }
    } catch (error) {
        console.error('EmailJS 전송 오류:', error);
        return {
            success: false,
            message: error.text || error.message || '이메일 전송 중 예기치 않은 오류가 발생했습니다.'
        };
    }
}
