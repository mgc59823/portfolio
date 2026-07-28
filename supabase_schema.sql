-- ==========================================================================
-- 민경천 포트폴리오 - Supabase 데이터베이스 테이블 생성 SQL 스크립트
-- Supabase 대시보드 -> SQL Editor 메뉴에서 아래 코드를 복사하여 실행하세요.
-- ==========================================================================

-- 1. 프로필 및 자기소개 테이블 (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY DEFAULT 'mgc_profile',
    name TEXT NOT NULL DEFAULT '민경천',
    title TEXT NOT NULL DEFAULT '반도체 공정 & 디지털 회로 엔지니어',
    headline TEXT NOT NULL DEFAULT '반도체 공정과 디지털 회로를 잇는 엔지니어, 민경천입니다.',
    education TEXT NOT NULL DEFAULT '대학교 전자공학 / 반도체 관련 학과 전공 (2026)',
    bio TEXT NOT NULL,
    skills JSONB NOT NULL DEFAULT '{}'::jsonb,
    email TEXT DEFAULT 'mgc59823@gmail.com',
    github TEXT DEFAULT 'https://github.com/mgc59823',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 작업물 프로젝트 테이블 (projects)
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    category_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    image TEXT NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) 및 공공 접근 권한 설정
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 읽기 및 쓰기 익명 정책 허용 (모든 방문자 읽기 가능 & 관리자/익명 저장 가능)
CREATE POLICY "Allow public read profile" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update profile" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update/delete projects" ON public.projects FOR ALL USING (true);

-- 4. 초기 기본 샘플 프로필 데이터 삽입
INSERT INTO public.profiles (id, name, title, headline, education, bio, skills, email, github)
VALUES (
    'mgc_profile',
    '민경천',
    '반도체 공정 & 디지털 회로 엔지니어',
    '반도체 공정과 디지털 회로를 잇는 엔지니어, 민경천입니다.',
    '대학교 전자공학 / 반도체 관련 학과 전공 (2026)',
    '반도체 공정 이해(Lithography, Etching, Cleanroom)와 기초 회로 분석(RLC, BJT, MOSFET) 및 디지털 논리 회로 설계(Verilog, C/C++, Python) 역량을 겸비한 엔지니어입니다. 물리적 소자 특성 이해를 기반으로 한 하드웨어 및 디지털 회로 최적화에 깊은 관심을 가지고 있습니다.',
    '{"process": ["Lithography", "Etching", "Cleanroom Protocol", "Thin Film Deposition", "Wafer Inspection"], "circuit": ["RLC Filter Design", "BJT & MOSFET Analysis", "Op-Amp Circuit", "Spice Simulation"], "coding": ["Verilog HDL", "Digital Logic Design", "C/C++", "Python", "FPGA Prototyping"]}'::jsonb,
    'mgc59823@gmail.com',
    'https://github.com/mgc59823'
)
ON CONFLICT (id) DO NOTHING;

-- 5. 초기 기본 샘플 프로젝트 3개 삽입
INSERT INTO public.projects (id, title, category, category_name, summary, tags, image, details)
VALUES 
(
    'proj-1',
    'Verilog 기반 4비트 멀티 연산 알루(ALU) 설계',
    'coding',
    '💻 디지털 회로 & 코딩',
    'Verilog HDL을 활용하여 덧셈, 뺄셈, 논리 연산이 가능한 4비트 ALU 회로 설계 및 파형 검증',
    '["#Verilog", "#FPGA", "#ModelSim", "#DigitalLogic"]'::jsonb,
    'assets/images/portfolio_ui_mockup.png',
    '{"role": "디지털 회로 총괄 설계 및 타이밍 시뮬레이션 검증", "period": "2025.10 - 2025.12", "outcome": "ModelSim 시뮬레이션 기반 전파 지연 12% 감소 및 정확한 로직 파형 동작 검증 성공", "description": "가산기, 감산기 및 논리 게이트를 조합하여 4비트 ALU를 설계하고, FPGA 모듈로 프로토타이핑을 진행하였습니다.", "schematicUrl": "assets/images/portfolio_ui_mockup.png"}'::jsonb
),
(
    'proj-2',
    'MOSFET 소자 특성 파라미터 측정 및 회로 분석',
    'circuit',
    '⚡️ 회로 설계 & 분석',
    'MOSFET 게이트 전압 변화에 따른 드레인 전류 특성 곡선(Id-Vds) 측정 및 SPICE 모델링 분석',
    '["#MOSFET", "#BJT", "#SPICE", "#CircuitAnalysis"]'::jsonb,
    'assets/images/portfolio_ui_mockup.png',
    '{"role": "회로 소자 측정 및 SPICE 파라미터 추출", "period": "2025.04 - 2025.06", "outcome": "문턱 전압(Vth) 및 전달 컨덕턴스 측정 오차율 3% 이내 정밀 모델링 달성", "description": "실제 증폭기 회로에서 BJT 및 MOSFET 소자의 바이아스 조건과 소신호 응답을 분석하였습니다.", "schematicUrl": "assets/images/portfolio_ui_mockup.png"}'::jsonb
),
(
    'proj-3',
    '반도체 포토리소그래피 공정 변수 최적화 실험',
    'process',
    '🧪 반도체 공정',
    '노광 시간(Exposure Time) 및 현상(Development) 조건에 따른 패턴 해상도 및 수율 분석',
    '["#Cleanroom", "#Lithography", "#Wafer", "#YieldAnalysis"]'::jsonb,
    'assets/images/portfolio_ui_mockup.png',
    '{"role": "공정 파라미터 설계 및 광학 마이크로그래프 수율 분석", "period": "2025.01 - 2025.03", "outcome": "패턴 에지 거칠기(LER) 15% 개선 및 5㎛ 라인 패턴 성공적 형성", "description": "웨이퍼 세정부터 감광액(PR) 코팅, 노광, 에칭 공정에 이르는 반도체 단품 제작 절차를 이수하였습니다.", "schematicUrl": "assets/images/portfolio_ui_mockup.png"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
