// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: "JD0EOnTsEC1LeFyhe",
  serviceId: "service_8r6ul7n",    
  templateId: "template_5i4etfg",   
};

// Initialize EmailJS
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('EmailJS initialized successfully');
  } else {
    console.error('EmailJS not loaded!');
  }
})();

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (!contactForm) {
    console.error("Contact form with ID 'contact-form' not found!");
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (!submitButton) {
    console.error("Submit button not found!");
    return;
  }

  const originalButtonText = submitButton.innerHTML;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log("Form submission started..."); // Debug log

    // Check EmailJS availability
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS is not available');
      showErrorMessage("Email service is not available. Please try again later.");
      return;
    }

    // 1. CHECK HONEYPOT (spam bot detection)
    const honeypot = this.honeypot.value;
    if (honeypot) {
      console.log('🤖 Bot detected via honeypot!');
      return; // Silently reject if honeypot is filled (bot)
    }
    console.log('✅ Honeypot check passed');

    // Get form data first
    const formData = new FormData(contactForm);

    // Debug: Log all form fields
    console.log("Form data:", {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      subject: formData.get("subject"),
      message: formData.get("message")
    });

    // Validate form before sending
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      showErrorMessage("Please fill in all required fields correctly: " + errors.join(", "));
      return;
    }

    // 2. VALIDATE RECAPTCHA (after form validation)
    if (typeof grecaptcha === 'undefined') {
      showErrorMessage("reCAPTCHA is not loaded. Please refresh the page.");
      return;
    }

    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      showErrorMessage("⚠️ Please complete the reCAPTCHA verification.");
      return;
    }

    console.log("✅ reCAPTCHA validation passed");

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
            </div>
        `;

    // Get current timestamp
    const currentTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const templateParams = {
      from_name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      from_email: formData.get("email"),
      subject: formData.get("subject") || "general",
      message: formData.get("message"),
      company: formData.get("company") || "Not specified",
      phone: formData.get("phone"),
      to_name: "Romega Solutions Team",
      reply_to: currentTime, // Using for timestamp as per your template
      'g-recaptcha-response': recaptchaResponse // Include reCAPTCHA token
    };

    console.log("EmailJS Config:", {
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.templateId,
      publicKey: EMAILJS_CONFIG.publicKey
    });
    console.log("Template params:", templateParams);

    // Send email using EmailJS
    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        showSuccessMessage();
        contactForm.reset();
        
        // Reset reCAPTCHA
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }
      })
      .catch(function (error) {
        console.error("FAILED...", error);
        console.error("Error details:", {
          status: error.status,
          text: error.text,
          serviceId: EMAILJS_CONFIG.serviceId,
          templateId: EMAILJS_CONFIG.templateId
        });

        let errorMessage = "Failed to send message. Please try again.";

        // Provide specific error messages
        if (error.status === 400) {
          errorMessage = "Bad request. Please check your information and try again.";
        } else if (error.status === 401) {
          errorMessage = "Authentication failed. Please contact support.";
        } else if (error.status === 404) {
          errorMessage = "Email service configuration error. Please contact support.";
          console.error("404 Error - Check your Service ID and Template ID in EmailJS dashboard");
        } else if (error.status === 422) {
          errorMessage = "Invalid email data. Please check all fields.";
        }

        showErrorMessage(errorMessage);
        
        // Reset reCAPTCHA on error
        if (typeof grecaptcha !== 'undefined') {
          grecaptcha.reset();
        }
      })
      .finally(function () {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      });
  });

  function showSuccessMessage() {
    removeExistingNotifications();

    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2 notification";
    notification.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Message sent successfully! We'll get back to you soon.
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification && notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  function showErrorMessage(message = "Failed to send message. Please try again or contact us directly.") {
    removeExistingNotifications();

    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2 notification";
    notification.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            ${message}
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification && notification.parentNode) {
        notification.remove();
      }
    }, 7000);
  }

  function removeExistingNotifications() {
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => {
      if (notification && notification.parentNode) {
        notification.remove();
      }
    });
  }
});

// Form validation function (renamed to avoid conflicts)
function validateFormData(formData) {
  const errors = [];

  if (!formData.get("firstName")?.trim()) {
    errors.push("First name is required");
  }

  if (!formData.get("lastName")?.trim()) {
    errors.push("Last name is required");
  }

  const email = formData.get("email")?.trim();
  if (!email) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Please enter a valid email address");
  }

  const phone = formData.get("phone")?.trim();
  if (!phone) {
    errors.push("Phone number is required");
  } else if (!/[\+]?[0-9\s\-\(\)]{10,}/.test(phone)) {
    errors.push("Please enter a valid phone number (minimum 10 digits)");
  }

  const subject = formData.get("subject")?.trim();
  if (!subject) {
    errors.push("Please select a subject");
  }

  if (!formData.get("message")?.trim()) {
    errors.push("Message is required");
  }

  return errors;
}