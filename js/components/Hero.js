/**
 * ==========================================================================
 * 민경천 포트폴리오 - 히어로 대형 헤드라인 컴포넌트 (Hero.js)
 * 엔지니어 정체성 타이틀, 핵심 기술 역량 뱃지 및 CTA 버튼 제공
 * ==========================================================================
 */

export class HeroComponent {
    /**
     * @param {Object} props 프로필 데이터 객체
     */
    constructor(props) {
        this.headline = props.headline || "반도체 공정과 디지털 회로를 잇는 엔지니어, 민경천입니다.";
    }

    /**
     * 히어로 컴포넌트 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <section class="hero-section" style="padding: 6rem 0 4rem; position: relative; text-align: center; overflow: hidden;">
                <div class="container">
                    <!-- 회로 모티프 뱃지 -->
                    <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0, 242, 254, 0.1); border: 1px solid var(--border-circuit); padding: 0.4rem 1.2rem; border-radius: 30px; margin-bottom: 1.5rem;" class="animate-float">
                        <span style="width: 8px; height: 8px; background: var(--color-cyan-accent); border-radius: 50%; display: inline-block;" class="animate-pulse"></span>
                        <span style="font-size: 0.85rem; font-family: var(--font-code); color: var(--color-cyan-accent); font-weight: 600;">SEMICONDUCTOR & DIGITAL CIRCUIT PORTFOLIO</span>
                    </div>

                    <!-- 메인 헤드라인 타이틀 -->
                    <h1 class="hero-title" style="font-family: var(--font-heading); font-size: 2.75rem; font-weight: 800; line-height: 1.25; max-width: 850px; margin: 0 auto 1.5rem; word-break: keep-all;">
                        반도체 공정과 디지털 회로를 잇는<br>
                        <span style="background: linear-gradient(135deg, var(--color-gold-primary), var(--color-gold-hover)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">엔지니어, 민경천</span>입니다.
                    </h1>

                    <!-- 부제목 요약 -->
                    <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 680px; margin: 0 auto 2.5rem; word-break: keep-all;">
                        실리콘 반도체 공정(Lithography, Etching)의 기초 물리 특성 이해부터 기초 회로(RLC, BJT/MOSFET) 분석 및 Verilog/FPGA 디지털 논리 회로 설계까지 검증된 엔지니어링 역량을 확인하세요.
                    </p>

                    <!-- CTA 버튼 그룹 -->
                    <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                        <a href="#projects" class="btn btn-primary btn-lg">
                            <i class="fa-solid fa-microchip"></i> 작업물 프로젝트 보기
                        </a>
                        <a href="#about" class="btn btn-outline btn-lg">
                            <i class="fa-solid fa-user-gear"></i> 엔지니어 소개
                        </a>
                    </div>
                </div>
            </section>
        `;
    }

    bindEvents() {}
}
