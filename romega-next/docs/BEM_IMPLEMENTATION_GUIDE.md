# BEM Implementation Guide for Romega Solutions Next.js App

## 📋 Overview

This guide explains how to properly implement BEM (Block Element Modifier) methodology in the Romega Solutions Next.js application, combining BEM principles with modern React/Next.js patterns and Tailwind CSS.

---

## 🎯 Current State Analysis

### What We Have:
- ✅ **Atomic Design structure** - Components organized as atoms, molecules, organisms
- ✅ **Tailwind CSS** - Utility-first CSS framework
- ✅ **CSS Variables** - Romega color system in globals.css
- ✅ **React Components** - Modular component architecture
- ⚠️ **Mixed naming** - Some inline Tailwind, some custom CSS classes

### What We Need:
- 🎯 **Consistent BEM naming** for custom components
- 🎯 **Hybrid approach** - BEM for structure + Tailwind for utilities
- 🎯 **CSS Module integration** - Scoped BEM styles per component
- 🎯 **Clear separation** - When to use BEM vs Tailwind

---

## 🏗️ BEM + React + Tailwind Strategy

### The Hybrid Approach

```tsx
// ✅ RECOMMENDED: Combine BEM structure with Tailwind utilities

// Block class (semantic, BEM)     Utility classes (Tailwind)
<div className="hero-section       flex flex-col lg:flex-row">
  <div className="hero-section__content    p-6 md:p-16">
    <h1 className="hero-section__title      text-4xl font-bold">
      Title
    </h1>
  </div>
</div>
```

### When to Use What

| Use Case | Approach | Example |
|----------|----------|---------|
| **Component identity** | BEM Block | `class="product-card"` |
| **Component parts** | BEM Element | `class="product-card__title"` |
| **Component variants** | BEM Modifier | `class="button--primary"` |
| **Layout** | Tailwind | `flex justify-between gap-4` |
| **Spacing** | Tailwind | `p-4 mt-8 mb-4` |
| **Colors (semantic)** | CSS Variables + Tailwind | `text-[var(--rs-primary-600)]` |
| **Responsive** | Tailwind | `md:text-lg lg:flex-row` |
| **States** | Tailwind | `hover:bg-blue-600 focus:ring-2` |

---

## 📁 File Structure with BEM

### Recommended Structure

```
components/
├── ui/                          # Atoms
│   ├── Button/
│   │   ├── Button.tsx           # Component logic
│   │   ├── Button.module.css    # BEM styles
│   │   └── Button.stories.tsx   # Storybook (optional)
│   └── Input/
│       ├── Input.tsx
│       └── Input.module.css
│
├── sections/                    # Organisms
│   ├── HeroSection/
│   │   ├── HeroSection.tsx
│   │   └── HeroSection.module.css
│   └── ServicesOverview/
│       ├── ServicesOverview.tsx
│       └── ServicesOverview.module.css
│
└── layout/                      # Templates
    ├── Header/
    │   ├── Header.tsx
    │   └── Header.module.css
    └── Footer/
        ├── Footer.tsx
        └── Footer.module.css
```

---

## 🎨 Component Implementation Patterns

### Pattern 1: Atom Component (Button)

**Button.tsx**
```tsx
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import styles from './Button.module.css';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: LucideIcon;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  fullWidth = false,
  disabled = false,
  className = '',
}: ButtonProps) {
  // BEM class construction
  const buttonClass = [
    styles.button,                              // Block
    styles[`button--${variant}`],               // Modifier: variant
    styles[`button--${size}`],                  // Modifier: size
    fullWidth && styles['button--full-width'],  // Modifier: fullWidth
    disabled && styles['button--disabled'],     // Modifier: disabled
    className,                                   // Additional custom classes
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Link
      href={disabled ? '#' : href}
      className={buttonClass}
      aria-disabled={disabled}
    >
      {Icon && (
        <Icon 
          className={styles.button__icon}     // Element
          aria-hidden="true" 
        />
      )}
      <span className={styles.button__text}>  {/* Element */}
        {children}
      </span>
    </Link>
  );
}
```

**Button.module.css**
```css
/* ============================================
   BUTTON COMPONENT (BEM)
   ============================================ */

/* Block */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid var(--rs-primary-500);
    outline-offset: 2px;
  }
}

/* ============================================
   MODIFIERS: Variants
   ============================================ */

/* Primary variant */
.button--primary {
  background-color: var(--rs-primary-600);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(18, 91, 161, 0.39);
}

.button--primary:hover:not(.button--disabled) {
  background-color: var(--rs-primary-700);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px 0 rgba(18, 91, 161, 0.45);
}

.button--primary:active:not(.button--disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 8px 0 rgba(18, 91, 161, 0.3);
}

/* Secondary variant */
.button--secondary {
  background-color: var(--rs-primary-100);
  color: var(--rs-primary-600);
  border: 2px solid var(--rs-primary-600);
}

.button--secondary:hover:not(.button--disabled) {
  background-color: var(--rs-primary-600);
  color: white;
}

/* Outline variant */
.button--outline {
  background-color: transparent;
  color: var(--rs-primary-600);
  border: 1.5px solid var(--rs-primary-600);
}

.button--outline:hover:not(.button--disabled) {
  background-color: var(--rs-primary-50);
}

/* ============================================
   MODIFIERS: Sizes
   ============================================ */

.button--small {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
}

.button--medium {
  height: 50px;
  padding: 0 24px;
  font-size: 18px;
}

@media (min-width: 640px) {
  .button--medium {
    height: 57px;
    padding: 0 32px;
    font-size: 22.5px;
  }
}

.button--large {
  height: 60px;
  padding: 0 40px;
  font-size: 20px;
}

/* ============================================
   MODIFIERS: States
   ============================================ */

.button--full-width {
  width: 100%;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ============================================
   ELEMENTS
   ============================================ */

.button__icon {
  flex-shrink: 0;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.button--small .button__icon {
  width: 16px;
  height: 16px;
}

.button--medium .button__icon {
  width: 20px;
  height: 20px;
}

@media (min-width: 640px) {
  .button--medium .button__icon {
    width: 27px;
    height: 27px;
  }
}

.button--large .button__icon {
  width: 24px;
  height: 24px;
}

/* Icon animation on hover */
.button:hover:not(.button--disabled) .button__icon {
  transform: scale(1.1);
}

.button__text {
  display: inline-block;
}
```

---

### Pattern 2: Organism Component (Hero Section)

**HeroSection.tsx**
```tsx
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Calendar } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const features = [
    'Cutting edge tools',
    'Expert insights',
    'Tailored strategies for growth'
  ];

  return (
    <section 
      className={styles['hero-section']}  // Block
      aria-labelledby="hero-heading"
    >
      {/* Content Container */}
      <div className={styles['hero-section__container']}>  {/* Element */}
        
        {/* Left Content */}
        <div className={styles['hero-section__content']}>  {/* Element */}
          
          {/* Background Pattern */}
          <Image
            src="/images/home/hero-bg-romega.png"
            alt=""
            fill
            className={styles['hero-section__bg-pattern']}  // Element
            priority
          />

          {/* Heading */}
          <h1 
            id="hero-heading"
            className={styles['hero-section__title']}  // Element
          >
            Empower Your Team with
            <span className={styles['hero-section__title-highlight']}>  {/* Element */}
              Smarte
              <Image
                src="/images/home/hero-rs-text-hd.png"
                alt="RS Solutions"
                width={208}
                height={80}
                className={styles['hero-section__logo-inline']}  // Element
                priority
              />
            </span>
          </h1>

          {/* Description */}
          <p className={styles['hero-section__description']}>  {/* Element */}
            Transform your HR operations to boost productivity, engagement, and
            growth for your business:
          </p>

          {/* Features List */}
          <ul className={styles['hero-section__features']}>  {/* Element */}
            {features.map((feature) => (
              <li 
                key={feature}
                className={styles['hero-section__feature-item']}  // Element
              >
                <Image
                  src="/images/home/search-check.svg"
                  alt=""
                  width={28}
                  height={28}
                  className={styles['hero-section__feature-icon']}  // Element
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className={styles['hero-section__cta']}>  {/* Element */}
            <Button
              href="https://calendly.com/romega-solutions/discoverycall"
              variant="primary"
              icon={Calendar}
              external
            >
              Book a Discovery Call
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className={styles['hero-section__image-wrapper']}>  {/* Element */}
          <Image
            src="/images/home/hero-image.jpg"
            alt="Professional team collaboration"
            fill
            className={styles['hero-section__image']}  // Element
            priority
          />
        </div>
      </div>
    </section>
  );
}
```

**HeroSection.module.css**
```css
/* ============================================
   HERO SECTION COMPONENT (BEM)
   ============================================ */

/* Block */
.hero-section {
  position: relative;
  display: flex;
  align-items: stretch;
  margin-top: 104px;
  min-height: calc(100vh - 104px);
}

@media (min-width: 1024px) {
  .hero-section {
    max-height: 1000px;
  }
}

/* ============================================
   ELEMENTS: Layout Structure
   ============================================ */

.hero-section__container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: inherit;
}

@media (min-width: 1024px) {
  .hero-section__container {
    flex-direction: row;
  }
}

.hero-section__content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 50%;
  padding: 1.5rem;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .hero-section__content {
    flex-basis: 45%;
    padding: 4rem 4rem 4rem 6rem;
  }
}

.hero-section__image-wrapper {
  position: relative;
  flex-basis: 50%;
  min-height: 400px;
}

@media (min-width: 768px) {
  .hero-section__image-wrapper {
    flex-basis: 55%;
    min-height: auto;
  }
}

/* ============================================
   ELEMENTS: Content
   ============================================ */

.hero-section__bg-pattern {
  position: absolute;
  left: -1rem;
  top: 1rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

@media (min-width: 640px) {
  .hero-section__bg-pattern {
    height: 80%;
  }
}

.hero-section__title {
  position: relative;
  z-index: 10;
  font-family: 'Merriweather', serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--rs-primary-600);
  text-align: center;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .hero-section__title {
    font-size: 3rem;
  }
}

@media (min-width: 1280px) {
  .hero-section__title {
    text-align: left;
  }
}

.hero-section__title-highlight {
  display: block;
  font-size: 3rem;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .hero-section__title-highlight {
    font-size: 4.5rem;
    margin-bottom: 2rem;
  }
}

.hero-section__logo-inline {
  display: inline-block;
  width: 9rem;
  height: auto;
  margin-top: 0.5rem;
  margin-left: -0.5rem;
}

@media (min-width: 768px) {
  .hero-section__logo-inline {
    width: 13rem;
  }
}

@media (min-width: 1280px) {
  .hero-section__logo-inline {
    position: absolute;
    margin-top: -1rem;
  }
}

.hero-section__description {
  position: relative;
  z-index: 10;
  max-width: 28rem;
  margin: 0 auto;
  color: var(--rs-neutral-700);
  font-size: 1rem;
  text-align: center;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .hero-section__description {
    font-size: 1.25rem;
  }
}

@media (min-width: 1280px) {
  .hero-section__description {
    margin: 0;
    text-align: left;
  }
}

/* ============================================
   ELEMENTS: Features List
   ============================================ */

.hero-section__features {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  color: var(--rs-neutral-700);
}

@media (min-width: 768px) {
  .hero-section__features {
    font-size: 1.25rem;
  }
}

@media (min-width: 1280px) {
  .hero-section__features {
    align-items: flex-start;
    margin: 0;
  }
}

.hero-section__feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.hero-section__feature-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
}

/* ============================================
   ELEMENTS: CTA
   ============================================ */

.hero-section__cta {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-bottom: 1rem;
}

@media (min-width: 1024px) {
  .hero-section__cta {
    justify-content: flex-start;
  }
}

.hero-section__image {
  object-fit: cover;
  object-position: center;
}
```

---

### Pattern 3: Layout Component (Header with Navigation)

**Header.tsx**
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Calendar, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/careers', label: 'Careers' },
  { href: '/talent', label: 'Talent' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>  {/* Block */}
      <nav 
        className={styles.header__nav}  // Element
        aria-label="Main navigation"
      >
        <div className={styles.header__container}>  {/* Element */}
          
          {/* Logo */}
          <div className={styles.header__logo}>  {/* Element */}
            <Link href="/">
              <Image
                src="/images/navbar-company-logo.svg"
                alt="Romega Solutions"
                width={200}
                height={56}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className={styles.header__nav-list}>  {/* Element */}
            {navLinks.map((link) => (
              <li 
                key={link.href}
                className={styles['header__nav-item']}  // Element
              >
                <Link
                  href={link.href}
                  className={styles['header__nav-link']}  // Element
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className={styles.header__cta}>  {/* Element */}
            <Button
              href="https://calendly.com/romega-solutions/discoverycall"
              variant="navbar"
              icon={Calendar}
              external
            >
              Book a Call
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles['header__mobile-toggle']}  // Element
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className={styles['header__icon']} />  // Element
            ) : (
              <Menu className={styles['header__icon']} />  // Element
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={styles['header__mobile-menu']}>  {/* Element */}
            <ul className={styles['header__mobile-nav-list']}>  {/* Element */}
              {navLinks.map((link) => (
                <li 
                  key={link.href}
                  className={styles['header__mobile-nav-item']}  // Element
                >
                  <Link
                    href={link.href}
                    className={styles['header__mobile-nav-link']}  // Element
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Header.module.css**
```css
/* ============================================
   HEADER COMPONENT (BEM)
   ============================================ */

/* Block */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  width: 100%;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* ============================================
   ELEMENTS: Structure
   ============================================ */

.header__nav {
  height: 104px;
  background-color: var(--rs-primary-50);
  border-bottom: 2px solid var(--rs-neutral-grey-400);
}

.header__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .header__container {
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .header__container {
    padding: 0 6rem;
  }
}

/* ============================================
   ELEMENTS: Logo
   ============================================ */

.header__logo {
  flex-shrink: 0;
}

.header__logo img {
  width: auto;
  max-height: 3.5rem;
}

@media (min-width: 640px) {
  .header__logo img {
    max-height: 4rem;
  }
}

/* ============================================
   ELEMENTS: Desktop Navigation
   ============================================ */

.header__nav-list {
  display: none;
  align-items: center;
  gap: 3rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 1024px) {
  .header__nav-list {
    display: flex;
  }
}

.header__nav-item {
  /* Navigation items inherit from list */
}

.header__nav-link {
  display: block;
  padding: 0.5rem 0;
  color: var(--rs-neutral-500);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.header__nav-link:hover {
  color: var(--rs-accent-600);
  text-decoration: underline;
}

.header__nav-link--active {
  color: var(--rs-accent-600);
}

/* ============================================
   ELEMENTS: CTA
   ============================================ */

.header__cta {
  display: none;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .header__cta {
    display: block;
  }
}

/* ============================================
   ELEMENTS: Mobile Menu
   ============================================ */

.header__mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.header__mobile-toggle:hover {
  background-color: var(--rs-neutral-200);
}

@media (min-width: 1024px) {
  .header__mobile-toggle {
    display: none;
  }
}

.header__icon {
  width: 24px;
  height: 24px;
  color: var(--rs-neutral-700);
}

.header__mobile-menu {
  position: absolute;
  top: 104px;
  left: 0;
  right: 0;
  background-color: white;
  border-bottom: 2px solid var(--rs-neutral-grey-400);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 1024px) {
  .header__mobile-menu {
    display: none;
  }
}

.header__mobile-nav-list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 1rem 0;
  list-style: none;
}

.header__mobile-nav-item {
  border-bottom: 1px solid var(--rs-neutral-200);
}

.header__mobile-nav-item:last-child {
  border-bottom: none;
}

.header__mobile-nav-link {
  display: block;
  padding: 1rem 1.5rem;
  color: var(--rs-neutral-700);
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.header__mobile-nav-link:hover {
  background-color: var(--rs-neutral-100);
  color: var(--rs-accent-600);
}

.header__mobile-nav-link--active {
  color: var(--rs-accent-600);
  background-color: var(--rs-primary-50);
}
```

---

## 🔧 Migration Strategy

### Step 1: Create CSS Module Files
For each component that needs BEM styling:
1. Create a `.module.css` file next to the component
2. Define BEM class names
3. Use CSS variables from globals.css

### Step 2: Update Component Files
1. Import the CSS module
2. Replace Tailwind-only approach with hybrid BEM + Tailwind
3. Use BEM for component identity, Tailwind for utilities

### Step 3: Update globals.css
Keep CSS variables but remove component-specific styles:

```css
/* ✅ KEEP: Color system */
:root {
  --rs-primary-600: hsla(209, 80%, 35%, 1);
  /* ... other variables */
}

/* ❌ REMOVE: Component styles (move to modules) */
.mobile-menu { } /* Move to Header.module.css */
```

---

## 📋 BEM Naming Checklist

### ✅ DO:
```css
/* Semantic, descriptive names */
.product-card { }
.product-card__image { }
.product-card--featured { }

/* Multi-word with hyphens */
.search-bar { }
.user-profile__full-name { }

/* State modifiers */
.button--disabled { }
.menu__item--active { }
```

### ❌ DON'T:
```css
/* Presentational names */
.blue-box { }
.big-text { }

/* Too nested */
.card__header__title__text { }

/* Camel case or underscores only */
.productCard { }
.product_card { }
```

---

## 🎯 Benefits for Romega Solutions

1. **Component Clarity** - Each component has clear identity with BEM blocks
2. **Maintainability** - Easy to find and update component styles
3. **Scalability** - Add new variants/modifiers without conflicts
4. **Team Collaboration** - Consistent naming across codebase
5. **CSS Specificity Control** - No cascade wars, predictable styling
6. **Best of Both Worlds** - BEM structure + Tailwind utilities

---

## 📚 Quick Reference

### BEM Syntax
```
Block:              .block-name
Element:            .block__element-name
Modifier (Block):   .block--modifier-name
Modifier (Element): .block__element--modifier-name
```

### In React/TypeScript
```tsx
// CSS Module import
import styles from './Component.module.css';

// Class construction
const className = [
  styles.button,                    // Block
  styles['button--primary'],        // Modifier
  isActive && styles['button--active'],
].filter(Boolean).join(' ');

// Usage
<button className={className}>
  <span className={styles.button__icon}>icon</span>
  <span className={styles.button__text}>text</span>
</button>
```

---

## 🚀 Next Steps

1. ✅ Read this guide
2. ⬜ Create CSS modules for existing components
3. ⬜ Migrate Button component first (smallest)
4. ⬜ Migrate sections one by one
5. ⬜ Update Header and Footer
6. ⬜ Document component variants in Storybook (optional)
7. ⬜ Add BEM linting rules to enforce consistency

---

**Remember:** BEM is about clarity and maintainability. Don't be dogmatic—adapt it to work with your React/Tailwind stack!