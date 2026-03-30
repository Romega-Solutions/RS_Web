'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GraduationCap } from 'lucide-react';
import AvatarPlaceholder from '@/components/atoms/AvatarPlaceholder';
import { TESTIMONIALS } from '@/lib/constants';
import styles from './TestimonialsCarousel.module.css';

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Create extended array for infinite scroll (duplicate items at both ends)
  const extendedTestimonials = [
    ...TESTIMONIALS.slice(-1), // Last item at the beginning
    ...TESTIMONIALS,
    ...TESTIMONIALS.slice(0, 1), // First item at the end
  ];

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(5);
      } else if (window.innerWidth >= 1024) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 540) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const handleScroll = (direction: 1 | -1) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + direction);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of the prepended item
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleScroll(1);
    } else if (isRightSwipe) {
      handleScroll(-1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleScroll(-1);
      } else if (e.key === 'ArrowRight') {
        handleScroll(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransitioning]);

  // Handle infinite loop
  useEffect(() => {
    if (!isTransitioning) return;

    const transitionEnd = setTimeout(() => {
      if (currentIndex === 0) {
        // Jump to the real last item
        setCurrentIndex(TESTIMONIALS.length);
      } else if (currentIndex === extendedTestimonials.length - 1) {
        // Jump to the real first item
        setCurrentIndex(1);
      }
      setIsTransitioning(false);
    }, 500); // Match the CSS transition duration

    return () => clearTimeout(transitionEnd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isTransitioning]);

  // Initialize to first real item
  useEffect(() => {
    setCurrentIndex(1);
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className={styles['testimonials-carousel__rating']}>
        {Array.from({ length: 5 }, (_, i) => (
          <Image
            key={i}
            src={i < rating ? '/images/home/full-start.png' : '/images/home/no-star.png'}
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
        <div 
          className={styles['testimonials-carousel__wrapper']}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className={styles['testimonials-carousel__track']}
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
            }}
          >
            {extendedTestimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.id}-${idx}`}
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
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={120}
                          height={120}
                          className={styles['testimonials-carousel__image']}
                          sizes="(max-width: 539px) 100px, (max-width: 767px) 110px, 120px"
                        />
                      ) : (
                        <AvatarPlaceholder
                          size={120}
                          variant="neutral"
                          className={styles['testimonials-carousel__image']}
                        />
                      )}
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
            {TESTIMONIALS.map((_, index) => {
              // Calculate the real index (accounting for the prepended item)
              const realIndex = currentIndex === 0 ? TESTIMONIALS.length - 1 : 
                               currentIndex === extendedTestimonials.length - 1 ? 0 : 
                               currentIndex - 1;
              
              return (
                <button
                  key={index}
                  className={`${styles['testimonials-carousel__dot']} ${
                    index === realIndex ? styles['testimonials-carousel__dot--active'] : ''
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === realIndex ? 'true' : 'false'}
                />
              );
            })}
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
