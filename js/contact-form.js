const EMAILJS_CONFIG = {
  publicKey: "JD0EOnTsEC1LeFyhe",
  serviceId: "service_8r6ul7n",
  templateId: "template_5i4etfg",
};
(function () {
  typeof emailjs !== "undefined"
    ? (emailjs.init(EMAILJS_CONFIG.publicKey),
      console.log("EmailJS initialized successfully"))
    : console.error("EmailJS not loaded!");
})();
document.addEventListener("DOMContentLoaded", function () {
  const _a = document.getElementById("contact-form");
  if (!_a) {
    console.error("Contact form with ID 'contact-form' not found!");
    return;
  }
  const _b = _a.querySelector('button[type="submit"]');
  if (!_b) {
    console.error("Submit button not found!");
    return;
  }
  const _c = _b.innerHTML;
  _a.addEventListener("submit", function (_d) {
    _d.preventDefault();
    console.log("Form submission started...");
    if (typeof emailjs === "undefined") {
      console.error("EmailJS is not available");
      _f("Email service is not available. Please try again later.");
      return;
    }
    const _e = this.honeypot.value;
    if (_e) {
      console.log("🤖 Bot detected via honeypot!");
      return;
    }
    console.log("✅ Honeypot check passed");
    const _g = new FormData(_a);
    console.log("Form data:", {
      firstName: _g.get("firstName"),
      lastName: _g.get("lastName"),
      email: _g.get("email"),
      phone: _g.get("phone"),
      company: _g.get("company"),
      subject: _g.get("subject"),
      message: _g.get("message"),
    });
    const _h = validateFormData(_g);
    if (_h.length > 0) {
      console.error("Validation errors:", _h);
      _f("Please fill in all required fields correctly: " + _h.join(", "));
      return;
    }
    if (typeof grecaptcha === "undefined") {
      _f("reCAPTCHA is not loaded. Please refresh the page.");
      return;
    }
    const _i = grecaptcha.getResponse();
    if (!_i) {
      _f("⚠️ Please complete the reCAPTCHA verification.");
      return;
    }
    console.log("✅ reCAPTCHA validation passed");
    _b.disabled = !0;
    _b.innerHTML = `<div class="flex items-center gap-2"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>Sending...</div>`;
    const _j = new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }),
      _k = {
        from_name: `${_g.get("firstName")} ${_g.get("lastName")}`,
        from_email: _g.get("email"),
        subject: _g.get("subject") || "general",
        message: _g.get("message"),
        company: _g.get("company") || "Not specified",
        phone: _g.get("phone"),
        to_name: "Romega Solutions Team",
        reply_to: _j,
        "g-recaptcha-response": _i,
      };
    console.log("EmailJS Config:", {
      serviceId: EMAILJS_CONFIG.serviceId,
      templateId: EMAILJS_CONFIG.templateId,
      publicKey: EMAILJS_CONFIG.publicKey,
    });
    console.log("Template params:", _k);
    emailjs
      .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, _k)
      .then(function (_l) {
        console.log("SUCCESS!", _l.status, _l.text);
        _m();
        _a.reset();
        typeof grecaptcha !== "undefined" && grecaptcha.reset();
      })
      .catch(function (_n) {
        console.error("FAILED...", _n);
        console.error("Error details:", {
          status: _n.status,
          text: _n.text,
          serviceId: EMAILJS_CONFIG.serviceId,
          templateId: EMAILJS_CONFIG.templateId,
        });
        let _o = "Failed to send message. Please try again.";
        _n.status === 400
          ? (_o = "Bad request. Please check your information and try again.")
          : _n.status === 401
          ? (_o = "Authentication failed. Please contact support.")
          : _n.status === 404
          ? ((_o =
              "Email service configuration error. Please contact support."),
            console.error(
              "404 Error - Check your Service ID and Template ID in EmailJS dashboard"
            ))
          : _n.status === 422 &&
            (_o = "Invalid email data. Please check all fields.");
        _f(_o);
        typeof grecaptcha !== "undefined" && grecaptcha.reset();
      })
      .finally(function () {
        _b.disabled = !1;
        _b.innerHTML = _c;
      });
  });
  function _m() {
    _p();
    const _q = document.createElement("div");
    _q.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2 notification";
    _q.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Message sent successfully! We'll get back to you soon.`;
    document.body.appendChild(_q);
    setTimeout(() => {
      _q && _q.parentNode && _q.remove();
    }, 5e3);
  }
  function _f(
    _r = "Failed to send message. Please try again or contact us directly."
  ) {
    _p();
    const _q = document.createElement("div");
    _q.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-2 notification";
    _q.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>${_r}`;
    document.body.appendChild(_q);
    setTimeout(() => {
      _q && _q.parentNode && _q.remove();
    }, 7e3);
  }
  function _p() {
    const _s = document.querySelectorAll(".notification");
    _s.forEach((_q) => {
      _q && _q.parentNode && _q.remove();
    });
  }
});
function validateFormData(_t) {
  const _u = [];
  !_t.get("firstName")?.trim() && _u.push("First name is required");
  !_t.get("lastName")?.trim() && _u.push("Last name is required");
  const _v = _t.get("email")?.trim();
  !_v
    ? _u.push("Email is required")
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_v) ||
      _u.push("Please enter a valid email address");
  const _w = _t.get("phone")?.trim();
  !_w
    ? _u.push("Phone number is required")
    : /[\+]?[0-9\s\-\(\)]{10,}/.test(_w) ||
      _u.push("Please enter a valid phone number (minimum 10 digits)");
  const _x = _t.get("subject")?.trim();
  !_x && _u.push("Please select a subject");
  !_t.get("message")?.trim() && _u.push("Message is required");
  return _u;
}
