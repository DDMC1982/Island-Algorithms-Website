// ============================================
// ISLAND ALGORITHMS CHATBOT - EMBEDDABLE VERSION
// Add this script to any website
// ============================================

(function() {
    // ============================================
    // CONFIGURATION - EDIT THIS SECTION PER CLIENT
    // ============================================
    
    const CHATBOT_CONFIG = {
        // OpenAI API Key
        apiKey: 'YOUR_OPENAI_API_KEY_HERE',
        
        // Business information
        businessName: 'Island Algorithms',
        businessInfo: `
            Island Algorithms is an AI consultancy based on the Isle of Wight, working with businesses across the UK.
            
            Services offered:
            - AI Chatbots (from £100) - Smart assistants for websites that answer customer questions 24/7
            - Workflow Automation (from £150) - Connect tools and automate repetitive tasks
            - Data Extraction & Monitoring (from £300) - Track prices, find opportunities, monitor competitors
            - Quote Calculators & Smart Forms (from £150) - Interactive tools for instant quotes and bookings
            - Dashboards & Reports (from £200) - Turn spreadsheets into clear visual dashboards
            - Custom AI Tools (from £300) - Bespoke solutions for specific business challenges
            
            How it works:
            1. Free consultation to discuss needs
            2. Clear proposal with fixed price
            3. Build and refine together
            4. Launch with 2 weeks included support
            
            Contact: david@islandalgorithms.co.uk
            
            The founder is David, who has a background in financial services and technology.
            All projects are delivered quickly, typically in days not months.
            Initial consultations are always free with no obligation.
        `,
        
        // Notification settings
        notificationEmail: 'david@islandalgorithms.co.uk',
        formspreeId: '', // Optional: Add Formspree form ID for email notifications
        
        // Chat settings
        welcomeMessage: "Hello! 👋 Welcome to Island Algorithms. I'm here to answer any questions about our AI services. What would you like to know?",
        quickReplies: [
            "What services do you offer?",
            "How much does it cost?",
            "How does it work?"
        ],
        showLeadCaptureAfter: 4,
        
        // Branding
        headerTitle: 'Island Algorithms',
        headerSubtitle: 'Ask me anything about our AI services',
        brandingText: 'Powered by Island Algorithms',
        brandingLink: 'https://islandalgorithms.co.uk',
        
        // Colours
        colors: {
            primary: '#0b1120',
            primaryDark: '#070b14',
            secondary: '#1a2a4a',
            accent: '#c9a84c',
            accentBright: '#debb5c',
            text: '#d4d9e6',
            textDim: '#8e99b3',
            border: '#2e4470'
        }
    };

    // ============================================
    // STYLES
    // ============================================
    
    const styles = `
        #ia-chatbot-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        #ia-chat-toggle {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${CHATBOT_CONFIG.colors.accent} 0%, ${CHATBOT_CONFIG.colors.accentBright} 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(201, 168, 76, 0.4);
            z-index: 9998;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #ia-chat-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(201, 168, 76, 0.5);
        }

        #ia-chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: ${CHATBOT_CONFIG.colors.primary};
            transition: all 0.3s ease;
        }

        #ia-chat-toggle.open svg.chat-icon { display: none; }
        #ia-chat-toggle.open svg.close-icon { display: block; }
        #ia-chat-toggle svg.close-icon { display: none; }

        #ia-chat-window {
            position: fixed;
            bottom: 100px;
            right: 24px;
            width: 380px;
            height: 520px;
            background: ${CHATBOT_CONFIG.colors.primary};
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 9999;
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid ${CHATBOT_CONFIG.colors.border};
        }

        #ia-chat-window.open {
            display: flex;
            animation: ia-slideUp 0.3s ease;
        }

        @keyframes ia-slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        #ia-chat-header {
            background: linear-gradient(135deg, ${CHATBOT_CONFIG.colors.secondary} 0%, ${CHATBOT_CONFIG.colors.primaryDark} 100%);
            padding: 18px 20px;
            border-bottom: 1px solid ${CHATBOT_CONFIG.colors.border};
        }

        #ia-chat-header h3 {
            color: ${CHATBOT_CONFIG.colors.text};
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        #ia-chat-header p {
            color: ${CHATBOT_CONFIG.colors.textDim};
            font-size: 12px;
        }

        .ia-header-status {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .ia-status-dot {
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
            animation: ia-pulse 2s infinite;
        }

        @keyframes ia-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        #ia-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: ${CHATBOT_CONFIG.colors.primary};
        }

        #ia-chat-messages::-webkit-scrollbar { width: 6px; }
        #ia-chat-messages::-webkit-scrollbar-track { background: ${CHATBOT_CONFIG.colors.primary}; }
        #ia-chat-messages::-webkit-scrollbar-thumb { background: ${CHATBOT_CONFIG.colors.border}; border-radius: 3px; }

        .ia-message {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            animation: ia-fadeIn 0.3s ease;
        }

        @keyframes ia-fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .ia-message.bot {
            background: ${CHATBOT_CONFIG.colors.secondary};
            color: ${CHATBOT_CONFIG.colors.text};
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }

        .ia-message.user {
            background: ${CHATBOT_CONFIG.colors.accent};
            color: ${CHATBOT_CONFIG.colors.primary};
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .ia-message.typing {
            display: flex;
            gap: 4px;
            padding: 16px 20px;
        }

        .ia-typing-dot {
            width: 8px;
            height: 8px;
            background: ${CHATBOT_CONFIG.colors.textDim};
            border-radius: 50%;
            animation: ia-typingBounce 1.4s infinite ease-in-out;
        }

        .ia-typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .ia-typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes ia-typingBounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
        }

        .ia-quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }

        .ia-quick-reply {
            background: transparent;
            border: 1px solid ${CHATBOT_CONFIG.colors.accent};
            color: ${CHATBOT_CONFIG.colors.accent};
            padding: 8px 14px;
            border-radius: 20px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .ia-quick-reply:hover {
            background: ${CHATBOT_CONFIG.colors.accent};
            color: ${CHATBOT_CONFIG.colors.primary};
        }

        #ia-chat-input-container {
            padding: 16px;
            background: ${CHATBOT_CONFIG.colors.primaryDark};
            border-top: 1px solid ${CHATBOT_CONFIG.colors.border};
        }

        #ia-chat-form {
            display: flex;
            gap: 10px;
        }

        #ia-chat-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid ${CHATBOT_CONFIG.colors.border};
            border-radius: 24px;
            background: ${CHATBOT_CONFIG.colors.secondary};
            color: ${CHATBOT_CONFIG.colors.text};
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s ease;
        }

        #ia-chat-input:focus { border-color: ${CHATBOT_CONFIG.colors.accent}; }
        #ia-chat-input::placeholder { color: ${CHATBOT_CONFIG.colors.textDim}; }

        #ia-chat-send {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: ${CHATBOT_CONFIG.colors.accent};
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        #ia-chat-send:hover {
            background: ${CHATBOT_CONFIG.colors.accentBright};
            transform: scale(1.05);
        }

        #ia-chat-send svg {
            width: 20px;
            height: 20px;
            fill: ${CHATBOT_CONFIG.colors.primary};
        }

        #ia-lead-form {
            padding: 20px;
            background: ${CHATBOT_CONFIG.colors.secondary};
            border-radius: 12px;
            margin: 10px 0;
        }

        #ia-lead-form h4 {
            color: ${CHATBOT_CONFIG.colors.text};
            font-size: 14px;
            margin-bottom: 12px;
        }

        #ia-lead-form input {
            width: 100%;
            padding: 10px 14px;
            margin-bottom: 10px;
            border: 1px solid ${CHATBOT_CONFIG.colors.border};
            border-radius: 8px;
            background: ${CHATBOT_CONFIG.colors.primary};
            color: ${CHATBOT_CONFIG.colors.text};
            font-size: 13px;
        }

        #ia-lead-form input::placeholder { color: ${CHATBOT_CONFIG.colors.textDim}; }

        #ia-lead-form button {
            width: 100%;
            padding: 10px;
            background: ${CHATBOT_CONFIG.colors.accent};
            color: ${CHATBOT_CONFIG.colors.primary};
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        #ia-lead-form button:hover { background: ${CHATBOT_CONFIG.colors.accentBright}; }

        #ia-chat-branding {
            text-align: center;
            padding: 8px;
            background: ${CHATBOT_CONFIG.colors.primaryDark};
            border-top: 1px solid ${CHATBOT_CONFIG.colors.border};
        }

        #ia-chat-branding a {
            color: ${CHATBOT_CONFIG.colors.textDim};
            font-size: 11px;
            text-decoration: none;
        }

        #ia-chat-branding a:hover { color: ${CHATBOT_CONFIG.colors.accent}; }

        @media (max-width: 480px) {
            #ia-chat-window {
                width: calc(100% - 20px);
                height: calc(100% - 120px);
                right: 10px;
                bottom: 90px;
                border-radius: 12px;
            }

            #ia-chat-toggle {
                width: 54px;
                height: 54px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;

    // ============================================
    // HTML
    // ============================================
    
    const html = `
        <div id="ia-chatbot-container">
            <button id="ia-chat-toggle" aria-label="Open chat">
                <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
                    <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                </svg>
                <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>

            <div id="ia-chat-window">
                <div id="ia-chat-header">
                    <h3>${CHATBOT_CONFIG.headerTitle}</h3>
                    <div class="ia-header-status">
                        <span class="ia-status-dot"></span>
                        <p>${CHATBOT_CONFIG.headerSubtitle}</p>
                    </div>
                </div>

                <div id="ia-chat-messages"></div>

                <div id="ia-chat-input-container">
                    <form id="ia-chat-form">
                        <input type="text" id="ia-chat-input" placeholder="Type your message..." autocomplete="off">
                        <button type="submit" id="ia-chat-send" aria-label="Send message">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </form>
                </div>

                <div id="ia-chat-branding">
                    <a href="${CHATBOT_CONFIG.brandingLink}" target="_blank">${CHATBOT_CONFIG.brandingText}</a>
                </div>
            </div>
        </div>
    `;

    // ============================================
    // CHATBOT CLASS
    // ============================================
    
    class IAChatbot {
        constructor(config) {
            this.config = config;
            this.messageCount = 0;
            this.leadCaptured = false;
            this.conversationHistory = [];
            this.firstOpen = true;
        }

        init() {
            this.toggleBtn = document.getElementById('ia-chat-toggle');
            this.chatWindow = document.getElementById('ia-chat-window');
            this.messagesContainer = document.getElementById('ia-chat-messages');
            this.chatForm = document.getElementById('ia-chat-form');
            this.chatInput = document.getElementById('ia-chat-input');

            this.toggleBtn.addEventListener('click', () => this.toggleChat());
            this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        toggleChat() {
            const isOpen = this.chatWindow.classList.toggle('open');
            this.toggleBtn.classList.toggle('open', isOpen);

            if (isOpen && this.firstOpen) {
                this.firstOpen = false;
                setTimeout(() => {
                    this.addBotMessage(this.config.welcomeMessage);
                    this.showQuickReplies();
                }, 500);
            }

            if (isOpen) {
                this.chatInput.focus();
            }
        }

        async handleSubmit(e) {
            e.preventDefault();
            const message = this.chatInput.value.trim();
            if (!message) return;

            this.chatInput.value = '';
            this.addUserMessage(message);
            this.messageCount++;

            this.showTyping();
            const response = await this.getAIResponse(message);
            this.hideTyping();
            this.addBotMessage(response);

            if (this.messageCount >= this.config.showLeadCaptureAfter && !this.leadCaptured) {
                setTimeout(() => this.showLeadCapture(), 1000);
            }
        }

        async getAIResponse(userMessage) {
            this.conversationHistory.push({ role: 'user', content: userMessage });

            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.config.apiKey}`
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        messages: [
                            {
                                role: 'system',
                                content: `You are a helpful assistant for ${this.config.businessName}. 
                                
Here is information about the business:
${this.config.businessInfo}

Guidelines:
- Be friendly, professional, and helpful
- Keep responses concise (2-3 sentences unless more detail is needed)
- If asked about pricing, give the starting prices listed above
- If someone seems interested, encourage them to get in touch for a free consultation
- Don't make up information that isn't provided above
- If you don't know something, suggest they contact the business directly
- Never reveal that you are an AI or chatbot - just be helpful`
                            },
                            ...this.conversationHistory
                        ],
                        max_tokens: 250,
                        temperature: 0.7
                    })
                });

                const data = await response.json();
                
                if (data.choices && data.choices[0]) {
                    const assistantMessage = data.choices[0].message.content;
                    this.conversationHistory.push({ role: 'assistant', content: assistantMessage });
                    return assistantMessage;
                } else {
                    throw new Error('Invalid response');
                }
            } catch (error) {
                console.error('Chatbot error:', error);
                return `I apologise, I'm having a little trouble right now. Please email ${this.config.notificationEmail} and we'll get back to you shortly.`;
            }
        }

        addUserMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'ia-message user';
            messageDiv.textContent = text;
            this.messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }

        addBotMessage(text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'ia-message bot';
            messageDiv.textContent = text;
            this.messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }

        showQuickReplies() {
            const container = document.createElement('div');
            container.className = 'ia-quick-replies';
            
            this.config.quickReplies.forEach(reply => {
                const btn = document.createElement('button');
                btn.className = 'ia-quick-reply';
                btn.textContent = reply;
                btn.addEventListener('click', () => {
                    container.remove();
                    this.chatInput.value = reply;
                    this.handleSubmit(new Event('submit'));
                });
                container.appendChild(btn);
            });

            this.messagesContainer.appendChild(container);
            this.scrollToBottom();
        }

        showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'ia-message bot typing';
            typingDiv.id = 'ia-typing-indicator';
            typingDiv.innerHTML = '<span class="ia-typing-dot"></span><span class="ia-typing-dot"></span><span class="ia-typing-dot"></span>';
            this.messagesContainer.appendChild(typingDiv);
            this.scrollToBottom();
        }

        hideTyping() {
            const typing = document.getElementById('ia-typing-indicator');
            if (typing) typing.remove();
        }

        showLeadCapture() {
            this.leadCaptured = true;
            
            const formContainer = document.createElement('div');
            formContainer.innerHTML = `
                <div id="ia-lead-form">
                    <h4>Want us to get in touch? Leave your details:</h4>
                    <input type="text" id="ia-lead-name" placeholder="Your name">
                    <input type="email" id="ia-lead-email" placeholder="Your email">
                    <input type="tel" id="ia-lead-phone" placeholder="Phone (optional)">
                    <button type="button" id="ia-lead-submit">Send</button>
                </div>
            `;
            this.messagesContainer.appendChild(formContainer);
            this.scrollToBottom();

            document.getElementById('ia-lead-submit').addEventListener('click', () => this.submitLead());
        }

        async submitLead() {
            const name = document.getElementById('ia-lead-name').value.trim();
            const email = document.getElementById('ia-lead-email').value.trim();
            const phone = document.getElementById('ia-lead-phone').value.trim();

            if (!name || !email) {
                alert('Please enter your name and email');
                return;
            }

            const form = document.getElementById('ia-lead-form');
            if (form) form.parentElement.remove();

            // Send to Formspree if configured
            if (this.config.formspreeId) {
                try {
                    await fetch(`https://formspree.io/f/${this.config.formspreeId}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            phone: phone,
                            conversation: this.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n'),
                            source: window.location.href
                        })
                    });
                } catch (error) {
                    console.error('Failed to send lead:', error);
                }
            }

            console.log('New lead:', { name, email, phone, conversation: this.conversationHistory });
            this.addBotMessage(`Thanks ${name}! We'll be in touch soon at ${email}. Is there anything else I can help with?`);
        }

        scrollToBottom() {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
    }

    // ============================================
    // INITIALIZATION
    // ============================================
    
    function init() {
        // Add styles
        const styleEl = document.createElement('style');
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);

        // Add HTML
        const container = document.createElement('div');
        container.innerHTML = html;
        document.body.appendChild(container);

        // Initialize chatbot
        const chatbot = new IAChatbot(CHATBOT_CONFIG);
        chatbot.init();
        
        window.iaChatbot = chatbot;
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
