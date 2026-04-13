import type { Talent } from '@/types/jobs';
import styles from './ProfileAbout.module.css';

interface ProfileAboutProps {
  talent: Talent;
}

export function ProfileAbout({ talent }: ProfileAboutProps) {
  return (
    <section className={styles.ProfileAbout}>
      {/* About Section */}
      <div className={styles.ProfileAbout__section}>
        <h2 className={styles.ProfileAbout__heading}>About</h2>
        <p className={styles.ProfileAbout__bio}>
          {talent.bio || `${talent.name} is a ${talent.role} with ${talent.experience_years}+ years of experience in the industry.`}
        </p>
      </div>

      {/* Skills Section */}
      <div className={styles.ProfileAbout__section}>
        <h2 className={styles.ProfileAbout__heading}>Skills & Expertise</h2>
        <div className={styles.ProfileAbout__skills}>
          {talent.skills.map((skill, index) => (
            <span key={index} className={styles.ProfileAbout__skillBadge}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Subcategories (if available) */}
      {talent.subcategories && talent.subcategories.length > 0 && (
        <div className={styles.ProfileAbout__section}>
          <h3 className={styles.ProfileAbout__subheading}>Specializations</h3>
          <div className={styles.ProfileAbout__subcategories}>
            {talent.subcategories.map((subcat, index) => (
              <span key={index} className={styles.ProfileAbout__subcategoryBadge}>
                {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
