/* ==========================================================================
   KakaoTalk Share SDK Service (카카오톡 공유 서비스)
   ========================================================================== */

export function getKakaoKey() {
  if (typeof window !== 'undefined' && window.KAKAO_JAVASCRIPT_KEY) {
    return window.KAKAO_JAVASCRIPT_KEY;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY) {
    return import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  }
  return '';
}

export function initKakaoSDK() {
  const kakaoKey = getKakaoKey();
  if (window.Kakao && kakaoKey && !window.Kakao.isInitialized()) {
    try {
      window.Kakao.init(kakaoKey);
      console.log('Kakao SDK Initialized successfully');
    } catch (err) {
      console.warn('Kakao SDK Init Error:', err);
    }
  }
}

export function shareKakaoTalk({ resultData, shareUrl }) {
  initKakaoSDK();

  if (!window.Kakao) {
    alert('카카오톡 SDK가 로드되지 않았습니다.');
    return false;
  }

  if (!window.Kakao.isInitialized()) {
    const key = getKakaoKey();
    if (!key || key.includes('your_kakao')) {
      alert('카카오 JavaScript 키 환경변수(KAKAO_JAVASCRIPT_KEY)를 설정해 주세요.');
      return false;
    }
    window.Kakao.init(key);
  }

  try {
    const cleanTitle = resultData.title.split('(')[0].trim();
    
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `🚀 나의 창업 DNA는? [${cleanTitle}]`,
        description: `"${resultData.oneLiner}"\n\n✨ 환상의 콤비: ${resultData.bestCombo.title}`,
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl
        }
      },
      buttons: [
        {
          title: '창업 성향 결과 보기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl
          }
        },
        {
          title: '나도 테스트 해보기',
          link: {
            mobileWebUrl: window.location.origin + window.location.pathname,
            webUrl: window.location.origin + window.location.pathname
          }
        }
      ]
    });
    return true;
  } catch (err) {
    console.error('Kakao Share Error:', err);
    alert('카카오톡 공유 요청 실패 (Error Code 4019).\nKakao Developers [플랫폼] > [Web]에 현재 도메인(예: http://localhost:3000)을 등록해 주세요.');
    return false;
  }
}

