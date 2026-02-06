'use client';

import { MapPin, Clock, DollarSign } from 'lucide-react';
import AvatarPlaceholder from '@/components/atoms/AvatarPlaceholder';
import styles from './TalentCard.module.css';

interface TalentCardProps {
  talent: {
    id: string;
    name: string;
    role: string;
    skills: string[];
    experience: string;
    availability: 'Available' | 'Busy' | 'Part-time';
    location: string;
    rate: string;
  };
}

export default function TalentCard({ talent }: TalentCardProps) {
  const availabilityColors = {
    Available: styles['talent-card__status--available'],
    Busy: styles['talent-card__status--busy'],
    'Part-time': styles['talent-card__status--part-time'],
  };

  return (
    <article className={styles['talent-card']}>
      {/* Header with Image and Status */}
      <div className={styles['talent-card__header']}>
        <div className={styles['talent-card__image-wrapper']}>
          <AvatarPlaceholder
            size={80}
            variant={talent.id === '1' || talent.id === '3' || talent.id === '5' ? 'female' : 'male'}
            className={styles['talent-card__image']}
          />
        </div>
        <span className={`${styles['talent-card__status']} ${availabilityColors[talent.availability]}`}>
          {talent.availability}
        </span>
      </div>

      {/* Content */}
      <div className={styles['talent-card__content']}>
        <h3 className={styles['talent-card__name']}>{talent.name}</h3>
        <p className={styles['talent-card__role']}>{talent.role}</p>

        {/* Info */}
        <div className={styles['talent-card__info']}>
          <div className={styles['talent-card__info-item']}>
            <MapPin size={16} aria-hidden="true" />
            <span>{talent.location}</span>
          </div>
          <div className={styles['talent-card__info-item']}>
            <Clock size={16} aria-hidden="true" />
            <span>{talent.experience}</span>
          </div>
          <div className={styles['talent-card__info-item']}>
            <DollarSign size={16} aria-hidden="true" />
            <span>{talent.rate}</span>
          </div>
        </div>

        {/* Skills */}
        <div className={styles['talent-card__skills']}>
          {talent.skills.slice(0, 4).map((skill, index) => (
            <span key={index} className={styles['talent-card__skill']}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={styles['talent-card__footer']}>
        <button
          className={styles['talent-card__cta']}
          aria-label={`View ${talent.name}'s profile`}
        >
          View Profile
        </button>
      </div>
    </article>
  );
}
