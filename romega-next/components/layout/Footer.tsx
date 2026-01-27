'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer
      className="bg-[var(--rs-neutral-100)] border-t-2 border-[var(--rs-neutral-grey-400)] py-10 font-sans relative"
      role="contentinfo"
    >
      {/* Scroll to Top Button */}
      <a href="#main-content" aria-label="Scroll to top of page">
        <button
          className="absolute -top-5 right-4 lg:right-12 hover:opacity-75 transition-opacity duration-300 z-10"
          aria-label="Scroll to top"
        >
          <Image
            src="/images/footer/btn-up.svg"
            alt="Scroll to top"
            width={48}
            height={48}
            className="w-10 h-10 lg:w-12 lg:h-12"
          />
        </button>
      </a>

      <div className="max-w-[1600px] mx-auto md:mx-12 lg:mx-auto px-4 md:px-2 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          {/* Romega Info & Socials */}
          <div className="lg:col-span-4 flex flex-col items-start mb-6">
            <div className="w-full flex flex-row items-start">
              {/* Logo Left */}
              <div className="flex justify-center lg:block flex-shrink-0">
                <Image
                  src="/images/navbar-company-logo.svg"
                  alt="Romega Solutions Logo"
                  width={200}
                  height={115}
                  className="w-full h-auto lg:h-[115px]"
                />
              </div>

              {/* Info + Socials Right */}
              <div className="flex flex-col items-start text-left flex-1 ml-2">
                <p className="text-[1rem] lg:text-[15px] leading-snug text-[var(--rs-neutral-600)] mb-2 lg:mb-1">
                  Empowering businesses with smart HR solutions for global growth and productivity.
                </p>
                <span className="uppercase tracking-widest text-[12px] lg:text-[13px] text-[var(--rs-neutral-400)] font-semibold mb-1">
                  Follow Us
                </span>
                <div className="flex w-full flex-row gap-2">
                  <a
                    href="https://www.linkedin.com/company/romega-solutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                    aria-label="Visit our LinkedIn page"
                  >
                    <Image
                      src="/images/footer/linkedinLogo.svg"
                      alt="LinkedIn"
                      width={32}
                      height={32}
                    />
                  </a>
                  <a
                    href="https://facebook.com/romegasolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                    aria-label="Visit our Facebook page"
                  >
                    <Image
                      src="/images/footer/facebookLogo.svg"
                      alt="Facebook"
                      width={32}
                      height={32}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule Button */}
            <div className="w-full flex justify-center mt-4">
              <a
                href="https://calendly.com/romega-solutions/discoverycall"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full h-[50px] border-[1.5px] border-[var(--rs-primary-600)] bg-[var(--rs-primary-500)] hover:bg-[#0062b1] text-[var(--rs-primary-50)] px-4 py-2 rounded-lg font-semibold text-[18px] flex items-center justify-center gap-2 shadow transition-all duration-200">
                  <Image
                    src="/images/icon-calendar-days.svg"
                    alt="Calendar"
                    width={22}
                    height={22}
                  />
                  Schedule a Call
                </button>
              </a>
            </div>
          </div>

          {/* Right Side Container */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row gap-8 lg:gap-8 mt-2 lg:mt-0">
            {/* Company & Help Section */}
            <div className="flex flex-row lg:flex-row lg:flex-1">
              {/* Company */}
              <div className="flex-1">
                <h3 className="text-[var(--rs-neutral-400)] text-center lg:text-left text-base mb-4 uppercase tracking-widest">
                  Company
                </h3>
                <ul className="space-y-3 text-center lg:text-left">
                  <li>
                    <Link
                      href="/about"
                      className="text-[var(--rs-neutral-500)] hover:text-[var(--rs-accent-600)] transition duration-300"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-[var(--rs-neutral-500)] hover:text-[var(--rs-accent-600)] transition duration-300"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-[var(--rs-neutral-500)] hover:text-[var(--rs-accent-600)] transition duration-300"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="flex lg:flex flex-col justify-center">
                <div className="w-px bg-[var(--rs-neutral-300)] mx-4 h-full min-h-[180px]"></div>
              </div>

              {/* Help */}
              <div className="flex-1">
                <h3 className="text-[var(--rs-neutral-400)] text-base mb-4 uppercase tracking-widest text-center lg:text-left">
                  Help
                </h3>
                <ul className="space-y-3 text-center lg:text-left">
                  <li>
                    <Link
                      href="/contact"
                      className="text-[var(--rs-neutral-500)] hover:text-[var(--rs-accent-600)] transition duration-300"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {/* Add terms modal logic */}}
                      className="text-[var(--rs-neutral-500)] hover:text-[var(--rs-accent-600)] transition duration-300"
                    >
                      Terms & Conditions
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {/* Add privacy modal logic */}}
                      className="text-[var(--rs-neutral-500)] hover:text-[var(--rs-accent-600)] transition duration-300"
                    >
                      Privacy Policy
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reach Us Out */}
            <div className="flex flex-col items-center lg:items-start lg:flex-1">
              <div className="space-y-6 mb-8">
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-[var(--rs-neutral-400)] text-base mb-2 uppercase tracking-widest">
                    Email Us
                  </h3>
                  <a
                    href="mailto:hr@romegasolutions.com"
                    className="text-[var(--rs-neutral-600)] hover:text-[var(--rs-accent-600)] transition duration-300"
                  >
                    hr@romegasolutions.com
                  </a>
                </div>

                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-[var(--rs-neutral-400)] text-base mb-2 uppercase tracking-widest">
                    Call Us
                  </h3>
                  <a
                    href="tel:+18479088340"
                    className="text-[var(--rs-neutral-600)] hover:text-[var(--rs-accent-600)] transition duration-300"
                  >
                    +1 (847) 908-8340
                  </a>
                </div>
              </div>

              <div className="text-center lg:text-left text-[var(--rs-neutral-400)] text-[1rem] w-full font-medium">
                © 2024 Romega Solutions. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
