import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { Briefcase } from 'lucide-react';
import styles from './AboutHero.module.css';

export default function AboutHero() {
  return (
    <section
      className={styles['about-hero']}
      aria-labelledby="about-hero-heading"
      role="banner"
    >
      <div className={styles['about-hero__container']}>
        
        {/* Left side content */}
        <div className={styles['about-hero__content']}>
          {/* Background Pattern */}
          <Image
            src="/images/home/hero-bg-romega.png"
            alt=""
            fill
            className={styles['about-hero__bg-pattern']}
            priority
            aria-hidden="true"
          />
          
          <h1
            id="about-hero-heading"
            className={styles['about-hero__title']}
          >
            Why We Exist
          </h1>

          <p className={styles['about-hero__description']}>
            At Romega Solutions, our mission is to connect visionary leaders with opportunities 
            that drive growth, innovation, and lasting impact.
          </p>

          <div className={styles['about-hero__cta']}>
            <Button
              href="/services"
              variant="primary"
              icon={Briefcase}
            >
              Our Services
            </Button>
          </div>
        </div>

        {/* Right side image */}
        <div className={styles['about-hero__image-wrapper']}>
          <Image
            src="/images/about/about.webp"
            alt="Professional team working with HR solutions and technology"
            fill
            className={styles['about-hero__image']}
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>
      </div>
    </section>
  );
}
