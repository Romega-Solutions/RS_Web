'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './TalentCTA.module.css';

export default function TalentCTA() {
  return (
    <section className={styles['talent-cta']} aria-labelledby="talent-cta-heading">
      <div className={styles['talent-cta__card']}>

        {/* LEFT: text + buttons */}
        <div className={styles['talent-cta__left']}>
          <h2 id="talent-cta-heading" className={styles['talent-cta__title']}>
            Request a custom search
          </h2>
          <p className={styles['talent-cta__description']}>
            Can&apos;t find what you are looking for? Our team of specialists
            will help you find the perfect match for your needs.
          </p>
          <div className={styles['talent-cta__buttons']}>
            <Link
              href="https://calendly.com/romega-solutions/discoverycall"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['talent-cta__btn-primary']}
            >
              Book a demo
            </Link>
            <Link
              href="/contact"
              className={styles['talent-cta__btn-secondary']}
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className={styles['talent-cta__divider']} aria-hidden="true" />

        {/* RIGHT: expert profile */}
        <div className={styles['talent-cta__right']}>
          <div className={styles['talent-cta__avatar-wrap']}>
            <Image
              src="/images/home/robbie.png"
              alt="Robbie Galoso"
              width={90}
              height={90}
              className={styles['talent-cta__avatar']}
            />
          </div>
          <p className={styles['talent-cta__expert-label']}>YOUR EXPERT</p>
          <p className={styles['talent-cta__expert-name']}>Robbie Galoso</p>
          <p className={styles['talent-cta__expert-title']}>Founder &amp; CEO</p>
        </div>

      </div>
    </section>
  );
}
