'use client';

import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import styles from './ContactContainer.module.css';

interface ContactContainerProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export default function ContactContainer({ onOpenTerms, onOpenPrivacy }: ContactContainerProps) {
  return (
    <div className={styles['contact-container']}>
      <div className={styles['contact-container__wrapper']}>
        <ContactInfo onOpenTerms={onOpenTerms} onOpenPrivacy={onOpenPrivacy} />
        <ContactForm />
      </div>
    </div>
  );
}
