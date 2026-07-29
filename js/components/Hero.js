/**
 * ==========================================================================
 * LocalMate - 메인 히어로 섹션 컴포넌트 (Hero.js)
 * 대문 헤드라인, 윈윈 가치 강조 및 호스트/탐색 메인 CTA 버튼
 * ==========================================================================
 */

export class HeroComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {Function} props.onExploreClick 로컬 코스 탐색 버튼 클릭 이벤트
     * @param {Function} props.onHostClick 호스트 등록하기 버튼 클릭 이벤트
     */
    constructor(props = {}) {
        this.onExploreClick = props.onExploreClick || (() => {});
        this.onHostClick = props.onHostClick || (() => {});
    }

    /**
     * Hero 섹션 HTML 요소를 생성합니다.
     * @returns {HTMLElement} 히어로 영역 DOM
     */
    render() {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'hero-section';
        sectionEl.style.cssText = `
            padding: 4rem 0 3rem 0;
            position: relative;
            overflow: hidden;
        `;

        sectionEl.innerHTML = `
            <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
                <!-- 좌측 타이포그래피 및 행동 유도 텍스트 -->
                <div class="hero-text-content" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: inline-flex; align-items: center; gap: 0.5rem; width: fit-content;" class="badge-student-verified">
                        ✨ 100% C2C 상호보완 윈윈(Win-Win) 커뮤니티
                    </div>
                    
                    <h1 style="font-family: var(--font-heading); font-size: 2.75rem; font-weight: 800; line-height: 1.25; color: var(--text-primary);">
                        뻔한 관광 대신,<br/>
                        <span style="color: var(--color-primary);">진짜 로컬 친구</span>와<br/>
                        일상을 나누세요.
                    </h1>

                    <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; max-width: 500px;">
                        한국 대학생의 <strong>실전 영어 회화 연습</strong>과 외국인 여행자의 <strong>'찐' 로컬 투어 체험</strong>을 연결하는 안전하고 스마트한 상호 교환 매칭 플랫폼입니다.
                    </p>

                    <!-- 메인 행동 유도 (CTA) 버튼 스케일 -->
                    <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.75rem;">
                        <button id="hero-cta-explore" class="btn btn-primary btn-lg">
                            🔍 로컬 코스 둘러보기
                        </button>
                        <button id="hero-cta-host" class="btn btn-outline btn-lg">
                            🤝 내 일상 소개해보기
                        </button>
                    </div>

                    <!-- 실시간 커뮤니티 트러스트 통계 수치 -->
                    <div style="display: flex; gap: 2rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
                        <div>
                            <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--color-primary);">
                                🎓 1,240+명
                            </div>
                            <div style="font-size: 0.82rem; color: var(--text-muted);">
                                인증된 대학생 호스트
                            </div>
                        </div>
                        <div>
                            <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--color-secondary);">
                                🌟 98.4%
                            </div>
                            <div style="font-size: 0.82rem; color: var(--text-muted);">
                                상호 매칭 만족도
                            </div>
                        </div>
                        <div>
                            <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--color-accent-blue);">
                                💬 3,500+회
                            </div>
                            <div style="font-size: 0.82rem; color: var(--text-muted);">
                                언어 교환 세션 완료
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 우측 서비스 가치 시각화 히어로 배너 이미지 -->
                <div class="hero-visual" style="position: relative;">
                    <div class="glass-surface" style="padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-hover);">
                        <img src="assets/images/portfolio_ui_mockup.png" alt="LocalMate App Preview" style="width: 100%; border-radius: var(--radius-md); object-fit: cover;" />
                        
                        <!-- 둥근 플로팅 하이라이트 뱃지 -->
                        <div style="position: absolute; bottom: -1rem; left: -1rem; background: var(--bg-surface-solid); padding: 0.75rem 1.25rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-card); border: 1px solid var(--border-glass); display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.5rem;">🌸</span>
                            <div>
                                <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">인기 코스 추천</div>
                                <div style="font-size: 0.78rem; color: var(--text-muted);">"동네 숨은 벚꽃길 산책"</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // CTA 버튼 클릭 이벤트 바인딩
        sectionEl.querySelector('#hero-cta-explore').addEventListener('click', () => this.onExploreClick());
        sectionEl.querySelector('#hero-cta-host').addEventListener('click', () => this.onHostClick());

        return sectionEl;
    }
}
