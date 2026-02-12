'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '@/lib/constants';
import styles from './TeamCarousel.module.css';

interface TeamCarouselProps {
  onMemberClick?: (member: TeamMember) => void;
}

export default function TeamCarousel({ onMemberClick }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(3); // Start with CEO in center
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleScroll = (direction: 1 | -1) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex >= TEAM_MEMBERS.length) return 0;
      if (newIndex < 0) return TEAM_MEMBERS.length - 1;
      return newIndex;
    });

    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 600);
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
  }, [isAnimating]);

  // Get visible team members (7 total: 3 left + center + 3 right)
  const getVisibleMembers = () => {
    const visible = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + TEAM_MEMBERS.length) % TEAM_MEMBERS.length;
      visible.push({
        member: TEAM_MEMBERS[index],
        position: i + 3, // 0-6
      });
    }
    return visible;
  };

  return (
    <section
      className={styles['team-carousel']}
      aria-labelledby="team-heading"
    >
      {/* Grid background */}
      <div className={styles['team-carousel__bg-grid']} aria-hidden="true" />

      <div className={styles['team-carousel__container']}>
        {/* Heading */}
        <div className={styles['team-carousel__header']}>
          <h2
            id="team-heading"
            className={styles['team-carousel__title']}
          >
            Meet the Experts Behind Your Success
          </h2>
          <p className={styles['team-carousel__description']}>
            Our leadership team brings decades of combined experience in executive search, 
            HR transformation, and business growth.
          </p>
        </div>

        {/* Carousel Track */}
        <div 
          className={styles['team-carousel__track-wrapper']}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div 
            ref={trackRef}
            className={styles['team-carousel__track']}
          >
            {getVisibleMembers().map(({ member, position }) => {
              const isCenter = position === 3;
              const positionClass = styles[`team-carousel__item--position-${position}`];

              return (
                <div
                  key={`${member.id}-${position}`}
                  className={`${styles['team-carousel__item']} ${positionClass} ${
                    isCenter ? styles['team-carousel__item--center'] : ''
                  }`}
                >
                  <button
                    className={`${styles['team-carousel__card']} ${
                      member.id === 'rich-salvador' ? styles['team-carousel__card--white-bg'] : ''
                    }`}
                    onClick={() => isCenter && onMemberClick?.(member)}
                    aria-label={`View ${member.name}'s profile`}
                    disabled={!isCenter}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={styles['team-carousel__image']}
                      sizes="(max-width: 768px) 200px, 400px"
                    />
                    
                    <div className={styles['team-carousel__overlay']}>
                      <h3 className={styles['team-carousel__name']}>
                        {member.name}
                      </h3>
                      <p className={styles['team-carousel__role']}>
                        {member.title}
                      </p>
                    </div>

                    {isCenter && (
                      <div className={styles['team-carousel__cta']}>
                        View Profile
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className={styles['team-carousel__controls']}>
          <button
            className={styles['team-carousel__button']}
            onClick={() => handleScroll(-1)}
            aria-label="Previous team member"
            disabled={isAnimating}
          >
            <ChevronLeft className={styles['team-carousel__icon']} />
          </button>

          <div className={styles['team-carousel__dots']}>
            {TEAM_MEMBERS.map((_, index) => (
              <button
                key={index}
                className={`${styles['team-carousel__dot']} ${
                  index === currentIndex ? styles['team-carousel__dot--active'] : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to team member ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          <button
            className={styles['team-carousel__button']}
            onClick={() => handleScroll(1)}
            aria-label="Next team member"
            disabled={isAnimating}
          >
            <ChevronRight className={styles['team-carousel__icon']} />
          </button>
        </div>
      </div>
    </section>
  );
}
