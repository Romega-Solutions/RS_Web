document.addEventListener("DOMContentLoaded", function () {
  _a();
});
function _a() {
  const _b = document.querySelector(".mobile-menu-button"),
    _c = document.querySelector(".mobile-menu");
  if (_b && _c) {
    const _d = _b.cloneNode(!0);
    _b.parentNode.replaceChild(_d, _b);
    _d.addEventListener("click", function (_e) {
      _e.preventDefault();
      _e.stopPropagation();
      const _f = _c.classList.contains("hidden");
      _f
        ? (_c.classList.remove("hidden"),
          _d.setAttribute("aria-expanded", "true"))
        : (_c.classList.add("hidden"),
          _d.setAttribute("aria-expanded", "false"));
    });
    document.addEventListener("click", function (_e) {
      _c &&
        _d &&
        !_c.contains(_e.target) &&
        !_d.contains(_e.target) &&
        (_c.classList.add("hidden"), _d.setAttribute("aria-expanded", "false"));
    });
    console.log("Mobile menu setup complete");
  } else
    console.warn("Mobile menu elements not found:", {
      button: !!_b,
      menu: !!_c,
    });
}
const utils = {
  debounce: function (_g, _h) {
    let _i;
    return function _j(..._k) {
      const _l = () => {
        clearTimeout(_i);
        _g(..._k);
      };
      clearTimeout(_i);
      _i = setTimeout(_l, _h);
    };
  },
};
window.RomegaUtils = utils;
