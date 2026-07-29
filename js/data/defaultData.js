/**
 * ==========================================================================
 * LocalMate - 기본 시뮬레이션 데이터 정의서 (defaultData.js)
 * 로컬 코스 목록, 호스트 샘플 프로필 및 리뷰 샘플 데이터 수록
 * ==========================================================================
 */

/**
 * 초기 시뮬레이션 로컬 코스 목록 데이터
 */
export const DEFAULT_COURSES = [
  {
    id: 'course-1',
    title: '동네 숨은 벚꽃 명소 산책하고 로컬 파스타 맛집 가기',
    description: '인터넷에 안 나오는 신촌 숨은 벚꽃길을 함께 걸으며 자유롭게 영어/한국어로 대화하고, 연세대 학생들의 찐 로컬 파스타집을 탐방합니다.',
    hostName: '김민수',
    hostUniversity: '연세대학교',
    isVerified: true,
    hostAvatar: 'assets/images/avatar_placeholder.svg',
    thumbnail: 'assets/images/portfolio_ui_mockup.png',
    categoryTag: '#산책',
    category: 'walk',
    durationHours: 2,
    location: '신촌/홍대',
    languages: ['Native 🇰🇷', 'Practice 🇺🇸'],
    languageCode: 'en',
    rating: 4.9,
    reviewCount: 24,
    timeline: [
      { time: '14:00 - 미팅', title: '신촌역 2번 출구 앞 만남', desc: '반갑게 인사 나누고 오늘의 산책 동선 소개' },
      { time: '14:30 - 산책', title: '연세대학교 숨은 벚꽃 산책로', desc: '캠퍼스 내 예쁜 스팟에서 서로 사진 찍어주고 자유 대화' },
      { time: '15:30 - 맛집', title: '로컬 피자/파스타 맛집 시식', desc: '대학생 가성비 찐맛집에서 윈윈 언어 교환 대화' }
    ]
  },
  {
    id: 'course-2',
    title: '한국 대학생의 리얼 공강 시간 (PC방 2시간 + 학식 시식) 체험',
    description: '한국 고유의 공강 문화를 그대로 경험해보세요! 최신 사양 PC방에서 최고급 먹거리 주문을 체험하고 대학 본관 학생식당을 탐방합니다.',
    hostName: '이지원',
    hostUniversity: '고려대학교',
    isVerified: true,
    hostAvatar: 'assets/images/avatar_placeholder.svg',
    thumbnail: 'assets/images/portfolio_ui_mockup.png',
    categoryTag: '#공강체험',
    category: 'campus',
    durationHours: 3,
    location: '안암/고려대',
    languages: ['Native 🇰🇷', 'Fluent 🇺🇸'],
    languageCode: 'en',
    rating: 5.0,
    reviewCount: 15,
    timeline: [
      { time: '13:00 - 미팅', title: '안암역 1번 출구 미팅', desc: '대학생 일상 문화에 대한 아젠다 프리뷰' },
      { time: '13:30 - PC방', title: '프리미엄 PC방 먹거리 & 게임 체험', desc: '자리에서 라면/소떡소떡 주문하기 및 가벼운 인게임 대화' },
      { time: '15:00 - 학식', title: '고려대 학생식당 대표 메뉴 탐방', desc: '가성비 학식 시식 및 캠퍼스 라이프 토크' }
    ]
  },
  {
    id: 'course-3',
    title: '망원시장 길거리 장보고 한강 공원에서 뚝배기 라면 먹기',
    description: '망원시장의 다양한 닭강정, 핫바, 떡볶이를 탐방하고, 한강공원으로 걸어가 자동 라면 조리기로 끓인 라면을 피크닉하며 수다 떠는 코스입니다.',
    hostName: '박서준',
    hostUniversity: '서강대학교',
    isVerified: true,
    hostAvatar: 'assets/images/avatar_placeholder.svg',
    thumbnail: 'assets/images/portfolio_ui_mockup.png',
    categoryTag: '#로컬맛집',
    category: 'food',
    durationHours: 3,
    location: '망원/연남',
    languages: ['Native 🇰🇷', 'Practice 🇯🇵'],
    languageCode: 'jp',
    rating: 4.8,
    reviewCount: 31,
    timeline: [
      { time: '15:00 - 미팅', title: '망원역 2번 출구 만남', desc: '망원시장 입구로 도보 이동' },
      { time: '15:20 - 시장', title: '망원 전통시장 맛집 장보기', desc: '인기 닭강정 및 시그니처 핫바 구매' },
      { time: '16:30 - 한강', title: '망원 한강공원 즉석 라면 피크닉', desc: '돗자리 펴고 한강을 바라보며 언어 교환 토크' }
    ]
  }
];

/**
 * 초기 시뮬레이션 호스트 프로필 샘플 데이터
 */
export const DEFAULT_HOST = {
  name: '김민수',
  university: '연세대학교 컴퓨터공학과',
  isVerified: true,
  avatar: 'assets/images/avatar_placeholder.svg',
  mannerTemp: 37.8,
  nativeLang: '한국어 (Native)',
  learningLang: '영어 (Fluent / Practice)',
  bio: '안녕하세요! 신촌 근처 맛집과 숨은 산책로를 잘 아는 대학생 김민수입니다. 어학연수 대신 실전 영어를 매일 연습하고 싶고, 한국을 방문한 친근한 외국인 친구를 사귀고 싶어서 호스트로 등록했어요!',
  interests: ['#실전영어', '#캠퍼스투어', '#맛집탐방', '#한강산책']
};
