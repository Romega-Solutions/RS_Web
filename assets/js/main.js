// Main JavaScript file for Romega Solutions website - Navbar functionality only

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
      return true; // Return success
    }
    return false;
  } catch (error) {
    console.error("Error loading component:", error);
    return false;
  }
}

// Load components when DOM is ready
document.addEventListener("DOMContentLoaded", async function () {
  // Load unified navbar and footer components
  const isInPagesFolder = window.location.pathname.includes("/pages/");
  const navbarPath = isInPagesFolder
    ? "../components/navbar-unified.html"
    : "./components/navbar-unified.html";
  const footerPath = isInPagesFolder
    ? "../components/footer.html"
    : "./components/footer.html";

  // Load components and wait for them to complete
  const navbarLoaded = await loadComponent("navbar-container", navbarPath);
  const footerLoaded = await loadComponent("footer-container", footerPath);

  // Only proceed if navbar loaded successfully
  if (navbarLoaded) {
    // Small delay to ensure DOM is fully updated
    setTimeout(() => {
      setupNavbarPaths();
      setupMobileMenu();
    }, 100);
  } else {
    console.error("Failed to load navbar component");
  }
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
  const navCtaIcon = document.getElementById("nav-cta-icon");

  if (navHome) navHome.href = pathPrefix + "index.html";
  if (navAbout) navAbout.href = pathPrefix + pagesPrefix + "about.html";
  if (navServices)
    navServices.href = pathPrefix + pagesPrefix + "services.html";
  if (navCareers) navCareers.href = pathPrefix + pagesPrefix + "careers.html";
  if (navResources)
    navResources.href = pathPrefix + pagesPrefix + "resources.html";
  if (navContact) navContact.href = pathPrefix + pagesPrefix + "contact.html";
  if (navCta) navCta.href = pathPrefix + pagesPrefix + "contact.html";
  if (navCtaIcon)
    navCtaIcon.src = pathPrefix + "assets/images/homepage/calendar-days.png";

  // Set mobile navigation paths
  const mobileNavHome = document.getElementById("mobile-nav-home");
  const mobileNavAbout = document.getElementById("mobile-nav-about");
  const mobileNavServices = document.getElementById("mobile-nav-services");
  const mobileNavCareers = document.getElementById("mobile-nav-careers");
  const mobileNavResources = document.getElementById("mobile-nav-resources");
  const mobileNavContact = document.getElementById("mobile-nav-contact");
  const mobileNavCta = document.getElementById("mobile-nav-cta");
  const mobileNavCtaIcon = document.getElementById("mobile-nav-cta-icon");

  if (mobileNavHome) mobileNavHome.href = pathPrefix + "index.html";
  if (mobileNavAbout)
    mobileNavAbout.href = pathPrefix + pagesPrefix + "about.html";
  if (mobileNavServices)
    mobileNavServices.href = pathPrefix + pagesPrefix + "services.html";
  if (mobileNavCareers)
    mobileNavCareers.href = pathPrefix + pagesPrefix + "careers.html";
  if (mobileNavResources)
    mobileNavResources.href = pathPrefix + pagesPrefix + "resources.html";
  if (mobileNavContact)
    mobileNavContact.href = pathPrefix + pagesPrefix + "contact.html";
  if (mobileNavCta)
    mobileNavCta.href = pathPrefix + pagesPrefix + "contact.html";
  if (mobileNavCtaIcon)
    mobileNavCtaIcon.src =
      pathPrefix + "assets/images/homepage/calendar-days.png";

  console.log("Navigation paths setup complete", {
    isInPagesFolder,
    pathPrefix,
    pagesPrefix,
  });
}

// Mobile menu toggle functionality
function setupMobileMenu() {
  const mobileMenuButton = document.querySelector(".mobile-menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    // Remove any existing event listeners by cloning the button
    const newButton = mobileMenuButton.cloneNode(true);
    mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);

    newButton.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isHidden = mobileMenu.classList.contains("hidden");

      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        newButton.setAttribute("aria-expanded", "true");
      } else {
        mobileMenu.classList.add("hidden");
        newButton.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        mobileMenu &&
        newButton &&
        !mobileMenu.contains(event.target) &&
        !newButton.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
        newButton.setAttribute("aria-expanded", "false");
      }
    });

    console.log("Mobile menu setup complete");
  } else {
    console.warn("Mobile menu elements not found:", {
      button: !!mobileMenuButton,
      menu: !!mobileMenu,
    });
  }
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
};

// Export utils for use in other scripts if needed
window.RomegaUtils = utils;
