'use client';

import { useState } from 'react';
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
    setCurrentIndex(index);
  };

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
        <div className={styles['team-carousel__track-wrapper']}>
          <div className={styles['team-carousel__track']}>
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
                    className={styles['team-carousel__card']}
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
