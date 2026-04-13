'use client';

import { FlaskConical } from 'lucide-react';
import styles from './TalentHero.module.css';

export default function TalentHero() {
  return (
    <section className={styles['talent-hero']} aria-labelledby="talent-hero-heading">
      {/* Background Pattern */}
      <div className={styles['talent-hero__bg']} aria-hidden="true">
        <FlaskConical className={styles['talent-hero__bg-flask']} aria-hidden="true" />
      </div>

      <div className={styles['talent-hero__container']}>
        <div className={styles['talent-hero__content']}>
          {/* Badge with Stars */}
          <p className={styles['talent-hero__badge']}>
            <span className={styles['talent-hero__stars']} aria-label="5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span className={styles['talent-hero__badge-text']}>Trusted by industry leaders</span>
          </p>

          {/* Heading */}
          <h1 id="talent-hero-heading" className={styles['talent-hero__title']}>
            Explore Leadership Opportunities
          </h1>

          {/* Description */}
          <p className={styles['talent-hero__description']}>
            Find your next impactful role or join our talent network for future opportunities always with discretion.
          </p>

          {/* Feature Cards */}
          <div className={styles['talent-hero__features']}>
            <div className={styles['talent-hero__feature']}>
              <div className={styles['talent-hero__feature-icon']} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles['talent-hero__feature-label']}>Fully Confidential</span>
            </div>
            <div className={styles['talent-hero__feature']}>
              <div className={styles['talent-hero__feature-icon']} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.343 6.343m7.777 7.777l3.535 3.536m0-14.142l-3.536 3.535" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles['talent-hero__feature-label']}>Role Stays Private</span>
            </div>
            <div className={styles['talent-hero__feature']}>
              <div className={styles['talent-hero__feature-icon']} aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles['talent-hero__feature-label']}>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
