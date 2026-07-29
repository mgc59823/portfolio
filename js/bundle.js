/**
 * ==========================================================================
 * LocalMate - 메인 랜딩 단일 번들 자바스크립트 (bundle.js)
 * file:// 브라우저 CORS 제약 없이 더블 클릭만으로 바로 구동되는 번들 스크립트
 * ==========================================================================
 */

(function() {
  'use strict';

  // 1. 공통 데이터
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
      reviewCount: 24,
      timeline: [
        { time: '14:00 - 미팅', title: '신촌역 2번 출구 앞 만남', desc: '반갑게 인사 나누고 오늘의 산책 동선 소개' },
        { time: '14:30 - 산책', title: '연세대학교 숨은 벚꽃 산책로', desc: '캠퍼스 내 예쁜 스팟에서 서로 사진 찍어주고 자유 대화' },
        { time: '15:30 - 맛집', title: '로컬 피자/파스타 맛집 시식', desc: '대학생 가성비 찐맛집에서 윈윈 언어 교환 대화' }
      ]
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
      reviewCount: 15,
      timeline: [
        { time: '13:00 - 미팅', title: '안암역 1번 출구 미팅', desc: '대학생 일상 문화에 대한 아젠다 프리뷰' },
        { time: '13:30 - PC방', title: '프리미엄 PC방 먹거리 & 게임 체험', desc: '자리에서 라면/소떡소떡 주문하기 및 가벼운 인게임 대화' },
        { time: '15:00 - 학식', title: '고려대 학생식당 대표 메뉴 탐방', desc: '가성비 학식 시식 및 캠퍼스 라이프 토크' }
      ]
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
      reviewCount: 31,
      timeline: [
        { time: '15:00 - 미팅', title: '망원역 2번 출구 만남', desc: '망원시장 입구로 도보 이동' },
        { time: '15:20 - 시장', title: '망원 전통시장 맛집 장보기', desc: '인기 닭강정 및 시그니처 핫바 구매' },
        { time: '16:30 - 한강', title: '망원 한강공원 즉석 라면 피크닉', desc: '돗자리 펴고 한강을 바라보며 언어 교환 토크' }
      ]
    }
  ];

  // 2. 토스트 유틸리티
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

  // 3. Header 컴포넌트
  class HeaderComponent {
    constructor(props = {}) {
      this.isVerified = props.isVerified || true;
      this.activeTab = props.activeTab || 'home';
      this.onNavTabChange = props.onNavTabChange || (() => {});
    }
    render() {
      const el = document.createElement('header');
      el.className = 'glass-surface';
      el.style.cssText = 'position: sticky; top: 0; z-index: 100; border-radius: 0; border-top: none; border-left: none; border-right: none; padding: 0.85rem 0;';
      el.innerHTML = `
        <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
          <a href="index.html" style="display: flex; align-items: center; gap: 0.6rem; font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: var(--color-primary);">
            <img src="assets/images/logo.svg" alt="LocalMate Logo" style="width: 34px; height: 34px;" />
            <span>Local<span style="color: var(--color-secondary);">Mate</span></span>
          </a>
          <nav style="display: flex; gap: 1.5rem; align-items: center;">
            <a href="index.html" style="font-weight: 600; color: var(--color-primary); font-size: 0.95rem;">홈 (Home)</a>
            <a href="explore.html" style="font-weight: 600; color: var(--text-secondary); font-size: 0.95rem;">로컬 코스 탐색</a>
            <a href="detail.html?id=course-1" style="font-weight: 600; color: var(--text-secondary); font-size: 0.95rem;">🎓 코스 상세 보기</a>
            <a href="contact.html" style="font-weight: 600; color: var(--text-secondary); font-size: 0.95rem;">✉️ 문의하기</a>
          </nav>

          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="badge-student-verified">🎓 한국대학교 인증 완료</span>
            <a href="explore.html" class="btn btn-primary btn-sm">+ 로컬 코스 올리기</a>
          </div>
        </div>
      `;
      return el;
    }
  }

  // 4. Hero 컴포넌트
  class HeroComponent {
    constructor(props = {}) {
      this.onExploreClick = props.onExploreClick || (() => {});
    }
    render() {
      const el = document.createElement('section');
      el.style.cssText = 'padding: 4rem 0 3rem 0; position: relative; overflow: hidden;';
      el.innerHTML = `
        <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            <div class="badge-student-verified" style="width: fit-content;">✨ 100% C2C 상호보완 윈윈(Win-Win) 커뮤니티</div>
            <h1 style="font-family: var(--font-heading); font-size: 2.75rem; font-weight: 800; line-height: 1.25; color: var(--text-primary);">
              뻔한 관광 대신,<br/><span style="color: var(--color-primary);">진짜 로컬 친구</span>와<br/>일상을 나누세요.
            </h1>
            <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; max-width: 500px;">
              한국 대학생의 <strong>실전 영어 회화 연습</strong>과 외국인 여행자의 <strong>'찐' 로컬 투어 체험</strong>을 연결하는 안전하고 스마트한 상호 교환 매칭 플랫폼입니다.
            </p>
            <div style="display: flex; gap: 1rem; align-items: center; margin-top: 0.75rem;">
              <a href="explore.html" class="btn btn-primary btn-lg">🔍 로컬 코스 둘러보기</a>
              <a href="detail.html?id=course-1" class="btn btn-outline btn-lg">🤝 내 일상 소개해보기</a>
            </div>
            <div style="display: flex; gap: 2rem; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
              <div><div style="font-size: 1.5rem; font-weight: 800; color: var(--color-primary);">🎓 1,240+명</div><div style="font-size: 0.82rem; color: var(--text-muted);">인증된 대학생 호스트</div></div>
              <div><div style="font-size: 1.5rem; font-weight: 800; color: var(--color-secondary);">🌟 98.4%</div><div style="font-size: 0.82rem; color: var(--text-muted);">상호 매칭 만족도</div></div>
              <div><div style="font-size: 1.5rem; font-weight: 800; color: var(--color-accent-blue);">💬 3,500+회</div><div style="font-size: 0.82rem; color: var(--text-muted);">언어 교환 세션 완료</div></div>
            </div>
          </div>
          <div style="position: relative;">
            <div class="glass-surface" style="padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-hover);">
              <img src="assets/images/portfolio_ui_mockup.png" alt="LocalMate Preview" style="width: 100%; border-radius: var(--radius-md); object-fit: cover;" />
            </div>
          </div>
        </div>
      `;
      return el;
    }
  }

  // 5. TrustBanner 컴포넌트
  class TrustBannerComponent {
    render() {
      const el = document.createElement('section');
      el.style.cssText = 'padding: 3.5rem 0; background: linear-gradient(180deg, transparent 0%, rgba(13, 148, 136, 0.04) 100%);';
      el.innerHTML = `
        <div class="container">
          <div style="text-align: center; max-width: 640px; margin: 0 auto 2.5rem auto;">
            <span class="badge-student-verified" style="margin-bottom: 0.75rem;">🎓 Safety & Trust First</span>
            <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem;">
              모르는 사람과의 만남, <span style="color: var(--color-primary);">안전이 생명</span>입니다.
            </h2>
            <p style="font-size: 0.95rem; color: var(--text-secondary);">
              LocalMate는 대학교 공식 웹메일 인증 절차를 거친 호스트에게 '대학생 인증 마크'를 부여하여 누구나 안심하고 문화와 언어를 공유할 수 있습니다.
            </p>
          </div>
          <div class="grid-3">
            <div class="glass-surface" style="padding: 1.75rem;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: #EFF6FF; color: var(--color-accent-blue); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">1</div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">🎓 대학생 이메일 인증 (.ac.kr)</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.4rem;">학교 공식 웹메일로 발송되는 6자리 OTP 번호로 재학생 신원을 100% 실명 검증합니다.</p>
            </div>
            <div class="glass-surface" style="padding: 1.75rem;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">2</div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">🗣️ 언어 능력 & 프로필 공개</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.4rem;">모국어와 배우고 싶은 언어, 관심사를 사전에 투명하게 확인하고 매칭을 선택합니다.</p>
            </div>
            <div class="glass-surface" style="padding: 1.75rem;">
              <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--color-secondary-light); color: var(--color-secondary); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">3</div>
              <h3 style="font-size: 1.15rem; font-weight: 700;">⭐ 상호 매너 온도 & 리뷰</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); margin-top: 0.4rem;">투어 후 서로의 후기와 매너 점수가 프로필에 기록되어 클린 커뮤니티를 만듭니다.</p>
            </div>
          </div>
        </div>
      `;
      return el;
    }
  }

  // 6. CourseCard 컴포넌트
  class CourseCardComponent {
    constructor(props = {}) {
      this.course = props.course || {};
      this.onSelect = props.onSelect || (() => {});
    }
    render() {
      const card = document.createElement('div');
      card.className = 'course-card';
      const c = this.course;
      card.innerHTML = `
        <div class="course-card-thumb">
          <img src="${c.thumbnail}" alt="${c.title}" />
          <div class="course-card-badge-top"><span class="badge-student-verified">🎓 ${c.hostUniversity}</span></div>
          <button class="btn-icon course-card-like-btn" title="찜하기">❤️</button>
        </div>
        <div class="course-card-content">
          <div class="course-card-host">
            <img src="${c.hostAvatar}" alt="${c.hostName}" class="course-card-host-img" />
            <div>
              <div class="course-card-host-name">${c.hostName}</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">⭐ ${c.rating} (${c.reviewCount}개 후기)</div>
            </div>
          </div>
          <h3 class="course-card-title">${c.title}</h3>
          <p class="course-card-desc">${c.description}</p>
          <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
            <span class="tag-chip">${c.categoryTag}</span>
            ${(c.languages || []).map(l => `<span class="badge-language">${l}</span>`).join('')}
          </div>
          <div class="course-card-footer">
            <span>⏱️ 약 ${c.durationHours}시간 소요</span>
            <span>📍 ${c.location}</span>
          </div>
        </div>
      `;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.course-card-like-btn')) {
          e.stopPropagation();
          showToast(`❤️ '${c.title}' 코스를 찜했습니다!`);
          return;
        }
        window.location.href = `detail.html?id=${c.id}`;
      });
      return card;
    }
  }

  // 7. Footer 컴포넌트
  class FooterComponent {
    render() {
      const footer = document.createElement('footer');
      footer.style.cssText = 'background: #0F172A; color: #94A3B8; padding: 3.5rem 0 2rem 0; margin-top: auto;';
      footer.innerHTML = `
        <div class="container">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; margin-bottom: 2rem;">
            <div>
              <div style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: #FFFFFF; margin-bottom: 1rem;">
                Local<span style="color: var(--color-secondary);">Mate</span>
              </div>
              <p style="font-size: 0.88rem; line-height: 1.6; max-width: 420px; color: #94A3B8;">
                LocalMate는 일방적 가이드가 아닌, 문화와 실전 언어를 교환하는 상호 보완 C2C 윈윈 커뮤니티입니다.
              </p>
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem;">빠른 메뉴</h4>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem;">
                <a href="index.html" style="color: #94A3B8;">홈 바로가기</a>
                <a href="explore.html" style="color: #94A3B8;">로컬 코스 탐색</a>
                <a href="detail.html?id=course-1" style="color: #94A3B8;">코스 상세 보기</a>
              </div>
            </div>
            <div>
              <h4 style="font-size: 0.95rem; font-weight: 700; color: #FFFFFF; margin-bottom: 1rem;">안전 가이드</h4>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem;">
                <span>🎓 대학교 인증 가이드</span>
                <span>💬 1:1 안심 채팅</span>
                <span>✉️ support@localmate.com</span>
              </div>
            </div>
          </div>
          <div style="padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 0.82rem; color: #64748B; text-align: center;">
            © 2026 LocalMate Community. All rights reserved.
          </div>
        </div>
      `;
      return footer;
    }
  }

  // 8. 메인 앱 구동
  document.addEventListener('DOMContentLoaded', function() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    appEl.appendChild(new HeaderComponent().render());
    appEl.appendChild(new HeroComponent().render());
    appEl.appendChild(new TrustBannerComponent().render());

    // 코스 카드리스트 섹션
    const sec = document.createElement('section');
    sec.style.padding = '3.5rem 0';
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
      <div style="margin-bottom: 2rem;">
        <span class="tag-chip" style="margin-bottom: 0.5rem;">🔥 Real Local Experiences</span>
        <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-primary);">
          지금 예약 가능한 <span style="color: var(--color-primary);">로컬 일상 코스</span>
        </h2>
      </div>
    `;

    const grid = document.createElement('div');
    grid.className = 'grid-3';
    DEFAULT_COURSES.forEach(c => {
      grid.appendChild(new CourseCardComponent({ course: c }).render());
    });
    container.appendChild(grid);
    sec.appendChild(container);
    appEl.appendChild(sec);

    appEl.appendChild(new FooterComponent().render());
  });

})();
