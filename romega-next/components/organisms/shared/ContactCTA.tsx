'use client';

import Image from 'next/image';
import Link from 'next/link';
import { trackEvent } from '@/components/analytics/GoogleAnalytics';
import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  return (
    <section className={styles['contact-cta']} aria-labelledby="cta-title">
      {/* Background Image */}
      <div className={styles['contact-cta__bg']}>
        <div
          className={styles['contact-cta__bg-image']}
          style={{ backgroundImage: "url('/images/bg-cta.png')" }}
        />
      </div>

      {/* Content Container */}
      <div className={styles['contact-cta__container']}>
        {/* Headings */}
        <div className={styles['contact-cta__header']}>
          <h2 id="cta-title" className={styles['contact-cta__title']}>
            Ready to work with us?
          </h2>
          <p className={styles['contact-cta__subtitle']}>
            Connect with top talent and transform your leadership strategy
          </p>
        </div>

        {/* CTA Buttons */}
        <div className={styles['contact-cta__actions']}>
          {/* Book a Call */}
          <div className={styles['contact-cta__action']}>
            <Link
              href="https://calendly.com/romega-solutions/discoverycall"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['contact-cta__button']}
              onClick={() => trackEvent('click', 'CTA', 'Contact Us - Services Page')}
            >
              <Image
                src="/images/services/services-cta-icon-1.svg"
                alt=""
                width={24}
                height={24}
                className={styles['contact-cta__icon']}
              />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
