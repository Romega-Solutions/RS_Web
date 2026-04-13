'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { Calendar } from 'lucide-react';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/about', label: 'About', id: 'about' },
  { href: '/services', label: 'Services', id: 'services' },
  { href: '/talent', label: 'Talent', id: 'talent' },
  { href: '/careers', label: 'Careers', id: 'careers' },
  { href: '/contact', label: 'Contact', id: 'contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={styles.header}>  {/* Block */}
      <nav
        className={styles.header__nav}  // Element
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.header__container}>  {/* Element */}

          {/* Logo */}
          <div className={styles.header__logo}>  {/* Element */}
            <Link href="/" className={styles['header__logo-link']}>
              <Image
                src="/images/navbar-company-logo.svg"
                alt="Romega Solutions"
                width={200}
                height={56}
                className={styles['header__logo-image']}  // Element
                priority
                quality={90}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={styles['header__nav-wrapper']}>  {/* Element */}
            <ul className={styles['header__nav-list']}>  {/* Element */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={link.id}
                    className={styles['header__nav-item']}  // Element
                  >
                    <Link
                      href={link.href}
                      className={`${styles['header__nav-link']} ${isActive ? styles['header__nav-link--active'] : ''}`}  // Element with modifier
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CTA Button */}
          <div className={styles.header__cta}>  {/* Element */}
            <Button
              href="https://calendly.com/romega-solutions/discoverycall"
              variant="navbar"
              icon={Calendar}
              external
              ariaLabel="Book a call with Romega Solutions"
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className={styles['header__mobile-toggle-wrapper']}>  {/* Element */}
            <button
              className={styles['header__mobile-toggle']}  // Element
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Image
                src="/images/icon-menu.svg"
                alt="Menu icon"
                width={22}
                height={22}
                className={styles['header__mobile-toggle-icon']}  // Element
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles['header__mobile-menu']} ${isMobileMenuOpen ? '' : styles['header__mobile-menu--hidden']}`}  // Element with modifier
        >
          <div className={styles['header__mobile-menu-content']}>  {/* Element */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`${styles['header__mobile-nav-link']} ${isActive ? styles['header__mobile-nav-link--active'] : ''}`}  // Element with modifier
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile CTA Button */}
            <div className={styles['header__mobile-cta']}>  {/* Element */}
              <Button
                href="https://calendly.com/romega-solutions/discoverycall"
                variant="primary"
                icon={Calendar}
                external
                ariaLabel="Book a call with Romega Solutions"
                fullWidth
              >
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
