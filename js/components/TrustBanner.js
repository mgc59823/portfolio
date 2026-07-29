/**
 * ==========================================================================
 * LocalMate - 신뢰 시스템 안내 섹션 컴포넌트 (TrustBanner.js)
 * 대학교 웹메일(.ac.kr) 인증을 통한 안전 매칭 3단계 설명 가이드
 * ==========================================================================
 */

export class TrustBannerComponent {
    /**
     * TrustBanner 컴포넌트를 렌더링합니다.
     * @returns {HTMLElement} 신뢰 시스템 영역 DOM
     */
    render() {
        const sectionEl = document.createElement('section');
        sectionEl.style.cssText = `
            padding: 3.5rem 0;
            background: linear-gradient(180deg, transparent 0%, rgba(13, 148, 136, 0.04) 100%);
        `;

        sectionEl.innerHTML = `
            <div class="container">
                <div style="text-align: center; max-width: 640px; margin: 0 auto 2.5rem auto;">
                    <span class="badge-student-verified" style="margin-bottom: 0.75rem;">
                        🎓 Safety & Trust First
                    </span>
                    <h2 style="font-family: var(--font-main); font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
                        모르는 사람과의 만남, <span style="color: var(--color-primary);">안전이 생명</span>입니다.
                    </h2>
                    <p style="font-size: 0.95rem; color: var(--text-secondary);">
                        LocalMate는 대학교 공식 웹메일 인증 절차를 거친 호스트에게 '대학생 인증 마크'를 부여하여 누구나 안심하고 문화와 언어를 공유할 수 있습니다.
                    </p>
                </div>

                <!-- 3단계 신뢰 검증 절차 카드 그리드 -->
                <div class="grid-3">
                    <div class="glass-surface" style="padding: 1.75rem; display: flex; flex-direction: column; gap: 0.85rem;">
                        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: #EFF6FF; color: var(--color-accent-blue); display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800;">
                            1
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">
                            🎓 대학생 이메일 인증 (.ac.kr)
                        </h3>
                        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
                            학교 공식 웹메일로 발송되는 6자리 OTP 번호를 입력하여 재학생 신원을 100% 실명 검증합니다.
                        </p>
                    </div>

                    <div class="glass-surface" style="padding: 1.75rem; display: flex; flex-direction: column; gap: 0.85rem;">
                        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800;">
                            2
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">
                            🗣️ 언어 능력 & 프로필 공개
                        </h3>
                        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
                            모국어와 배우고 싶은 언어, 관심사를 사전에 투명하게 확인하고 매칭을 선택할 수 있습니다.
                        </p>
                    </div>

                    <div class="glass-surface" style="padding: 1.75rem; display: flex; flex-direction: column; gap: 0.85rem;">
                        <div style="width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-secondary-light); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800;">
                            3
                        </div>
                        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">
                            ⭐ 상호 매너 온도 & 리뷰
                        </h3>
                        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
                            투어가 끝난 후 작성된 서로의 후기와 매너 점수가 프로필에 기록되어 지속 가능한 클린 커뮤니티를 만듭니다.
                        </p>
                    </div>
                </div>
            </div>
        `;

        return sectionEl;
    }
}
