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
        title: "Verilog 기반 4비트 멀티 연산 알루(ALU) 설계",
        category: "coding",
        categoryName: "디지털 회로 & 코딩",
        summary: "Verilog HDL을 활용하여 덧셈, 뺄셈, 논리 연산이 가능한 4비트 ALU 회로 설계 및 파형 검증",
        tags: ["#Verilog", "#FPGA", "#ModelSim", "#DigitalLogic"],
        image: "assets/images/portfolio_ui_mockup.png",
        details: {
            role: "디지털 회로 총괄 설계 및 타이밍 시뮬레이션 검증",
            period: "2025.10 - 2025.12",
            outcome: "ModelSim 시뮬레이션 기반 전파 지연 12% 감소 및 정확한 로직 파형 동작 검증 성공",
            description: "가산기, 감산기 및 논리 게이트를 조합하여 4비트 ALU를 설계하고, FPGA 모듈로 프로토타이핑을 진행하였습니다.",
            schematicUrl: "assets/images/portfolio_ui_mockup.png"
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
