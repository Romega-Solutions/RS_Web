'use client';

import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import styles from './ContactContainer.module.css';

export default function ContactContainer() {
  return (
    <div className={styles['contact-container']}>
      <div className={styles['contact-container__wrapper']}>
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
