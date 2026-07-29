/**
 * ==========================================================================
 * 민경천 포트폴리오 - 이메일 연락폼 컴포넌트 (ContactForm.js)
 * 이름, 이메일, 연락처, 문의 메시지 입력 및 EmailJS 자동 전송 기능
 * [강력한 4중 스팸 방지 보안 시스템 적용]
 * 1. 무작위 산술 캡차 퀴즈 (Math Captcha - 예: 7 + 5 = ?)
 * 2. 전송 즉시 적용되는 3분(180초) 쿨다운 타임아웃
 * 3. 동일 메시지 / 이메일 중복 제출 즉시 차단
 * 4. Honeypot 숨김 봇 트랩 필드
 * ==========================================================================
 */

import { sendContactEmail } from '../utils/emailService.js';
import { showToast } from '../utils/helpers.js';

export class ContactFormComponent {
    constructor(props = {}) {
        this.onSuccess = props.onSuccess || (() => {});
        this.num1 = Math.floor(Math.random() * 9) + 1;
        this.num2 = Math.floor(Math.random() * 9) + 1;
        this.captchaAnswer = this.num1 + this.num2;
        this.formRenderTime = Date.now();
    }

    render() {
        this.formRenderTime = Date.now();
        // 새로운 랜덤 퀴즈 생성
        this.num1 = Math.floor(Math.random() * 9) + 1;
        this.num2 = Math.floor(Math.random() * 9) + 1;
        this.captchaAnswer = this.num1 + this.num2;

        return `
            <section id="contact" class="contact-section" style="padding: 4rem 0; position: relative;">
                <div class="container">
                    <div style="max-width: 680px; margin: 0 auto; background: rgba(20, 26, 48, 0.75); backdrop-filter: blur(16px); border: 1px solid var(--border-glass); border-radius: var(--radius-xl); padding: 2.5rem 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                        <div style="text-align: center; margin-bottom: 2rem;">
                            <span class="tag-chip" style="margin-bottom: 0.5rem; display: inline-block;">✉️ Direct Contact</span>
                            <h2 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
                                엔지니어 민경천에게 <span style="color: var(--color-gold-primary);">문의하기</span>
                            </h2>
                            <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
                                프로젝트 의뢰, 채용 및 기타 문의사항을 남겨주시면 <strong style="color: var(--color-gold-primary);">mgc59823@gmail.com</strong>으로 직통 전송됩니다.
                            </p>
                        </div>

                        <form id="contact-form" novalidate>
                            <!-- 🛡️ 1. 스팸 방지용 Honeypot 필드 (보이지 않는 봇 트랩) -->
                            <div style="display: none !important; opacity: 0; position: absolute; left: -9999px;" aria-hidden="true">
                                <input type="text" id="hp_website" name="hp_website" tabindex="-1" autocomplete="off" />
                            </div>

                            <!-- 1. 성함 / 이름 -->
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <label for="contact-name" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                                    성함 / 이름 <span style="color: var(--color-gold-primary);">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="contact-name" 
                                    name="name" 
                                    class="form-control" 
                                    placeholder="예: 민경천" 
                                    style="width: 100%; padding: 0.8rem 1rem; background: rgba(11, 14, 27, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem; outline: none;"
                                    required 
                                />
                            </div>

                            <!-- 2. 이메일 주소 -->
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <label for="contact-email" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                                    이메일 주소 <span style="color: var(--color-gold-primary);">*</span>
                                </label>
                                <input 
                                    type="email" 
                                    id="contact-email" 
                                    name="email" 
                                    class="form-control" 
                                    placeholder="예: mgc59823@gmail.com" 
                                    style="width: 100%; padding: 0.8rem 1rem; background: rgba(11, 14, 27, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem; outline: none;"
                                    required 
                                />
                            </div>

                            <!-- 3. 연락처 (전화번호) -->
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <label for="contact-number" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                                    연락처 (전화번호) <span style="color: var(--color-gold-primary);">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    id="contact-number" 
                                    name="number" 
                                    class="form-control" 
                                    placeholder="예: 01012345678" 
                                    style="width: 100%; padding: 0.8rem 1rem; background: rgba(11, 14, 27, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem; outline: none;"
                                    required 
                                />
                            </div>

                            <!-- 4. 메시지 내용 -->
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <label for="contact-message" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.4rem;">
                                    문의 메시지 내용 <span style="color: var(--color-gold-primary);">*</span>
                                </label>
                                <textarea 
                                    id="contact-message" 
                                    name="message" 
                                    rows="4"
                                    placeholder="문의하실 내용을 자유롭게 입력해 주세요 (최소 5자 이상)." 
                                    style="width: 100%; padding: 0.8rem 1rem; background: rgba(11, 14, 27, 0.6); border: 1px solid var(--border-glass); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem; outline: none; resize: vertical;"
                                    required
                                ></textarea>
                            </div>

                            <!-- 🛡️ 2. 보안 퀴즈 (Math Captcha) -->
                            <div class="form-group" style="margin-bottom: 1.5rem; background: rgba(13, 148, 136, 0.1); border: 1px dashed var(--color-primary); padding: 1rem; border-radius: var(--radius-md);">
                                <label for="contact-captcha" style="display: block; font-size: 0.9rem; font-weight: 700; color: var(--color-gold-primary); margin-bottom: 0.4rem;">
                                    🔒 스팸 방지 보안 퀴즈: <span style="color: var(--text-primary);">${this.num1} + ${this.num2} = ?</span> <span style="color: var(--color-gold-primary);">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="contact-captcha" 
                                    name="captcha" 
                                    class="form-control" 
                                    placeholder="정답 숫자를 입력하세요" 
                                    style="width: 100%; padding: 0.7rem 1rem; background: rgba(11, 14, 27, 0.8); border: 1px solid var(--border-glass); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.95rem; outline: none;"
                                    required 
                                />
                            </div>

                            <!-- 피드백 메시지 -->
                            <div id="contact-feedback" style="display: none; margin-bottom: 1.25rem; padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.9rem;"></div>

                            <!-- 이메일 보내기 버튼 -->
                            <button type="submit" id="btn-submit-email" class="btn btn-primary btn-lg" style="width: 100%; font-size: 1rem; font-weight: 700; cursor: pointer;">
                                <span id="btn-text"><i class="fa-solid fa-paper-plane"></i> 이메일 보내기</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    bindEvents(containerEl) {
        const formEl = containerEl.querySelector('#contact-form');
        if (!formEl) return;

        const feedbackEl = containerEl.querySelector('#contact-feedback');
        const submitBtn = containerEl.querySelector('#btn-submit-email');
        const submitText = containerEl.querySelector('#btn-text');

        formEl.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Honeypot 봇 감지
            const honeypotInput = containerEl.querySelector('#hp_website');
            if (honeypotInput && honeypotInput.value.trim() !== '') {
                this.showFeedback(feedbackEl, false, '⚠️ 스팸 비정상 접근이 감지되었습니다.');
                return;
            }

            // 2. 3분(180초) 쿨다운 검증 (전송 시도만 해도 쿨다운 시간 체크)
            const lastSent = localStorage.getItem('mgc_contact_last_sent');
            const cooldownSeconds = 180; // 3분
            if (lastSent) {
                const elapsed = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
                if (elapsed < cooldownSeconds) {
                    const remain = cooldownSeconds - elapsed;
                    this.showFeedback(feedbackEl, false, `⏱️ 스팸 방지를 위해 연속 전송이 제한됩니다. ${remain}초 후에 다시 시도해 주세요.`);
                    return;
                }
            }

            const nameInput = containerEl.querySelector('#contact-name');
            const emailInput = containerEl.querySelector('#contact-email');
            const numberInput = containerEl.querySelector('#contact-number');
            const messageInput = containerEl.querySelector('#contact-message');
            const captchaInput = containerEl.querySelector('#contact-captcha');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const number = numberInput.value.trim();
            const message = messageInput.value.trim();
            const captchaVal = captchaInput ? parseInt(captchaInput.value.trim(), 10) : NaN;

            if (!name) {
                this.showFeedback(feedbackEl, false, '⚠️ 성함을 입력해 주세요.');
                nameInput.focus();
                return;
            }

            if (!email || !this.validateEmail(email)) {
                this.showFeedback(feedbackEl, false, '⚠️ 올바른 이메일 주소를 입력해 주세요.');
                emailInput.focus();
                return;
            }

            if (!number) {
                this.showFeedback(feedbackEl, false, '⚠️ 연락처(전화번호)를 입력해 주세요.');
                numberInput.focus();
                return;
            }

            if (!message || message.length < 5) {
                this.showFeedback(feedbackEl, false, '⚠️ 메시지 내용을 5자 이상 입력해 주세요.');
                messageInput.focus();
                return;
            }

            // 3. 보안 퀴즈(Math Captcha) 정답 검증
            if (isNaN(captchaVal) || captchaVal !== this.captchaAnswer) {
                this.showFeedback(feedbackEl, false, `❌ 보안 퀴즈 정답이 올바르지 않습니다. (${this.num1} + ${this.num2} 계산값 입력 필요)`);
                if (captchaInput) captchaInput.focus();
                return;
            }

            // 4. 동일 메시지 중복 제출 검증
            const lastMsg = localStorage.getItem('mgc_contact_last_msg');
            if (lastMsg && lastMsg === `${email}_${message}`) {
                this.showFeedback(feedbackEl, false, '⚠️ 동일한 내용의 문의가 이미 전송되었습니다.');
                return;
            }

            // 제출 시도 즉시 쿨다운 타임스탬프 저장 (연쇄 클릭 방지)
            localStorage.setItem('mgc_contact_last_sent', Date.now().toString());

            // 로딩 상태 전환
            submitBtn.disabled = true;
            submitText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 전송 중...';
            if (feedbackEl) feedbackEl.style.display = 'none';

            const result = await sendContactEmail({ name, email, number, message });

            submitBtn.disabled = false;
            submitText.innerHTML = '<i class="fa-solid fa-paper-plane"></i> 이메일 보내기';

            if (result.success) {
                // 성공 시 메시지 캐시 저장
                localStorage.setItem('mgc_contact_last_msg', `${email}_${message}`);

                this.showFeedback(feedbackEl, true, `🎉 ${result.message}`);
                showToast('🎉 문의 이메일이 성공적으로 전송되었습니다!');
                formEl.reset();
                this.onSuccess({ name, email, number, message });
            } else {
                this.showFeedback(feedbackEl, false, `❌ ${result.message}`);
                showToast('❌ 이메일 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
            }
        });
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    showFeedback(element, isSuccess, msg) {
        if (!element) return;
        element.style.display = 'block';
        element.style.background = isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
        element.style.border = isSuccess ? '1px solid #10B981' : '1px solid #EF4444';
        element.style.color = isSuccess ? '#34D399' : '#F87171';
        element.textContent = msg;
    }
}
