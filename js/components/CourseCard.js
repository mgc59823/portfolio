/**
 * ==========================================================================
 * LocalMate - 로컬 코스 카드 컴포넌트 (CourseCard.js)
 * 호스트 정보, 인증 배지, 코스 썸네일, 카테고리 태그 및 상세 모달 연결
 * ==========================================================================
 */

export class CourseCardComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {Object} props.course 로컬 코스 데이터 객체
     * @param {Function} props.onSelectCourse 코스 카드 클릭 시 모달 열기 콜백
     * @param {Function} props.onToggleLike 찜하기 버튼 클릭 콜백
     */
    constructor(props = {}) {
        this.course = props.course || {};
        this.onSelectCourse = props.onSelectCourse || (() => {});
        this.onToggleLike = props.onToggleLike || (() => {});
    }

    /**
     * CourseCard DOM 요소를 생성하고 이벤트 핸들러를 연결합니다.
     * @returns {HTMLElement} 코스 카드 DOM
     */
    render() {
        const cardEl = document.createElement('div');
        cardEl.className = 'course-card';

        const {
            id,
            title = '동네 로컬 산책 및 맛집 투어',
            description = '로컬 대학생과 함께하는 편안한 투어 코스입니다.',
            hostName = '김민수',
            hostUniversity = '연세대학교',
            isVerified = true,
            hostAvatar = 'assets/images/avatar_placeholder.svg',
            thumbnail = 'assets/images/portfolio_ui_mockup.png',
            categoryTag = '#산책',
            durationHours = 2,
            location = '신촌/홍대',
            languages = ['Native 🇰🇷', 'Learning 🇺🇸'],
            rating = 4.9,
            reviewCount = 18
        } = this.course;

        cardEl.innerHTML = `
            <!-- 코스 썸네일 영역 -->
            <div class="course-card-thumb">
                <img src="${thumbnail}" alt="${title}" />
                ${isVerified ? `
                    <div class="course-card-badge-top">
                        <span class="badge-student-verified">
                            🎓 ${hostUniversity}
                        </span>
                    </div>
                ` : ''}
                <button class="btn-icon course-card-like-btn" title="찜하기" aria-label="찜하기">
                    ❤️
                </button>
            </div>

            <!-- 코스 카드 본문 콘텐츠 -->
            <div class="course-card-content">
                <!-- 호스트 프로필 유저 헤더 -->
                <div class="course-card-host">
                    <img src="${hostAvatar}" alt="${hostName}" class="course-card-host-img" />
                    <div>
                        <div class="course-card-host-name">${hostName}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">
                            ⭐ ${rating} (${reviewCount}개의 후기)
                        </div>
                    </div>
                </div>

                <!-- 코스 타이틀 및 요약 -->
                <h3 class="course-card-title">${title}</h3>
                <p class="course-card-desc">${description}</p>

                <!-- 태그 및 언어 배지 -->
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                    <span class="tag-chip">${categoryTag}</span>
                    ${languages.map(lang => `<span class="badge-language">${lang}</span>`).join('')}
                </div>

                <!-- 푸터 요약 정보 (소요시간 & 장소) -->
                <div class="course-card-footer">
                    <span>⏱️ 약 ${durationHours}시간 소요</span>
                    <span>📍 ${location}</span>
                </div>
            </div>
        `;

        // 카드 클릭 시 상세 모달 열기 이벤트
        cardEl.addEventListener('click', (e) => {
            if (e.target.closest('.course-card-like-btn')) {
                e.stopPropagation();
                this.onToggleLike(id);
                return;
            }
            this.onSelectCourse(this.course);
        });

        return cardEl;
    }
}
