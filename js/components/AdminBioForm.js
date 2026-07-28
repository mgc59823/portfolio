/**
 * ==========================================================================
 * 민경천 포트폴리오 - 관리자 자기소개 & 프로필 편집 폼 컴포넌트 (AdminBioForm.js)
 * 성명, 학력, 대표 직함, 히어로 헤드라인 및 비전 수정을 처리함
 * ==========================================================================
 */

import { showToast } from '../utils/helpers.js';

export class AdminBioFormComponent {
    /**
     * @param {Object} props 프로필 데이터 객체, onSaveProfile 저장 콜백
     */
    constructor(props) {
        this.profile = props.profile;
        this.onSaveProfile = props.onSaveProfile || (() => {});
    }

    /**
     * 프로필 편집 폼 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        const { name, title, headline, education, bio } = this.profile;

        return `
            <section class="admin-form-card">
                <h2 style="font-size: 1.3rem; color: var(--text-primary); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-address-card" style="color: var(--color-gold-primary);"></i> 자기소개 & 학력 데이터 수정
                </h2>

                <form id="profile-form">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                        <div class="form-group">
                            <label for="prof-name"><i class="fa-solid fa-user"></i> 성명</label>
                            <input type="text" id="prof-name" class="form-control" value="${name || ''}" required>
                        </div>
                        <div class="form-group">
                            <label for="prof-title"><i class="fa-solid fa-id-badge"></i> 대표 직함</label>
                            <input type="text" id="prof-title" class="form-control" value="${title || ''}" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="prof-headline"><i class="fa-solid fa-heading"></i> 메인 히어로 헤드라인 문구</label>
                        <input type="text" id="prof-headline" class="form-control" value="${headline || ''}" required>
                    </div>

                    <div class="form-group">
                        <label for="prof-education"><i class="fa-solid fa-graduation-cap"></i> 학력 및 전공 정보</label>
                        <input type="text" id="prof-education" class="form-control" value="${education || ''}" required>
                    </div>

                    <div class="form-group">
                        <label for="prof-bio"><i class="fa-solid fa-file-lines"></i> 자기소개 및 엔지니어 비전</label>
                        <textarea id="prof-bio" class="form-control" rows="5" required>${bio || ''}</textarea>
                    </div>

                    <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
                        <button type="submit" class="btn btn-primary btn-md">
                            <i class="fa-solid fa-floppy-disk"></i> 자기소개 변경사항 저장
                        </button>
                    </div>
                </form>
            </section>
        `;
    }

    /**
     * 폼 제출 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        const form = containerEl.querySelector('#profile-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const updatedProfile = {
                    ...this.profile,
                    name: containerEl.querySelector('#prof-name').value.trim(),
                    title: containerEl.querySelector('#prof-title').value.trim(),
                    headline: containerEl.querySelector('#prof-headline').value.trim(),
                    education: containerEl.querySelector('#prof-education').value.trim(),
                    bio: containerEl.querySelector('#prof-bio').value.trim()
                };

                this.onSaveProfile(updatedProfile);
                showToast('💾 자기소개 및 프로필 데이터가 LocalStorage에 저장되었습니다!');
            });
        }
    }
}
