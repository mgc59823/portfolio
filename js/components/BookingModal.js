/**
 * ==========================================================================
 * LocalMate - 매칭 신청 및 예약 레이어 모달 컴포넌트 (BookingModal.js)
 * 투어 신청 날짜 선택, 방문 목적, 원하는 대화 주제 및 호스트 메시지 작성 모달
 * ==========================================================================
 */

export class BookingModalComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {Object} props.course 선택된 투어 코스 객체
     * @param {Function} props.onClose 모달 닫기 콜백
     * @param {Function} props.onSubmitBooking 매칭 신청 완료 콜백
     */
    constructor(props = {}) {
        this.course = props.course || null;
        this.onClose = props.onClose || (() => {});
        this.onSubmitBooking = props.onSubmitBooking || (() => {});
    }

    /**
     * BookingModal DOM 요소를 생성합니다.
     * @returns {HTMLElement|null} 모달 DOM (course가 없는 경우 null)
     */
    render() {
        if (!this.course) return null;

        const backdropEl = document.createElement('div');
        backdropEl.className = 'modal-backdrop';

        const {
            title = '로컬 코스 매칭 신청',
            hostName = '김민수',
            hostUniversity = '연세대학교',
            location = '신촌/홍대'
        } = this.course;

        backdropEl.innerHTML = `
            <div class="modal-content">
                <button class="modal-close-btn" id="modal-close" aria-label="모달 닫기">✕</button>

                <div style="margin-bottom: 1.5rem;">
                    <span class="badge-student-verified" style="margin-bottom: 0.5rem;">
                        🎓 ${hostUniversity} ${hostName} 호스트
                    </span>
                    <h3 style="font-size: 1.35rem; font-weight: 700; color: var(--text-primary);">
                        '${title}' 매칭 신청하기
                    </h3>
                    <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.25rem;">
                        📍 장소: ${location} | 🤝 일방적 가이드가 아닌 윈윈 언어교환 매칭입니다.
                    </p>
                </div>

                <!-- 매칭 신청 입력 폼 -->
                <form id="booking-form">
                    <div class="form-group">
                        <label class="form-label" for="booking-date">📅 희망 만남 날짜 선택</label>
                        <input type="date" id="booking-date" class="form-input" required value="2026-08-01" />
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="booking-lang">🗣️ 주로 사용할 교환 언어</label>
                        <select id="booking-lang" class="form-input">
                            <option value="en-ko">영어 50% + 한국어 50% (추천)</option>
                            <option value="en">영어 대화 위주 (English Only)</option>
                            <option value="ko">한국어 대화 위주 (Korean Only)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="booking-msg">✉️ 호스트에게 전할 인사말 & 대화 주제</label>
                        <textarea id="booking-msg" class="form-textarea" rows="4" required placeholder="예: 안녕하세요! 미국에서 한국으로 온 교환학생 Sarah입니다. 신촌 근처 맛집도 가보고 한국 대학생 문화에 대해 영어/한국어로 즐겁게 이야기 나누고 싶어요!"></textarea>
                    </div>

                    <div style="display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.75rem;">
                        <button type="button" class="btn btn-outline btn-md" id="booking-cancel-btn">
                            취소
                        </button>
                        <button type="submit" class="btn btn-primary btn-md">
                            🚀 매칭 신청서 전송하기
                        </button>
                    </div>
                </form>
            </div>
        `;

        // 닫기 버튼 이벤트
        backdropEl.querySelector('#modal-close').addEventListener('click', () => this.onClose());
        backdropEl.querySelector('#booking-cancel-btn').addEventListener('click', () => this.onClose());

        // 배경 클릭 시 닫기
        backdropEl.addEventListener('click', (e) => {
            if (e.target === backdropEl) this.onClose();
        });

        // 폼 제출 이벤트
        const formEl = backdropEl.querySelector('#booking-form');
        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const date = backdropEl.querySelector('#booking-date').value;
            const lang = backdropEl.querySelector('#booking-lang').value;
            const msg = backdropEl.querySelector('#booking-msg').value;

            this.onSubmitBooking({
                courseId: this.course.id,
                date,
                lang,
                message: msg
            });
        });

        return backdropEl;
    }
}
