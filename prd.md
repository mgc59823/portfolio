# 📄 제품 요구사항 정의서 (PRD: Product Requirement Document)
## 민경천 - 반도체 공정 & 디지털 회로 엔지니어 포트폴리오 웹사이트

---

## 1. 프로젝트 개요 (Overview)

* **서비스명**: **민경천 개인 엔지니어 포트폴리오 (MGC.AI)**
* **목적**: 
  반도체 공정(Lithography, Etching, Cleanroom), 회로 분석(RLC, BJT, MOSFET) 및 디지털 논리 회로 설계(Verilog, FPGA) 분야에 특화된 민경천 엔지니어의 핵심 역량, 연구/설계 프로젝트, 이력서 다운로드 및 직통 이메일 문의 기능을 제공하는 반응형 포트폴리오 웹사이트입니다.
* **주요 타겟**: 
  반도체/디지털 회로 분야 리크루터, 채용 담당자, 연구실 교수진 및 프로젝트 협력 파트너.

---

## 2. 핵심 기능 요구사항 (Functional Requirements)

### F-1. 프로필 & 자기소개 영역 (Hero & Bio Editor)
* **엔지니어 칭호 및 대표 헤드라인**:
  * "반도체 공정과 디지털 회로를 잇는 엔지니어, 민경천입니다."
  * 반도체 공정/회로/코딩 3대 핵심 역량 태그 하이라이트.
* **관리자 암호 인증 기반 실시간 편집 (Bio Editor)**:
  * 🔒 암호 인증(`1234`) 시 화면 상에서 자기소개 문구 및 수정을 바로 진행할 수 있는 인라인 데이터 편집 기능.
  * LocalStorage 및 Supabase 데이터베이스 자동 이중 동기화.

---

### F-2. 프로젝트 쇼케이스 & 상세 모달 (Projects & Modal)
* **카테고리 필터링**:
  * 전체 (`All`), 반도체 공정 (`Process`), 회로 설계 & 분석 (`Circuit`), 디지털 회로 & 코딩 (`Coding`).
* **프로젝트 카드 & 상세 팝업**:
  * 대표 프로젝트 (Verilog ALU 설계, MOSFET 특성 분석, 포토리소그래피 변수 최적화 등).
  * 클릭 시 역할, 기간, 연구 성과 및 회로도/결과 이미지를 보여주는 모달 팝업 제공.

---

### F-3. 이메일 연락폼 & 직통 문의 (Contact Form - EmailJS)
* **직통 문의 입력 폼**:
  * **성함/이름 (`name`)**, **이메일 주소 (`email`)**, **연락처 (`number`)**, **문의 메시지 (`message`)** 4가지 입력 항목 제공.
* **EmailJS API 연동 자동 발송**:
  * [이메일 보내기] 클릭 시 `emailjs.send("service_3v1a6w8", "template_mm0m86s")`를 활용하여 수신자(`mgc59823@gmail.com`)에게 직접 전송.
  * 전송 중 로딩 스피너 및 성공/실패 토스트 메시지 노출.

---

### F-4. 이력서 다운로드 (Resume Download)
* PDF 형태의 정갈한 이력서 다운로드 기능 제공.

---

## 3. 기술 스택 (Tech Stack)

* **프론트엔드**: HTML5, Vanilla CSS3 (Midnight Dark Theme & Glassmorphism), JavaScript (ES6 Modules)
* **이메일 전송**: EmailJS SDK (Service: `service_3v1a6w8`, Template: `template_mm0m86s`)
* **데이터 관리**: Supabase Cloud Database + LocalStorage (이중 동기화)
