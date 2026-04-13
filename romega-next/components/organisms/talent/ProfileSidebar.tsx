import type { Talent } from '@/types/jobs';
import { Mail, Globe, Linkedin, Github, TrendingUp, Eye, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import styles from './ProfileSidebar.module.css';

interface ProfileSidebarProps {
  talent: Talent;
}

export function ProfileSidebar({ talent }: ProfileSidebarProps) {
  return (
    <aside className={styles.ProfileSidebar}>
      {/* Contact Card */}
      <div className={styles.ProfileSidebar__card}>
        <h2 className={styles.ProfileSidebar__cardTitle}>Get in Touch</h2>
        <Link
          href={`/contact?talent=${talent.id}`}
          className={styles.ProfileSidebar__ctaButton}
        >
          <Mail size={20} />
          Contact {talent.name.split(' ')[0]}
        </Link>
        <p className={styles.ProfileSidebar__note}>
          We&apos;ll respond within 24 hours
        </p>
      </div>

      {/* Quick Stats */}
      <div className={styles.ProfileSidebar__card}>
        <h3 className={styles.ProfileSidebar__cardTitle}>Quick Info</h3>
        <div className={styles.ProfileSidebar__stats}>
          {talent.experience_level && (
            <div className={styles.ProfileSidebar__statItem}>
              <TrendingUp size={18} className={styles.ProfileSidebar__statIcon} />
              <div>
                <p className={styles.ProfileSidebar__statLabel}>Level</p>
                <p className={styles.ProfileSidebar__statValue}>{talent.experience_level}</p>
              </div>
            </div>
          )}


          {talent.timezone && (
            <div className={styles.ProfileSidebar__statItem}>
              <Globe size={18} className={styles.ProfileSidebar__statIcon} />
              <div>
                <p className={styles.ProfileSidebar__statLabel}>Timezone</p>
                <p className={styles.ProfileSidebar__statValue}>{talent.timezone.replace('_', ' ')}</p>
              </div>
            </div>
          )}

          {talent.views_count !== undefined && talent.views_count > 0 && (
            <div className={styles.ProfileSidebar__statItem}>
              <Eye size={18} className={styles.ProfileSidebar__statIcon} />
              <div>
                <p className={styles.ProfileSidebar__statLabel}>Profile Views</p>
                <p className={styles.ProfileSidebar__statValue}>{talent.views_count}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Links */}
      {(talent.portfolio_url || talent.linkedin_url || talent.github_url) && (
        <div className={styles.ProfileSidebar__card}>
          <h3 className={styles.ProfileSidebar__cardTitle}>Links</h3>
          <div className={styles.ProfileSidebar__links}>
            {talent.portfolio_url && (
              <a
                href={talent.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ProfileSidebar__link}
              >
                <Globe size={18} />
                <span>Portfolio</span>
              </a>
            )}
            {talent.linkedin_url && (
              <a
                href={talent.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ProfileSidebar__link}
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
            )}
            {talent.github_url && (
              <a
                href={talent.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ProfileSidebar__link}
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Category Badge */}
      <div className={styles.ProfileSidebar__card}>
        <div className={styles.ProfileSidebar__category}>
          <span className={styles.ProfileSidebar__categoryBadge}>
            {talent.category.charAt(0).toUpperCase() + talent.category.slice(1)}
          </span>
          {talent.verified && (
            <span className={styles.ProfileSidebar__verified}>
              <BadgeCheck size={16} aria-hidden="true" />
              Verified
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
