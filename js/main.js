// Main JavaScript file for Romega Solutions website - Mobile menu functionality only

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
});

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
