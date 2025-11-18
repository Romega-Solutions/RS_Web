class JobsManager {
  constructor() {
    this.apiUrl =
      "https://script.google.com/macros/s/AKfycbwuPSsnmiz2B2lBIbmhWcJwQ35nrPCtdR0DXjrK7dhWvGaXuoin4rs5LhkEUpWBud0f6A/exec";
    this.jobsContainer = document.getElementById("jobsContainer");
    this.emptyState = document.getElementById("emptyState");
  }

  async loadJobs() {
    try {
      const response = await fetch(this.apiUrl);
      const jobs = await response.json();

      if (jobs.length === 0) {
        this.showEmptyState();
      } else {
        this.renderJobs(jobs);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
      this.showError();
    }
  }

  renderJobs(jobs) {
    this.jobsContainer.innerHTML = jobs
      .map((job) => this.createJobCard(job))
      .join("");
    this.emptyState.style.display = "none";
  }

  createJobCard(job) {
    const isActive = job.status === "Active";
    const cardClass = isActive ? "" : "opacity-70";

    return `
      <div class="rounded-lg bg-[var(--rs-neutral-100)] hover:shadow-sm transition-shadow ${cardClass}">
        <!-- Job Header -->
        <div class="flex items-start justify-between mb-3">
          ${
            isActive
              ? `
            <a href="${job.application_url}" target="_blank" rel="noopener" aria-label="View ${job.job_title} position">
              <h3 class="text-base font-semibold text-[18px] text-merriweather text-[var(--rs-primary-700)] hover:underline cursor-pointer flex items-center gap-2">
                ${job.job_title}
                <img src="/assets/images/careers/link.svg" alt="" class="h-[18px] w-[18px]" aria-hidden="true">
              </h3>
            </a>
          `
              : `
            <h3 class="text-base font-semibold text-[18px] text-merriweather text-[var(--rs-primary-700)] flex items-center gap-2">
              ${job.job_title}
              <img src="/assets/images/careers/link.svg" alt="" class="h-[18px] w-[18px]" aria-hidden="true">
            </h3>
          `
          }
          <span class="text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded whitespace-nowrap">
            <img src="/assets/images/careers/envelope.svg" alt="" class="h-[12px] w-[12px] inline-block mr-1" aria-hidden="true">
            ${this.formatDate(job.posted_date)}
          </span>
        </div>

        <!-- Job Details -->
        <div class="flex flex-wrap gap-x-2 gap-y-2 mb-4 text-[14px] text-[var(--rs-neutral-600)]">
          <div class="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1">
            <img src="/assets/images/careers/location.svg" class="w-[12px] h-[12px]" alt="" aria-hidden="true">
            <span>${job.location}</span>
          </div>
          <div class="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1">
            <img src="${this.getWorkTypeIcon(
              job.work_type
            )}" class="w-[12px] h-[12px]" alt="" aria-hidden="true">
            <span>${job.work_type}</span>
          </div>
          <div class="flex items-center gap-1 rounded-[36px] bg-[var(--rs-primary-100)] px-2 py-1">
            <img src="${this.getEmploymentTypeIcon(
              job.employment_type
            )}" class="w-[12px] h-[12px]" alt="" aria-hidden="true">
            <span>${job.employment_type}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          ${
            isActive
              ? `
            <a href="${job.application_url}" target="_blank" rel="noopener" class="flex-1">
              <button class="bg-[var(--rs-primary-500)] justify-center w-full h-[40px] text-[var(--rs-primary-100)] px-2 py-2 rounded-[6px] text-[15px] font-medium hover:bg-[#005885] transition flex items-center gap-2 border border-[var(--rs-primary-600)]">
                <img src="/assets/images/careers/linkedin.svg" class="w-[18px] h-[18px]" alt="">
                See Details in LinkedIn
              </button>
            </a>
          `
              : `
            <button class="border border-[var(--rs-primary-400)] bg-white text-[var(--rs-primary-600)] px-3 py-2 rounded text-[15px] font-medium flex items-center gap-2 w-full justify-center opacity-80 cursor-not-allowed" disabled>
              <img src="/assets/images/careers/lock.svg" class="w-[18px] h-[18px]" alt="Lock Icon">
              No longer accepting applications
            </button>
          `
          }
        </div>

        <hr class="border-1 border-b border-[var(--rs-neutral-400)] my-4">
      </div>
    `;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  getWorkTypeIcon(workType) {
    const icons = {
      Remote: "/assets/images/careers/world.svg",
      "On-Site": "/assets/images/careers/office.svg",
      Hybrid: "/assets/images/careers/hybrid.svg",
    };
    return icons[workType] || "/assets/images/careers/world.svg";
  }

  getEmploymentTypeIcon(employmentType) {
    const icons = {
      "Full-Time": "/assets/images/careers/part.svg",
      "Part-Time": "/assets/images/careers/part.svg",
      Contract: "/assets/images/careers/contract.svg",
      Internship: "/assets/images/careers/part.svg",
    };
    return icons[employmentType] || "/assets/images/careers/part.svg";
  }

  showEmptyState() {
    this.jobsContainer.innerHTML = "";
    this.emptyState.style.display = "block";
  }

  showError() {
    this.jobsContainer.innerHTML = `
      <div class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 opacity-60 flex items-center justify-center">
          <img src="/assets/images/careers/error.svg" alt="Error icon" class="w-12 h-12" />
        </div>
        <p class="text-[var(--rs-primary-600)] text-lg font-medium mb-1">
          Unable to load current opportunities
        </p>
        <p class="text-[var(--rs-primary-400)] text-base">
          Please try again later or visit our LinkedIn page
        </p>
      </div>
    `;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const jobsManager = new JobsManager();
  jobsManager.loadJobs();

  // Refresh jobs every 5 minutes
  setInterval(() => jobsManager.loadJobs(), 5 * 60 * 1000);
});
