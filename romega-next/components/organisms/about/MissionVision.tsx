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
              To revolutionize the future of work by empowering Philippine-based talent
              to lead global innovation.
            </p>
            <p className={styles['mission-vision__text']}>
              We envision a world where businesses thrive through strategic remote collaboration,
              improving lives and shaping industries worldwide.
            </p>
          </div>

          {/* Vision */}
          <div className={styles['mission-vision__section']}>
            <h2 className={styles['mission-vision__title']}>
              Our Vision
            </h2>
            <p className={styles['mission-vision__text']}>
              To bridge the gap between exceptional tech talent and forward-thinking companies,
              fostering mutual growth through meaningful connections.
            </p>
            <p className={styles['mission-vision__text']}>
              By matching skilled professionals with innovative employers, we unlock potential,
              drive progress, and create lasting impact in the global tech ecosystem.
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
