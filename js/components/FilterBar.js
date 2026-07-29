/**
 * ==========================================================================
 * LocalMate - 투어 탐색 스마트 필터바 컴포넌트 (FilterBar.js)
 * 날짜, 지역, 구사 언어, 로컬 활동 테마 카테고리 필터링 기능 제공
 * ==========================================================================
 */

export class FilterBarComponent {
    /**
     * @param {Object} props 컴포넌트 속성
     * @param {string} props.activeCategory 현재 선택된 카테고리 ('all' | 'walk' | 'food' | 'campus' | 'culture')
     * @param {string} props.activeLanguage 현재 선택된 언어 ('all' | 'en' | 'ko' | 'jp')
     * @param {Function} props.onFilterChange 필터 조건 변경 시 호출될 콜백 함수
     */
    constructor(props = {}) {
        this.activeCategory = props.activeCategory || 'all';
        this.activeLanguage = props.activeLanguage || 'all';
        this.onFilterChange = props.onFilterChange || (() => {});
    }

    /**
     * FilterBar DOM 요소를 생성하고 이벤트 렌더링을 처리합니다.
     * @returns {HTMLElement} 필터 바 DOM
     */
    render() {
        const wrapperEl = document.createElement('div');
        wrapperEl.className = 'filter-bar';

        wrapperEl.innerHTML = `
            <!-- 1. 좌측 알약 형태 카테고리 버튼 그룹 -->
            <div class="filter-group">
                <button class="cat-pill ${this.activeCategory === 'all' ? 'active' : ''}" data-cat="all">
                    🌐 전체 보기
                </button>
                <button class="cat-pill ${this.activeCategory === 'walk' ? 'active' : ''}" data-cat="walk">
                    🌸 산책 & 핫플
                </button>
                <button class="cat-pill ${this.activeCategory === 'food' ? 'active' : ''}" data-cat="food">
                    🍕 로컬 맛집
                </button>
                <button class="cat-pill ${this.activeCategory === 'campus' ? 'active' : ''}" data-cat="campus">
                    🎮 공강 시간 (PC방+학식)
                </button>
                <button class="cat-pill ${this.activeCategory === 'culture' ? 'active' : ''}" data-cat="culture">
                    🏮 시장 & 전통 문화
                </button>
            </div>

            <!-- 2. 우측 상세 조건 셀렉트 (언어, 지역) -->
            <div class="filter-group">
                <select id="filter-lang-select" class="filter-select">
                    <option value="all" ${this.activeLanguage === 'all' ? 'selected' : ''}>🗣️ 모든 언어 가능</option>
                    <option value="en" ${this.activeLanguage === 'en' ? 'selected' : ''}>🇺🇸 영어 회화 가능 (English)</option>
                    <option value="ko" ${this.activeLanguage === 'ko' ? 'selected' : ''}>🇰🇷 한국어 회화 (Korean)</option>
                    <option value="jp" ${this.activeLanguage === 'jp' ? 'selected' : ''}>🇯🇵 일본어 회화 (Japanese)</option>
                </select>

                <select id="filter-region-select" class="filter-select">
                    <option value="all">📍 전체 지역 (서울)</option>
                    <option value="sinchon">신촌/홍대/이대</option>
                    <option value="gangnam">강남/잠실</option>
                    <option value="hyehwa">혜화/대학로</option>
                    <option value="mangwon">망원/연남</option>
                </select>
            </div>
        `;

        // 카테고리 필터 클릭 이벤트
        wrapperEl.querySelectorAll('.cat-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedCat = e.currentTarget.getAttribute('data-cat');
                this.activeCategory = selectedCat;
                this.onFilterChange({ category: this.activeCategory, language: this.activeLanguage });
            });
        });

        // 언어 셀렉트 변경 이벤트
        const langSelect = wrapperEl.querySelector('#filter-lang-select');
        if (langSelect) {
            langSelect.addEventListener('change', (e) => {
                this.activeLanguage = e.target.value;
                this.onFilterChange({ category: this.activeCategory, language: this.activeLanguage });
            });
        }

        return wrapperEl;
    }
}
