class RomegaChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.hasShownNotification = false;
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.apiUrl = "https://automation-romega-chatbot.kygozf.easypanel.host/chat";
    this.sessionId = this.generateSessionId();
    this.init();
  }

  generateSessionId() {
    return "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
  }

  init() {
    this.createChatUI();
    this.setupEventListeners();
    this.loadChatHistory();
  }

  initializeKnowledgeBase() {
    return {
      services: {
        question: "What services does Romega Solutions offer?",
        answer: "We provide comprehensive HR solutions and Digital Marketing services to help your business grow. Our offerings include: RPO (Recruitment Process Outsourcing), BPO (Business Process Outsourcing), Strategic HR consulting, Quality Hire (Executive Search), Digital Marketing strategies, SEO, Content Marketing, and Social Media Management. We're your partner for people and growth.",
        keywords: ["services", "what do you do", "offerings", "help with", "provide", "about"]
      },
      hrservices: {
        question: "What HR services do you provide?",
        answer: "Our HR services include: 📋 RPO (Recruitment Process Outsourcing), 🏢 BPO (Business Process Outsourcing), 💼 Strategic HR consulting, 🎯 Quality Hire (Executive Search), 👥 Talent Management, and 📚 Training & Development. We specialize in connecting visionary leaders with opportunities that drive growth, innovation, and lasting impact.",
        keywords: ["HR services", "HR", "human resources", "recruitment", "hiring", "talent", "tell me about hr"]
      },
      digitalmarketing: {
        question: "What Digital Marketing services do you offer?",
        answer: "Our Digital Marketing services help you reach and engage your audience effectively: 📱 Social Media Marketing, 🔍 SEO (Search Engine Optimization), 📝 Content Marketing, 📧 Email Marketing, 💡 Brand Strategy, and 📈 Analytics & Reporting. We create data-driven strategies that deliver measurable results for your business growth.",
        keywords: ["digital marketing", "marketing", "social media", "SEO", "content", "advertising", "online marketing", "tell me about digital"]
      },
      rpo: {
        question: "What is RPO and how does it work?",
        answer: "Our RPO (Recruitment Process Outsourcing) service handles your entire recruitment process from talent mapping to final placement. We specialize in executive-level positions and typically fill critical roles within 2-4 weeks with 95%+ retention rates. We're 60-70% faster than traditional recruitment methods and offer 15% lower fees than competitors.",
        keywords: ["RPO", "recruitment", "hiring", "executive search", "talent", "outsourcing"]
      },
      bpo: {
        question: "What BPO services do you provide?",
        answer: "Our BPO (Business Process Outsourcing) services help streamline your operations with expert-backed HR solutions, administrative support, and process optimization. We provide scalable solutions that allow you to focus on core business activities while we handle operational complexities with our skilled Philippine-based team.",
        keywords: ["BPO", "business process", "outsourcing", "HR solutions", "administrative", "operations", "support"]
      },
      pricing: {
        question: "How much do your services cost?",
        answer: "We offer transparent, competitive pricing tailored to your specific needs. Our fees vary by service type (HR services or Digital Marketing) and project complexity. We provide detailed quotes within 24 hours and offer flexible payment terms and packages. Contact us for a customized proposal based on your business goals. 📊",
        keywords: ["price", "cost", "fee", "how much", "budget", "pricing", "quote", "rates", "packages", "what are your pricing"]
      },
      timeframe: {
        question: "How fast can you fill positions?",
        answer: "We're significantly faster than traditional methods: Executive positions typically filled in 2-4 weeks, Critical AI/ML roles in ~2 weeks, Senior leadership roles in 3-5 weeks. Our streamlined process and global talent network allow us to move 60-70% faster than industry standards while maintaining quality.",
        keywords: ["time", "fast", "quick", "how long", "speed", "timeline", "when"]
      },
      quality: {
        question: "How do you ensure quality hires?",
        answer: "We focus on cultural fit insights, comprehensive vetting, and strategic matching. Our process includes behavioral assessments, technical evaluations, cultural alignment checks, and reference verification. We achieve 95%+ retention rates and offer placement guarantees. Our goal is ensuring leaders stay longer and deliver lasting organizational impact.",
        keywords: ["quality", "retention", "cultural fit", "vetting", "guarantee", "assessment"]
      },
      consultation: {
        question: "Can I schedule a consultation?",
        answer: "Absolutely! We offer free discovery calls to understand your business needs and challenges. You can schedule directly through our Calendly link, use our contact form, or email us at info@romega-solutions.com. We typically respond within 4 hours and can arrange consultations within 24-48 hours. Let's discuss how we can help you grow!",
        keywords: ["consultation", "schedule", "appointment", "meeting", "discovery call", "free", "book a call", "want to book"]
      },
      contact: {
        question: "How can I contact Romega Solutions?",
        answer: "You can reach us multiple ways: 📧 Email: info@romega-solutions.com, 📅 Schedule a meeting via Calendly, 💬 Use our website contact form, or visit our headquarters at 222 Pacific Coast Hwy, #10 in El Segundo, CA 90245. We respond to emails within 4 hours during business hours. Ready to talk to a specialist?",
        keywords: ["contact", "phone", "email", "reach", "call", "support", "address", "connect me", "talk to specialist", "speak with"]
      }
    };
  }

  createChatUI() {
    const chatContainer = document.createElement("div");
    chatContainer.id = "romega-chatbot";
    chatContainer.innerHTML = `
      <!-- Chat Toggle Button -->
      <div id="chat-toggle" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 z-[9999]">
        <button id="chat-toggle-btn" class="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <span id="chat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </span>
          <span id="close-icon" class="hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>

      <!-- Chat Window -->
      <div id="chat-window" class="fixed bottom-24 right-6 md:bottom-28 md:right-8 lg:bottom-32 lg:right-10 w-[calc(100vw-3rem)] sm:w-[450px] md:w-[500px] lg:w-[550px] h-[calc(100vh-8rem)] sm:h-[520px] md:h-[550px] lg:h-[580px] max-h-[85vh] bg-white rounded-lg shadow-2xl z-[9998] hidden flex flex-col border border-gray-200">
        <!-- Header with Romega Branding -->
        <div class="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg shadow-md">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                <span class="text-blue-600 font-bold text-sm">R</span>
              </div>
              <div>
                <h3 class="font-bold text-base">Ask Pulse ⭐</h3>
                <p class="text-xs text-blue-100 flex items-center">
                  <span class="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  Your HR & Digital Marketing Assistant
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Messages Container -->
        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <!-- Welcome Message (Shows Immediately) -->
          <div class="flex justify-start mb-4">
            <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-white border border-blue-100 text-gray-800 shadow-sm">
              <div class="flex items-start space-x-2">
                <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span class="text-white font-bold text-xs">R</span>
                </div>
                <div>
                  <div class="text-sm markdown-content">
                    <p class="mb-2"><strong>Hi! I'm Pulse 👋</strong></p>
                    <p class="mb-2">I help businesses grow through HR solutions and Digital Marketing strategies.</p>
                    <p class="text-sm text-gray-600 mt-2">What can I help you with today?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div id="typing-indicator" class="px-4 py-2 hidden">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-xs">R</span>
            </div>
            <div class="flex items-center space-x-1">
              <span class="text-sm text-gray-600">Ask Pulse is thinking</span>
              <div class="flex space-x-1 ml-1">
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0s"></div>
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t border-gray-200 p-4">
          <div class="flex space-x-2">
            <input 
              type="text" 
              id="chat-input" 
              placeholder="Ask about recruitment services..." 
              class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxlength="500"
            >
            <button 
              id="send-btn" 
              class="bg-blue-600 hoveHR or Digital Marketinghite px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Send
            </button>
          </div>
          <div class="flex justify-between items-center mt-2">
            <div class="flex space-x-2">
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="What services do you offer?">Services</button>
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="How much do your services cost?">Pricing</button>
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="Schedule consultation">Contact</button>
            </div>
          </div>
        </div>flex-wrap gap-2">
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="Tell me about HR services">🔹 HR Services</button>
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="Tell me about Digital Marketing">🔹 Digital Marketing</button>
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="What are your pricing and packages?">🔹 Pricing & Packages</button>
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="I want to book a call">🔹 Book a Call</button>
              <button class="quick-reply-btn text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-full transition-colors" data-message="Connect me with a specialist">🔹 Talk to a Specialis
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById("chat-toggle-btn");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const quickReplyBtns = document.querySelectorAll(".quick-reply-btn");

    toggleBtn.addEventListener("click", () => this.toggleChat());
    sendBtn.addEventListener("click", () => this.sendMessage());
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.sendMessage();
    });

    quickReplyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const message = btn.dataset.message;
        this.sendUserMessage(message);
      });
    });

    // Close chat when clicking outside (desktop only)
    document.addEventListener("click", (e) => {
      const chatWindow = document.getElementById("chat-window");
      const toggleBtn = document.getElementById("chat-toggle");

      if (
        this.isOpen &&
        !chatWindow.contains(e.target) &&
        !toggleBtn.contains(e.target) &&
        window.innerWidth > 640 // Only on desktop
      ) {
        // Don't auto-close for now - let users explicitly close
      }
    });

    // Handle window resize and orientation changes
    window.addEventListener("resize", () => {
      if (this.isOpen) {
        // Restore body scroll if switching from mobile to desktop
        if (window.innerWidth > 640) {
          document.body.classList.remove("chat-open");
          document.body.style.overflow = "";
          document.body.style.position = "";
          document.body.style.width = "";
        } else {
          // Apply mobile scroll lock if switching to mobile
          document.body.classList.add("chat-open");
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100%";
        }
      }
    });

    // Handle orientation change
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        if (this.isOpen && window.innerWidth <= 640) {
          // Ensure proper mobile handling after orientation change
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
          document.body.style.width = "100%";
        }
      }, 100);
    });
  }

  toggleChat() {
    const chatWindow = document.getElementById("chat-window");
    const chatIcon = document.getElementById("chat-icon");
    const closeIcon = document.getElementById("close-icon");

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      chatWindow.classList.remove("hidden");
      chatIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");

      // Prevent body scroll on mobile when chat is open
      if (window.innerWidth <= 640) {
        document.body.classList.add("chat-open");
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      }

      // Add welcome message if first time
      if (this.messages.length === 0) {
        this.addWelcomeMessage();
      }

      // Focus input (but not on mobile to prevent keyboard issues)
      setTimeout(() => {
        if (window.innerWidth > 640) {
          document.getElementById("chat-input").focus();
        }
      }, 100);
    } else {
      chatWindow.classList.add("hidden");
      chatIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");

      // Restore body scroll on mobile when chat is closed
      if (window.innerWidth <= 640) {
        document.body.classList.remove("chat-open");
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
      }
    }
  }

  addWelcomeMessage() {
    // Welcome message is now shown statically in HTML for instant UX
    // Only track it in messages array
    const welcomeMessage = {
      type: "bot",
      content:
        "👋 Welcome to Romega Solutions! I'm Ask Pulse, your AI assistant, here to help you with recruitment, HR consulting, and more.",
      timestamp: new Date(),
    };
    this.messages.push(welcomeMessage);
    // DoHi! I'm Pulse 👋 I help businesses grow through HR solutions and Digital Marketing strategies. What can I help you with today?
  }

  sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();

    if (!message) return;

    this.sendUserMessage(message);
    input.value = "";
  }

  sendUserMessage(message) {
    const userMessage = {
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    this.messages.push(userMessage);
    this.displayMessage(userMessage);

    // Show typing indicator and respond
    this.showTypingIndicator();

    // Call the API to get response
    this.callChatbotAPI(message);
  }

  displayMessage(message) {
    const messagesContainer = document.getElementById("chat-messages");
    const messageDiv = document.createElement("div");

    const isBot = message.type === "bot";
    const alignClass = isBot ? "justify-start" : "justify-end";
    const bgClass = isBot
      ? "bg-white border border-gray-200"
      : "bg-blue-600 text-white";
    const textClass = isBot ? "text-gray-800" : "text-white";

    messageDiv.className = `flex ${alignClass} mb-4`;

    if (isBot) {
      messageDiv.innerHTML = `
        <div class="max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${bgClass} ${textClass} shadow-sm">
          <div class="flex items-start space-x-2">
            <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span class="text-white font-bold text-xs">R</span>
            </div>
            <div class="flex-1">
              <div class="text-sm markdown-content">${this.formatMessage(
                message.content
              )}</div>
              <p class="text-xs mt-1 opacity-70">${this.formatTime(
                message.timestamp
              )}</p>
            </div>
          </div>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${bgClass} ${textClass} shadow-sm">
          <div class="text-sm markdown-content">${this.formatMessage(
            message.content
          )}</div>
          <p class="text-xs mt-1 opacity-70">${this.formatTime(
            message.timestamp
          )}</p>
        </div>
      `;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  formatMessage(content) {
    // Parse markdown formatting FIRST
    content = this.parseMarkdown(content);

    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    content = content.replace(
      urlRegex,
      '<a href="$1" target="_blank" class="underline hover:text-blue-500">$1</a>'
    );

    // Convert phone numbers to clickable links
    const phoneRegex = /(\d{3}[-.]?\d{3}[-.]?\d{4})/g;
    content = content.replace(
      phoneRegex,
      '<a href="tel:$1" class="underline">$1</a>'
    );

    // Convert email addresses to clickable links
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    content = content.replace(
      emailRegex,
      '<a href="mailto:$1" class="underline">$1</a>'
    );

    return content;
  }

  parseMarkdown(text) {
    // Convert markdown to HTML
    let html = text;

    // Bold: **text** or __text__
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");

    // Italic: *text* or _text_
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Bullet points: • or * or -
    html = html.replace(/^[•\*\-]\s+(.+)$/gm, "<li>$1</li>");

    // Wrap consecutive <li> items in <ul>
    html = html.replace(/(<li>.*<\/li>(\n|$))+/g, (match) => {
      return '<ul class="list-disc ml-4 my-2">' + match + "</ul>";
    });

    // Line breaks (double newline = paragraph)
    html = html.replace(/\n\n/g, '</p><p class="mb-2">');

    // Single line breaks
    html = html.replace(/\n/g, "<br>");

    // Wrap in paragraph if not already wrapped
    if (!html.startsWith("<ul>") && !html.startsWith("<p>")) {
      html = '<p class="mb-2">' + html + "</p>";
    }

    return html;
  }

  formatTime(timestamp) {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  showTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    indicator.classList.remove("hidden");

    const messagesContainer = document.getElementById("chat-messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    indicator.classList.add("hidden");
  }

  async callChatbotAPI(userMessage) {
    try {
      console.log("🚀 Calling API:", this.apiUrl);
      console.log("📤 Sending:", {
        message: userMessage,
        session_id: this.sessionId,
      });

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: this.sessionId,
        }),
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("📥 API Response:", data);

      this.hideTypingIndicator();

      const botMessage = {
        type: "bot",
        content:
          data.response ||
          data.answer ||
          "I received your message but couldn't generate a response.",
        timestamp: new Date(),
      };

      this.messages.push(botMessage);
      this.displayMessage(botMessage);
      this.saveChatHistory();
    } catch (error) {
      console.error("❌ Chatbot API error:", error);
      this.hideTypingIndicator();

      // Show error message to user
      const errorMessage = {
        type: "bot",
        content: `Sorry, I'm having trouble connecting to my brain 🧠. Error: ${error.message}. Please try again in a moment or contact us at info@romega-solutions.com`,
        timestamp: new Date(),
      };

      this.messages.push(errorMessage);
      this.displayMessage(errorMessage);
      this.saveChatHistory();
    }
  }

  generateResponse(userMessage) {
    this.hideTypingIndicator();

    const response = this.findBestResponse(userMessage);
    const botMessage = {
      type: "bot",
      content: response,
      timestamp: new Date(),
    };

    this.messages.push(botMessage);
    this.displayMessage(botMessage);

    // Save chat history
    this.saveChatHistory();
  }

  findBestResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check each knowledge base entry
    for (const entry of Object.values(this.knowledgeBase)) {
      let score = 0;

      // Check keywords
      for (const keyword of entry.keywords) {
        if (message.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher scores
        }
      }

      if (score > 0) {
        return entry.answer;
      }
    }

    // Handle specific patterns
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return "Hello! I'm here to help with all your recruitment and HR needs. What specific service are you interested in?";
    }

    if (message.includes("thank") || message.includes("thanks")) {
      return "Yi there! 👋 I'm Pulse, your HR & Digital Marketing assistant. Whether you need help with talent acquisition, HR strategy, or growing your digital presence, I'm here to guide you. What can I help you with today
    }

    if (message.includes("bye") || message.includes("goodbye")) {
      return "Thank you for contacting Romega Solutions! Feel free to reach out anytime. We're here to help you grow! 👋";
    }

    // Default response with helpful suggestions
    return `I'd be happy to help you with that! While I search for the best answer, here are some things I can definitely help with:

• Executive recruitment and RPO services
• HR consulting and BPO solutions
• Quality hire and talent acquisitionHere are some things I can definitely help with:

📋 **HR Solutions:**
• Executive recruitment and RPO services
• HR consulting and BPO solutions
• Quality hire and talent acquisition

📈 **Digital Marketing:**
• Social Media marketing strategies
• SEO and content marketing
• Brand development and online presence

You can also email us at info@romega-solutions.com or book a call to speak with a specialist. What would you like to explore
      localStorage.setItem(
        "romega-chat-history",
        JSON.stringify(this.messages)
      );
    } catch (e) {
      console.warn("Could not save chat history:", e);
    }
  }

  loadChatHistory() {
    try {
      const history = localStorage.getItem("romega-chat-history");
      if (history) {
        this.messages = JSON.parse(history);
        // Don't auto-display old messages - let them start fresh each time
      }
    } catch (e) {
      console.warn("Could not load chat history:", e);
    }
  }

  // Public method to add custom responses
  addKnowledgeEntry(key, question, answer, keywords) {
    this.knowledgeBase[key] = {
      question,
      answer,
      keywords,
    };
  }

  // Public method to show notification (removed - no longer needed)
  showNotification() {
    // Notification badge removed for cleaner design
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Only initialize if we're not on a page that shouldn't have the chatbot
  const currentPage = window.location.pathname;
  const excludePages = ["/admin", "/login", "/dashboard"];

  if (!excludePages.some((page) => currentPage.includes(page))) {
    window.romegaChatbot = new RomegaChatbot();

    // Show notification after 10 seconds if user hasn't interacted
    setTimeout(() => {
      if (
        !window.romegaChatbot.isOpen &&
        window.romegaChatbot.messages.length === 0
      ) {
        window.romegaChatbot.showNotification();
      }
    }, 10000);
  }
});

// Export for testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = RomegaChatbot;
}
