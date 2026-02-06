'use client';

import styles from './TalentHero.module.css';

export default function TalentHero() {
  return (
    <section className={styles['talent-hero']} aria-labelledby="talent-hero-heading">
      {/* Background Pattern */}
      <div className={styles['talent-hero__bg']} aria-hidden="true"></div>

      <div className={styles['talent-hero__container']}>
        <div className={styles['talent-hero__content']}>
          {/* Badge */}
          <span className={styles['talent-hero__badge']}>Our Talent Pool</span>

          {/* Heading */}
          <h1 id="talent-hero-heading" className={styles['talent-hero__title']}>
            Meet Our <span className={styles['talent-hero__title-highlight']}>Exceptional Talent</span>
          </h1>

          {/* Description */}
          <p className={styles['talent-hero__description']}>
            Discover a curated selection of highly skilled professionals ready to bring 
            expertise and innovation to your projects. Our talent pool features developers, 
            designers, and tech experts vetted for excellence.
          </p>

          {/* Stats */}
          <div className={styles['talent-hero__stats']}>
            <div className={styles['talent-hero__stat']}>
              <span className={styles['talent-hero__stat-number']}>500+</span>
              <span className={styles['talent-hero__stat-label']}>Professionals</span>
            </div>
            <div className={styles['talent-hero__stat']}>
              <span className={styles['talent-hero__stat-number']}>50+</span>
              <span className={styles['talent-hero__stat-label']}>Skills</span>
            </div>
            <div className={styles['talent-hero__stat']}>
              <span className={styles['talent-hero__stat-number']}>100%</span>
              <span className={styles['talent-hero__stat-label']}>Vetted</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className={styles['talent-hero__image-wrapper']}>
          <div className={styles['talent-hero__image-container']}>
            <svg
              width="600"
              height="500"
              viewBox="0 0 600 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles['talent-hero__image']}
              role="img"
              aria-label="Professional talent pool illustration"
            >
              <rect width="600" height="500" fill="#E0F2FE" rx="12" />
              <g transform="translate(200, 120)">
                <circle cx="100" cy="80" r="60" fill="#0369A1" opacity="0.2" />
                <circle cx="100" cy="60" r="35" fill="#0369A1" />
                <ellipse cx="100" cy="140" rx="55" ry="45" fill="#0369A1" />
              </g>
              <text x="300" y="450" fontSize="20" fill="#0369A1" textAnchor="middle" fontWeight="600">
                Exceptional Talent Pool
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className={styles['talent-hero__wave']} aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className={styles['talent-hero__wave-image']}><path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="#374151" opacity="1"></path></svg>
      </div>
    </section>
  );
}
