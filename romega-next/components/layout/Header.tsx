'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header>
      <nav
        id="navbar-container"
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 z-50 w-full bg-white h-[104px] align-middle shadow-sm"
      >
        <div className="mx-auto">
          <div className="flex items-center justify-between h-[104px] md:h-[104px] bg-[var(--rs-primary-50)] px-4 md:px-8 lg:px-[89.5px] border-b-2 border-[var(--rs-neutral-grey-400)]">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center" id="logo-link">
                <Image
                  src="/images/navbar-company-logo.svg"
                  alt="Romega Solutions Logo"
                  width={200}
                  height={56}
                  className="w-auto max-h-14 sm:max-h-16"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden mx-4 flex-1 lg:flex lg:items-center lg:justify-center xl:mx-8">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-[var(--rs-accent-600)] whitespace-nowrap px-2 py-2 text-[0.9rem] font-medium transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline xl:px-4 xl:text-[1rem]"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="navbar-custom whitespace-nowrap px-2 py-2 text-[0.9rem] font-medium transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline xl:px-4 xl:text-[1rem]"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="navbar-custom whitespace-nowrap px-2 py-2 text-[0.9rem] font-medium transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline xl:px-4 xl:text-[1rem]"
                >
                  Services
                </Link>
                <Link
                  href="/careers"
                  className="navbar-custom whitespace-nowrap px-2 py-2 text-[0.9rem] font-medium transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline xl:px-4 xl:text-[1rem]"
                >
                  Careers & Talent
                </Link>
                <Link
                  href="/contact"
                  className="navbar-custom whitespace-nowrap px-2 py-2 text-[0.9rem] font-medium transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline xl:px-4 xl:text-[1rem]"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Book a Call Button */}
            <a
              href="https://calendly.com/romega-solutions/discoverycall"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-[46px] items-center justify-center align-middle rounded-xl border-[1.5px] border-rs-primary-600 bg-rs-primary-500 px-[10px] text-[18px] font-medium text-rs-primary-100 shadow-[0_2px_7px_2px_rgba(18,91,161,0.3)] transition duration-300 hover:bg-rs-primary-700 lg:inline-flex lg:min-w-[172px] lg:px-[28px]"
            >
              <Image
                src="/images/icon-calendar-days.svg"
                alt="Calendar icon"
                width={22}
                height={22}
                className="mr-1"
              />
              Book a Call
            </a>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="mobile-menu-button rounded-md p-2 transition duration-300 hover:bg-rs-neutral-200"
                aria-label="Open mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Image
                  src="/images/icon-menu.svg"
                  alt="Menu icon"
                  width={22}
                  height={22}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'} lg:hidden`}>
          <div className="space-y-2 border-t border-gray-200 bg-rs-primary-50 px-4 py-3">
            <Link
              href="/"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-[var(--rs-accent-600)] transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-[var(--rs-neutral-500)] transition duration-300 hover:text-[var(--rs-accent-600)] hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-[var(--rs-neutral-500)] transition duration-300 hover:bg-gray-50 hover:text-[var(--rs-accent-600)] hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/careers"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-[var(--rs-neutral-500)] transition duration-300 hover:bg-gray-50 hover:text-[var(--rs-accent-600)] hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers & Talent
            </Link>
            <Link
              href="/contact"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-[var(--rs-neutral-500)] transition duration-300 hover:bg-gray-50 hover:text-[var(--rs-accent-600)] hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <a
              href="https://calendly.com/romega-solutions/discoverycall"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 mx-0 flex items-center justify-center rounded-lg bg-rs-primary-500 px-4 py-3 text-[1rem] font-medium text-white transition duration-300 hover:bg-rs-primary-700"
            >
              <Image
                src="/images/icon-calendar-days.svg"
                alt="Calendar icon"
                width={22}
                height={22}
                className="mr-2"
              />
              Book a Call
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
