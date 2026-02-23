import { getTalentExperience } from '@/lib/supabase/talent-experience';
import { Calendar, MapPin } from 'lucide-react';
import styles from './ProfileExperience.module.css';

interface ProfileExperienceProps {
  talentId: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function calculateDuration(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }
  return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
}

export async function ProfileExperience({ talentId }: ProfileExperienceProps) {
  const experiences = await getTalentExperience(talentId);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <section className={styles.ProfileExperience}>
      <h2 className={styles.ProfileExperience__heading}>Work Experience</h2>

      <div className={styles.ProfileExperience__timeline}>
        {experiences.map((exp, index) => (
          <div key={exp.id} className={styles.ProfileExperience__item}>
            {/* Timeline indicator */}
            <div className={styles.ProfileExperience__indicator}>
              <div className={styles.ProfileExperience__dot} />
              {index < experiences.length - 1 && (
                <div className={styles.ProfileExperience__line} />
              )}
            </div>

            {/* Content */}
            <div className={styles.ProfileExperience__content}>
              <div className={styles.ProfileExperience__header}>
                <div>
                  <h3 className={styles.ProfileExperience__role}>{exp.role}</h3>
                  <p className={styles.ProfileExperience__company}>{exp.company_name}</p>
                </div>
                <div className={styles.ProfileExperience__meta}>
                  <span className={styles.ProfileExperience__date}>
                    <Calendar size={14} />
                    {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                  </span>
                  <span className={styles.ProfileExperience__duration}>
                    {calculateDuration(exp.start_date, exp.end_date)}
                  </span>
                </div>
              </div>

              {exp.description && (
                <p className={styles.ProfileExperience__description}>
                  {exp.description}
                </p>
              )}

              {exp.achievements && exp.achievements.length > 0 && (
                <div className={styles.ProfileExperience__achievements}>
                  <h4 className={styles.ProfileExperience__subheading}>Key Achievements:</h4>
                  <ul className={styles.ProfileExperience__list}>
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.technologies && exp.technologies.length > 0 && (
                <div className={styles.ProfileExperience__technologies}>
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className={styles.ProfileExperience__techBadge}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
