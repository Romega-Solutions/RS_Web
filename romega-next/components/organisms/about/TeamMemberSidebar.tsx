'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Linkedin } from 'lucide-react'
import { TeamMember, TEAM_MEMBERS } from '@/lib/constants'
import styles from './TeamMemberSidebar.module.css'

interface TeamMemberSidebarProps {
  isOpen: boolean
  member: TeamMember | null
  onClose: () => void
}

export default function TeamMemberSidebar({
  isOpen,
  member,
  onClose,
}: TeamMemberSidebarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      setTimeout(() => setIsVisible(false), 300)
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!member || !isVisible) return null

  // Extract last name from full name
  const nameParts = member.name.split(' ')
  const lastName = nameParts[nameParts.length - 1].toUpperCase()

  // Get other team members for carousel (exclude current member, show 4)
  const otherMembers = TEAM_MEMBERS.filter((m) => m.id !== member.id).slice(
    0,
    4
  )

  return (
    <div
      className={`${styles['team-sidebar']} ${isOpen ? styles['team-sidebar--open'] : ''}`}
    >
      {/* Background Overlay */}
      <div
        className={styles['team-sidebar__overlay']}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`${styles['team-sidebar__panel']} ${isOpen ? styles['team-sidebar__panel--open'] : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-member-name"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={styles['team-sidebar__close']}
          aria-label="Close team member details sidebar"
        >
          <X size={24} strokeWidth={2} />
        </button>

        {/* Content */}
        <div className={styles['team-sidebar__content']}>
          {/* Header Section with Profile Image and Details */}
          <div className={styles['team-sidebar__header']}>
            {/* Profile Image */}
            <div className={styles['team-sidebar__image-container']}>
              <Image
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
                className={styles['team-sidebar__image']}
                style={{
                  backgroundColor:
                    member.name === 'Rich Salvador' ? '#ffffff' : 'transparent',
                }}
              />
            </div>

            {/* Details */}
            <div className={styles['team-sidebar__details']}>
              <h2
                className={styles['team-sidebar__last-name']}
                aria-hidden="true"
              >
                {lastName}
              </h2>
              <h3
                id="sidebar-member-name"
                className={styles['team-sidebar__name']}
              >
                {member.name}
              </h3>
              <p className={styles['team-sidebar__role']}>{member.role}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles['team-sidebar__main']}>
            {/* About Me Section */}
            <section className={styles['team-sidebar__section']}>
              <h4 className={styles['team-sidebar__section-title']}>
                About Me
              </h4>
              <div className={styles['team-sidebar__bio']}>
                {Array.isArray(member.bio) ? (
                  <ul className={styles['team-sidebar__bio-list']}>
                    {member.bio.map((item, index) => (
                      <li
                        key={index}
                        className={styles['team-sidebar__bio-item']}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles['team-sidebar__bio-text']}>{member.bio}</p>
                )}
              </div>
            </section>

            {/* Top Qualifications Section */}
            <section className={styles['team-sidebar__section']}>
              <h4 className={styles['team-sidebar__section-title']}>
                Top Qualifications
              </h4>
              <ul className={styles['team-sidebar__list']}>
                {member.expertise.map((item, index) => (
                  <li key={index} className={styles['team-sidebar__list-item']}>
                    <span className={styles['team-sidebar__bullet']}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Personal Interests Section */}
            <section className={styles['team-sidebar__section']}>
              <h4 className={styles['team-sidebar__section-title']}>
                Personal Interests
              </h4>
              <ul className={styles['team-sidebar__list']}>
                {member.achievements.map((item, index) => (
                  <li key={index} className={styles['team-sidebar__list-item']}>
                    <span className={styles['team-sidebar__bullet']}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact Me Section */}
            <section className={styles['team-sidebar__section']}>
              <h4 className={styles['team-sidebar__section-title']}>
                Contact Me
              </h4>
              <div className={styles['team-sidebar__contact-buttons']}>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['team-sidebar__linkedin-button']}
                    aria-label={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin size={18} />
                    <span>Connect With Me</span>
                  </a>
                )}
                <button
                  className={styles['team-sidebar__icon-button']}
                  aria-label="Send email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0066cc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className={styles['team-sidebar__button-label']}>info@romegasolutions.com</span>
                </button>
                <button
                  className={styles['team-sidebar__icon-button']}
                  aria-label="Call"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0066cc"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className={styles['team-sidebar__button-label']}>+63 123 456 7890</span>
                </button>
              </div>
            </section>

            {/* Explore More Romega Talents Section */}
            <section
              className={`${styles['team-sidebar__section']} ${styles['team-sidebar__section--explore']}`}
            >
              <h4 className={styles['team-sidebar__section-title']}>
                Explore More Romega Talents
              </h4>
              <div className={styles['team-sidebar__carousel']}>
                {otherMembers.map((otherMember) => (
                  <button
                    key={otherMember.id}
                    className={styles['team-sidebar__carousel-item']}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        const event = new CustomEvent('selectTeamMember', { detail: otherMember });
                        window.dispatchEvent(event);
                      }, 300);
                    }}
                  >
                    <div
                      className={styles['team-sidebar__carousel-image-wrapper']}
                    >
                      <Image
                        src={otherMember.image}
                        alt={otherMember.name}
                        width={80}
                        height={80}
                        className={styles['team-sidebar__carousel-image']}
                        style={{
                          backgroundColor:
                            otherMember.name === 'Rich Salvador'
                              ? '#ffffff'
                              : 'transparent',
                        }}
                      />
                    </div>
                    <p className={styles['team-sidebar__carousel-name']}>
                      {otherMember.name}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
