import type { Talent } from '@/types/jobs';
import AvatarPlaceholder from '@/components/atoms/AvatarPlaceholder/AvatarPlaceholder';
import { MapPin, Clock, Briefcase, DollarSign } from 'lucide-react';
import styles from './ProfileHero.module.css';

interface ProfileHeroProps {
  talent: Talent;
}

export function ProfileHero({ talent }: ProfileHeroProps) {
  const availabilityClass = {
    'Available': styles.ProfileHero__statusAvailable,
    'Busy': styles.ProfileHero__statusBusy,
    'Part-time': styles.ProfileHero__statusParttime,
  }[talent.availability];

  return (
    <section className={styles.ProfileHero}>
      <div className={styles.ProfileHero__container}>
        <div className={styles.ProfileHero__content}>
          {/* Avatar */}
          <div className={styles.ProfileHero__avatar}>
            <AvatarPlaceholder 
              size={120} 
              variant={talent.gender || 'neutral'}
              className={styles.ProfileHero__avatarImage}
            />
            {talent.featured && (
              <span className={styles.ProfileHero__badge}>Featured</span>
            )}
          </div>

          {/* Info */}
          <div className={styles.ProfileHero__info}>
            <h1 className={styles.ProfileHero__name}>{talent.name}</h1>
            <p className={styles.ProfileHero__role}>{talent.role}</p>
            {talent.tagline && (
              <p className={styles.ProfileHero__tagline}>{talent.tagline}</p>
            )}

            {/* Quick Stats */}
            <div className={styles.ProfileHero__stats}>
              <div className={styles.ProfileHero__stat}>
                <MapPin className={styles.ProfileHero__statIcon} size={18} />
                <span>{talent.location}</span>
              </div>
              <div className={styles.ProfileHero__stat}>
                <Briefcase className={styles.ProfileHero__statIcon} size={18} />
                <span>{talent.experience_years}+ years</span>
              </div>
              {talent.rate && (
                <div className={styles.ProfileHero__stat}>
                  <DollarSign className={styles.ProfileHero__statIcon} size={18} />
                  <span>{talent.rate}</span>
                </div>
              )}
              <div className={`${styles.ProfileHero__stat} ${styles.ProfileHero__statStatus}`}>
                <Clock className={styles.ProfileHero__statIcon} size={18} />
                <span className={availabilityClass}>{talent.availability}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
