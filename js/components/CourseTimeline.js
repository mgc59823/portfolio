/**
 * ==========================================================================
 * LocalMate - 코스 동선 타임라인 컴포넌트 (CourseTimeline.js)
 * 투어 코스의 시간대별 이동 장소, 활동 및 언어 교환 대화 주제 시각화
 * ==========================================================================
 */

export class CourseTimelineComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {Array} props.steps 타임라인 단계 배열 [{ time: '14:00', title: '...', desc: '...' }]
     */
    constructor(props = {}) {
        this.steps = props.steps || [
            { time: '14:00 - 미팅', title: '신촌역 2번 출구 앞 만나기', desc: '간단한 인사 및 인적사항 확인 후 도보 이동' },
            { time: '14:30 - 산책 & 사진', title: '연세대학교 숨은 벚꽃길 산책', desc: '캠퍼스 내 예쁜 사진 스팟에서 인생샷 찍어주기 & 자유 대화' },
            { time: '15:30 - 로컬 피자/파스타', title: '대학생 로컬 맛집 이동 & 언어 교환 수다', desc: '한국인 호스트가 추천하는 파스타집에서 영어/한국어 윈윈 수다' }
        ];
    }

    /**
     * CourseTimeline DOM 요소를 생성합니다.
     * @returns {HTMLElement} 타임라인 DOM
     */
    render() {
        const wrapperEl = document.createElement('div');
        wrapperEl.className = 'timeline-container';

        wrapperEl.innerHTML = `
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
                🗺️ 코스 상세 동선 및 시간표
            </h4>
            <div class="timeline-list">
                ${this.steps.map(step => `
                    <div class="timeline-item">
                        <div class="timeline-time">${step.time}</div>
                        <div class="timeline-title">${step.title}</div>
                        <div class="timeline-desc">${step.desc}</div>
                    </div>
                `).join('')}
            </div>
        `;

        return wrapperEl;
    }
}
