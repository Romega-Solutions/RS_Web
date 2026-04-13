import styles from './MissionVision.module.css';

export default function MissionVision() {
  return (
    <section
      className={styles['mission-vision']}
      aria-labelledby="mission-heading"
    >
      {/* Background image */}
      <div className={styles['mission-vision__bg-image']} aria-hidden="true" />

      <div className={styles['mission-vision__container']}>
        <div className={styles['mission-vision__content']}>

          {/* Mission */}
          <div className={styles['mission-vision__section']}>
            <h2
              id="mission-heading"
              className={styles['mission-vision__title']}
            >
              Our Mission
            </h2>
            <p className={styles['mission-vision__text']}>
              To be a steady growth partner for businesses by building strong teams and credible
              brands that last.
            </p>
            <p className={styles['mission-vision__text']}>
              We work closely with founders and leaders to bring the right people, clear systems,
              and thoughtful brand foundations together, helping businesses grow with confidence
              in a changing global landscape.
            </p>
          </div>

          {/* Vision */}
          <div className={styles['mission-vision__section']}>
            <h2 className={styles['mission-vision__title']}>
              Our Vision
            </h2>
            <p className={styles['mission-vision__text']}>
              To shape a future where businesses grow with clarity, consistency, and purpose,
              scaling not just by moving fast, but by building teams that perform with intention
              and brands that connect with trust, relevance, and long-term value.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className={styles['mission-vision__wave-wrapper']} aria-hidden="true">
        <svg
          className={styles['mission-vision__wave-svg']}
          viewBox="0 0 1920 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,80 Q480,0 960,80 T1920,80 L1920,160 L0,160 Z"
            fill="#232f3e"
          />
        </svg>
      </div>
    </section>
  );
}
