import Image from 'next/image';
import styles from './ServicesHero.module.css';

const SERVICES = [
  {
    id: 'rpo',
    title: 'RPO',
    description: 'On-demand hiring at scale',
    icon: '/images/services/feature-1/hero-card-1.svg',
    iconAlt: 'Illustration of a cog',
    iconLabel: 'Cog icon for RPO',
  },
  {
    id: 'bpo',
    title: 'BPO',
    description: 'Free your team to deliver value',
    icon: '/images/services/feature-1/hero-card-2.svg',
    iconAlt: 'Illustration of a globe',
    iconLabel: 'Globe icon for BPO',
  },
  {
    id: 'strategic-hr',
    title: 'Strategic HR',
    description: 'Align your people strategically',
    icon: '/images/services/feature-1/hero-card-3.svg',
    iconAlt: 'Illustration of a file with a user icon',
    iconLabel: 'File with user icon for Strategic HR',
  },
  {
    id: 'quality-hire',
    title: 'Quality Hire',
    description: 'Find leaders who drive impact',
    icon: '/images/services/feature-1/hero-card-4.svg',
    iconAlt: 'Illustration of a user icon with a magnifying glass',
    iconLabel: 'User search icon for Quality Hire',
  },
];

export default function ServicesHero() {
  return (
    <section className={styles['services-hero']} aria-labelledby="hero-heading">
      <div className={styles['services-hero__container']}>
        {/* Background Logo */}
        <div className={styles['services-hero__bg-wrapper']}>
          <img
            src="/images/contact/bg-romega.svg"
            className={styles['services-hero__bg-logo']}
            aria-hidden="true"
            alt=""
          />
          
          {/* Header Content */}
          <div className={styles['services-hero__header']}>
            <h1 id="hero-heading" className={styles['services-hero__title']}>
              Recruitment re-engineered for speed and fit
            </h1>

            <div className={styles['services-hero__description']}>
              <span className={styles['services-hero__text']}>We provide a full suite of business support services designed to </span>
              <span className={styles['services-hero__text--bold']}>help companies</span>
              <span className={styles['services-hero__text']}> </span>
              <span className={styles['services-hero__text--bold-primary']}>grow smarter</span>
              <span className={styles['services-hero__text--bold']}> </span>
              <span className={styles['services-hero__text--bold']}>operate</span>
              <span className={styles['services-hero__text--bold']}> </span>
              <span className={styles['services-hero__text--bold-primary']}>more efficiently</span>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        <section className={styles['services-hero__grid']} aria-labelledby="services-grid-heading">
          <h2 id="services-grid-heading" className="sr-only">Our Service Categories</h2>
          
          {/* First Row */}
          <div className={styles['services-hero__row']}>
            {SERVICES.slice(0, 2).map((service) => (
              <article
                key={service.id}
                className={styles['services-hero__card']}
                aria-labelledby={`${service.id}-title`}
              >
                <div 
                  className={styles['services-hero__icon']} 
                  role="img" 
                  aria-label={service.iconLabel}
                >
                  <Image
                    src={service.icon}
                    alt={service.iconAlt}
                    width={48}
                    height={48}
                  />
                </div>
                <header
                  id={`${service.id}-title`}
                  className={styles['services-hero__card-title']}
                >
                  {service.title}
                </header>
                <p className={styles['services-hero__card-description']}>
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          {/* Second Row */}
          <div className={styles['services-hero__row']}>
            {SERVICES.slice(2, 4).map((service) => (
              <article
                key={service.id}
                className={styles['services-hero__card']}
                aria-labelledby={`${service.id}-title`}
              >
                <div 
                  className={styles['services-hero__icon']} 
                  role="img" 
                  aria-label={service.iconLabel}
                >
                  <Image
                    src={service.icon}
                    alt={service.iconAlt}
                    width={48}
                    height={48}
                  />
                </div>
                <header
                  id={`${service.id}-title`}
                  className={styles['services-hero__card-title']}
                >
                  {service.title}
                </header>
                <p className={styles['services-hero__card-description']}>
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
