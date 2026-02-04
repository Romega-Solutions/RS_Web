import Image from 'next/image';
import styles from './CareersHero.module.css';

export default function CareersHero() {
  return (
    <section className={styles['careers-hero']} aria-labelledby="hero-heading">
      <div className={styles['careers-hero__container']}>
        {/* Background Logo */}
        <div className={styles['careers-hero__bg-logo']} aria-hidden="true">
          <Image
            src="/images/home/hero-bg-romega.png"
            alt=""
            width={384}
            height={384}
            className={styles['careers-hero__bg-image']}
          />
        </div>

        {/* Content */}
        <div className={styles['careers-hero__content']}>
          <h1
            id="hero-heading"
            className={styles['careers-hero__title']}
          >
            Join Our Team
          </h1>

          <p className={styles['careers-hero__description']}>
            <span className={styles['careers-hero__description-text']}>
              We are a remote-first company dedicated to{' '}
            </span>
            <span className={styles['careers-hero__description-highlight']}>
              empowering talent
            </span>
            <span className={styles['careers-hero__description-text']}>
              {' '}and connecting{' '}
            </span>
            <span className={styles['careers-hero__description-highlight--primary']}>
              exceptional professionals
            </span>
            <span className={styles['careers-hero__description-text']}>
              {' '}with{' '}
            </span>
            <span className={styles['careers-hero__description-highlight']}>
              innovative companies
            </span>
            <span className={styles['careers-hero__description-text']}>
              . Join us in shaping the future of work.
            </span>
          </p>

          <div className={styles['careers-hero__stats']}>
            <div className={styles['careers-hero__stat']}>
              <div className={styles['careers-hero__stat-value']}>100%</div>
              <div className={styles['careers-hero__stat-label']}>Remote</div>
            </div>
            <div className={styles['careers-hero__stat']}>
              <div className={styles['careers-hero__stat-value']}>50+</div>
              <div className={styles['careers-hero__stat-label']}>Team Members</div>
            </div>
            <div className={styles['careers-hero__stat']}>
              <div className={styles['careers-hero__stat-value']}>15+</div>
              <div className={styles['careers-hero__stat-label']}>Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
