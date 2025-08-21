// EmailJS Configuration
const EMAILJS_CONFIG = {
  publicKey: "JD0EOnTsEC1LeFyhe", // Replace with your EmailJS public key
  serviceId: "service_8r6ul7n", // Replace with your EmailJS service ID
  templateId: "template_5i4etfg", // Replace with your EmailJS template ID
};

// Initialize EmailJS
(function () {
  emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// Form submission handler
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
            <div class="flex items-center gap-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Sending...
            </div>
        `;

    // Get form data
    const formData = new FormData(contactForm);
    const templateParams = {
      from_name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      from_email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      to_name: "Romega Solutions Team",
      reply_to: formData.get("email"),
    };

    // Send email using EmailJS
    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
      .then(function (response) {
        console.log("SUCCESS!", response.status, response.text);
        showSuccessMessage();
        contactForm.reset();
      })
      .catch(function (error) {
        console.log("FAILED...", error);
        showErrorMessage();
      })
      .finally(function () {
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      });
  });

  function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2";
    notification.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Message sent successfully! We'll get back to you soon.
        `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  function showErrorMessage() {
    // Create error notification
    const notification = document.createElement("div");
    notification.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2";
    notification.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Failed to send message. Please try again or contact us directly.
        `;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
});

// Add this to contact-form.js after the existing code
function validateForm(formData) {
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

  if (!formData.get("subject")) {
    errors.push("Please select a subject");
  }

  if (!formData.get("message")?.trim()) {
    errors.push("Message is required");
  }

  return errors;
}
