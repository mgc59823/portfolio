/**
 * ==========================================================================
 * LocalMate - 탐색 페이지 단일 번들 자바스크립트 (exploreBundle.js)
 * file:// 브라우저 더블 클릭만으로 바로 구동되는 탐색 페이지 스크립트
 * ==========================================================================
 */

(function() {
  'use strict';

  const DEFAULT_COURSES = [
    {
      id: 'course-1',
      title: '동네 숨은 벚꽃 명소 산책하고 로컬 파스타 맛집 가기',
      description: '인터넷에 안 나오는 신촌 숨은 벚꽃길을 함께 걸으며 자유롭게 영어/한국어로 대화하고, 연세대 학생들의 찐 로컬 파스타집을 탐방합니다.',
      hostName: '김민수',
      hostUniversity: '연세대학교',
      isVerified: true,
      hostAvatar: 'assets/images/avatar_placeholder.svg',
      thumbnail: 'assets/images/portfolio_ui_mockup.png',
      categoryTag: '#산책',
      category: 'walk',
      durationHours: 2,
      location: '신촌/홍대',
      languages: ['Native 🇰🇷', 'Practice 🇺🇸'],
      languageCode: 'en',
      rating: 4.9,
      reviewCount: 24
    },
    {
      id: 'course-2',
      title: '한국 대학생의 리얼 공강 시간 (PC방 2시간 + 학식 시식) 체험',
      description: '한국 고유의 공강 문화를 그대로 경험해보세요! 최신 사양 PC방에서 최고급 먹거리 주문을 체험하고 대학 본관 학생식당을 탐방합니다.',
      hostName: '이지원',
      hostUniversity: '고려대학교',
      isVerified: true,
      hostAvatar: 'assets/images/avatar_placeholder.svg',
      thumbnail: 'assets/images/portfolio_ui_mockup.png',
      categoryTag: '#공강체험',
      category: 'campus',
      durationHours: 3,
      location: '안암/고려대',
      languages: ['Native 🇰🇷', 'Fluent 🇺🇸'],
      languageCode: 'en',
      rating: 5.0,
      reviewCount: 15
    },
    {
      id: 'course-3',
      title: '망원시장 길거리 장보고 한강 공원에서 뚝배기 라면 먹기',
      description: '망원시장의 다양한 닭강정, 핫바, 떡볶이를 탐방하고, 한강공원으로 걸어가 자동 라면 조리기로 끓인 라면을 피크닉하며 수다 떠는 코스입니다.',
      hostName: '박서준',
      hostUniversity: '서강대학교',
      isVerified: true,
      hostAvatar: 'assets/images/avatar_placeholder.svg',
      thumbnail: 'assets/images/portfolio_ui_mockup.png',
      categoryTag: '#로컬맛집',
      category: 'food',
      durationHours: 3,
      location: '망원/연남',
      languages: ['Native 🇰🇷', 'Practice 🇯🇵'],
      languageCode: 'jp',
      rating: 4.8,
      reviewCount: 31
    }
  ];

  let toastTimer = null;
  function showToast(msg) {
    const toastEl = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');
    if (!toastEl || !msgEl) return;
    msgEl.textContent = msg;
    toastEl.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.add('hidden'), 2600);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const appEl = document.getElementById('explore-app');
    if (!appEl) return;

    let activeCat = 'all';
    let activeLang = 'all';

    function renderPage() {
      appEl.innerHTML = '';

      // Header
      const header = document.createElement('header');
      header.className = 'glass-surface';
      header.style.cssText = 'position: sticky; top: 0; z-index: 100; border-radius: 0; padding: 0.85rem 0;';
      header.innerHTML = `
        <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
          <a href="index.html" style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: var(--color-primary);">
            Local<span style="color: var(--color-secondary);">Mate</span>
          </a>
          <nav style="display: flex; gap: 1.5rem;">
            <a href="index.html" style="font-weight: 600; color: var(--text-secondary);">홈 (Home)</a>
            <a href="explore.html" style="font-weight: 600; color: var(--color-primary);">로컬 코스 탐색</a>
            <a href="detail.html?id=course-1" style="font-weight: 600; color: var(--text-secondary);">🎓 상세 보기</a>
          </nav>
          <span class="badge-student-verified">🎓 대학생 인증 완료</span>
        </div>
      `;
      appEl.appendChild(header);

      // SubHeader
      const sub = document.createElement('div');
      sub.style.cssText = 'background: linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(255, 107, 53, 0.05) 100%); padding: 2.5rem 0; border-bottom: 1px solid var(--border-glass);';
      sub.innerHTML = `
        <div class="container">
          <span class="badge-student-verified" style="margin-bottom: 0.5rem;">🔍 Explore Local Experiences</span>
          <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--text-primary);">
            내 취향에 딱 맞는 <span style="color: var(--color-primary);">로컬 일상 탐색</span>
          </h1>
        </div>
      `;
      appEl.appendChild(sub);

      // Main content
      const main = document.createElement('main');
      main.style.padding = '2.5rem 0 4rem 0';
      const container = document.createElement('div');
      container.className = 'container';

      // Filter bar
      const filterBar = document.createElement('div');
      filterBar.className = 'filter-bar';
      filterBar.innerHTML = `
        <div class="filter-group">
          <button class="cat-pill ${activeCat === 'all' ? 'active' : ''}" data-cat="all">🌐 전체 보기</button>
          <button class="cat-pill ${activeCat === 'walk' ? 'active' : ''}" data-cat="walk">🌸 산책 & 핫플</button>
          <button class="cat-pill ${activeCat === 'food' ? 'active' : ''}" data-cat="food">🍕 로컬 맛집</button>
          <button class="cat-pill ${activeCat === 'campus' ? 'active' : ''}" data-cat="campus">🎮 공강 시간</button>
        </div>
        <div class="filter-group">
          <select id="lang-select" class="filter-select">
            <option value="all" ${activeLang === 'all' ? 'selected' : ''}>🗣️ 모든 언어 가능</option>
            <option value="en" ${activeLang === 'en' ? 'selected' : ''}>🇺🇸 영어 회화 (English)</option>
            <option value="jp" ${activeLang === 'jp' ? 'selected' : ''}>🇯🇵 일본어 회화 (Japanese)</option>
          </select>
        </div>
      `;
      container.appendChild(filterBar);

      // Grid
      const grid = document.createElement('div');
      grid.className = 'grid-3';

      const filtered = DEFAULT_COURSES.filter(c => {
        const matchCat = (activeCat === 'all') || (c.category === activeCat);
        const matchLang = (activeLang === 'all') || (c.languageCode === activeLang);
        return matchCat && matchLang;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 4rem;">🔍 일치하는 코스가 없습니다.</div>`;
      } else {
        filtered.forEach(c => {
          const card = document.createElement('div');
          card.className = 'course-card';
          card.innerHTML = `
            <div class="course-card-thumb"><img src="${c.thumbnail}" /><div class="course-card-badge-top"><span class="badge-student-verified">🎓 ${c.hostUniversity}</span></div></div>
            <div class="course-card-content">
              <div class="course-card-host"><img src="${c.hostAvatar}" class="course-card-host-img" /><div><strong>${c.hostName}</strong><div style="font-size: 0.75rem;">⭐ ${c.rating}</div></div></div>
              <h3 class="course-card-title">${c.title}</h3>
              <p class="course-card-desc">${c.description}</p>
              <div class="course-card-footer"><span>⏱️ ${c.durationHours}시간</span><span>📍 ${c.location}</span></div>
            </div>
          `;
          card.addEventListener('click', () => window.location.href = `detail.html?id=${c.id}`);
          grid.appendChild(card);
        });
      }

      container.appendChild(grid);
      main.appendChild(container);
      appEl.appendChild(main);

      // Events
      filterBar.querySelectorAll('.cat-pill').forEach(btn => {
        btn.addEventListener('click', (e) => {
          activeCat = e.target.getAttribute('data-cat');
          renderPage();
        });
      });

      const langSelect = filterBar.querySelector('#lang-select');
      if (langSelect) {
        langSelect.addEventListener('change', (e) => {
          activeLang = e.target.value;
          renderPage();
        });
      }
    }

    renderPage();
  });
})();
