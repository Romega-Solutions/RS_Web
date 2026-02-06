'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/atoms/Button/Button'
import { Linkedin, Facebook, Calendar } from 'lucide-react'
import { trackEvent } from '@/components/analytics/GoogleAnalytics'
import PrivacyModal from '@/components/organisms/shared/PrivacyModal'
import TermsModal from '@/components/organisms/shared/TermsModal'

export function Footer() {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  return (
    <footer
      className="bg-(--rs-neutral-100) border-t-2 border-(--rs-neutral-grey-400) py-10 font-sans relative"
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

      <div className="max-w-400 mx-auto md:mx-12 lg:mx-auto px-4 md:px-2 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          {/* Romega Info & Socials */}
          <div className="lg:col-span-4 flex flex-col items-start mb-6">
            <div className="w-full flex flex-row items-start">
              {/* Logo Left */}
              <div className="flex justify-center lg:block shrink-0">
                <Image
                  src="/images/footer/rs-footer.svg"
                  alt="Romega Solutions Logo"
                  width={200}
                  height={115}
                  className="w-full h-auto lg:h-28.75"
                  style={{ height: 'auto' }}
                  loading="lazy"
                />
              </div>

              {/* Info + Socials Right */}
              <div className="flex flex-col items-start text-left flex-1 ml-2">
                <p className="text-[1rem] lg:text-[15px] leading-snug text-(--rs-neutral-600) mb-2 lg:mb-1">
                  <span className="font-bold">Romega Solutions</span>,
                  <span> a US-based holding company founded by </span>
                  <span className="font-bold">Robbie Galoso</span>.
                </p>
                <span className="uppercase tracking-widest text-[12px] lg:text-[13px] text-(--rs-neutral-400) font-semibold mb-1">
                  Follow us on
                </span>
                <div className="flex w-full flex-row gap-2">
                  <Button
                    href="https://www.linkedin.com/company/romega-solutions"
                    variant="social"
                    icon={Linkedin}
                    external
                    ariaLabel="Visit our LinkedIn page"
                    fullWidth
                  >
                    LINKEDIN
                  </Button>
                  <Button
                    href="https://www.facebook.com/romegasolutions"
                    variant="social"
                    icon={Facebook}
                    external
                    ariaLabel="Visit our Facebook page"
                    fullWidth
                  >
                    FACEBOOK
                  </Button>
                </div>
              </div>
            </div>

            {/* Schedule Button: Mobile & Medium */}
            <div className="w-full flex lg:hidden justify-center mt-4">
              <Button
                href="https://calendly.com/romega-solutions/discoverycall"
                variant="footer-schedule"
                icon={Calendar}
                external
                ariaLabel="Schedule a meeting with Romega Solutions"
                fullWidth
              >
                Schedule a Meeting
              </Button>
            </div>

            {/* Schedule Button: Desktop Only */}
            <div className="hidden lg:flex w-full justify-center mt-4">
              <Button
                href="https://calendly.com/romega-solutions/discoverycall"
                variant="footer-schedule"
                icon={Calendar}
                external
                ariaLabel="Schedule a meeting with Romega Solutions"
                fullWidth
              >
                Schedule a Meeting
              </Button>
            </div>
          </div>

          {/* Right Side Container for Desktop Only */}
          <div className="lg:col-span-8 flex flex-col lg:flex-row gap-8 lg:gap-8 mt-2 lg:mt-0">
            {/* Company & Help Section */}
            <div className="flex flex-row lg:flex-row lg:flex-1">
              {/* Company */}
              <div className="flex-1">
                <h3 className="text-(--rs-neutral-400) text-center lg:text-left text-base mb-4 uppercase tracking-widest font-normal">
                  COMPANY
                </h3>
                <ul className="space-y-3 text-center lg:text-left">
                  <li>
                    <Link
                      href="/"
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="flex lg:flex flex-col justify-center">
                <div className="w-px bg-(--rs-neutral-300) mx-4 h-full min-h-45"></div>
              </div>

              {/* Help */}
              <div className="flex-1">
                <h3 className="text-(--rs-neutral-400) text-base mb-4 uppercase tracking-widest text-center lg:text-left font-normal">
                  HELP
                </h3>
                <ul className="space-y-3 text-center lg:text-left">
                  <li>
                    <Link
                      href="/contact"
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsTermsModalOpen(true);
                      }}
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline cursor-pointer"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPrivacyModalOpen(true);
                      }}
                      className="text-(--rs-neutral-600) text-base font-medium transition-colors duration-300 hover:text-(--rs-accent-600) hover:underline cursor-pointer"
                    >
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reach Us Out */}
            <div className="flex flex-col items-center lg:items-start lg:flex-1">
              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="border border-(--rs-neutral-300) rounded-lg p-4 relative">
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-(--rs-neutral-100) px-4 py-1 mb-2 uppercase text-rs-neutral-400 tracking-wide">
                    <h3 className="text-sm block whitespace-nowrap font-normal">
                      REACH US OUT
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="text-base">
                      <h4 className="font-medium text-rs-neutral-400 uppercase mb-1 tracking-widest">
                        EMAIL US
                      </h4>
                      <div className="flex items-center gap-2">
                        <a
                          href="mailto:info@romega-solutions.com"
                          className="text-(--rs-neutral-600) text-lg leading-8 hover:underline flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3051 12.9042 11 12.727L2 7M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z"
                              stroke="#5381AC"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>info@romega-solutions.com</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-medium text-rs-neutral-400 uppercase mb-1 tracking-[1px]">
                        HEADQUARTERS
                      </h4>
                      <div className="flex items-start gap-1">
                        <a
                          href="https://www.google.com/maps?q=222+Pacific+Coast+Hwy,+%2310,+El+Segundo,+CA+90245"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-(--rs-neutral-600) tracking-tight hover:underline flex items-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 14.993 7.539 20.193 9.399 21.799C9.57237 21.929 9.78329 21.9992 10 21.999M18 22V19M15 22C14.7348 22 14.4804 21.8946 14.2929 21.7071C14.1054 21.5196 14 21.2652 14 21V17C14 16.8354 14.0406 16.6734 14.1182 16.5282C14.1958 16.3831 14.3081 16.2593 14.445 16.168L17.445 14.168C17.6093 14.0584 17.8025 13.9999 18 13.9999C18.1975 13.9999 18.3907 14.0584 18.555 14.168L21.555 16.168C21.6919 16.2593 21.8042 16.3831 21.8818 16.5282C21.9594 16.6734 22 16.8354 22 17V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22H15ZM13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z"
                              stroke="#5381AC"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          222 Pacific Coast Hwy, #10 in El Segundo, CA 90245
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left text-(--rs-neutral-400) text-[1rem] w-full font-medium">
                © 2025 Romega Solutions. All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </footer>
  )
}
