

// Function to load HTML components
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Load unified navbar and footer components
  const isInPagesFolder = window.location.pathname.includes("/pages/");
  const navbarPath = isInPagesFolder
    ? "../components/navbar-unified.html"
    : "./components/navbar-unified.html";
  const footerPath = isInPagesFolder
    ? "../components/footer.html"
    : "./components/footer.html";

  loadComponent("navbar-container", navbarPath);
  loadComponent("footer-container", footerPath);

  // Wait a bit for the navbar to load before setting up paths and event listeners
  setTimeout(() => {
    setupNavbarPaths();
    setupMobileMenu();

    // Retry mobile menu setup if elements not found initially
    setTimeout(() => {
      const mobileMenuButton = document.querySelector(".mobile-menu-button");
      if (!mobileMenuButton) {
        console.log("Retrying mobile menu setup...");
        setupMobileMenu();
      }
    }, 200);
  }, 150);
});

// Function to setup navbar paths based on current page location
function setupNavbarPaths() {
  const isInPagesFolder = window.location.pathname.includes("/pages/");
  const pathPrefix = isInPagesFolder ? "../" : "";
  const pagesPrefix = isInPagesFolder ? "" : "pages/";

  // Set logo paths
  const logoLink = document.getElementById("logo-link");
  const logoImg = document.getElementById("logo-img");
  if (logoLink) logoLink.href = pathPrefix + "index.html";
  if (logoImg) logoImg.src = pathPrefix + "assets/images/homepage/logo.png";

  // Set desktop navigation paths
  const navHome = document.getElementById("nav-home");
  const navAbout = document.getElementById("nav-about");
  const navServices = document.getElementById("nav-services");
  const navCareers = document.getElementById("nav-careers");
  const navResources = document.getElementById("nav-resources");
  const navContact = document.getElementById("nav-contact");
  const navCta = document.getElementById("nav-cta");

  if (navHome) navHome.href = pathPrefix + "index.html";
  if (navAbout) navAbout.href = pagesPrefix + "about.html";
  if (navServices) navServices.href = pagesPrefix + "services.html";
  if (navCareers) navCareers.href = pagesPrefix + "careers.html";
  if (navResources) navResources.href = pagesPrefix + "resources.html";
  if (navContact) navContact.href = pagesPrefix + "contact.html";
  if (navCta) navCta.href = pagesPrefix + "contact.html";

  // Set mobile navigation paths
  const mobileNavHome = document.getElementById("mobile-nav-home");
  const mobileNavAbout = document.getElementById("mobile-nav-about");
  const mobileNavServices = document.getElementById("mobile-nav-services");
  const mobileNavCareers = document.getElementById("mobile-nav-careers");
  const mobileNavResources = document.getElementById("mobile-nav-resources");
  const mobileNavContact = document.getElementById("mobile-nav-contact");
  const mobileNavCta = document.getElementById("mobile-nav-cta");

  if (mobileNavHome) mobileNavHome.href = pathPrefix + "index.html";
  if (mobileNavAbout) mobileNavAbout.href = pagesPrefix + "about.html";
  if (mobileNavServices) mobileNavServices.href = pagesPrefix + "services.html";
  if (mobileNavCareers) mobileNavCareers.href = pagesPrefix + "careers.html";
  if (mobileNavResources)
    mobileNavResources.href = pagesPrefix + "resources.html";
  if (mobileNavContact) mobileNavContact.href = pagesPrefix + "contact.html";
  if (mobileNavCta) mobileNavCta.href = pagesPrefix + "contact.html";
}

// Mobile menu toggle functionality
function setupMobileMenu() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      mobileMenu.classList.toggle("hidden");

      // Toggle aria-expanded for accessibility
      const isExpanded = !mobileMenu.classList.contains("hidden");
      mobileMenuButton.setAttribute("aria-expanded", isExpanded);
    });

    console.log("Mobile menu setup complete"); // Debug log
  } else {
    console.warn("Mobile menu elements not found"); // Debug log
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      mobileMenu &&
      mobileMenuButton &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Setup contact form handling
  setupContactForm();
}

// Contact form handling
function setupContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      // Simple form validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        alert("Please fill in all fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Simulate form submission
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();

      // In a real application, you would send this data to your server
      console.log("Form data:", data);
    });
  }

  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// Utility functions
const utils = {
  // Debounce function for performance optimization
  debounce: function (func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Simple API call helper
  apiCall: async function (url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  },
};

// Export utils for use in other scripts if needed
window.RomegaUtils = utils;
