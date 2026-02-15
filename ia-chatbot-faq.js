// ============================================
// ISLAND ALGORITHMS CHATBOT - FAQ VERSION
// No API key needed - completely free to run
// ============================================

(function() {
    // ============================================
    // CONFIGURATION - EDIT THIS SECTION PER CLIENT
    // ============================================
    
    const CHATBOT_CONFIG = {
        // Business details
        businessName: 'Island Algorithms',
        notificationEmail: 'david@islandalgorithms.co.uk',
        
        // Optional: Formspree form ID for email notifications (free at formspree.io)
        formspreeId: '',
        
        // Chat settings
        headerTitle: 'Island Algorithms',
        headerSubtitle: 'Ask me anything about our AI services',
        welcomeMessage: "Hello! 👋 Welcome to Island Algorithms. I'm here to answer your questions about our AI services. What would you like to know?",
        
        // Quick reply buttons shown at start
        quickReplies: [
            "What services do you offer?",
            "How much does it cost?",
            "How does it work?"
        ],
        
        // When to show lead capture form (after X messages)
        showLeadCaptureAfter: 3,
        
        // Branding
        brandingText: 'Powered by Island Algorithms',
        brandingLink: 'https://islandalgorithms.co.uk',
        
        // Colours - edit these to match client's brand
        colors: {
            primary: '#0b1120',
            primaryDark: '#070b14',
            secondary: '#1a2a4a',
            accent: '#c9a84c',
            accentBright: '#debb5c',
            text: '#d4d9e6',
            textDim: '#8e99b3',
            border: '#2e4470'
        },

        // ============================================
        // FAQ RESPONSES - Edit these for each client
        // Keywords are matched flexibly (not exact match)
        // ============================================
        
        faqs: [
            {
                keywords: ['service', 'services', 'offer', 'do you do', 'what do you', 'help with', 'provide'],
                response: `We offer a range of AI services tailored to your business:

• **AI Chatbots** - Smart assistants for your website that answer customer questions 24/7
• **Workflow Automation** - Connect your tools and automate repetitive tasks
• **Data Extraction & Monitoring** - Track prices, find opportunities, monitor competitors
• **Quote Calculators & Forms** - Interactive tools for instant quotes and bookings
• **Dashboards & Reports** - Turn your data into clear visual insights
• **Custom AI Tools** - Bespoke solutions for your specific challenges

Would you like to know more about any of these, or hear about pricing?`
            },
            {
                keywords: ['price', 'pricing', 'cost', 'how much', 'charge', 'rate', 'fee', 'afford', 'budget', 'expensive', 'cheap'],
                response: `Our services start from accessible price points:

• **AI Chatbots** - from £100
• **Workflow Automation** - from £150
• **Quote Calculators & Forms** - from £150
• **Dashboards & Reports** - from £200
• **Data Extraction & Monitoring** - from £300
• **Custom AI Tools** - from £300

Every project is different, so we provide a clear quote after understanding your needs. The initial consultation is always free with no obligation.

Would you like to arrange a free consultation?`
            },
            {
                keywords: ['how does it work', 'process', 'how do you work', 'steps', 'what happens', 'get started', 'start', 'begin'],
                response: `It's a simple four-step process:

1️⃣ **Free Consultation** - We chat about your business and what you need
2️⃣ **Clear Proposal** - You get a fixed price and timeline, no surprises
3️⃣ **Build & Refine** - We build it together, you see progress throughout
4️⃣ **Launch & Support** - We go live, with 2 weeks of support included

Most projects are delivered in days, not months. Want to book a free consultation?`
            },
            {
                keywords: ['who', 'about', 'behind', 'founder', 'owner', 'david', 'background', 'experience', 'team'],
                response: `Island Algorithms is run by David, based on the Isle of Wight but working with businesses across the UK.

David has a background in financial services and technology, with years of experience working with data, algorithms, and complex systems.

When you work with Island Algorithms, you work directly with David - no account managers, no juniors, just direct communication with the person building your solution.`
            },
            {
                keywords: ['contact', 'email', 'phone', 'reach', 'touch', 'speak', 'call', 'message', 'enquir'],
                response: `You can reach us at:

📧 **Email:** david@islandalgorithms.co.uk
🌐 **Website:** islandalgorithms.co.uk

Or leave your details here and we'll get back to you within a few hours. Would you like to do that?`
            },
            {
                keywords: ['chatbot', 'chat bot', 'bot', 'virtual assistant', 'chat widget'],
                response: `Our AI chatbots are smart assistants that live on your website and answer customer questions 24/7.

They're trained on YOUR business - your services, your FAQs, your way of doing things. They can capture leads, handle common enquiries, and free up your time for what matters.

Chatbots start from £100. Would you like to know more about how they work?`
            },
            {
                keywords: ['automation', 'automate', 'workflow', 'connect', 'integrate', 'zapier', 'repetitive', 'manual'],
                response: `Workflow automation connects your tools so they work together automatically.

For example: A new enquiry comes in → it's added to your spreadsheet → a confirmation email is sent → you get a notification on your phone. All automatic, no manual work.

We can connect most business tools - forms, emails, spreadsheets, calendars, CRMs, and more.

Automation projects start from £150. What tasks are eating up your time?`
            },
            {
                keywords: ['dashboard', 'report', 'data', 'analytics', 'spreadsheet', 'visual', 'insight'],
                response: `We turn messy spreadsheets and data into clear, visual dashboards.

Instead of scrolling through rows of numbers, you see what matters at a glance - trends, performance, key metrics - all updated automatically.

Dashboards start from £200. What kind of data would you like to visualise?`
            },
            {
                keywords: ['custom', 'bespoke', 'specific', 'unique', 'particular', 'special', 'different'],
                response: `If you have a specific challenge, we can build a bespoke solution for it.

We've built deal finders, price monitors, document analysers, content generators, and more. If you can describe what you need, we can probably build it.

Custom projects start from £300. What challenge are you trying to solve?`
            },
            {
                keywords: ['location', 'where', 'based', 'isle of wight', 'island', 'area', 'remote', 'local', 'uk'],
                response: `We're based on the Isle of Wight but work with businesses across the UK.

Everything is done remotely - video calls, screen sharing, email - so location is no barrier. We can work with you wherever you are.`
            },
            {
                keywords: ['time', 'long', 'duration', 'turnaround', 'deadline', 'quick', 'fast', 'urgent', 'days', 'weeks'],
                response: `Most projects are delivered in days, not months.

Simple chatbots and automations can often be ready within 48-72 hours. More complex custom tools might take 1-2 weeks.

We'll give you a clear timeline in your proposal, and we stick to it.`
            },
            {
                keywords: ['support', 'help', 'after', 'maintenance', 'fix', 'broken', 'problem', 'issue', 'update'],
                response: `All projects include 2 weeks of support after launch - if something needs tweaking or you have questions, we're there.

After that, we offer ongoing support packages if you need them, or you can just get in touch whenever you need changes.

We don't disappear after the invoice is paid - we're here to help.`
            },
            {
                keywords: ['example', 'portfolio', 'previous', 'work', 'case study', 'client', 'done before'],
                response: `We work with a range of businesses - from local shops and tradespeople to professional services and property companies.

Each project is confidential to the client, but we're happy to discuss similar challenges we've solved in your industry.

Book a free consultation and we can talk through relevant examples.`
            },
            {
                keywords: ['yes', 'yeah', 'sure', 'ok', 'please', 'interested', 'book', 'consultation', 'arrange', 'lets', "let's"],
                response: `Great! Just leave your details and we'll be in touch to arrange a convenient time for a chat.

Or email us directly at david@islandalgorithms.co.uk

What works best for you?`
            },
            {
                keywords: ['thank', 'thanks', 'cheers', 'appreciate', 'helpful'],
                response: `You're welcome! If you have any other questions, just ask. Otherwise, feel free to get in touch when you're ready - no pressure.

Have a great day! 👋`
            },
            {
                keywords: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening'],
                response: `Hello! 👋 How can I help you today? 

Feel free to ask about our services, pricing, or how we work. Or just tell me what challenge you're facing and I'll point you in the right direction.`
            },
            {
                keywords: ['bye', 'goodbye', 'later', 'see you'],
                response: `Thanks for chatting! If you have more questions later, we're always here.

Take care and good luck with your business! 👋`
            }
        ],

        // Fallback response when no keywords match
        fallbackResponse: `That's a great question! I don't have a specific answer for that one, but I'd love to help.

You can:
• **Leave your details** and David will get back to you personally
• **Email us** at david@islandalgorithms.co.uk
• **Ask me something else** about our services, pricing, or how we work

What would you prefer?`
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
            white-space: pre-line;
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
            this.conversationHistory.push({ role: 'user', content: message });
            this.messageCount++;

            // Show typing indicator
            this.showTyping();

            // Simulate thinking delay (makes it feel more natural)
            await this.delay(500 + Math.random() * 500);

            // Get response
            const response = this.getResponse(message);
            
            this.hideTyping();
            this.addBotMessage(response);
            this.conversationHistory.push({ role: 'bot', content: response });

            // Check if we should show lead capture
            if (this.messageCount >= this.config.showLeadCaptureAfter && !this.leadCaptured) {
                setTimeout(() => this.showLeadCapture(), 1500);
            }
        }

        getResponse(userMessage) {
            const lowerMessage = userMessage.toLowerCase();
            
            // Check each FAQ for keyword matches
            for (const faq of this.config.faqs) {
                for (const keyword of faq.keywords) {
                    if (lowerMessage.includes(keyword.toLowerCase())) {
                        return faq.response;
                    }
                }
            }
            
            // No match found - return fallback
            return this.config.fallbackResponse;
        }

        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
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
            // Convert markdown-style bold to HTML
            messageDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
                    <h4>💬 Want us to get in touch? Leave your details:</h4>
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
                            conversation: this.conversationHistory.map(m => `${m.role}: ${m.content}`).join('\n\n'),
                            source: window.location.href,
                            timestamp: new Date().toISOString()
                        })
                    });
                } catch (error) {
                    console.error('Failed to send lead:', error);
                }
            }

            // Log to console (you can see this in browser dev tools)
            console.log('📧 New lead captured:', { name, email, phone, conversation: this.conversationHistory });
            
            this.addBotMessage(`Thanks ${name}! 🎉 We'll be in touch at ${email} within a few hours.\n\nIs there anything else I can help with in the meantime?`);
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
