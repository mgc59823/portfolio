/**
 * ==========================================================================
 * LocalMate - 서비스 푸터 컴포넌트 (Footer.js)
 * 브랜드 로고, 윈윈 가치 소개, 대학교 인증 안내 및 저작권 정보 수록
 * ==========================================================================
 */

export class FooterComponent {
    /**
     * Footer DOM 요소를 생성합니다.
     * @returns {HTMLElement} 푸터 DOM
     */
    render() {
        const footerEl = document.createElement('footer');
        footerEl.style.cssText = `
            background: #0F172A;
            color: #94A3B8;
            padding: 3.5rem 0 2rem 0;
            margin-top: auto;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        `;

        footerEl.innerHTML = `
            <div class="container">
                <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2.5rem;">
                    <!-- 좌측 서비스 브랜드 소개 -->
                    <div>
                        <a href="#" style="display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1rem;">
                            <img src="assets/images/logo.svg" alt="LocalMate" style="width: 32px; height: 32px;" />
                            <span>Local<span style="color: var(--color-secondary);">Mate</span></span>
                        </a>
                        <p style="font-size: 0.88rem; line-height: 1.6; max-width: 420px; color: #94A3B8;">
                            LocalMate는 일방적인 관광 가이드가 아닌, 서로 문화를 공유하고 실전 언어를 교환하는 상호 보완적인 C2C 윈윈 커뮤니티입니다. 대학교 웹메일(.ac.kr) 인증을 통해 안심할 수 있는 매칭 서비스를 만듭니다.
                        </p>
                    </div>

                    <!-- 중앙 빠른 링크 목록 -->
                    <div>
                        <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem;">서비스 메뉴</h4>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.88rem;">
                            <li><a href="#" style="color: #94A3B8; transition: var(--transition-fast);">로컬 코스 전체 보기</a></li>
                            <li><a href="#" style="color: #94A3B8; transition: var(--transition-fast);">🎓 대학교 인증 가이드</a></li>
                            <li><a href="#" style="color: #94A3B8; transition: var(--transition-fast);">🤝 호스트 등록 신청</a></li>
                            <li><a href="#" style="color: #94A3B8; transition: var(--transition-fast);">🌟 유저 성공 후기</a></li>
                        </ul>
                    </div>

                    <!-- 우측 고객지원 & 안전 정책 -->
                    <div>
                        <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem;">안전 & 고객 지원</h4>
                        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.88rem;">
                            <li><a href="#" style="color: #94A3B8;">신뢰 가이드라인</a></li>
                            <li><a href="#" style="color: #94A3B8;">개인정보 처리방침</a></li>
                            <li><a href="#" style="color: #94A3B8;">이용약관</a></li>
                            <li><a href="#" style="color: #94A3B8;">문의하기: support@localmate.com</a></li>
                        </ul>
                    </div>
                </div>

                <!-- 하단 카피라이트 -->
                <div style="padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #64748B;">
                    <div>© 2026 LocalMate Community. All rights reserved. (Personal Portfolio Project)</div>
                    <div>Made with ❤️ for Global Language Exchange</div>
                </div>
            </div>
        `;

        return footerEl;
    }
}
