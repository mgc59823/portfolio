/* ==========================================================================
   Personality Test - Data Store (12 Questions & 6 Personality Types)
   ========================================================================== */

export const PERSONALITY_TYPES = {
  visionary: {
    id: "visionary",
    title: "💡 아이디어형 (The Visionary Ideator)",
    subtitle: "창의적인 영감이 마르지 않는 아이디어 뱅크",
    icon: "💡",
    themeClass: "badge-visionary",
    themePrimary: "var(--theme-visionary-primary)",
    themeBg: "var(--theme-visionary-bg)",
    tags: ["#기발함", "#브레인스토밍", "#피보팅왕"],
    oneLiner: "세상을 바꿀 기발한 아이디어와 문제 해결 영감이 넘쳐나는 창의파!",
    strengths: [
      "남들이 보지 못하는 새로운 문제점과 기회를 빠르게 포착함",
      "막힌 상황에서도 다양한 각도의 피보팅(Pivoting) 아이디어 제시",
      "팀 내 브레인스토밍 분위기를 주도하여 유연한 사고 촉진"
    ],
    improvements: [
      "아이디어가 너무 많아 하나에 집중하기 어려울 수 있으니 우선순위 선정 필요",
      "기획 단계에 머무르지 않고 실제 프로토타입 제작 및 실행으로 이어지는 노력 자제력 필요"
    ],
    bestCombo: {
      title: "🛠️ 제작형 (Maker)",
      desc: "아이디어를 실제 눈에 보이는 프로토타입으로 빠르게 만들어줌"
    },
    worstCombo: {
      title: "📊 분석형 (Analyst)",
      desc: "초반 아이디어 단계에서 논리적 비판으로 브레이크를 걸 수 있으니 대화 필요"
    },
    teamTip: "캠프 쉬는 시간에 '이거 어떻게 만들어?'라고 현실적 구현 방법을 고민하는 [제작형] 동료를 찾아 팀을 이뤄보세요!"
  },
  maker: {
    id: "maker",
    title: "🛠️ 제작형 (The Hands-on Maker)",
    subtitle: "기획을 실제 서비스로 탄생시키는 구현 능력자",
    icon: "🛠️",
    themeClass: "badge-maker",
    themePrimary: "var(--theme-maker-primary)",
    themeBg: "var(--theme-maker-bg)",
    tags: ["#프로토타입", "#구현력최강", "#화면시각화"],
    oneLiner: "말보다 결과물! 생각한 아이디어를 바로 화면과 서비스로 만들어내는 실천파!",
    strengths: [
      "복잡한 기획안을 단숨에 눈에 보이는 MVP(최소 기능 제품)로 제작",
      "기술적 가능성과 디테일한 사용자 UI/UX 화면 구성 능력 보유",
      "팀의 아이디어를 현실화하여 발표 자료의 설득력 극대화"
    ],
    improvements: [
      "직접 만드는 데 몰두하다가 실제 사용자의 피드백을 놓치지 않도록 주의",
      "개발/디자인 전에 사업성과 시장 니즈를 점검하는 단계를 거치면 완벽"
    ],
    bestCombo: {
      title: "💡 아이디어형 (Visionary)",
      desc: "만들고 싶은 흥미진진한 서비스 컨셉을 끊임없이 제공함"
    },
    worstCombo: {
      title: "🤝 협업형 (Connector)",
      desc: "만드는 작업에 집중할 때 커뮤니케이션 요청이 많아 호흡 조율이 필요함"
    },
    teamTip: "참신한 아이디어는 넘치지만 어떻게 만들지 고민 중인 [아이디어형] 친구를 찾아가 구세주가 되어주세요!"
  },
  strategist: {
    id: "strategist",
    title: "📈 전략형 (The Master Strategist)",
    subtitle: "수익 모델과 시장 구조를 설계하는 비즈니스 건축가",
    icon: "📈",
    themeClass: "badge-strategist",
    themePrimary: "var(--theme-strategist-primary)",
    themeBg: "var(--theme-strategist-bg)",
    tags: ["#수익모델", "#IR발표", "#시장분석"],
    oneLiner: "비즈니스 모델(BM)과 시장 구조를 정밀하게 설계하는 전략 전문가!",
    strengths: [
      "아이템의 수익 구조(Monetization)와 타겟 시장 규모 정밀 측정",
      "심사위원을 설득하는 논리적인 IR 피칭 스토리텔링 구상",
      "경쟁사 분석 및 차별화 포인트 도출 능력 우수"
    ],
    improvements: [
      "완벽한 전략 수립에 시간이 지나치게 소요되어 행동이 늦어지지 않도록 관리",
      "가설 검증 시 현장의 예상치 못한 변수에 유연하게 대응하는 마음가짐 필요"
    ],
    bestCombo: {
      title: "🎯 실행형 (Action Driver)",
      desc: "설계한 비즈니스 가설을 현장에서 즉시 검증해 옴"
    },
    worstCombo: {
      title: "💡 아이디어형 (Visionary)",
      desc: "자꾸 사업성이 부족한 아이디어를 가져와 마찰이 생길 수 있음"
    },
    teamTip: "고객 인터뷰나 영업을 두려워하지 않는 [실행형] 친구와 손을 잡으면 가설 검증 속도가 2배 빨라집니다!"
  },
  connector: {
    id: "connector",
    title: "🤝 협업형 (The People Connector)",
    subtitle: "팀의 조화를 이끌고 소통을 매끄럽게 돕는 분위기 메이커",
    icon: "🤝",
    themeClass: "badge-connector",
    themePrimary: "var(--theme-connector-primary)",
    themeBg: "var(--theme-connector-bg)",
    tags: ["#팀워크", "#소통왕", "#인터뷰리더"],
    oneLiner: "팀원들의 경청과 협업을 이끌어내고 분위기를 밝게 만드는 소통의 중재자!",
    strengths: [
      "팀원 간의 의견 충돌을 부드럽게 경청하고 원만한 합의 도출",
      "고객 인터뷰 및 멘토 피드백 수집 시 친근하고 매끄러운 진행",
      "팀원 각자의 장점을 발굴하여 사기를 북돋우는 긍정 에너지 제공"
    ],
    improvements: [
      "모두의 의견을 다 반영하려다 주도적인 의사결정이 지연될 수 있음",
      "냉정한 수치 평가나 단호한 결단이 필요할 때 객관성 유지 필요"
    ],
    bestCombo: {
      title: "📊 분석형 (Analyst)",
      desc: "차가운 데이터 지표를 바탕으로 원활한 소통 논리를 보완해 줌"
    },
    worstCombo: {
      title: "🛠️ 제작형 (Maker)",
      desc: "제작에 집중할 때 잦은 멘탈 케어가 오해를 부를 수 있으니 적절한 거리 유지"
    },
    teamTip: "데이터 분석과 객관적 피드백 수집에 강한 [분석형] 동료와 팀을 이루면 사람과 데이터의 완벽한 조화를 만듭니다!"
  },
  analyst: {
    id: "analyst",
    title: "📊 분석형 (The Data Analyst)",
    subtitle: "데이터와 고객 지표로 가설을 검증하는 팩트 조향사",
    icon: "📊",
    themeClass: "badge-analyst",
    themePrimary: "var(--theme-analyst-primary)",
    themeBg: "var(--theme-analyst-bg)",
    tags: ["#팩트체크", "#지표검증", "#리스크관리"],
    oneLiner: "데이터와 설문 조사 결과로 객관적인 사실만을 검증하는 꼼꼼한 팩트 폭격기!",
    strengths: [
      "설문조사 데이터와 시장 지표를 논리적으로 도출하고 분석",
      "팀이 빠지기 쉬운 논리적 오류나 수치적 리스크를 미리 감지 및 방지",
      "객관적인 수치 자료를 바탕으로 사업계획서의 신뢰도 상승"
    ],
    improvements: [
      "초반 아이디어 단계에서 과도한 팩트 비판으로 팀 분위기를 어둡게 하지 않도록 조율",
      "완벽한 데이터가 없더라도 일단 정성적 테스트를 시도해보는 자세 필요"
    ],
    bestCombo: {
      title: "🤝 협업형 (Connector)",
      desc: "분석한 데이터를 부드럽고 설득력 있게 사람들에게 전달해 줌"
    },
    worstCombo: {
      title: "🎯 실행형 (Action Driver)",
      desc: "데이터 없이 무작정 일단 밖으로 뛰어나가려 할 때 마찰 발생 가능"
    },
    teamTip: "내 분석 결과 데이터를 친근하게 사용자 인터뷰로 풀어내 주는 [협업형] 동료와 팀을 구성해보세요!"
  },
  action: {
    id: "action",
    title: "🎯 실행형 (The Action Driver)",
    subtitle: "생각할 시간에 발로 뛰며 현장 고객을 만나는 불도저",
    icon: "🎯",
    themeClass: "badge-action",
    themePrimary: "var(--theme-action-primary)",
    themeBg: "var(--theme-action-bg)",
    tags: ["#불도저실행력", "#현장고객인터뷰", "#추진력갑"],
    oneLiner: "고민할 시간에 당장 거리로 나가 고객 목소리를 듣는 엄청난 추진력의 행동파!",
    strengths: [
      "실제 고객을 직접 찾아가 인터뷰하고 서베이를 따내는 강한 실행력",
      "실패를 두려워하지 않고 빠른 테스트와 피드백 반영 시도",
      "팀에 침체기가 올 때 활력을 불어넣는 추진력의 견인차 역할"
    ],
    improvements: [
      "방향성 체계 없이 무작정 실행하다 에너지가 소모되지 않도록 목표 점검",
      "팀원들과의 실행 전략 사전 조율을 거치는 신중함 한 스푼 필요"
    ],
    bestCombo: {
      title: "📈 전략형 (Strategist)",
      desc: "정밀하게 만든 비즈니스 가설을 가지고 가장 효율적으로 뛸 수 있게 방향을 잡아줌"
    },
    worstCombo: {
      title: "📊 분석형 (Analyst)",
      desc: "뛰어나가기 전 데이터를 계속 요구하여 의견이 엇갈릴 수 있음"
    },
    teamTip: "정밀한 시장 분석과 IR 피칭 전략을 짜주는 [전략형] 친구와 함께라면 1등 수상도 문제없습니다!"
  }
};

export const QUESTIONS = [
  {
    id: 1,
    title: "Q1. 창업 캠프 첫날, 해커톤 주제가 발표되었다. 당신의 첫 행동은?",
    options: [
      { label: "A", text: "기발하고 해괴망측한 아이디어를 세면대에 물 틀듯 쏟아낸다.", type: "visionary" },
      { label: "B", text: "어떤 기술 스택과 화면 디자인으로 빠르게 구현할지 구상한다.", type: "maker" },
      { label: "C", text: "이 주제가 시장에서 수익성이 있을지 비즈니스 모델(BM)을 계산해본다.", type: "strategist" },
      { label: "D", text: "팀원들의 자기소개를 이끌며 기분 좋은 대화 물꼬를 튼다.", type: "connector" }
    ]
  },
  {
    id: 2,
    title: "Q2. 아이디어 방향을 수정하는 '피보팅(Pivoting)'이 필요한 순간, 당신은?",
    options: [
      { label: "A", text: "오히려 좋아! 방금 떠오른 새로운 컨셉 3가지를 제시한다.", type: "visionary" },
      { label: "B", text: "수정된 아이디어에 맞게 기존 화면과 프로토타입을 빠르게 재구성한다.", type: "maker" },
      { label: "C", text: "당장 밖으로 나가서 대학생 10명에게 직접 물어보고 결정하자고 제안한다.", type: "action" },
      { label: "D", text: "지금까지 수집된 설문 데이터에서 어떤 공통점이 있었는지 재분석한다.", type: "analyst" }
    ]
  },
  {
    id: 3,
    title: "Q3. 팀원 간의 역할 분담을 정할 때, 당신이 선호하는 역할은?",
    options: [
      { label: "A", text: "전체 서비스 컨셉 기획 및 브레인스토밍 리더", type: "visionary" },
      { label: "B", text: "실제 동작하는 와이어프레임 & 화면 개발/디자인 총괄", type: "maker" },
      { label: "C", text: "시장 규모 분석 및 IR 발표 피칭덱(PPT) 제작", type: "strategist" },
      { label: "D", text: "팀원 의견 수렴, 멘토 피드백 정리 및 커뮤니케이션 담당", type: "connector" }
    ]
  },
  {
    id: 4,
    title: "Q4. 멘토님이 아이템에 대해 매서운 비판 피드백을 주셨을 때 반응은?",
    options: [
      { label: "A", text: "멘토님의 지적 포인트를 데이터적 수치로 가설 검증해본다.", type: "analyst" },
      { label: "B", text: "지적받은 부분을 보완할 수 있는 새로운 차별화 기능 아이디어를 낸다.", type: "visionary" },
      { label: "C", text: "상처받은 팀원들의 멘탈을 케어하고 다시 활기찬 분위기를 만든다.", type: "connector" },
      { label: "D", text: "멘토님이 말씀하신 현장 고객 반응을 직접 바로 구하러 나간다.", type: "action" }
    ]
  },
  {
    id: 5,
    title: "Q5. 고객 반응 검증을 위한 설문지를 작성할 때 가장 신경 쓰는 부분은?",
    options: [
      { label: "A", text: "질문 문항이 객관적이고 데이터 통계를 내기 쉬운 구조인지 점검한다.", type: "analyst" },
      { label: "B", text: "고객이 한 눈에 이해할 수 있도록 깔끔한 UI 및 랜딩페이지 형태로 제작한다.", type: "maker" },
      { label: "C", text: "이 제품에 돈을 지불할 용의(WTP)가 있는지 수익 모델 관련 질문을 넣는다.", type: "strategist" },
      { label: "D", text: "설문지 작성에 그치지 않고 인터뷰 응답자를 직접 섭외하고 모신다.", type: "action" }
    ]
  },
  {
    id: 6,
    title: "Q6. 해커톤 발표 3시간 전, 가장 긴급하다고 생각하는 작업은?",
    options: [
      { label: "A", text: "시연할 프로토타입의 치명적인 버그 수정 및 화면 마감", type: "maker" },
      { label: "B", text: "발표 장표의 논리적 흐름과 수익 구조(BM) 데이터 최종 점검", type: "strategist" },
      { label: "C", text: "발표자가 자신감을 가질 수 있도록 리허설을 돕고 응원하기", type: "connector" },
      { label: "D", text: "발표 직전까지 방금 받은 고객 인터뷰 영상/지표 하나라도 더 추가하기", type: "action" }
    ]
  },
  {
    id: 7,
    title: "Q7. 프로젝트 중 예상치 못한 문제가 터졌을 때 해결 방식은?",
    options: [
      { label: "A", text: "기존 방식을 뛰어넘는 신선한 우회 아이디어를 고민한다.", type: "visionary" },
      { label: "B", text: "문인의 정확한 원인이 무엇인지 수치와 로그를 파악한다.", type: "analyst" },
      { label: "C", text: "일단 몸으로 부딪히며 가능한 해결책들을 신속하게 시도한다.", type: "action" },
      { label: "D", text: "팀원들과 한자리에 모여 각자의 솔루션을 이야기하도록 경청한다.", type: "connector" }
    ]
  },
  {
    id: 8,
    title: "Q8. 내가 창업할 때 가장 중요하게 생각하는 성공 요소는?",
    options: [
      { label: "A", text: "아무도 생각하지 못한 독창적인 차별화 컨셉", type: "visionary" },
      { label: "B", text: "완벽한 완성도를 자랑하는 제품 및 서비스 품질", type: "maker" },
      { label: "C", text: "확실한 수익을 창출하는 비즈니스 구조와 시장성", type: "strategist" },
      { label: "D", text: "어떤 시련도 이겨내는 강한 팀워크와 파트너십", type: "connector" }
    ]
  },
  {
    id: 9,
    title: "Q9. 팀원 중 한 명이 사기가 떨어져 힘들어할 때 나의 행동은?",
    options: [
      { label: "A", text: "따뜻한 음료를 건네며 이야기를 들어주고 공감해준다.", type: "connector" },
      { label: "B", text: "그 팀원의 업무 부담을 줄여주기 위해 내가 직접 나서서 일을 처리한다.", type: "action" },
      { label: "C", text: "재미있고 신나는 새로운 보상 아이디어나 이벤트를 제시한다.", type: "visionary" },
      { label: "D", text: "현재 진행 상황을 지표로 보여주며 우리가 잘하고 있음을 객관적으로 증명한다.", type: "analyst" }
    ]
  },
  {
    id: 10,
    title: "Q10. 창업 관련 도서나 강연을 들을 때 가장 흥미로운 주제는?",
    options: [
      { label: "A", text: "실패를 딛고 일어선 연쇄 창업가들의 비하인드 스토리", type: "visionary" },
      { label: "B", text: "최신 테크 기술과 노코드 도구를 활용한 MVP 빠르게 만드는 법", type: "maker" },
      { label: "C", text: "스타트업 투자 유치(IR) 전략과 기업가치 산정법", type: "strategist" },
      { label: "D", text: "초기 고객 1,000명을 게릴라식으로 모은 현장 마케팅 사례", type: "action" }
    ]
  },
  {
    id: 11,
    title: "Q11. 최종 발표회에서 경쟁 팀의 아주 뛰어난 발표를 보았을 때 나는?",
    options: [
      { label: "A", text: "저 팀의 비즈니스 모델 구조에서 보완할 점이 뭔지 정밀 분석한다.", type: "analyst" },
      { label: "B", text: "저 팀의 서비스 화면 디자인이나 개발 완성도에 감탄하며 배워야겠다고 생각한다.", type: "maker" },
      { label: "C", text: "우리 팀도 지지 않도록 더 당당한 인상으로 피칭할 포인트를 가다듬는다.", type: "strategist" },
      { label: "D", text: "발표가 끝난 후 상대 팀에게 다가가 진심 어린 칭찬과 네트워킹을 건넨다.", type: "connector" }
    ]
  },
  {
    id: 12,
    title: "Q12. 창업 캠프가 끝난 후, 나에게 남길 원하는 최고의 한마디는?",
    options: [
      { label: "A", text: "\"아이디어가 진짜 신선하고 톡톡 튀는 친구였어!\"", type: "visionary" },
      { label: "B", text: "\"무조건 뭘 만들어내는 능력자였어!\"", type: "maker" },
      { label: "C", text: "\"진짜 불도저 같은 실행력을 가진 추진력 갑이야!\"", type: "action" },
      { label: "D", text: "\"우리 팀의 중심이자 최고의 팀원이었어!\"", type: "connector" }
    ]
  }
];
