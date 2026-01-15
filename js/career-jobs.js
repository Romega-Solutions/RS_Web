class JobsManager {
  constructor() {
    this._a =
      "https://script.google.com/macros/s/AKfycbwuPSsnmiz2B2lBIbmhWcJwQ35nrPCtdR0DXjrK7dhWvGaXuoin4rs5LhkEUpWBud0f6A/exec";
    this._b = document.getElementById("jobsContainer");
    this._c = document.getElementById("emptyState");
  }
  async loadJobs() {
    try {
      const _d = await fetch(this._a),
        _e = await _d.json();
      _e.length === 0 ? this._f() : this._g(_e);
    } catch (_h) {
      console.error("Failed to load jobs:", _h);
      this._i();
    }
  }
  _g(_e) {
    this._b.innerHTML = _e.map((_j) => this._k(_j)).join("");
    this._c.style.display = "none";
  }
  _k(_j) {
    const _l = _j.status === "Active",
      _m = _l ? "" : "opacity-70";
    return `<div class="rounded-lg bg-[var(--rs-neutral-100)] hover:shadow-sm transition-shadow ${_m}"><div class="flex items-start justify-between mb-3">${
      _l
        ? `<a href="${_j.application_url}" target="_blank" rel="noopener" aria-label="View ${_j.job_title} position"><h3 class="text-base font-semibold text-[18px] text-merriweather text-[var(--rs-primary-700)] hover:underline cursor-pointer flex items-center gap-2">${_j.job_title}<img src="../assets/images/careers/link.svg" alt="" class="h-[18px] w-[18px]" aria-hidden="true"></h3></a>`
        : `<h3 class="text-base font-semibold text-[18px] text-merriweather text-[var(--rs-primary-700)] flex items-center gap-2">${_j.job_title}<img src="../assets/images/careers/link.svg" alt="" class="h-[18px] w-[18px]" aria-hidden="true"></h3>`
    }<span class="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded whitespace-nowrap"><img src="../assets/images/careers/envelope.svg" alt="" class="h-[12px] w-[12px] inline-block mr-1" aria-hidden="true">${this._n(
      _j.posted_date
    )}</span></div><div class="flex flex-wrap gap-x-2 gap-y-2 mb-4 text-[14px] text-[var(--rs-neutral-600)]"><div class="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1"><img src="../assets/images/careers/location.svg" class="w-[12px] h-[12px]" alt="" aria-hidden="true"><span>${
      _j.location
    }</span></div><div class="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1"><img src="${this._o(
      _j.work_type
    )}" class="w-[12px] h-[12px]" alt="" aria-hidden="true"><span>${
      _j.work_type
    }</span></div><div class="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1"><img src="${this._p(
      _j.employment_type
    )}" class="w-[12px] h-[12px]" alt="" aria-hidden="true"><span>${
      _j.employment_type
    }</span></div></div><div class="flex gap-2">${
      _l
        ? `<a href="${_j.application_url}" target="_blank" rel="noopener" class="flex-1"><button class="bg-[var(--rs-primary-500)] justify-center w-full h-[40px] text-[var(--rs-primary-100)] px-2 py-2 rounded-[6px] text-[15px] font-medium hover:bg-[#005885] transition flex items-center gap-2 border border-[var(--rs-primary-600)]"><img src="../assets/images/careers/linkedin.svg" class="w-[18px] h-[18px]" alt="">See Details in LinkedIn</button></a>`
        : `<button class="border border-[var(--rs-primary-400)] bg-white text-[var(--rs-primary-600)] px-3 py-2 rounded text-[15px] font-medium flex items-center gap-2 w-full justify-center opacity-80 cursor-not-allowed" disabled><img src="../assets/images/careers/lock.svg" class="w-[18px] h-[18px]" alt="Lock Icon">No longer accepting applications</button>`
    }</div><hr class="border-1 border-b border-[var(--rs-neutral-400)] my-4"></div>`;
  }
  _n(_q) {
    const _r = new Date(_q);
    return _r.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  _o(_s) {
    const _t = {
      Remote: "../assets/images/careers/world.svg",
      "On-Site": "../assets/images/careers/office.svg",
      Hybrid: "../assets/images/careers/hybrid.svg",
    };
    return _t[_s] || "../assets/images/careers/world.svg";
  }
  _p(_u) {
    const _v = {
      "Full-Time": "../assets/images/careers/part.svg",
      "Part-Time": "../assets/images/careers/part.svg",
      Contract: "../assets/images/careers/contract.svg",
      Internship: "../assets/images/careers/part.svg",
    };
    return _v[_u] || "../assets/images/careers/part.svg";
  }
  _f() {
    this._b.innerHTML = "";
    this._c.style.display = "block";
  }
  _i() {
    this._b.innerHTML = `<div class="text-center py-12"><div class="w-16 h-16 mx-auto mb-4 opacity-60 flex items-center justify-center"><img src="../assets/images/careers/error.svg" alt="Error icon" class="w-12 h-12" /></div><p class="text-[var(--rs-primary-600)] text-lg font-medium mb-1">Unable to load current opportunities</p><p class="text-[var(--rs-primary-400)] text-base">Please try again later or visit our LinkedIn page</p></div>`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const _w = new JobsManager();
  _w.loadJobs();
  setInterval(() => _w.loadJobs(), 3e5);
});
