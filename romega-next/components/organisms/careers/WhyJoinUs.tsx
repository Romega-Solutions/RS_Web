import Image from 'next/image';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import styles from './WhyJoinUs.module.css';

export default function WhyJoinUs() {
  const cultureValues = [
    {
      id: 'curiosity',
      title: 'Curiosity',
      description: 'Ask. Learn. Innovate.',
      icon: '/images/careers/curiosity.svg',
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'One team. Shared success.',
      icon: '/images/careers/people.svg',
    },
    {
      id: 'growth',
      title: 'Growth Mindset',
      description: 'Progress that changes lives.',
      icon: '/images/careers/growht.svg',
    },
    {
      id: 'excellence',
      title: 'Excellence',
      description: 'High standards in every placement.',
      icon: '/images/careers/excellence.svg',
    },
  ];

  const benefits = [
    {
      id: 'remote',
      title: 'Remote Work',
      description: 'Access roles with global flexibility.',
      icon: '/images/careers/world.svg',
    },
    {
      id: 'flexible',
      title: 'Flexible Time',
      description: 'Designed to fit your priorities.',
      icon: '/images/careers/location.svg',
    },
    {
      id: 'privacy',
      title: 'Full Privacy',
      description: 'Your journey stays protected.',
      icon: '/images/careers/shield.svg',
    },
    {
      id: 'more',
      title: 'And More...',
      description: 'More perks and growth to know.',
      icon: '/images/careers/more.svg',
    },
  ];

  return (
    <section className={styles['why-join-us']} aria-labelledby="why-join-heading">
      {/* Background Image */}
      <div className={styles['why-join-us__bg']} aria-hidden="true"></div>

      <div className={styles['why-join-us__container']}>
        <h2 id="why-join-heading" className={styles['sr-only']}>
          Company Culture and Benefits
        </h2>

        {/* Two Column Layout */}
        <div className={styles['why-join-us__columns']}>
          {/* Left Side: The Way We Work */}
          <div className={styles['why-join-us__column']}>
            {/* Header */}
            <div className={styles['why-join-us__header']}>
              <span className={styles['why-join-us__badge']}>Our Culture</span>
              <h3 className={styles['why-join-us__title']}>The Way We Work</h3>
              <p className={styles['why-join-us__description']}>
                We believe great teams start with great culture. At Romega, we value:
              </p>
            </div>

            {/* Values Grid */}
            <div className={styles['why-join-us__grid-wrapper']}>
              <div className={styles['why-join-us__grid']}>
                {cultureValues.map((value) => (
                  <div key={value.id} className={styles['why-join-us__card']}>
                    <div className={styles['why-join-us__card-icon']}>
                      <Image
                        src={value.icon}
                        alt=""
                        width={48}
                        height={48}
                        style={{ width: 'auto' }}
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className={styles['why-join-us__card-title']}>{value.title}</h4>
                    <p className={styles['why-join-us__card-description']}>
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: What's In It For You */}
          <div className={styles['why-join-us__column']}>
            {/* Header */}
            <div className={styles['why-join-us__header']}>
              <span className={styles['why-join-us__badge']}>Perks and Benefits</span>
              <h3 className={styles['why-join-us__title']}>What&apos;s in it for you?</h3>
              <p className={styles['why-join-us__description']}>
                Opportunities and insights to advance your leadership.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className={styles['why-join-us__grid-wrapper']}>
              <div className={styles['why-join-us__grid']}>
                {benefits.map((benefit) => (
                  <div key={benefit.id} className={styles['why-join-us__card']}>
                    <div className={styles['why-join-us__card-icon']}>
                      <Image
                        src={benefit.icon}
                        alt=""
                        width={48}
                        height={48}
                        style={{ width: 'auto' }}
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className={styles['why-join-us__card-title']}>{benefit.title}</h4>
                    <p className={styles['why-join-us__card-description']}>
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={styles['why-join-us__cta']}>
          <Link
            href="/services"
            className={styles['why-join-us__cta-button']}
            aria-label="Learn more about Romega Solutions services"
          >
            <BookOpen size={32} aria-hidden="true" />
            Learn More About Romega
          </Link>
        </div>
      </div>
    </section>
  );
}
