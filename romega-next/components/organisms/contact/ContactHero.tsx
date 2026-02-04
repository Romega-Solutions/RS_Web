import styles from './ContactHero.module.css';

export default function ContactHero() {
  return (
    <div className={styles['contact-hero']}>
      <h1 id="contact-heading" className={styles['contact-hero__title']}>
        Contact Us
      </h1>
      <p className={styles['contact-hero__subtitle']}>
        Any question or remarks? Just write us a message!
      </p>
    </div>
  );
}
