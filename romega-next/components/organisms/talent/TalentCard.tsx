'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import styles from './TalentCard.module.css';
import type { Talent } from '@/types/jobs';

interface TalentCardProps {
  talent: Talent;
}

function getSeniorityLabel(level?: string): string {
  switch (level) {
    case 'Junior': return 'JUNIOR';
    case 'Mid-Level': return 'MIDDLE';
    case 'Senior': return 'SENIOR';
    case 'Lead': return 'LEAD';
    case 'Principal': return 'PRINCIPAL';
    default: return 'MIDDLE';
  }
}

export default function TalentCard({ talent }: TalentCardProps) {
  const seniority = getSeniorityLabel(talent.experience_level);
  const country = talent.location ? talent.location.toUpperCase() : '';

  return (
    <article className={styles['talent-card']}>
      {/* Header Row */}
      <div className={styles['talent-card__header']}>
        <div className={styles['talent-card__info']}>
          <div className={styles['talent-card__name-row']}>
            <span className={styles['talent-card__name']}>{talent.name}</span>
            <span className={styles['talent-card__country']}>
              <MapPin size={12} aria-hidden="true" />
              {country}
            </span>
          </div>
          <p className={styles['talent-card__role']}>{talent.role}</p>
          <p className={styles['talent-card__level']}>{seniority}</p>
        </div>

        <span className={styles['talent-card__id']}>ID: {talent.id}</span>
      </div>

      {/* Skills Row */}
      <div className={styles['talent-card__skills']}>
        {(talent.skills || []).slice(0, 3).map((skill, i) => (
          <span key={i} className={styles['talent-card__skill']}>{skill}</span>
        ))}
        {talent.skills && talent.skills.length > 3 && (
          <span className={styles['talent-card__skill-more']}>
            +{talent.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Footer Row */}
      <div className={styles['talent-card__footer']}>
        <Link
          href={`/talent/${talent.id}`}
          className={styles['talent-card__cta']}
          aria-label={`View ${talent.name}'s profile`}
        >
          VIEW PROFILE
        </Link>
      </div>
    </article>
  );
}
