'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { Calendar } from 'lucide-react'

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
          <div className="flex items-center justify-between h-[104px] md:h-[104px] bg-rs-primary-50 px-4 md:px-8 lg:px-24 border-b-2 border-rs-neutral-grey-400">
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

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <div className="flex items-center gap-12">
                <Link
                  href="/"
                  className="text-rs-accent-600 whitespace-nowrap py-2 text-[1rem] font-medium transition duration-300 hover:text-rs-accent-600 hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-rs-neutral-500 whitespace-nowrap py-2 text-[1rem] font-medium transition duration-300 hover:text-rs-accent-600 hover:underline"
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="text-rs-neutral-500 whitespace-nowrap py-2 text-[1rem] font-medium transition duration-300 hover:text-rs-accent-600 hover:underline"
                >
                  Services
                </Link>
                <Link
                  href="/careers"
                  className="text-rs-neutral-500 whitespace-nowrap py-2 text-[1rem] font-medium transition duration-300 hover:text-rs-accent-600 hover:underline"
                >
                  Careers
                </Link>
                <Link
                  href="/talent"
                  className="text-rs-neutral-500 whitespace-nowrap py-2 text-[1rem] font-medium transition duration-300 hover:text-rs-accent-600 hover:underline"
                >
                  Talent
                </Link>
                <Link
                  href="/contact"
                  className="text-rs-neutral-500 whitespace-nowrap py-2 text-[1rem] font-medium transition duration-300 hover:text-rs-accent-600 hover:underline"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Book a Call Button */}
            <div className="flex items-center justify-end flex-shrink-0">
              <Button
                href="https://calendly.com/romega-solutions/discoverycall"
                variant="navbar"
                icon={Calendar}
                external
                ariaLabel="Book a call with Romega Solutions"
                className="hidden lg:inline-flex"
              >
                Book a Call
              </Button>
            </div>

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
          <div className="flex flex-col gap-2 border-t border-gray-200 bg-rs-primary-50 px-4 py-3">
            <Link
              href="/"
              id="mobile-nav-home"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-rs-accent-600 transition duration-300 hover:text-rs-accent-600 hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              id="mobile-nav-about"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-rs-neutral-700 transition duration-300 hover:text-rs-accent-600 hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/services"
              id="mobile-nav-services"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-rs-neutral-700 transition duration-300 hover:text-rs-accent-600 hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/careers"
              id="mobile-nav-careers"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-rs-neutral-700 transition duration-300 hover:text-rs-accent-600 hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              href="/talent"
              id="mobile-nav-talent"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-rs-neutral-700 transition duration-300 hover:text-rs-accent-600 hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Talent
            </Link>
            <Link
              href="/contact"
              id="mobile-nav-contact"
              className="block rounded-lg px-4 py-2.5 text-[1rem] font-medium text-rs-neutral-700 transition duration-300 hover:text-rs-accent-600 hover:underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile CTA Button */}
            <div className="mt-6 pb-2">
              <Button
                href="https://calendly.com/romega-solutions/discoverycall"
                variant="primary"
                icon={Calendar}
                external
                ariaLabel="Book a call with Romega Solutions"
                className="mx-auto"
                fullWidth
              >
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
