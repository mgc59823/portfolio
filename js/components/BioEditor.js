/**
 * ==========================================================================
 * 민경천 포트폴리오 - 나만 편집 가능한 자기소개 컴포넌트 (BioEditor.js)
 * 요구사항 F-1 준수: 관리자 권한 활성화 시 실시간 텍스트 및 스킬 태그 편집 가능
 * ==========================================================================
 */

import { showToast } from '../utils/helpers.js';

export class BioEditorComponent {
    /**
     * @param {Object} props 프로필 데이터, isAdmin 여부, onSaveProfile 저장 콜백
     */
    constructor(props) {
        this.profile = props.profile;
        this.isAdmin = props.isAdmin || false;
        this.onSaveProfile = props.onSaveProfile || (() => {});
        this.isEditing = false; // 현재 수정 편집 상태 플래그
    }

    /**
     * 자기소개 컴포넌트 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        const { bio, education, skills } = this.profile;

        return `
            <section id="about" class="section">
                <div class="container">
                    <div class="glass-card editable-zone ${this.isEditing ? 'is-editing' : ''}" style="position: relative;">
                        <!-- 관리자용 편집 조작 툴바 -->
                        ${this.isAdmin ? `
                            <div style="position: absolute; top: 1.25rem; right: 1.25rem; display: flex; gap: 0.5rem; z-index: 10;">
                                ${!this.isEditing ? `
                                    <button id="edit-bio-btn" class="btn btn-primary btn-sm">
                                        <i class="fa-solid fa-pen-to-square"></i> 자기소개 수정
                                    </button>
                                ` : `
                                    <button id="save-bio-btn" class="btn btn-primary btn-sm">
                                        <i class="fa-solid fa-floppy-disk"></i> 저장
                                    </button>
                                    <button id="cancel-bio-btn" class="btn btn-outline btn-sm">
                                        <i class="fa-solid fa-xmark"></i> 취소
                                    </button>
                                `}
                            </div>
                        ` : ''}

                        <h2 class="section-title">
                            엔지니어 소개 & 역량 (About Engineer)
                        </h2>

                        <!-- 자기소개 본문 영역 (일반 모드 vs 편집 모드) -->
                        <div style="margin-bottom: 2rem;">
                            <h3 style="font-size: 1.1rem; color: var(--color-gold-primary); margin-bottom: 0.5rem;">
                                <i class="fa-solid fa-graduation-cap"></i> 학력 및 전공
                            </h3>
                            ${!this.isEditing ? `
                                <p style="color: var(--text-primary); font-weight: 600; margin-bottom: 1.25rem;">${education}</p>
                            ` : `
                                <input type="text" id="input-education" class="inline-input" value="${education}" style="margin-bottom: 1.25rem;">
                            `}

                            <h3 style="font-size: 1.1rem; color: var(--color-gold-primary); margin-bottom: 0.5rem;">
                                <i class="fa-solid fa-quote-left"></i> 엔지니어 비전 & 소개
                            </h3>
                            ${!this.isEditing ? `
                                <p style="color: var(--text-secondary); line-height: 1.7; word-break: keep-all;">${bio}</p>
                            ` : `
                                <textarea id="input-bio" class="inline-textarea" rows="4">${bio}</textarea>
                            `}
                        </div>

                        <!-- 기술 스택 매트릭스 (3단 그리드) -->
                        <div style="border-top: 1px solid var(--border-glass); padding-top: 1.5rem;">
                            <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fa-solid fa-layer-group" style="color: var(--color-cyan-accent);"></i> 핵심 기술 역량 매트릭스 (Technical Skill Matrix)
                            </h3>

                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
                                <!-- 1. 반도체 공정 -->
                                <div style="background: rgba(11, 14, 27, 0.5); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--border-glass);">
                                    <h4 style="color: var(--color-gold-primary); font-size: 0.95rem; margin-bottom: 0.75rem;">
                                        <i class="fa-solid fa-vial"></i> 반도체 공정 (Process)
                                    </h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                                        ${skills.process.map(s => `<span class="tag-badge">${s}</span>`).join('')}
                                    </div>
                                </div>

                                <!-- 2. 회로 설계 & 분석 -->
                                <div style="background: rgba(11, 14, 27, 0.5); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--border-glass);">
                                    <h4 style="color: var(--color-cyan-accent); font-size: 0.95rem; margin-bottom: 0.75rem;">
                                        <i class="fa-solid fa-wave-square"></i> 기초 회로 분석 (Circuit)
                                    </h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                                        ${skills.circuit.map(s => `<span class="tag-badge" style="border-color: rgba(255, 215, 0, 0.3); color: var(--color-gold-primary);">${s}</span>`).join('')}
                                    </div>
                                </div>

                                <!-- 3. 디지털 회로 & 코딩 -->
                                <div style="background: rgba(11, 14, 27, 0.5); padding: 1.25rem; border-radius: 12px; border: 1px solid var(--border-glass);">
                                    <h4 style="color: #a855f7; font-size: 0.95rem; margin-bottom: 0.75rem;">
                                        <i class="fa-solid fa-code"></i> 디지털 회로 & 코딩 (Coding)
                                    </h4>
                                    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                                        ${skills.coding.map(s => `<span class="tag-badge" style="border-color: rgba(168, 85, 247, 0.4); color: #c084fc;">${s}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    /**
     * 자기소개 편집 및 저장 이벤트 바인딩
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        const editBtn = containerEl.querySelector('#edit-bio-btn');
        const saveBtn = containerEl.querySelector('#save-bio-btn');
        const cancelBtn = containerEl.querySelector('#cancel-bio-btn');

        if (editBtn) {
            editBtn.addEventListener('click', () => {
                this.isEditing = true;
                this.onSaveProfile(this.profile, false); // 화면 재렌더링 트리거
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.isEditing = false;
                this.onSaveProfile(this.profile, false);
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const inputEdu = containerEl.querySelector('#input-education');
                const inputBio = containerEl.querySelector('#input-bio');

                if (inputEdu && inputBio) {
                    this.profile.education = inputEdu.value.trim();
                    this.profile.bio = inputBio.value.trim();
                    this.isEditing = false;

                    this.onSaveProfile(this.profile, true); // 데이터 저장 및 재렌더링
                    showToast('💾 자기소개가 정상적으로 수정 및 저장되었습니다!');
                }
            });
        }
    }
}
