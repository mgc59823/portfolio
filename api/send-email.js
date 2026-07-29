/**
 * ==========================================================================
 * Vercel Serverless Function - 이메일 전송 백엔드 API (/api/send-email)
 * API 키가 브라우저에 노출되지 않도록 서버 측에서 EmailJS REST API를 호출함
 * 기존 환경변수 Key 명칭 사용: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY
 * ==========================================================================
 */

export default async function handler(req, res) {
    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { name, email, number, message } = body || {};

        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: '필수 입력 항목이 누락되었습니다.' });
        }

        // Vercel 서버 환경 변수 참조 (기존 Key 명칭 유지)
        const serviceId = process.env.EMAILJS_SERVICE_ID || "service_3v1a6w8";
        const templateId = process.env.EMAILJS_TEMPLATE_ID || "template_mm0m86s";
        const publicKey = process.env.EMAILJS_PUBLIC_KEY || "KVr1Vfy_3SqF5Pbt0";

        // 서버에서 EmailJS REST API 직접 호출
        const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                service_id: serviceId,
                template_id: templateId,
                user_id: publicKey,
                template_params: {
                    name,
                    email,
                    number: number || '',
                    message
                }
            })
        });

        if (emailJsResponse.ok) {
            return res.status(200).json({
                success: true,
                message: '문의 메일이 성공적으로 전송되었습니다! 빠르게 답변드리겠습니다.'
            });
        } else {
            const errorText = await emailJsResponse.text();
            console.error('Server EmailJS Error:', errorText);
            return res.status(emailJsResponse.status).json({
                success: false,
                message: `이메일 전송 처리 실패 (${emailJsResponse.status})`
            });
        }
    } catch (error) {
        console.error('Server Handler Error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || '서버 내부 오류가 발생했습니다.'
        });
    }
}
