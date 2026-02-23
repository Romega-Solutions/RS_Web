'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  CalendarCheck,
  Bookmark,
  Download,
  Check,
  Layout,
  Briefcase,
  Star,
  CheckCircle,
  Grip,
  Wrench,
  ArrowRight,
  Globe,
  Linkedin,
  Github,
} from 'lucide-react';
import AvatarPlaceholder from '@/components/atoms/AvatarPlaceholder/AvatarPlaceholder';
import type { Talent } from '@/types/jobs';
import type { TalentExperience } from '@/lib/supabase/talent-experience';
import styles from './TalentProfileSample.module.css';

/* ── inline types for project / testimonial ── */
interface Project {
  id: string;
  title: string;
  description: string;
  project_url?: string;
  image_url?: string;
  technologies: string[];
  completion_date?: string;
  featured: boolean;
}

interface Testimonial {
  id: string;
  client_name: string;
  client_company?: string;
  client_role?: string;
  testimonial: string;
  rating: number;
  project_name?: string;
}

interface TalentProfileClientProps {
  talent: Talent;
  experience: TalentExperience[];
  projects: Project[];
  testimonials: Testimonial[];
}

/* ── helpers ── */
function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

type Tab = 'overview' | 'experience' | 'reviews';

/* ────────────────────────────────────────────────
   EXPERIENCE LIST
──────────────────────────────────────────────── */
function ExperienceList({ experience }: { experience: TalentExperience[] }) {
  if (!experience.length) {
    return <p className={styles.about__body}>No experience listed yet.</p>;
  }
  return (
    <div className={styles.exp__list}>
      {experience.map((exp, i) => {
        const isCurrent = !exp.end_date;
        const dateRange = `${formatDate(exp.start_date)} – ${isCurrent ? 'Present' : formatDate(exp.end_date!)}`;
        return (
          <div key={exp.id} className={styles.exp__item}>
            <div className={styles.exp__indicator}>
              <div className={`${styles.exp__dot} ${isCurrent ? styles['exp__dot--active'] : styles['exp__dot--past']}`} />
              {i < experience.length - 1 && <div className={styles.exp__line} />}
            </div>
            <div className={styles.exp__body}>
              <div className={styles.exp__row}>
                <h3 className={styles.exp__title}>{exp.role}</h3>
                <span className={styles.exp__date}>{dateRange}</span>
              </div>
              <p className={styles.exp__company}>{exp.company_name}</p>
              {exp.description && <p className={styles.exp__desc}>{exp.description}</p>}
              {exp.technologies?.length > 0 && (
                <div className={styles.exp__tags}>
                  {exp.technologies.map((t) => (
                    <span key={t} className={styles.exp__tag}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────
   MAIN COMPONENT
──────────────────────────────────────────────── */
export default function TalentProfileClient({
  talent,
  experience,
  projects,
  testimonials,
}: TalentProfileClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const firstName = talent.name.split(' ')[0];
  const rateLabel = talent.rate ?? (
    talent.hourly_rate_min
      ? `${talent.rate_currency ?? '$'}${talent.hourly_rate_min}${talent.hourly_rate_max ? `–${talent.hourly_rate_max}` : ''}/hr`
      : null
  );

  const availColor: Record<string, string> = {
    Available: '#16a34a',
    Busy: '#dc2626',
    'Part-time': '#d97706',
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__inner}>

        {/* ══════════════ LEFT SIDEBAR ══════════════ */}
        <aside className={styles.sidebar}>

          {/* Avatar + verified badge */}
          <div className={styles['sidebar__avatar-wrap']}>
            <div className={styles.sidebar__avatar}>
              <AvatarPlaceholder size={80} variant={talent.gender ?? 'neutral'} />
            </div>
            {talent.verified && (
              <div className={styles['sidebar__avatar-badge']}>
                <CheckCircle size={10} />
              </div>
            )}
          </div>

          {/* Identity */}
          <p className={styles.sidebar__name}>{talent.name}</p>
          <span className={styles.sidebar__role}>{talent.role}</span>
          <p className={styles.sidebar__location}>
            <MapPin size={12} />
            {talent.location}
          </p>

          {/* Action buttons */}
          <div className={styles.sidebar__actions}>
            <Link
              href={`/contact?talent=${talent.id}`}
              className={styles['sidebar__btn-primary']}
            >
              <CalendarCheck size={14} />
              Schedule a Meeting
            </Link>
            <button className={styles['sidebar__btn-ghost']}>
              <Bookmark size={13} />
              Save Profile
            </button>
            {talent.portfolio_url && (
              <a
                href={talent.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['sidebar__btn-ghost']}
              >
                <Download size={13} />
                Download Portfolio
              </a>
            )}
          </div>

          {/* External links */}
          {(talent.linkedin_url || talent.github_url || talent.portfolio_url) && (
            <>
              <div className={styles.sidebar__divider} />
              <div className={styles.sidebar__actions} style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '0.5rem' }}>
                {talent.linkedin_url && (
                  <a href={talent.linkedin_url} target="_blank" rel="noopener noreferrer" className={styles['sidebar__btn-ghost']} style={{ flex: 1, minWidth: '2.5rem' }}>
                    <Linkedin size={14} />
                  </a>
                )}
                {talent.github_url && (
                  <a href={talent.github_url} target="_blank" rel="noopener noreferrer" className={styles['sidebar__btn-ghost']} style={{ flex: 1, minWidth: '2.5rem' }}>
                    <Github size={14} />
                  </a>
                )}
                {talent.portfolio_url && (
                  <a href={talent.portfolio_url} target="_blank" rel="noopener noreferrer" className={styles['sidebar__btn-ghost']} style={{ flex: 1, minWidth: '2.5rem' }}>
                    <Globe size={14} />
                  </a>
                )}
              </div>
            </>
          )}

          <div className={styles.sidebar__divider} />

          {/* Availability */}
          <p className={styles.sidebar__label}>Availability</p>
          <div className={styles.sidebar__availability}>
            <div className={styles['sidebar__avail-dot']}>
              <Check size={9} strokeWidth={3} />
            </div>
            <div className={styles['sidebar__avail-text']}>
              <span
                className={styles['sidebar__avail-status']}
                style={{ color: availColor[talent.availability] ?? '#16a34a' }}
              >
                {talent.availability}
              </span>
              {talent.remote_only && (
                <span className={styles['sidebar__avail-sub']}>Remote only</span>
              )}
            </div>
          </div>

          <div className={styles.sidebar__divider} />

          {/* Quick stats */}
          <p className={styles.sidebar__label}>Quick Stats</p>
          <div className={styles.sidebar__stats}>
            <div className={styles.sidebar__stat}>
              <span className={styles['sidebar__stat-num']}>{talent.experience_years}+</span>
              <span className={styles['sidebar__stat-sub']}>Yrs Exp</span>
            </div>
            <div className={styles.sidebar__stat}>
              <span className={styles['sidebar__stat-num']}>
                {talent.experience_level?.slice(0, 3).toUpperCase() ?? '—'}
              </span>
              <span className={styles['sidebar__stat-sub']}>Level</span>
            </div>
          </div>

          {/* Hourly rate */}
          {rateLabel && (
            <>
              <div className={styles.sidebar__divider} />
              <p className={styles.sidebar__label}>Hourly Rate</p>
              <div className={styles.sidebar__rate}>
                <span className={styles['sidebar__rate-amount']}>{rateLabel}</span>
              </div>
            </>
          )}

        </aside>

        {/* ══════════════ RIGHT CONTENT ══════════════ */}
        <div className={styles.content}>

          {/* Tab bar */}
          <nav className={styles.tabs} aria-label="Profile sections">
            <button
              className={`${styles.tab} ${activeTab === 'overview' ? styles['tab--active'] : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Layout size={14} />
              Overview
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'experience' ? styles['tab--active'] : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <Briefcase size={14} />
              Experience
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'reviews' ? styles['tab--active'] : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star size={14} />
              Reviews
              {testimonials.length > 0 && (
                <span className={styles.tab__badge}>{testimonials.length}</span>
              )}
            </button>
          </nav>

          {/* ── OVERVIEW ── */}
          {activeTab === 'overview' && (
            <>
              {/* About */}
              {(talent.bio || talent.tagline) && (
                <div className={styles.card}>
                  <div className={styles.card__header}>
                    <h2 className={styles.card__title}>
                      <span className={styles['card__title-accent']} aria-hidden="true" />
                      About {firstName}
                    </h2>
                  </div>
                  {talent.tagline && <p className={styles.about__body}><em>{talent.tagline}</em></p>}
                  {talent.bio && <p className={styles.about__body}>{talent.bio}</p>}
                </div>
              )}

              {/* Skills */}
              {(talent.skills?.length > 0 || talent.subcategories?.length) && (
                <div className={styles.card}>
                  <div className={styles.card__header}>
                    <h2 className={styles.card__title}>
                      <span className={styles['card__title-accent']} aria-hidden="true" />
                      Skills &amp; Expertise
                    </h2>
                  </div>
                  <div className={styles.skills__grid}>
                    {talent.skills?.length > 0 && (
                      <div>
                        <p className={styles['skills__col-label']}>
                          <Grip size={13} />
                          Core Skills
                        </p>
                        <div className={styles.skills__pills}>
                          {talent.skills.map((s) => (
                            <span key={s} className={styles.skills__pill}>{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {talent.subcategories && talent.subcategories.length > 0 && (
                      <div>
                        <p className={styles['skills__col-label']}>
                          <Wrench size={13} />
                          Specializations
                        </p>
                        <div className={styles.skills__pills}>
                          {talent.subcategories.map((s) => (
                            <span key={s} className={styles.skills__pill}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Recent Experience (first 3) */}
              {experience.length > 0 && (
                <div className={styles.card}>
                  <div className={styles.card__header}>
                    <h2 className={styles.card__title}>
                      <span className={styles['card__title-accent']} aria-hidden="true" />
                      Recent Experience
                    </h2>
                    {experience.length > 3 && (
                      <button
                        className={styles.card__link}
                        onClick={() => setActiveTab('experience')}
                      >
                        View All
                      </button>
                    )}
                  </div>
                  <ExperienceList experience={experience.slice(0, 3)} />
                </div>
              )}

              {/* Featured Projects */}
              {projects.length > 0 && (
                <div className={styles.card}>
                  <div className={styles.card__header}>
                    <h2 className={styles.card__title}>
                      <span className={styles['card__title-accent']} aria-hidden="true" />
                      Featured Work
                    </h2>
                    {talent.portfolio_url && (
                      <a
                        href={talent.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.card__link}
                      >
                        View Portfolio <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                  <div className={styles.work__grid}>
                    {projects.slice(0, 4).map((proj) => (
                      <div key={proj.id} className={styles.work__item}>
                        {proj.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={proj.image_url} alt={proj.title} className={styles.work__thumb} />
                        ) : (
                          <div
                            className={styles['work__thumb-placeholder']}
                            style={{ background: '#dbeafe' }}
                            aria-hidden="true"
                          />
                        )}
                        <div className={styles.work__info}>
                          <p className={styles.work__name}>{proj.title}</p>
                          <p className={styles.work__tags}>
                            {proj.technologies.slice(0, 3).join(' · ')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ── EXPERIENCE ── */}
          {activeTab === 'experience' && (
            <div className={styles.card}>
              <div className={styles.card__header}>
                <h2 className={styles.card__title}>
                  <span className={styles['card__title-accent']} aria-hidden="true" />
                  Work Experience
                </h2>
              </div>
              <ExperienceList experience={experience} />
            </div>
          )}

          {/* ── REVIEWS ── */}
          {activeTab === 'reviews' && (
            <div className={styles.card}>
              <div className={styles.card__header}>
                <h2 className={styles.card__title}>
                  <span className={styles['card__title-accent']} aria-hidden="true" />
                  Client Reviews
                </h2>
              </div>
              {testimonials.length === 0 ? (
                <p className={styles.about__body}>No reviews yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        padding: '1rem 1.125rem',
                      }}
                    >
                      <p className={styles.about__body} style={{ marginBottom: '0.625rem' }}>
                        &ldquo;{t.testimonial}&rdquo;
                      </p>
                      <p style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        margin: 0,
                      }}>
                        {t.client_name}
                        {t.client_company && (
                          <span style={{ fontWeight: 400, color: '#64748b' }}>
                            {' '}· {t.client_company}
                          </span>
                        )}
                      </p>
                      {/* Star rating */}
                      <div style={{ marginTop: '0.25rem', display: 'flex', gap: '2px' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            fill={i < t.rating ? '#f59e0b' : 'none'}
                            color={i < t.rating ? '#f59e0b' : '#cbd5e1'}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
