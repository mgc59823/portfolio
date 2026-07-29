/**
 * ==========================================================================
 * LocalMate - 호스트 상세 프로필 카드 컴포넌트 (HostProfileCard.js)
 * 호스트 소개, 언어 능력 배지, 매너 점수 및 학생 인증 마크 상세 표현
 * ==========================================================================
 */

export class HostProfileCardComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {Object} props.host 호스트 정보 객체
     * @param {Function} props.onContactHost 호스트에게 메시지 보내기 콜백
     */
    constructor(props = {}) {
        this.host = props.host || {};
        this.onContactHost = props.onContactHost || (() => {});
    }

    /**
     * HostProfileCard DOM 요소를 렌더링합니다.
     * @returns {HTMLElement} 호스트 프로필 카드 DOM
     */
    render() {
        const wrapperEl = document.createElement('div');
        wrapperEl.className = 'glass-surface';
        wrapperEl.style.padding = '1.75rem';

        const {
            name = '김민수',
            university = '연세대학교 컴퓨터공학과',
            isVerified = true,
            avatar = 'assets/images/avatar_placeholder.svg',
            mannerTemp = 37.5,
            nativeLang = '한국어 (Native)',
            learningLang = '영어 (Fluent / Practice)',
            bio = '안녕하세요! 신촌 근처 맛집과 숨은 산책로를 잘 아는 대학생입니다. 실전 영어를 많이 연습하고 싶고, 한국을 찾은 친근한 외국인 친구를 사귀고 싶어요!',
            interests = ['#영어회화', '#맛집탐방', '#사진촬영', '#한강산책']
        } = this.host;

        wrapperEl.innerHTML = `
            <div style="display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 1.25rem;">
                <img src="${avatar}" alt="${name}" style="width: 72px; height: 72px; border-radius: var(--radius-pill); border: 3px solid var(--color-primary-light); object-fit: cover;" />
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">${name}</h3>
                        <span style="font-family: var(--font-code); font-weight: 700; color: var(--color-secondary); font-size: 0.95rem;">
                            🔥 매너온도 ${mannerTemp}°C
                        </span>
                    </div>

                    ${isVerified ? `
                        <div style="margin-top: 0.25rem;">
                            <span class="badge-student-verified">🎓 ${university} 인증 호스트</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- 자기소개 및 언어 배지 -->
            <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
                ${bio}
            </p>

            <!-- 보유 언어 정보 -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background: var(--bg-surface-subtle); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 1.25rem;">
                <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted);">사용 언어 스킬</div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <span class="badge-language">🇰🇷 ${nativeLang}</span>
                    <span class="badge-language" style="border-color: var(--color-primary); color: var(--color-primary);">🇺🇸 ${learningLang}</span>
                </div>
            </div>

            <!-- 관심사 태그 -->
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
                ${interests.map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
            </div>

            <!-- 액션 버튼 -->
            <button id="profile-contact-btn" class="btn btn-outline btn-md" style="width: 100%;">
                💬 ${name} 호스트에게 1:1 질문하기
            </button>
        `;

        const contactBtn = wrapperEl.querySelector('#profile-contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => this.onContactHost(this.host));
        }

        return wrapperEl;
    }
}
