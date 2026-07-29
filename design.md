# 🎨 [Design Guide] LocalMate (로컬메이트) - UI/UX 디자인 가이드 시스템

> **문서 버전:** v1.0  
> **작성일:** 2026년 7월 29일  
> **작성자:** UI/UX 디자인 전문가 & 프론트엔드 엔지니어  
> **기준 PRD:** [prd.md](file:///Users/Min/projects/MyProject/portfolio/prd.md)  
> **대상 독자:** UI/UX 디자이너, 프론트엔드 개발자, 포트폴리오 리뷰어  

---

## 🌟 1. 디자인 시스템 개요 (Design Overview)

### 1.1 브랜드 핵심 가치 & 키워드
`LocalMate` 디자인 시스템은 **"신뢰성(Trust)"**과 **"활기찬 일상 교류(Vibrant Exchange)"**를 핵심 시각 가치로 삼습니다. 대학생 중심의 정직함과 글로벌 친구와의 캐주얼한 만남을 모던 라이트 테마로 표현합니다.

* **#Friendly (친근함):** 부드러운 라운딩 처리와 경쾌한 포인트 컬러로 진입 장벽 최소화
* **#Trustworthy (신뢰감):** 대학교 인증(.ac.kr) 배지 및 차분한 틸(Teal)/블루 톤으로 안심 매칭 환경 구축
* **#Vibrant (활기참):** 코럴 오렌지 CTA와 호버 인터랙션으로 적극적인 활동 유도
* **#Modern (모던함):** 글래스모피즘(Glassmorphic surface)과 서틀 섀도우(Subtle Shadow)를 활용한 입체감 있는 UI

---

## 🎨 2. 컬러 시스템 (Color Palette & Tokens)

### 2.1 브랜드 대표 컬러 (Brand Palette)

| 컬러 역할 | 색상 이름 | HEX Code | HSL Value | 용도 및 가이드 |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Theme** | **Teal Blue** | `#0D9488` | `hsl(173, 84%, 32%)` | 메인 테마, 헤더 아이콘, 신뢰 강조 브랜드 컬러 |
| **Primary Hover** | **Deep Teal** | `#0F766E` | `hsl(173, 77%, 26%)` | Primary 요소 호버 및 프라이머리 텍스트 |
| **Secondary Accent**| **Vibrant Coral** | `#FF6B35` | `hsl(16, 100%, 60%)` | 메인 CTA 버튼, 신청 완료, 핵심 강조 포인트 |
| **Accent Glow** | **Sunny Yellow** | `#FFC107` | `hsl(45, 100%, 51%)` | 별점 평가, 핫플 태그, 하이라이트 배지 |

---

### 2.2 신뢰 및 상태 컬러 (Trust & Status Colors)

```css
/* 대학교 인증 및 상태 표현 전용 토큰 */
--color-student-verified: #2563EB; /* Royal Blue - .ac.kr 대학생 인증 배지 */
--color-status-success:    #10B981; /* Emerald Green - 매칭 수락 완료 */
--color-status-pending:    #F59E0B; /* Amber - 매칭 대기 중 */
--color-status-rejected:   #EF4444; /* Rose Red - 매칭 거절/취소 */
```

---

### 2.3 배경 및 중립 컬러 (Neutral & Surface Colors)

```css
/* 라이트 모드 글래스모피즘 표면 토큰 */
--bg-page:            #F8FAFC; /* Slate 50 - 전체 배경색 */
--bg-surface:         rgba(255, 255, 255, 0.85); /* 백드롭 블러 결합 카드 표면 */
--bg-surface-solid:   #FFFFFF; /* 100% 불투명 백그라운드 */
--bg-surface-subtle:  #F1F5F9; /* Slate 100 - 검색바 및 입력 폼 배경 */

--border-glass:       rgba(226, 232, 240, 0.8); /* Slate 200 - 경계선 */
--border-active:      #0D9488; /* 활성화된 테두리 */

--text-primary:       #0F172A; /* Slate 900 - 메인 헤드라인 */
--text-secondary:     #475569; /* Slate 600 - 본문 및 서브 텍스트 */
--text-muted:         #94A3B8; /* Slate 400 - 날짜 및 캡션 */
--text-white:         #FFFFFF; /* 버튼 내 반전 텍스트 */
```

---

## ✍️ 3. 타이포그래피 시스템 (Typography System)

### 3.1 폰트 패밀리 구성
* **국문 & 통합 본문:** `Pretendard`, `Noto Sans KR`, sans-serif
* **영문 헤드라인 & 수치:** `Plus Jakarta Sans`, sans-serif
* **코드 & 타임라인 데이터:** `JetBrains Mono`, monospace

---

### 3.2 타이포 스케일 (Typography Hierarchy)

| 스케일 명칭 | Font Size (Desktop / Mobile) | Weight | Line Height | 주요 사용처 |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | `44px / 32px` | 800 (Bold) | `1.2` | 메인 랜딩 히어로 타이틀 |
| **Section H2** | `32px / 24px` | 700 (Bold) | `1.3` | 섹션 제목 ("인기 로컬 코스") |
| **Card Title H3**| `20px / 18px` | 600 (SemiBold)| `1.4` | 코스 카드 제목, 호스트 이름 |
| **Subtitle H4**  | `16px / 15px` | 600 (SemiBold)| `1.5` | 폼 라벨, 팝업 타이틀 |
| **Body Large**  | `16px / 16px` | 400 (Regular) | `1.6` | 코스 상세 소개글 본문 |
| **Body Medium** | `14px / 14px` | 400 (Regular) | `1.5` | 기본 카드 설명, 검색 텍스트 |
| **Caption / Tag**| `12px / 12px` | 500 (Medium)  | `1.4` | 태그 뱃지, 날짜, 인증 정보 |

---

## 🔘 4. 컴포넌트 디자인 규격 (Component Specifications)

### 4.1 버튼 시스템 (Button Scale & Variants)

```
[Button Scale]
┌─────────────────────────────────────────────────────────┐
│ Large (52px)   : padding 16px 28px | font 16px (Bold)   │ ➔ 메인 CTA, 매칭 신청
│ Medium (44px)  : padding 12px 20px | font 14px (Semi)   │ ➔ 필터 적용, 검색
│ Small (36px)   : padding 8px 14px  | font 12px (Medium) │ ➔ 카드 내부 퀵 액션
└─────────────────────────────────────────────────────────┘
```

#### A. Primary CTA Button (Vibrant Coral)
* **Background:** `linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)`
* **Text:** `#FFFFFF` (Font-weight: 700)
* **Border-Radius:** `12px`
* **Box Shadow:** `0 4px 14px rgba(255, 107, 53, 0.35)`
* **Hover Effect:** `transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255, 107, 53, 0.45);`

#### B. Secondary Outline Button (Teal Border)
* **Background:** `transparent`
* **Border:** `2px solid #0D9488`
* **Text:** `#0D9488` (Font-weight: 600)
* **Hover Effect:** `background: rgba(13, 148, 136, 0.08); color: #0F766E;`

#### C. Trust Badge Button (University Verified)
* **Background:** `#EFF6FF` (Blue 50)
* **Border:** `1px solid #BFDBFE`
* **Text:** `#1E40AF` (Font-weight: 600)
* **Icon:** 🎓 아이콘 포함

---

### 4.2 카드 & 모달 규격 (Card & Elevation Tokens)

#### A. 코스 그리드 카드 (Course Grid Card)
* **Dimensions:** Minimum height `360px`, Border-radius `16px`
* **Surface:** `rgba(255, 255, 255, 0.9)` + `backdrop-filter: blur(12px)`
* **Border:** `1px solid rgba(226, 232, 240, 0.8)`
* **Shadow:** `0 10px 25px -5px rgba(15, 23, 42, 0.06)`
* **Hover State:** `transform: translateY(-6px); border-color: #0D9488; shadow: 0 20px 30px -10px rgba(13, 148, 136, 0.18)`

#### B. 모달 레이어 팝업 (Booking Modal)
* **Width:** Max-width `540px`, Padding `32px`, Border-radius `24px`
* **Backdrop:** `rgba(15, 23, 42, 0.6)` + `backdrop-filter: blur(8px)`
* **Animation:** Scale up `(0.95 -> 1.0)` with `fade-in 0.25s ease-out`

#### C. 연락폼 카드 컴포넌트 (Contact Form Card)
* **Width:** Max-width `640px`, Container Padding `36px 32px`, Border-radius `24px`
* **Surface:** `rgba(255, 255, 255, 0.92)` + `backdrop-filter: blur(16px)`
* **Border:** `1px solid rgba(226, 232, 240, 0.9)`
* **Shadow:** `0 20px 40px -15px rgba(13, 148, 136, 0.12)`
* **Form Inputs:** Height `48px` (textarea: `140px`), Radius `12px`, Background `#F1F5F9`, Focus Border `#0D9488`
* **Submit Button:** Primary CTA (Vibrant Coral `#FF6B35`), Height `52px`, Full Width (`100%`)


---

### 4.3 태그 및 뱃지 (Pill & Tag Badges)

```html
<!-- 대학교 인증 배지 예시 -->
<span class="badge-student-verified">
  🎓 연세대학교 인증
</span>

<!-- 언어 태그 예시 -->
<span class="badge-language">
  🇰🇷 Native · 🇺🇸 English Learning
</span>

<!-- 로컬 코스 태그 예시 -->
<span class="tag-chip">#동네벚꽃길</span>
<span class="tag-chip">#학식체험</span>
```

---

## 📱 5. 주요 화면 레이아웃 와이어프레임 가이드

### 5.1 메인 랜딩 페이지 (Landing Page)
1. **Hero Section:** 좌측 타이포그래피 + 오른쪽 비주얼 커스텀 이미지 일러스트. 오렌지 Primary CTA 강조.
2. **Trust Banner:** 대학교 로고 및 `.ac.kr` 인증 절차를 3단계 카드 시각화.
3. **Course Carousel:** 가로 스크롤 가능 3단 코스 카드 배치를 통해 탐색 욕구 자극.

---

### 5.2 투어 검색 페이지 (Explore Page)
1. **Top Sticky Filter Bar:** 백드롭 블러 적용 상단 고정 필터. [날짜 | 언어 | 지역 | 카테고리]
2. **Course Grid:** Responsive CSS Grid (`repeat(auto-fill, minmax(280px, 1fr))`).

---

### 5.3 상세 프로필 & 예약 페이지 (Detail Page)
1. **Left Main Column:** 호스트 소개, 🎓 대학교 인증 정보, 타임라인별 투어 코스 정보.
2. **Right Sticky Card:** 날짜 선택 및 [매칭 신청하기] 고정 사이드바.

---

## 💻 6. 프론트엔드 전용 CSS 변수 코드 Snippet

```css
/* ==========================================================================
   LocalMate Design Tokens (:root)
   ========================================================================== */
:root {
  /* Brand Theme Colors */
  --color-primary: #0D9488;
  --color-primary-hover: #0F766E;
  --color-secondary: #FF6B35;
  --color-secondary-hover: #E85A24;
  --color-accent-yellow: #FFC107;

  /* Status & Trust */
  --color-verified-blue: #2563EB;
  --color-status-success: #10B981;
  --color-status-pending: #F59E0B;

  /* Surface & Background */
  --bg-page: #F8FAFC;
  --bg-surface: rgba(255, 255, 255, 0.85);
  --bg-surface-solid: #FFFFFF;
  --bg-surface-subtle: #F1F5F9;

  /* Borders & Shadows */
  --border-glass: rgba(226, 232, 240, 0.8);
  --border-active: #0D9488;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-card: 0 10px 25px -5px rgba(15, 23, 42, 0.06);
  --shadow-hover: 0 20px 30px -10px rgba(13, 148, 136, 0.18);
  --shadow-coral-glow: 0 4px 14px rgba(255, 107, 53, 0.35);

  /* Typography */
  --font-main: 'Pretendard', 'Noto Sans KR', sans-serif;
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-code: 'JetBrains Mono', monospace;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Transitions */
  --transition-fast: all 0.15s ease;
  --transition-smooth: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```
