/**
 * ==========================================================================
 * LocalMate - 연락폼 페이지 애플리케이션 (contactApp.js)
 * contact.html 페이지 구동 및 Header, ContactForm, Footer 마운트
 * ==========================================================================
 */

import { HeaderComponent } from './components/Header.js';
import { ContactFormComponent } from './components/ContactForm.js';
import { FooterComponent } from './components/Footer.js';

class ContactApp {
    constructor() {
        this.appEl = document.getElementById('app');
    }

    init() {
        if (!this.appEl) return;
        this.appEl.innerHTML = '';

        // 1. 헤더 마운트
        const headerComp = new HeaderComponent({
            isVerified: true,
            activeTab: 'contact',
            onNavTabChange: (tab) => {
                if (tab === 'home') window.location.href = 'index.html';
                else if (tab === 'explore') window.location.href = 'explore.html';
                else if (tab === 'about') window.location.href = 'index.html#trust-section';
            }
        });
        this.appEl.appendChild(headerComp.render());

        // 2. 메인 컨테이너 및 연락폼 컴포넌트 마운트
        const mainEl = document.createElement('main');
        mainEl.style.padding = '4rem 1.5rem';
        mainEl.style.minHeight = 'calc(100vh - 300px)';

        const containerEl = document.createElement('div');
        containerEl.className = 'container';

        const contactFormComp = new ContactFormComponent({
            onSuccess: (data) => {
                console.log('이메일 전송 완료 데이터:', data);
            }
        });

        containerEl.appendChild(contactFormComp.render());
        mainEl.appendChild(containerEl);
        this.appEl.appendChild(mainEl);

        // 3. 푸터 마운트
        const footerComp = new FooterComponent();
        this.appEl.appendChild(footerComp.render());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new ContactApp();
    app.init();
});
