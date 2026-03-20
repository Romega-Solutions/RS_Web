'use client';

import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import styles from './ContactContainer.module.css';

interface ContactContainerProps {
  onOpenTerms: () => void;
}

export default function ContactContainer({ onOpenTerms }: ContactContainerProps) {
  return (
    <div className={styles['contact-container']}>
      <div className={styles['contact-container__wrapper']}>
        <ContactInfo onOpenTerms={onOpenTerms} />
        <ContactForm />
      </div>
    </div>
  );
}
