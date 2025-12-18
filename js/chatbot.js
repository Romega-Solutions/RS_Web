// Romega Solutions Chatbot
// Professional chatbot for recruitment and HR services

class RomegaChatbot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.isTyping = false;
    this.knowledgeBase = this.initializeKnowledgeBase();
    this.apiKey = null; // Will be set from environment or config
    this.init();
  }

  init() {
    this.createChatWidget();
    this.attachEventListeners();
    this.loadChatHistory();
  }

  initializeKnowledgeBase() {
    return {
      services: {
        question: "What services does Romega Solutions offer?",
        answer:
          "We provide a full suite of business support services including: RPO (Recruitment Process Outsourcing), BPO (Business Process Outsourcing), Strategic HR consulting, Quality Hire (Executive Search), Mentoring, and Teaching/Training services. We specialize in connecting visionary leaders with opportunities that drive growth, innovation, and lasting impact.",
        keywords: [
          "services",
          "what do you do",
          "offerings",
          "help with",
          "provide",
          "RPO",
          "BPO",
          "HR",
        ],
      },
      rpo: {
        question: "What is RPO and how does it work?",
        answer:
          "Our RPO (Recruitment Process Outsourcing) service handles your entire recruitment process from talent mapping to final placement. We specialize in executive-level positions and typically fill critical roles within 2-4 weeks with 95%+ retention rates. We're 60-70% faster than traditional recruitment methods and offer 15% lower fees than competitors.",
        keywords: [
          "RPO",
          "recruitment",
          "hiring",
          "executive search",
          "talent",
          "outsourcing",
        ],
      },
      bpo: {
        question: "What BPO services do you provide?",
        answer:
          "Our BPO (Business Process Outsourcing) services help streamline your operations with expert-backed HR solutions, administrative support, and process optimization. We provide scalable solutions that allow you to focus on core business activities while we handle operational complexities with our skilled Philippine-based team.",
        keywords: [
          "BPO",
          "business process",
          "outsourcing",
          "HR solutions",
          "administrative",
          "operations",
          "support",
        ],
      },
      pricing: {
        question: "How much do your services cost?",
        answer:
          "We offer transparent, competitive pricing that's 15% lower than traditional recruitment firms while maintaining premium quality. Our fees vary by service type and role complexity. We provide detailed quotes within 24 hours and offer flexible payment terms. Contact us for a customized proposal based on your specific needs.",
        keywords: [
          "price",
          "cost",
          "fee",
          "how much",
          "budget",
          "pricing",
          "quote",
          "rates",
        ],
      },
      timeframe: {
        question: "How fast can you fill positions?",
        answer:
          "We're significantly faster than traditional methods: Executive positions typically filled in 2-4 weeks, Critical AI/ML roles in ~2 weeks, Senior leadership roles in 3-5 weeks. Our streamlined process and global talent network allow us to move 60-70% faster than industry standards while maintaining quality.",
        keywords: [
          "time",
          "fast",
          "quick",
          "how long",
          "speed",
          "timeline",
          "when",
        ],
      },
      quality: {
        question: "How do you ensure quality hires?",
        answer:
          "We focus on cultural fit insights, comprehensive vetting, and strategic matching. Our process includes behavioral assessments, technical evaluations, cultural alignment checks, and reference verification. We achieve 95%+ retention rates and offer placement guarantees. Our goal is ensuring leaders stay longer and deliver lasting organizational impact.",
        keywords: [
          "quality",
          "retention",
          "cultural fit",
          "vetting",
          "guarantee",
          "assessment",
        ],
      },
      consultation: {
        question: "Can I schedule a consultation?",
        answer:
          "Absolutely! We offer free discovery calls to understand your hiring needs and challenges. You can schedule directly through our Calendly link, use our contact form, or email us at info@romega-solutions.com. We typically respond within 4 hours and can arrange consultations within 24-48 hours.",
        keywords: [
          "consultation",
          "schedule",
          "appointment",
          "meeting",
          "discovery call",
          "free",
        ],
      },
      contact: {
        question: "How can I contact Romega Solutions?",
        answer:
          "You can reach us multiple ways: Email: info@romega-solutions.com, Schedule a meeting via Calendly, Use our website contact form, or visit our headquarters at 222 Pacific Coast Hwy, #10 in El Segundo, CA 90245. We respond to emails within 4 hours during business hours.",
        keywords: [
          "contact",
          "phone",
          "email",
          "reach",
          "call",
          "support",
          "address",
        ],
      },
    };
  }

  createChatWidget() {
    // Create chat widget HTML
    const chatWidget = document.createElement("div");
    chatWidget.id = "romega-chatbot";
    chatWidget.innerHTML = `
      <!-- Chat Toggle Button -->
      <div id="chat-toggle" class="fixed bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 z-[9999]">
        <button id="chat-toggle-btn" class="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 hover:scale-110 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-lg">
          <span id="chat-icon">💬</span>
          <span id="close-icon" class="hidden">✕</span>
        </button>

      </div>

      <!-- Chat Window -->
      <div id="chat-window" class="fixed bottom-24 right-6 md:bottom-28 md:right-8 lg:bottom-32 lg:right-10 w-[calc(100vw-3rem)] sm:w-[400px] md:w-[420px] lg:w-[440px] h-[calc(100vh-8rem)] sm:h-[520px] md:h-[550px] lg:h-[580px] max-h-[85vh] bg-white rounded-lg shadow-2xl z-[9998] hidden flex flex-col border border-gray-200">
        <!-- Header -->
        <div class="bg-blue-600 text-white p-4 rounded-t-lg">
          <div class="text-center">
            <h3 class="font-semibold text-lg">Romega Assistant</h3>
            <p class="text-xs text-blue-100">How can I help you today?</p>
          </div>
        </div>

        <!-- Messages Container -->
        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <!-- Welcome message will be added here -->
        </div>

        <!-- Typing Indicator -->
        <div id="typing-indicator" class="px-4 py-2 hidden">
          <div class="flex items-center space-x-2 text-gray-500">
            <span class="text-sm">Romega Assistant is typing...</span>
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
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
        </div>
      </div>
    `;

    document.body.appendChild(chatWidget);
  }

  attachEventListeners() {
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
        const message = btn.getAttribute("data-message");
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
    const welcomeMessage = {
      type: "bot",
      content:
        "👋 Hi! I'm your Romega Solutions assistant. I can help you with recruitment services, executive search, HR consulting, and more. What can I help you with today?",
      timestamp: new Date(),
    };

    this.messages.push(welcomeMessage);
    this.displayMessage(welcomeMessage);
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
    setTimeout(() => {
      this.generateResponse(message);
    }, 1000 + Math.random() * 1000); // Random delay for realism
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
    messageDiv.innerHTML = `
      <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${bgClass} ${textClass} shadow-sm">
        <p class="text-sm">${this.formatMessage(message.content)}</p>
        <p class="text-xs mt-1 opacity-70">${this.formatTime(
          message.timestamp
        )}</p>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  formatMessage(content) {
    // Convert URLs to links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    content = content.replace(
      urlRegex,
      '<a href="$1" target="_blank" class="underline">$1</a>'
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
    let bestMatch = null;
    let highestScore = 0;

    // Check each knowledge base entry
    for (const [key, entry] of Object.entries(this.knowledgeBase)) {
      let score = 0;

      // Check keywords
      for (const keyword of entry.keywords) {
        if (message.includes(keyword.toLowerCase())) {
          score += keyword.length; // Longer keywords get higher scores
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    // If we found a good match, return it
    if (bestMatch && highestScore > 0) {
      return bestMatch.answer;
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
      return "You're welcome! Is there anything else I can help you with regarding our recruitment and HR services?";
    }

    if (message.includes("bye") || message.includes("goodbye")) {
      return "Thank you for contacting Romega Solutions! Feel free to reach out anytime. Have a great day! 👋";
    }

    // Default response with helpful suggestions
    return `I'd be happy to help you with that! While I search for the best answer, here are some things I can definitely help with:

• Executive recruitment and RPO services
• HR consulting and BPO solutions
• Quality hire and talent acquisition
• Strategic HR planning
• Global talent sourcing

You can also email us at info@romega-solutions.com or schedule a discovery call through our website for immediate assistance. What specific aspect interests you most?`;
  }

  saveChatHistory() {
    try {
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
