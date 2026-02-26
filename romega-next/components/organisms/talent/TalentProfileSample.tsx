'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import AvatarPlaceholder from '@/components/atoms/AvatarPlaceholder';
import styles from './TalentProfileSample.module.css';

/* ──────────────────────────────
   STATIC SAMPLE DATA
────────────────────────────── */
const SAMPLE = {
  firstName: 'Sarah',
  lastName: 'J.',
  name: 'Sarah J.',
  role: 'Senior Product Designer',
  location: 'London, United Kingdom',
  yearsExp: '7+',
  projectCount: 42,
  availability: 'Available Now',
  availabilitySub: 'Full-time or Contract',
  bio: [
    "Hi there! I'm a Senior Product Designer with over 7 years of experience crafting intuitive digital experiences for startups and enterprise clients. I specialise in bridging the gap between complex user needs and elegant visual solutions.",
    "My approach is deeply rooted in user-centered design principles. I believe that great design isn't just about how it looks, but how it works and how it makes the user feel. Whether it's a mobile app revamp or a complex SaaS dashboard, I bring a strategic mindset and pixel-perfect attention to detail.",
  ],
  coreDisciplines: [
    'Product Design',
    'UX Research',
    'UI Design',
    'Interaction Design',
    'Design Systems',
  ],
  tools: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Webflow'],
  experience: [
    {
      id: 1,
      role: 'Senior Product Designer',
      company: 'TechFlow Inc.',
      location: 'Remote',
      dateRange: 'Jan 2021 – Present',
      current: true,
      description:
        'Lead designer for the core SaaS platform used by over 50k users. Spearheaded the redesign of the analytics dashboard, resulting in a 33% increase in user engagement. Managed a team of 2 junior designers and established the company\'s first design system.',
      tags: ['SAAS', 'LEADERSHIP'],
    },
    {
      id: 2,
      role: 'UI/UX Designer',
      company: 'Creative Studio',
      location: 'London, UK',
      dateRange: 'Mar 2018 – Dec 2021',
      current: false,
      description:
        'Worked with diverse clients ranging from fintech startups to commerce brands. Delivered end-to-end design solutions including wireframing, prototyping, and high-fidelity UI.',
      tags: ['CLIENT SERVICES', 'MOBILE APP'],
    },
    {
      id: 3,
      role: 'Junior Web Designer',
      company: 'Digital Pulse Agency',
      location: 'London, UK',
      dateRange: 'Jul 2016 – Feb 2018',
      current: false,
      description:
        'Assisted in the design of marketing websites and landing pages. Gained proficiency in HTML/CSS and responsive design principles.',
      tags: [],
    },
  ],
  featuredWork: [
    {
      id: 1,
      name: 'Fintech Analytics Dashboard',
      tags: 'UX Research · UI Design',
      bg: '#c9ddf3',
    },
    {
      id: 2,
      name: 'Connect Messaging App',
      tags: 'Mobile Design · Prototyping',
      bg: '#f5e6d3',
    },
  ],
  reviews: 1,
  reviewCount: 1,
};

type Tab = 'overview' | 'experience' | 'reviews';

/* ──────────────────────────────
   COMPONENT
────────────────────────────── */
export default function TalentProfileSample() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className={styles.profile}>
      <div className={styles.profile__inner}>

        {/* ── LEFT SIDEBAR ─────────────────── */}
        <aside className={styles.sidebar}>
          {/* Avatar */}
          <div className={styles['sidebar__avatar-wrap']}>
            <div className={styles.sidebar__avatar}>
              <AvatarPlaceholder size={80} variant="female" />
            </div>
            <div className={styles['sidebar__avatar-badge']}>
              <CheckCircle size={10} />
            </div>
          </div>

          {/* Identity */}
          <p className={styles.sidebar__name}>{SAMPLE.name}</p>
          <span className={styles.sidebar__role}>{SAMPLE.role}</span>
          <p className={styles.sidebar__location}>
            <MapPin size={12} />
            {SAMPLE.location}
          </p>

          {/* Actions */}
          <div className={styles.sidebar__actions}>
            <button className={styles['sidebar__btn-primary']}>
              <CalendarCheck size={14} />
              Schedule a Meeting
            </button>
            <button className={styles['sidebar__btn-ghost']}>
              <Bookmark size={13} />
              Save Profile
            </button>
            <button className={styles['sidebar__btn-ghost']}>
              <Download size={13} />
              Download Portfolio
            </button>
          </div>

          <div className={styles.sidebar__divider} />

          {/* Availability */}
          <p className={styles.sidebar__label}>Availability</p>
          <div className={styles.sidebar__availability}>
            <div className={styles['sidebar__avail-dot']}>
              <Check size={9} strokeWidth={3} />
            </div>
            <div className={styles['sidebar__avail-text']}>
              <span className={styles['sidebar__avail-status']}>{SAMPLE.availability}</span>
              <span className={styles['sidebar__avail-sub']}>{SAMPLE.availabilitySub}</span>
            </div>
          </div>

          <div className={styles.sidebar__divider} />

          {/* Quick stats */}
          <p className={styles.sidebar__label}>Quick Stats</p>
          <div className={styles.sidebar__stats}>
            <div className={styles.sidebar__stat}>
              <span className={styles['sidebar__stat-num']}>{SAMPLE.yearsExp}</span>
              <span className={styles['sidebar__stat-sub']}>Yrs Exp</span>
            </div>
            <div className={styles.sidebar__stat}>
              <span className={styles['sidebar__stat-num']}>{SAMPLE.projectCount}</span>
              <span className={styles['sidebar__stat-sub']}>Projects</span>
            </div>
          </div>

          <div className={styles.sidebar__divider} />

        </aside>

        {/* ── RIGHT CONTENT ─────────────────── */}
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
              <span className={styles.tab__badge}>{SAMPLE.reviewCount}</span>
            </button>
          </nav>

          {/* ── Overview tab ── */}
          {activeTab === 'overview' && (
            <>
              {/* About card */}
              <div className={styles.card}>
                <div className={styles.card__header}>
                  <h2 className={styles.card__title}>
                    <span className={styles['card__title-accent']} />
                    About {SAMPLE.firstName}
                  </h2>
                </div>
                {SAMPLE.bio.map((para, i) => (
                  <p key={i} className={styles.about__body}>{para}</p>
                ))}
              </div>

              {/* Expertise & Skills */}
              <div className={styles.card}>
                <div className={styles.card__header}>
                  <h2 className={styles.card__title}>
                    <span className={styles['card__title-accent']} />
                    Expertise &amp; Skills
                  </h2>
                </div>
                <div className={styles.skills__grid}>
                  <div>
                    <p className={styles['skills__col-label']}>
                      <Grip size={13} />
                      Core Disciplines
                    </p>
                    <div className={styles.skills__pills}>
                      {SAMPLE.coreDisciplines.map((s) => (
                        <span key={s} className={styles.skills__pill}>{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={styles['skills__col-label']}>
                      <Wrench size={13} />
                      Tools
                    </p>
                    <div className={styles.skills__pills}>
                      {SAMPLE.tools.map((t) => (
                        <span key={t} className={styles.skills__pill}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Experience */}
              <div className={styles.card}>
                <div className={styles.card__header}>
                  <h2 className={styles.card__title}>
                    <span className={styles['card__title-accent']} />
                    Recent Experience
                  </h2>
                  <a href="#" className={styles.card__link}>View All</a>
                </div>
                <div className={styles.exp__list}>
                  {SAMPLE.experience.map((exp, i) => (
                    <div key={exp.id} className={styles.exp__item}>
                      {/* Indicator */}
                      <div className={styles.exp__indicator}>
                        <div className={`${styles.exp__dot} ${exp.current ? styles['exp__dot--active'] : styles['exp__dot--past']}`} />
                        {i < SAMPLE.experience.length - 1 && <div className={styles.exp__line} />}
                      </div>
                      {/* Body */}
                      <div className={styles.exp__body}>
                        <div className={styles.exp__row}>
                          <h3 className={styles.exp__title}>{exp.role}</h3>
                          <span className={styles.exp__date}>{exp.dateRange}</span>
                        </div>
                        <p className={styles.exp__company}>
                          {exp.company}
                          {exp.location && (
                            <>
                              <span className={styles['exp__company-sep']}>·</span>
                              <span className={styles.exp__location}>{exp.location}</span>
                            </>
                          )}
                        </p>
                        <p className={styles.exp__desc}>{exp.description}</p>
                        {exp.tags.length > 0 && (
                          <div className={styles.exp__tags}>
                            {exp.tags.map((tag) => (
                              <span key={tag} className={styles.exp__tag}>{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Work */}
              <div className={styles.card}>
                <div className={styles.card__header}>
                  <h2 className={styles.card__title}>
                    <span className={styles['card__title-accent']} />
                    Featured Work
                  </h2>
                  <a href="#" className={styles.card__link}>
                    View Portfolio <ArrowRight size={13} />
                  </a>
                </div>
                <div className={styles.work__grid}>
                  {SAMPLE.featuredWork.map((proj) => (
                    <div key={proj.id} className={styles.work__item}>
                      {/* Placeholder thumbnail */}
                      <div
                        className={styles['work__thumb-placeholder']}
                        style={{ background: proj.bg }}
                        aria-hidden="true"
                      />
                      <div className={styles.work__info}>
                        <p className={styles.work__name}>{proj.name}</p>
                        <p className={styles.work__tags}>{proj.tags}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Experience tab ── */}
          {activeTab === 'experience' && (
            <div className={styles.card}>
              <div className={styles.card__header}>
                <h2 className={styles.card__title}>
                  <span className={styles['card__title-accent']} />
                  Work Experience
                </h2>
              </div>
              <div className={styles.exp__list}>
                {SAMPLE.experience.map((exp, i) => (
                  <div key={exp.id} className={styles.exp__item}>
                    <div className={styles.exp__indicator}>
                      <div className={`${styles.exp__dot} ${exp.current ? styles['exp__dot--active'] : styles['exp__dot--past']}`} />
                      {i < SAMPLE.experience.length - 1 && <div className={styles.exp__line} />}
                    </div>
                    <div className={styles.exp__body}>
                      <div className={styles.exp__row}>
                        <h3 className={styles.exp__title}>{exp.role}</h3>
                        <span className={styles.exp__date}>{exp.dateRange}</span>
                      </div>
                      <p className={styles.exp__company}>
                        {exp.company}
                        {exp.location && (
                          <>
                            <span className={styles['exp__company-sep']}>·</span>
                            <span className={styles.exp__location}>{exp.location}</span>
                          </>
                        )}
                      </p>
                      <p className={styles.exp__desc}>{exp.description}</p>
                      {exp.tags.length > 0 && (
                        <div className={styles.exp__tags}>
                          {exp.tags.map((tag) => (
                            <span key={tag} className={styles.exp__tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Reviews tab ── */}
          {activeTab === 'reviews' && (
            <div className={styles.card}>
              <div className={styles.card__header}>
                <h2 className={styles.card__title}>
                  <span className={styles['card__title-accent']} />
                  Reviews
                </h2>
              </div>
              <p className={styles.about__body}>No reviews yet. Be the first to work with {SAMPLE.firstName}!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
