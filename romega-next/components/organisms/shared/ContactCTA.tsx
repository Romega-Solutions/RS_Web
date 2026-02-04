import Image from 'next/image';
import Link from 'next/link';
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
            Ready to hire leaders who fit and perform?
          </h2>
          <p className={styles['contact-cta__subtitle']}>
            We help companies fill senior roles in as little as 14 days while ensuring cultural alignment and long-term success.
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
            >
              <Image
                src="/images/services/services-cta-icon-1.svg"
                alt=""
                width={24}
                height={24}
                className={styles['contact-cta__icon']}
              />
              <span>Book A Call</span>
            </Link>
            <p className={styles['contact-cta__helper-text']}>
              Instantly schedule with our team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
