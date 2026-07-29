/**
 * ==========================================================================
 * LocalMate - 상세 프로필 및 코스 예약 페이지 컨트롤러 (detailApp.js)
 * 호스트 프로필, 타임라인 동선, 리뷰 및 우측 고정 매칭 신청 사이드바 구동
 * ==========================================================================
 */

import { HeaderComponent } from './components/Header.js';
import { HostProfileCardComponent } from './components/HostProfileCard.js';
import { CourseTimelineComponent } from './components/CourseTimeline.js';
import { BookingModalComponent } from './components/BookingModal.js';
import { FooterComponent } from './components/Footer.js';
import { DEFAULT_COURSES, DEFAULT_HOST } from './data/defaultData.js';
import { showToast } from './utils/common.js';

class DetailPageApp {
    constructor() {
        // URL Query 파라미터에서 코스 ID 추출
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id') || 'course-1';

        this.course = DEFAULT_COURSES.find(c => c.id === courseId) || DEFAULT_COURSES[0];
        this.host = DEFAULT_HOST;
        this.isModalOpen = false;

        this.appEl = document.getElementById('detail-app');
        this.modalContainerEl = document.getElementById('modal-mount');
    }

    init() {
        this.render();
    }

    render() {
        if (!this.appEl) return;
        this.appEl.innerHTML = '';

        // 1. 헤더 마운트
        const headerComp = new HeaderComponent({
            isVerified: true,
            activeTab: 'explore',
            onNavTabChange: (tab) => {
                if (tab === 'home') window.location.href = 'index.html';
                else if (tab === 'explore') window.location.href = 'explore.html';
            },
            onOpenLogin: () => showToast('🎓 대학교 이메일(.ac.kr) 인증 가이드를 엽니다.')
        });
        this.appEl.appendChild(headerComp.render());

        // 2. 메인 콘텐츠 컨테이너 (Breadcrumb + 2컬럼 상세 레이아웃)
        const mainEl = document.createElement('main');
        mainEl.style.padding = '2rem 0 4rem 0';

        const containerEl = document.createElement('div');
        containerEl.className = 'container';

        // Breadcrumb 빵부스러기 경로
        containerEl.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <a href="index.html">홈</a> &gt;
                <a href="explore.html">로컬 코스 탐색</a> &gt;
                <span style="color: var(--text-primary); font-weight: 600;">${this.course.title}</span>
            </div>
        `;

        // 2컬럼 레이아웃 [좌측 8컬럼 : 상세 정보 | 우측 4컬럼 : 고정 예약 카드]
        const detailLayoutEl = document.createElement('div');
        detailLayoutEl.style.cssText = `
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 2.5rem;
            align-items: flex-start;
        `;

        // === [좌측 영역] 메인 정보 ===
        const leftColEl = document.createElement('div');
        leftColEl.style.display = 'flex';
        leftColEl.style.flexDirection = 'column';
        leftColEl.style.gap = '2rem';

        // A. 코스 미디어 갤러리 및 기본 정보
        const courseHeaderEl = document.createElement('div');
        courseHeaderEl.innerHTML = `
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                <span class="badge-student-verified">🎓 ${this.course.hostUniversity} 인증 호스트</span>
                <span class="tag-chip">${this.course.categoryTag}</span>
                <span class="badge-language">📍 ${this.course.location}</span>
            </div>

            <h1 style="font-family: var(--font-main); font-size: 2.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; line-height: 1.3;">
                ${this.course.title}
            </h1>

            <div style="position: relative; width: 100%; height: 380px; border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-glass);">
                <img src="${this.course.thumbnail}" alt="${this.course.title}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>

            <div class="glass-surface" style="padding: 1.5rem;">
                <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem;">
                    💡 이 로컬 코스는 어떤 체험인가요?
                </h3>
                <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.7; white-space: pre-line;">
                    ${this.course.description}
                </p>
            </div>
        `;
        leftColEl.appendChild(courseHeaderEl);

        // B. 호스트 프로필 카드 마운트
        const hostComp = new HostProfileCardComponent({
            host: {
                ...this.host,
                name: this.course.hostName,
                university: this.course.hostUniversity
            },
            onContactHost: (host) => {
                showToast(`💬 '${host.name}' 호스트와의 1:1 대화창이 연결되었습니다.`);
            }
        });
        leftColEl.appendChild(hostComp.render());

        // C. 코스 동선 타임라인 마운트
        const timelineComp = new CourseTimelineComponent({
            steps: this.course.timeline
        });
        const timelineWrapper = document.createElement('div');
        timelineWrapper.className = 'glass-surface';
        timelineWrapper.style.padding = '1.75rem';
        timelineWrapper.appendChild(timelineComp.render());
        leftColEl.appendChild(timelineWrapper);

        // === [우측 영역] 고정 매칭 신청 사이드바 ===
        const rightColEl = document.createElement('div');
        rightColEl.style.cssText = `
            position: sticky;
            top: 5rem;
        `;

        const bookingSidebarEl = document.createElement('div');
        bookingSidebarEl.className = 'glass-surface';
        bookingSidebarEl.style.cssText = `
            padding: 1.75rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            box-shadow: var(--shadow-hover);
        `;

        bookingSidebarEl.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
                <div>
                    <span style="font-size: 0.8rem; color: var(--text-muted);">매칭 방식</span>
                    <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-primary);">100% C2C 무료 교환</div>
                </div>
                <div style="text-align: right;">
                    <span style="font-size: 0.8rem; color: var(--text-muted);">호스트 평점</span>
                    <div style="font-weight: 700; color: var(--text-primary);">⭐ ${this.course.rating} / 5.0</div>
                </div>
            </div>

            <div>
                <label class="form-label">📅 매칭 희망 날짜 선택</label>
                <input type="date" id="sidebar-date-select" class="form-input" value="2026-08-01" />
            </div>

            <div style="font-size: 0.88rem; color: var(--text-secondary); background: var(--bg-surface-subtle); padding: 0.85rem; border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 0.4rem;">
                <div>⏱️ <strong>소요시간:</strong> 약 ${this.course.durationHours}시간</div>
                <div>📍 <strong>미팅위치:</strong> ${this.course.location}</div>
                <div>🎓 <strong>호스트:</strong> ${this.course.hostName} (${this.course.hostUniversity})</div>
            </div>

            <button id="sidebar-booking-btn" class="btn btn-primary btn-lg" style="width: 100%;">
                🚀 매칭 신청서 보내기
            </button>

            <div style="font-size: 0.78rem; color: var(--text-muted); text-align: center;">
                🔒 .ac.kr 대학생 인증 호스트와의 안심 매칭이 보장됩니다.
            </div>
        `;

        // 매칭 신청 버튼 이벤트
        bookingSidebarEl.querySelector('#sidebar-booking-btn').addEventListener('click', () => {
            this.isModalOpen = true;
            this.renderModal();
        });

        rightColEl.appendChild(bookingSidebarEl);

        detailLayoutEl.appendChild(leftColEl);
        detailLayoutEl.appendChild(rightColEl);

        containerEl.appendChild(detailLayoutEl);
        mainEl.appendChild(containerEl);
        this.appEl.appendChild(mainEl);

        // 3. 푸터 마운트
        const footerComp = new FooterComponent();
        this.appEl.appendChild(footerComp.render());

        // 4. 모달 마운트
        this.renderModal();
    }

    renderModal() {
        if (!this.modalContainerEl) {
            this.modalContainerEl = document.createElement('div');
            this.modalContainerEl.id = 'modal-mount';
            document.body.appendChild(this.modalContainerEl);
        }

        this.modalContainerEl.innerHTML = '';

        if (this.isModalOpen) {
            const modalComp = new BookingModalComponent({
                course: this.course,
                onClose: () => {
                    this.isModalOpen = false;
                    this.renderModal();
                },
                onSubmitBooking: () => {
                    showToast(`🎉 '${this.course.hostName}' 호스트에게 매칭 신청서가 성공적으로 전송되었습니다!`);
                    this.isModalOpen = false;
                    this.renderModal();
                }
            });

            const modalNode = modalComp.render();
            if (modalNode) this.modalContainerEl.appendChild(modalNode);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new DetailPageApp();
    app.init();
});
