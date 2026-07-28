/**
 * ==========================================================================
 * 민경천 포트폴리오 - 신규 작업물(프로젝트) 등록 폼 컴포넌트 (AdminProjectForm.js)
 * 프로젝트 제목, 분야, 기간, 역할, 성과, 회로도 이미지 파일 변환 및 등록 지원
 * ==========================================================================
 */

import { showToast } from '../utils/helpers.js';

export class AdminProjectFormComponent {
    /**
     * @param {Object} props onAddProject 신규 프로젝트 추가 콜백
     */
    constructor(props) {
        this.onAddProject = props.onAddProject || (() => {});
    }

    /**
     * 프로젝트 등록 폼 HTML 템플릿 생성
     * @returns {string} HTML 렌더링 문자열
     */
    render() {
        return `
            <div style="background: rgba(11, 14, 27, 0.5); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-glass); margin-bottom: 2.5rem;">
                <h3 style="font-size: 1.2rem; color: var(--color-cyan-accent); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-solid fa-circle-plus"></i> ➕ 새 작업물(프로젝트) 추가 등록
                </h3>

                <form id="new-project-form">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                        <div class="form-group">
                            <label for="proj-title"><i class="fa-solid fa-pen-nib"></i> 프로젝트 제목</label>
                            <input type="text" id="proj-title" class="form-control" placeholder="예: Verilog 8비트 RISC 프로세서 설계" required>
                        </div>

                        <div class="form-group">
                            <label for="proj-category"><i class="fa-solid fa-tags"></i> 분야 카테고리 선택</label>
                            <select id="proj-category" class="form-control" required>
                                <option value="process">🧪 반도체 공정 (Process)</option>
                                <option value="circuit">⚡️ 회로 설계 & 분석 (Circuit)</option>
                                <option value="coding" selected>💻 디지털 회로 & 코딩 (Coding)</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="proj-summary"><i class="fa-solid fa-align-left"></i> 카드용 한 줄 핵심 요약</label>
                        <input type="text" id="proj-summary" class="form-control" placeholder="프로젝트의 주요 내용과 핵심 파라미터를 한 줄로 요약" required>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
                        <div class="form-group">
                            <label for="proj-period"><i class="fa-solid fa-calendar-days"></i> 수행 기간</label>
                            <input type="text" id="proj-period" class="form-control" placeholder="예: 2025.09 - 2025.12" required>
                        </div>
                        <div class="form-group">
                            <label for="proj-role"><i class="fa-solid fa-user-gear"></i> 담당 역할</label>
                            <input type="text" id="proj-role" class="form-control" placeholder="예: 회로 설계 및 로직 시뮬레이션 총괄" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="proj-outcome"><i class="fa-solid fa-trophy"></i> 정량적 핵심 엔지니어링 성과</label>
                        <input type="text" id="proj-outcome" class="form-control" placeholder="예: 전파 지연 15% 개선 및 100MHz 동작 주파수 검증 성공" required>
                    </div>

                    <div class="form-group">
                        <label for="proj-description"><i class="fa-solid fa-file-prescription"></i> 세부 프로젝트 설명</label>
                        <textarea id="proj-description" class="form-control" rows="4" placeholder="프로젝트 진행 과정, 사용 소자, 공정 조건 등 세부 내용을 작성하세요." required></textarea>
                    </div>

                    <!-- 이미지 첨부 필드 -->
                    <div style="background: rgba(20, 26, 48, 0.8); padding: 1.25rem; border-radius: 10px; border: 1px dashed var(--border-circuit); margin-bottom: 1.25rem;">
                        <label style="color: var(--color-cyan-accent); margin-bottom: 0.75rem; font-weight: 700; display: block;">
                            <i class="fa-solid fa-image"></i> 회로도/사진 이미지 첨부 (URL 입력 또는 파일 직접 선택)
                        </label>
                        
                        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <div>
                                <span style="font-size: 0.8rem; color: var(--text-secondary);">1) 이미지 URL 직접 입력:</span>
                                <input type="text" id="proj-image-url" class="form-control" placeholder="assets/images/portfolio_ui_mockup.png 또는 https://..." value="assets/images/portfolio_ui_mockup.png">
                            </div>
                            
                            <div style="text-align: center; color: var(--text-muted); font-size: 0.8rem;">- 또는 -</div>

                            <div>
                                <span style="font-size: 0.8rem; color: var(--text-secondary);">2) PC에서 사진 파일 선택 (Base64 변환):</span>
                                <input type="file" id="proj-image-file" class="form-control" accept="image/*">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="proj-tags"><i class="fa-solid fa-hashtag"></i> 기술 스택 태그 (쉼표로 구분)</label>
                        <input type="text" id="proj-tags" class="form-control" placeholder="#Verilog, #FPGA, #ModelSim" value="#Verilog, #DigitalLogic, #FPGA" required>
                    </div>

                    <div style="display: flex; justify-content: flex-end; margin-top: 1.5rem;">
                        <button type="submit" class="btn btn-primary btn-lg">
                            <i class="fa-solid fa-plus"></i> 새 작업물 프로젝트 추가 등록
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    /**
     * 이미지 파일을 Base64 데이터 스트림으로 변환
     * @param {File} file 
     * @returns {Promise<string>}
     */
    convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    /**
     * 폼 제출 이벤트 처리
     * @param {HTMLElement} containerEl 부모 DOM 요소
     */
    bindEvents(containerEl) {
        const form = containerEl.querySelector('#new-project-form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const title = containerEl.querySelector('#proj-title').value.trim();
                const category = containerEl.querySelector('#proj-category').value;
                const summary = containerEl.querySelector('#proj-summary').value.trim();
                const period = containerEl.querySelector('#proj-period').value.trim();
                const role = containerEl.querySelector('#proj-role').value.trim();
                const outcome = containerEl.querySelector('#proj-outcome').value.trim();
                const description = containerEl.querySelector('#proj-description').value.trim();
                const tagsInput = containerEl.querySelector('#proj-tags').value.trim();

                let imageSrc = containerEl.querySelector('#proj-image-url').value.trim() || 'assets/images/portfolio_ui_mockup.png';
                const fileInput = containerEl.querySelector('#proj-image-file');

                if (fileInput && fileInput.files && fileInput.files[0]) {
                    imageSrc = await this.convertFileToBase64(fileInput.files[0]);
                }

                const categoryNameMap = {
                    process: '🧪 반도체 공정',
                    circuit: '⚡️ 회로 설계 & 분석',
                    coding: '💻 디지털 회로 & 코딩'
                };

                const tagsArray = tagsInput.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`);

                const newProject = {
                    id: `proj-${Date.now()}`,
                    title,
                    category,
                    categoryName: categoryNameMap[category] || '기술 프로젝트',
                    summary,
                    tags: tagsArray,
                    image: imageSrc,
                    details: {
                        role,
                        period,
                        outcome,
                        description,
                        schematicUrl: imageSrc
                    }
                };

                this.onAddProject(newProject);
                showToast('🎉 새로운 작업물이 성공적으로 등록되었습니다!');
            });
        }
    }
}
