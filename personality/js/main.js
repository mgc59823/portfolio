/* ==========================================================================
   Personality Test - Main Application Controller & Router
   ========================================================================== */

import { QUESTIONS, PERSONALITY_TYPES } from './data/personalityData.js';
import { renderHeader } from './components/Header.js';
import { renderIntroScreen } from './components/IntroScreen.js';
import { renderQuestionScreen } from './components/QuestionScreen.js';
import { renderLoadingScreen } from './components/LoadingScreen.js';
import { renderResultScreen } from './components/ResultScreen.js';
import { showToast } from './components/Toast.js';
import { shareKakaoTalk, initKakaoSDK } from './utils/kakaoShare.js';

class App {
  constructor() {
    this.appElement = document.getElementById('app');
    this.headerElement = document.getElementById('header-root');
    this.mainElement = document.getElementById('main-root');

    // App State
    this.currentScreen = 'intro'; // 'intro' | 'question' | 'loading' | 'result'
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(QUESTIONS.length).fill(null);
    this.finalResult = null;

    this.init();
  }

  init() {
    // Initialize Kakao SDK
    initKakaoSDK();

    // Check if result type is in URL query parameter (for direct result sharing)
    const urlParams = new URLSearchParams(window.location.search);
    const resultParam = urlParams.get('result');

    if (resultParam && PERSONALITY_TYPES[resultParam]) {
      this.finalResult = PERSONALITY_TYPES[resultParam];
      this.currentScreen = 'result';
    }

    this.render();
  }

  render() {
    // 1. Render Header Progress
    if (this.currentScreen === 'question') {
      this.headerElement.innerHTML = renderHeader({
        currentStep: this.currentQuestionIndex + 1,
        totalSteps: QUESTIONS.length
      });
    } else {
      this.headerElement.innerHTML = '';
    }

    // 2. Render Main Body Screen
    this.mainElement.innerHTML = '';

    switch (this.currentScreen) {
      case 'intro':
        this.mainElement.appendChild(
          renderIntroScreen({
            onStart: () => this.startTest()
          })
        );
        break;

      case 'question':
        const currentQ = QUESTIONS[this.currentQuestionIndex];
        const selectedOpt = this.userAnswers[this.currentQuestionIndex];

        this.mainElement.appendChild(
          renderQuestionScreen({
            question: currentQ,
            selectedOption: selectedOpt,
            onSelect: (option) => this.handleOptionSelect(option),
            onPrev: () => this.handlePrevQuestion(),
            isFirst: this.currentQuestionIndex === 0
          })
        );
        break;

      case 'loading':
        this.mainElement.appendChild(
          renderLoadingScreen({
            onComplete: () => this.calculateResult()
          })
        );
        break;

      case 'result':
        this.mainElement.appendChild(
          renderResultScreen({
            resultData: this.finalResult,
            onRestart: () => this.restartTest(),
            onShare: () => this.shareResult(),
            onKakaoShare: () => this.shareKakao()
          })
        );
        break;
    }
  }


  startTest() {
    this.currentScreen = 'question';
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(QUESTIONS.length).fill(null);
    this.render();
  }

  handleOptionSelect(option) {
    this.userAnswers[this.currentQuestionIndex] = option;

    // Check if last question
    if (this.currentQuestionIndex < QUESTIONS.length - 1) {
      this.currentQuestionIndex++;
      this.render();
    } else {
      // Go to Loading screen
      this.currentScreen = 'loading';
      this.render();
    }
  }

  handlePrevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.render();
    }
  }

  calculateResult() {
    const counts = {
      visionary: 0,
      maker: 0,
      strategist: 0,
      connector: 0,
      analyst: 0,
      action: 0
    };

    this.userAnswers.forEach(ans => {
      if (ans && ans.type && counts[ans.type] !== undefined) {
        counts[ans.type]++;
      }
    });

    // Tie-breaker priority array
    const priority = ['visionary', 'action', 'maker', 'strategist', 'analyst', 'connector'];

    let maxCount = -1;
    let winnerKey = 'visionary';

    priority.forEach(key => {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        winnerKey = key;
      }
    });

    this.finalResult = PERSONALITY_TYPES[winnerKey];
    this.currentScreen = 'result';
    this.render();
  }

  restartTest() {
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname);
    this.currentScreen = 'intro';
    this.currentQuestionIndex = 0;
    this.userAnswers = new Array(QUESTIONS.length).fill(null);
    this.finalResult = null;
    this.render();
  }

  shareKakao() {
    if (!this.finalResult) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?result=${this.finalResult.id}`;
    shareKakaoTalk({
      resultData: this.finalResult,
      shareUrl: shareUrl
    });
  }

  shareResult() {
    if (!this.finalResult) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?result=${this.finalResult.id}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('결과 링크가 클립보드에 복사되었습니다!');
      }).catch(() => {
        this.fallbackCopyTextToClipboard(shareUrl);
      });
    } else {
      this.fallbackCopyTextToClipboard(shareUrl);
    }
  }

  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('결과 링크가 복사되었습니다!');
    } catch (err) {
      showToast('링크 복사에 실패했습니다.');
    }
    document.body.removeChild(textArea);
  }
}


// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
