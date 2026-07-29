/**
 * ==========================================================================
 * LocalMate - 연락폼 UI 컴포넌트 (ContactForm.js)
 * 이름, 이메일, 연락처, 메시지 입력 및 EmailJS 연동 전송 컴포넌트
 * ==========================================================================
 */

import { sendContactEmail } from '../utils/emailService.js';
import { showToast } from '../utils/common.js';

export class ContactFormComponent {
    /**
     * @param {Object} props
     * @param {Function} [props.onSuccess] 전송 성공 후 콜백
     */
    constructor(props = {}) {
        this.onSuccess = props.onSuccess || (() => {});
        this.isLoading = false;
    }

    /**
     * ContactForm HTML 요소를 생성하고 이벤트 핸들러를 바인딩합니다.
     * @returns {HTMLElement}
     */
    render() {
        const containerEl = document.createElement('div');
        containerEl.className = 'contact-card';

        containerEl.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: rgba(13, 148, 136, 0.1); color: var(--color-primary); border-radius: var(--radius-pill); font-size: 1.6rem; margin-bottom: 1rem;">
                    ✉️
                </div>
                <h2 style="font-family: var(--font-main); font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
                    문의 및 <span style="color: var(--color-primary);">메시지 보내기</span>
                </h2>
                <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5;">
                    궁금한 점이나 협업 문의 사항을 남겨주시면 <strong style="color: var(--color-primary);">mgc59823@gmail.com</strong>으로 바로 전달됩니다.
                </p>
            </div>

            <form id="contact-form" novalidate>
                <!-- 1. 이름 (name) -->
                <div class="form-group">
                    <label for="contact-name" class="form-label">
                        <span>성함 / 이름</span>
                        <span class="required-star">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="contact-name" 
                        name="name" 
                        class="form-input" 
                        placeholder="예: 민경천" 
                        required 
                    />
                </div>

                <!-- 2. 이메일 주소 (email) -->
                <div class="form-group">
                    <label for="contact-email" class="form-label">
                        <span>이메일 주소</span>
                        <span class="required-star">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="contact-email" 
                        name="email" 
                        class="form-input" 
                        placeholder="예: mgc59823@gmail.com" 
                        required 
                    />
                </div>

                <!-- 3. 연락처 / 전화번호 (number) -->
                <div class="form-group">
                    <label for="contact-number" class="form-label">
                        <span>연락처 (전화번호)</span>
                        <span class="required-star">*</span>
                    </label>
                    <input 
                        type="tel" 
                        id="contact-number" 
                        name="number" 
                        class="form-input" 
                        placeholder="예: 01012345678" 
                        required 
                    />
                </div>

                <!-- 4. 메시지 내용 (message) -->
                <div class="form-group">
                    <label for="contact-message" class="form-label">
                        <span>문의 메시지 내용</span>
                        <span class="required-star">*</span>
                    </label>
                    <textarea 
                        id="contact-message" 
                        name="message" 
                        class="form-textarea" 
                        placeholder="문의하실 내용을 자유롭게 작성해주세요." 
                        required
                    ></textarea>
                </div>

                <!-- 피드백 메시지 박스 -->
                <div id="contact-feedback" style="display: none; margin-bottom: 1.25rem; padding: 0.85rem 1rem; border-radius: var(--radius-md); font-size: 0.9rem; font-weight: 500;"></div>

                <!-- 5. 전송 버튼 -->
                <button type="submit" id="btn-submit-email" class="btn btn-primary btn-lg" style="width: 100%; font-size: 1.05rem;">
                    <span id="btn-text">🚀 이메일 보내기</span>
                </button>
            </form>
        `;

        const formEl = containerEl.querySelector('#contact-form');
        const feedbackEl = containerEl.querySelector('#contact-feedback');
        const submitBtn = containerEl.querySelector('#btn-submit-email');
        const submitText = containerEl.querySelector('#btn-text');

        formEl.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = containerEl.querySelector('#contact-name');
            const emailInput = containerEl.querySelector('#contact-email');
            const numberInput = containerEl.querySelector('#contact-number');
            const messageInput = containerEl.querySelector('#contact-message');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const number = numberInput.value.trim();
            const message = messageInput.value.trim();

            // 유효성 검사
            if (!name) {
                this.showFeedback(feedbackEl, 'error', '⚠️ 성함을 입력해 주세요.');
                nameInput.focus();
                return;
            }

            if (!email || !this.validateEmail(email)) {
                this.showFeedback(feedbackEl, 'error', '⚠️ 올바른 이메일 주소를 입력해 주세요.');
                emailInput.focus();
                return;
            }

            if (!number) {
                this.showFeedback(feedbackEl, 'error', '⚠️ 연락처(전화번호)를 입력해 주세요.');
                numberInput.focus();
                return;
            }

            if (!message) {
                this.showFeedback(feedbackEl, 'error', '⚠️ 문의 메시지 내용을 작성해 주세요.');
                messageInput.focus();
                return;
            }

            // 로딩 상태 전환
            this.setLoading(submitBtn, submitText, feedbackEl, true);

            // EmailJS 전송 함수 호출
            const result = await sendContactEmail({ name, email, number, message });

            // 로딩 상태 해제
            this.setLoading(submitBtn, submitText, feedbackEl, false);

            if (result.success) {
                this.showFeedback(feedbackEl, 'success', `🎉 ${result.message}`);
                showToast('🎉 문의 이메일이 성공적으로 보내졌습니다!');
                formEl.reset();
                this.onSuccess({ name, email, number, message });
            } else {
                this.showFeedback(feedbackEl, 'error', `❌ ${result.message}`);
                showToast('❌ 이메일 전송에 실패했습니다. 다시 시도해 주세요.');
            }
        });

        return containerEl;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showFeedback(element, type, msg) {
        if (!element) return;
        element.style.display = 'block';
        if (type === 'error') {
            element.style.background = 'rgba(239, 68, 68, 0.1)';
            element.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            element.style.color = '#DC2626';
        } else {
            element.style.background = 'rgba(16, 185, 129, 0.1)';
            element.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            element.style.color = '#059669';
        }
        element.textContent = msg;
    }

    setLoading(buttonEl, textEl, feedbackEl, isLoading) {
        this.isLoading = isLoading;
        if (isLoading) {
            buttonEl.classList.add('btn-submit-loading');
            buttonEl.disabled = true;
            textEl.innerHTML = '<span class="spinner-icon"></span> 전송 중...';
            if (feedbackEl) feedbackEl.style.display = 'none';
        } else {
            buttonEl.classList.remove('btn-submit-loading');
            buttonEl.disabled = false;
            textEl.innerHTML = '🚀 이메일 보내기';
        }
    }
}
