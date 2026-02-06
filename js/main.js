// Main JavaScript file for Romega Solutions website - Mobile menu functionality only

// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  setupMobileMenu();
  setupCopyProtection();
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

// ===========================
// COPY PROTECTION FUNCTIONALITY
// ===========================
function setupCopyProtection() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, false);

  // Disable text selection via mouse
  document.addEventListener('selectstart', function(e) {
    // Allow selection in input fields
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return true;
    }
    e.preventDefault();
    return false;
  }, false);

  // Disable copy event
  document.addEventListener('copy', function(e) {
    // Allow copying from input fields
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return true;
    }
    e.preventDefault();
    return false;
  }, false);

  // Disable cut event
  document.addEventListener('cut', function(e) {
    // Allow cutting from input fields
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return true;
    }
    e.preventDefault();
    return false;
  }, false);

  // Disable keyboard shortcuts for copying
  document.addEventListener('keydown', function(e) {
    // Allow shortcuts in input fields
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return true;
    }

    // Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, Ctrl+S, F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (
      (e.ctrlKey && (e.key === 'c' || e.key === 'C')) || // Copy
      (e.ctrlKey && (e.key === 'x' || e.key === 'X')) || // Cut
      (e.ctrlKey && (e.key === 'a' || e.key === 'A')) || // Select All
      (e.ctrlKey && (e.key === 'u' || e.key === 'U')) || // View Source
      (e.ctrlKey && (e.key === 's' || e.key === 'S')) || // Save
      (e.key === 'F12') || // Developer Tools
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) || // Inspect
      (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j')) || // Console
      (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) || // Inspect Element
      (e.metaKey && (e.key === 'c' || e.key === 'C')) || // Mac Copy
      (e.metaKey && (e.key === 'x' || e.key === 'X')) || // Mac Cut
      (e.metaKey && (e.key === 'a' || e.key === 'A'))    // Mac Select All
    ) {
      e.preventDefault();
      return false;
    }
  }, false);

  // Disable drag and drop of text/images
  document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'INPUT' || 
        e.target.tagName === 'TEXTAREA' || 
        e.target.isContentEditable) {
      return true;
    }
    e.preventDefault();
    return false;
  }, false);

  console.log('Copy protection enabled');
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
