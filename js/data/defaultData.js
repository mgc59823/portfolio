/**
 * ==========================================================================
 * 민경천 포트폴리오 - 기본 데이터셋 (defaultData.js)
 * 반도체 공정, 회로 설계 및 디지털 코딩 관련 기본 프로필 및 프로젝트 데이터
 * ==========================================================================
 */

export const DEFAULT_PROFILE = {
    name: "민경천",
    title: "반도체 공정 & 디지털 회로 엔지니어",
    headline: "반도체 공정과 디지털 회로를 잇는 엔지니어, 민경천입니다.",
    bio: "반도체 공정 이해(Lithography, Etching, Cleanroom)와 기초 회로 분석(RLC, BJT, MOSFET) 및 디지털 논리 회로 설계(Verilog, C/C++, Python) 역량을 겸비한 엔지니어입니다. 물리적 소자 특성 이해를 기반으로 한 하드웨어 및 디지털 회로 최적화에 깊은 관심을 가지고 있습니다.",
    education: "대학교 전자공학 / 반도체 관련 학과 전공 (2026)",
    email: "mgc59823@gmail.com",
    github: "https://github.com/mgc59823",
    skills: {
        process: ["Lithography", "Etching", "Cleanroom Protocol", "Thin Film Deposition", "Wafer Inspection"],
        circuit: ["RLC Filter Design", "BJT & MOSFET Analysis", "Op-Amp Circuit", "Spice Simulation"],
        coding: ["Verilog HDL", "Digital Logic Design", "C/C++", "Python", "FPGA Prototyping"]
    }
};

export const DEFAULT_PROJECTS = [
    {
        id: "proj-1",
        title: "🚀 대학생 창업 성향 테스트 웹 서비스",
        category: "coding",
        categoryName: "디지털 회로 & 코딩",
        summary: "3분 만에 알아보는 20대 대학생 창업 DNA 진단 및 환상의 팀 빌딩 콤비 추천 웹 서비스",
        tags: ["#창업성향테스트", "#VanillaJS", "#DesignSystem", "#Vercel"],
        image: "assets/images/portfolio_ui_mockup.png",
        externalUrl: "./personality/index.html",
        details: {
            role: "UI/UX 디자인 시스템 설계 및 프론트엔드 컴포넌트 개발",
            period: "2026.07",
            outcome: "6가지 성향 진단 알고리즘, 카카오톡 공유 기능 및 반응형 모바일 UX 구현 완료",
            description: "20대 대학생 창업 캠프 참가자를 위한 3분 몰입형 성향 진단 웹 서비스입니다. 12가지 상황 질문을 기반으로 6가지 창업 강점과 환상의 팀원 조합 팁을 제공합니다.",
            schematicUrl: "assets/images/portfolio_ui_mockup.png",
            externalUrl: "./personality/index.html"
        }

    },
    {
        id: "proj-eyecare",
        title: "👁️ 안구건조증 예방 눈 깜빡임 알림이 웹 서비스",
        category: "coding",
        categoryName: "디지털 회로 & 코딩",
        summary: "웹캠 AI(MediaPipe) 분석 및 아두이노 직코실드(Web Serial API) 네오픽셀 RGB & 부저 연동 헬스케어 시스템",
        tags: ["#안구건조증예방", "#MediaPipe", "#WebSerialAPI", "#아두이노", "#VanillaJS"],
        image: "assets/images/eye_care_ui_mockup.png",
        externalUrl: "./eyecare/index.html",
        details: {
            role: "MediaPipe Vision AI 및 Web Serial API 시리얼 통신 연동, 4단계 UI/UX 설계",
            period: "2026.07",
            outcome: "MediaPipe FaceMesh 기반 0.001초 EAR 눈 감음 실시간 측정 및 직코실드 RGB/부저 1:1 연동 완료",
            description: "웹캠 영상에서 사용자의 눈 깜빡임 주기(EAR)를 분석하여 안구건조증을 예방하는 스마트 헬스케어 웹 서비스입니다. 4단계 안구건조 위험도에 따라 아두이노 직코실드의 네오픽셀 LED 색상과 부저 경고음 주파수를 실시간으로 제어합니다.",
            schematicUrl: "assets/images/eye_care_ui_mockup.png",
            externalUrl: "./eyecare/index.html"
        }
    },
    {
        id: "proj-2",
        title: "MOSFET 소자 특성 파라미터 측정 및 회로 분석",
        category: "circuit",
        categoryName: "회로 설계 & 분석",
        summary: "MOSFET 게이트 전압 변화에 따른 드레인 전류 특성 곡선(Id-Vds) 측정 및 SPICE 모델링 분석",
        tags: ["#MOSFET", "#BJT", "#SPICE", "#CircuitAnalysis"],
        image: "assets/images/portfolio_ui_mockup.png",
        details: {
            role: "회로 소자 측정 및 SPICE 파라미터 추출",
            period: "2025.04 - 2025.06",
            outcome: "문턱 전압(Vth) 및 전달 컨덕턴스 측정 오차율 3% 이내 정밀 모델링 달성",
            description: "실제 증폭기 회로에서 BJT 및 MOSFET 소자의 바이아스 조건과 소신호 응답을 분석하였습니다.",
            schematicUrl: "assets/images/portfolio_ui_mockup.png"
        }
    },
    {
        id: "proj-3",
        title: "반도체 포토리소그래피 공정 변수 최적화 실험",
        category: "process",
        categoryName: "반도체 공정",
        summary: "노광 시간(Exposure Time) 및 현상(Development) 조건에 따른 패턴 해상도 및 수율 분석",
        tags: ["#Cleanroom", "#Lithography", "#Wafer", "#YieldAnalysis"],
        image: "assets/images/portfolio_ui_mockup.png",
        details: {
            role: "공정 파라미터 설계 및 광학 마이크로그래프 수율 분석",
            period: "2025.01 - 2025.03",
            outcome: "패턴 에지 거칠기(LER) 15% 개선 및 5㎛ 라인 패턴 성공적 형성",
            description: "웨이퍼 세정부터 감광액(PR) 코팅, 노광, 에칭 공정에 이르는 반도체 단품 제작 절차를 이수하였습니다.",
            schematicUrl: "assets/images/portfolio_ui_mockup.png"
        }
    }
];
