# 🔬 민경천 반도체 공정 & 디지털 회로 엔지니어 포트폴리오 (MGC Semiconductor & Digital Circuit Portfolio)

반도체 공정(Lithography, Etching)의 물리적 이해부터 RLC/BJT/MOSFET 기초 회로 분석 및 Verilog/FPGA 디지털 논리 회로 설계까지 검증된 엔지니어링 역량을 보여주는 반응형 모듈형 웹 포트폴리오입니다.

![Portfolio Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript ES6](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ 핵심 기능 & 특장점 (Key Features)

1. **🔒 나만 편집 가능한 자기소개 및 기술 스택 (Editable Bio)**
   - 비밀번호(`1234`) 인증을 통한 관리자 모드 잠금 해제
   - 웹 화면 인라인 수정/저장 기능 (LocalStorage & Supabase 데이터베이스 자동 연동)

2. **🖼 카테고리 필터링 작업물 갤러리 & 모달 (Project Gallery & Modal)**
   - `전체`, `반도체 공정`, `회로 설계 & 분석`, `디지털 회로 & 코딩` 필터링 탭
   - 프로젝트 카드 클릭 시 대형 회로도, 로직 파형, 수율 성과 데이터를 보여주는 상세 레이어 팝업

3. **🎨 Silicon & Circuit Architecture 디자인 시스템 (@design.md)**
   - 딥 미드나잇 인디고(`#0B0E1B`), 샴페인 골드(`#FFD700`), 전기 시안(`#00F2FE`) 글래스모피즘
   - `Plus Jakarta Sans`, `Noto Sans KR`, `JetBrains Mono` 서체 적용

4. **🧩 모듈형 UI 컴포넌트 구조**
   - `Header.js`, `Hero.js`, `BioEditor.js`, `ProjectCard.js`, `ProjectModal.js`, `Footer.js`로 분리되어 높은 재사용성 제공

---

## 🛠 실행 방법 (Getting Started)

```bash
# 로컬 개발 서버 실행
python3 -m http.server 8081
```

- **메인 포트폴리오 웹사이트**: `http://localhost:8081`
- **컴포넌트 디자인 데모 쇼케이스**: `http://localhost:8081/demo.html`

---

## 📁 프로젝트 파일 구조 (Project Structure)

```text
/Users/Min/projects/portfolio/
├── index.html                   # 메인 포트폴리오 웹페이지
├── demo.html                    # 컴포넌트 디자인 쇼케이스 데모
├── design.md                    # UI/UX 디자인 시스템 가이드
├── prd.md                       # 제품 요구사항 정의서
├── css/                         # CSS 스타일 모듈
│   ├── variables.css            # 디자인 토큰 & 색상 변수
│   ├── global.css               # 전역 리셋 & 레이아웃
│   ├── components.css           # 버튼, 카드, 모달 컴포넌트 스타일
│   └── animation.css            # 펄스, 호버 및 반응형 미디어 쿼리
├── js/                          # JavaScript 컴포넌트 & 유틸리티
│   ├── components/              # 독립 재사용 UI 컴포넌트 모듈
│   ├── utils/                   # 헬퍼 & LocalStorage 연동 모듈
│   ├── data/                    # 기본 프로필 & 프로젝트 데이터
│   └── app.js                   # 메인 애플리케이션 진입점
└── assets/images/               # 이미지 및 UI 시안 자산
```
