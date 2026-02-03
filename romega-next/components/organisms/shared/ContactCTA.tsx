import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { Calendar } from 'lucide-react';
import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  return (
    <section
      className={styles['contact-cta']}
      aria-labelledby="contact-heading"
    >
      {/* Background image */}
      <Image
        src="/images/home/palm.png"
        alt=""
        fill
        className={styles['contact-cta__bg-image']}
        sizes="100vw"
        priority={false}
      />

      {/* Overlay for better text contrast */}
      <div className={styles['contact-cta__overlay']} />

      {/* Content */}
      <div className={styles['contact-cta__container']}>
        <div className={styles['contact-cta__content']}>
          <h2
            id="contact-heading"
            className={styles['contact-cta__title']}
          >
            Ready to work with us?
          </h2>

          <p className={styles['contact-cta__description']}>
            Connect with top talent and transform your leadership strategy
          </p>

          <div className={styles['contact-cta__button-wrapper']}>
            <Button
              href="/contact"
              variant="primary"
              icon={Calendar}
              ariaLabel="Contact Romega Solutions"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
