import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { Calendar } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const features = [
    'Cutting edge tools',
    'Expert insights',
    'Tailored strategies for growth'
  ];

  return (
    <section
      className={styles['hero-section']}  // Block
      aria-labelledby="hero-heading"
      role="banner"
    >
      <div className={styles['hero-section__container']}>  {/* Element */}
        
        {/* Left side content */}
        <div className={styles['hero-section__content']}>  {/* Element */}
          
          {/* Background Pattern */}
          <Image
            src="/images/home/hero-bg-romega.png"
            alt="Romega Solutions background pattern"
            fill
            sizes="100vw"
            className={styles['hero-section__bg-pattern']}  // Element
            loading="eager"
            priority
          />

          {/* Heading */}
          <h1
            id="hero-heading"
            className={styles['hero-section__title']}  // Element
          >
            Empower Your Team with
            <span className={styles['hero-section__title-highlight']}>  {/* Element */}
              Smarte
              <Image
                src="/images/home/hero-rs-text-hd.png"
                alt="RS Solutions logo"
                width={208}
                height={80}
                className={`${styles['hero-section__logo-inline']} ${styles['hero-section__logo-inline--mobile']}`}
                style={{ width: 'auto' }}
                loading="eager"
                priority
              />
              <Image
                src="/images/home/hero-rs-text-hd.png"
                alt="RS Solutions logo"
                width={208}
                height={80}
                className={`${styles['hero-section__logo-inline']} ${styles['hero-section__logo-inline--desktop']}`}
                style={{ width: 'auto' }}
                loading="eager"
                priority
              />
            </span>
          </h1>

          {/* Description */}
          <p className={styles['hero-section__description']}>  {/* Element */}
            Transform your HR operations to boost productivity, engagement, and
            growth for your business:
          </p>

          {/* Features List */}
          <ul className={styles['hero-section__features']} role="list">  {/* Element */}
            {features.map((feature) => (
              <li
                key={feature}
                className={styles['hero-section__feature-item']}  // Element
                role="listitem"
              >
                <Image
                  src="/images/home/search-check.svg"
                  alt=""
                  width={28}
                  height={28}
                  className={styles['hero-section__feature-icon']}  // Element
                  role="presentation"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Mobile CTA Button */}
          <div className={styles['hero-section__cta']}>  {/* Element */}
            <Button
              href="https://calendly.com/romega-solutions/discoverycall"
              variant="primary"
              icon={Calendar}
              external
              ariaLabel="Book an appointment with Romega Solutions"
            >
              Book An Appointment
            </Button>
          </div>
        </div>

        {/* Right side - video */}
        <div className={styles['hero-section__video-wrapper']}>  {/* Element */}
          <video
            className={styles['hero-section__video']}  // Element
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Romega Solutions promotional video"
            poster="/images/home/hero-right.png"
            role="img"
          >
            <source src="/images/home/webp/WebsiteAssetVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Desktop CTA Button */}
        <div className={styles['hero-section__cta-desktop']}>  {/* Element */}
          <Button
            href="https://calendly.com/romega-solutions/discoverycall"
            variant="primary"
            icon={Calendar}
            external
            ariaLabel="Book an appointment with Romega Solutions"
          >
            Book An Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
