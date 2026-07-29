/**
 * ==========================================================================
 * LocalMate - 상세 페이지 단일 번들 자바스크립트 (detailBundle.js)
 * file:// 더블 클릭만으로 바로 구동되는 상세 및 예약 모달 스크립트
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
      rating: 4.9,
      reviewCount: 24,
      timeline: [
        { time: '14:00 - 미팅', title: '신촌역 2번 출구 앞 만남', desc: '반갑게 인사 나누고 오늘의 산책 동선 소개' },
        { time: '14:30 - 산책', title: '연세대학교 숨은 벚꽃 산책로', desc: '캠퍼스 내 예쁜 스팟에서 서로 사진 찍어주고 자유 대화' },
        { time: '15:30 - 맛집', title: '로컬 피자/파스타 맛집 시식', desc: '대학생 가성비 찐맛집에서 윈윈 언어 교환 대화' }
      ]
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
    const appEl = document.getElementById('detail-app');
    if (!appEl) return;

    const course = DEFAULT_COURSES[0];

    appEl.innerHTML = `
      <header class="glass-surface" style="position: sticky; top: 0; z-index: 100; padding: 0.85rem 0;">
        <div class="container" style="display: flex; align-items: center; justify-content: space-between;">
          <a href="index.html" style="font-family: var(--font-heading); font-size: 1.35rem; font-weight: 800; color: var(--color-primary);">
            Local<span style="color: var(--color-secondary);">Mate</span>
          </a>
          <nav style="display: flex; gap: 1.5rem;">
            <a href="index.html" style="font-weight: 600; color: var(--text-secondary);">홈 (Home)</a>
            <a href="explore.html" style="font-weight: 600; color: var(--text-secondary);">로컬 코스 탐색</a>
            <a href="detail.html?id=course-1" style="font-weight: 600; color: var(--color-primary);">🎓 상세 보기</a>
          </nav>
          <span class="badge-student-verified">🎓 대학생 인증 완료</span>
        </div>
      </header>

      <main style="padding: 2rem 0 4rem 0;">
        <div class="container">
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            <a href="index.html">홈</a> &gt; <a href="explore.html">로컬 코스 탐색</a> &gt; <strong>${course.title}</strong>
          </div>

          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2.5rem; align-items: flex-start;">
            <!-- 좌측 -->
            <div style="display: flex; flex-direction: column; gap: 2rem;">
              <div>
                <span class="badge-student-verified" style="margin-bottom: 0.5rem;">🎓 ${course.hostUniversity} 인증 호스트</span>
                <h1 style="font-size: 2.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem;">${course.title}</h1>
                <div style="width: 100%; height: 380px; border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-glass);">
                  <img src="${course.thumbnail}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <div class="glass-surface" style="padding: 1.5rem;">
                  <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem;">💡 이 로컬 코스는 어떤 체험인가요?</h3>
                  <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.7;">${course.description}</p>
                </div>
              </div>

              <!-- 호스트 프로필 -->
              <div class="glass-surface" style="padding: 1.75rem;">
                <div style="display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 1.25rem;">
                  <img src="${course.hostAvatar}" style="width: 72px; height: 72px; border-radius: 9999px; border: 3px solid var(--color-primary-light);" />
                  <div>
                    <h3 style="font-size: 1.25rem; font-weight: 700;">${course.hostName}</h3>
                    <div class="badge-student-verified" style="margin-top: 0.25rem;">🎓 ${course.hostUniversity} 컴퓨터공학과</div>
                  </div>
                </div>
                <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
                  안녕하세요! 신촌 근처 맛집과 숨은 산책로를 잘 아는 대학생 김민수입니다. 어학연수 대신 실전 영어를 많이 연습하고 싶어요!
                </p>
              </div>

              <!-- 타임라인 -->
              <div class="glass-surface" style="padding: 1.75rem;">
                <h4 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🗺️ 코스 상세 동선 및 시간표</h4>
                <div class="timeline-list">
                  ${course.timeline.map(t => `
                    <div class="timeline-item">
                      <div class="timeline-time">${t.time}</div>
                      <div class="timeline-title">${t.title}</div>
                      <div class="timeline-desc">${t.desc}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- 우측 사이드바 -->
            <div style="position: sticky; top: 5rem;">
              <div class="glass-surface" style="padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem;">
                <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary);">100% C2C 무료 교환</div>
                <div>
                  <label class="form-label">📅 매칭 희망 날짜</label>
                  <input type="date" class="form-input" value="2026-08-01" />
                </div>
                <button id="book-btn" class="btn btn-primary btn-lg" style="width: 100%;">🚀 매칭 신청서 보내기</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    `;

    document.getElementById('book-btn').addEventListener('click', function() {
      showToast(`🎉 '${course.hostName}' 호스트에게 매칭 신청서가 성공적으로 전송되었습니다!`);
    });
  });
})();
