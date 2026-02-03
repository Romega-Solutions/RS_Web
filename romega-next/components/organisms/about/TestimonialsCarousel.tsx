'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import styles from './TestimonialsCarousel.module.css';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction: 1 | -1) => {
    setCurrentIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex >= TESTIMONIALS.length) return 0;
      if (newIndex < 0) return TESTIMONIALS.length - 1;
      return newIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles['testimonials-carousel__rating']}>
        {Array.from({ length: 5 }, (_, i) => (
          <Image
            key={i}
            src={i < rating ? '/images/homepage/full-start.png' : '/images/homepage/no-star.png'}
            alt={i < rating ? 'Filled star' : 'Empty star'}
            width={20}
            height={20}
            className={styles['testimonials-carousel__star']}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className={styles['testimonials-carousel']}
      aria-labelledby="testimonials-heading"
    >
      {/* Top wave divider */}
      <div className={styles['testimonials-carousel__wave-top']} aria-hidden="true">
        <svg
          viewBox="0 0 1920 160"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles['testimonials-carousel__wave-svg']}
        >
          <path
            d="M0,80 Q480,0 960,80 T1920,80 L1920,0 L0,0 Z"
            fill="#232f3e"
          />
        </svg>
      </div>

      {/* Grid background */}
      <div className={styles['testimonials-carousel__bg-grid']} aria-hidden="true" />

      <div className={styles['testimonials-carousel__container']}>
        {/* Heading */}
        <div className={styles['testimonials-carousel__header']}>
          <h2
            id="testimonials-heading"
            className={styles['testimonials-carousel__title']}
          >
            What Our Interns Say About Us
          </h2>
          <p className={styles['testimonials-carousel__description']}>
            Discover the experiences of our satisfied interns! Read their testimonials to learn how our program made a positive impact on their businesses.
          </p>
        </div>

        {/* Carousel */}
        <div className={styles['testimonials-carousel__wrapper']}>
          <div
            className={styles['testimonials-carousel__track']}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className={styles['testimonials-carousel__slide']}
              >
                <a
                  href={testimonial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles['testimonials-carousel__card']}
                  aria-label={`View ${testimonial.name}'s LinkedIn profile`}
                >
                  {/* Profile Image */}
                  <div className={styles['testimonials-carousel__image-container']}>
                    <div className={styles['testimonials-carousel__image-border']}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={120}
                        height={120}
                        className={styles['testimonials-carousel__image']}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={styles['testimonials-carousel__content']}>
                    <h3 className={styles['testimonials-carousel__name']}>
                      {testimonial.name}
                    </h3>

                    <div className={styles['testimonials-carousel__school']}>
                      <GraduationCap
                        className={styles['testimonials-carousel__school-icon']}
                        aria-hidden="true"
                      />
                      <span>{testimonial.school}</span>
                    </div>

                    <p className={styles['testimonials-carousel__role']}>
                      {testimonial.title}
                    </p>

                    {renderStars(testimonial.rating)}

                    <p className={styles['testimonials-carousel__quote']}>
                      {testimonial.quote}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className={styles['testimonials-carousel__controls']}>
          <button
            className={styles['testimonials-carousel__button']}
            onClick={() => handleScroll(-1)}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className={styles['testimonials-carousel__icon']} />
          </button>

          <div className={styles['testimonials-carousel__dots']}>
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`${styles['testimonials-carousel__dot']} ${
                  index === currentIndex ? styles['testimonials-carousel__dot--active'] : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          <button
            className={styles['testimonials-carousel__button']}
            onClick={() => handleScroll(1)}
            aria-label="Next testimonial"
          >
            <ChevronRight className={styles['testimonials-carousel__icon']} />
          </button>
        </div>
      </div>
    </section>
  );
}
