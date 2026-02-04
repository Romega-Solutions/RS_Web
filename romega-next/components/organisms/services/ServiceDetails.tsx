'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ServiceDetails.module.css';

const SERVICES_DATA = [
  {
    id: 'rpo',
    icon: '/images/services/feature-1/accordion-icon-1.svg',
    title: 'RPO:',
    subtitle: 'Executive Recruitment Program',
    description: 'Romega Solutions delivers a dedicated Recruitment-Process-Outsourcing program that identifies, evaluates, and places senior artificial-intelligence and machine-learning leaders.',
    problem: {
      title: 'Your Problem:',
      text: 'Vacant executive AI roles delay product timelines and erode competitive advantage.',
      highlights: ['delay product timelines'],
    },
    solution: {
      title: 'Our Solution:',
      text: 'Our RPO team maps the global AI talent market, applies a culture-fit diagnostic, and presents an evaluated shortlist within a week.',
      highlights: ['maps the global AI talent market', 'presents an evaluated shortlist'],
    },
    result: {
      title: 'Result:',
      text: 'Critical positions are filled in roughly 2 weeks, with a 12-months retention rate above 95%.',
      highlights: ['roughly 2 weeks', '12-months retention rate above 95%'],
    },
  },
  {
    id: 'bpo',
    icon: '/images/services/feature-1/accordion-icon-2.svg',
    title: 'BPO:',
    subtitle: 'Scalable Support for Tech-Driven Teams',
    description: 'Romega Solutions supplies business-process outsourcing teams that manage customer support and back-office work for technology companies.',
    problem: {
      title: 'Your Problem:',
      text: 'Internal staff spend excessive time on non-core operations, driving up fixed costs.',
      highlights: ['driving up fixed costs'],
    },
    solution: {
      title: 'Our Solution:',
      text: 'Flexible BPO teams operate around the clock on your systems and follow ISO quality controls.',
      highlights: ['Flexible BPO', 'follow ISO quality controls'],
    },
    result: {
      title: 'Result:',
      text: 'Operational expenses drop by up to 30% and customer satisfaction improves.',
      highlights: ['drop by up to 30%', 'satisfaction improves'],
    },
  },
  {
    id: 'strategic-hr',
    icon: '/images/services/feature-1/accordion-icon-3.svg',
    title: 'Strategic HR:',
    subtitle: 'Leadership Growth',
    description: 'Senior HR advisors align people strategy with business goals, covering org design, headcount planning, and culture programs.',
    problem: {
      title: 'Your Problem:',
      text: 'Growth and change expose HR gaps and hurt results.',
      highlights: ['Growth and change'],
    },
    solution: {
      title: 'Our Solution:',
      text: 'Review current practice, deliver action plan, guide rollout.',
      highlights: ['Review', 'deliver', 'guide'],
    },
    result: {
      title: 'Result:',
      text: 'Lower turnover and stronger engagement within 1 quarter.',
      highlights: ['stronger engagement'],
    },
  },
  {
    id: 'quality-hire',
    icon: '/images/services/feature-1/accordion-icon-4.svg',
    title: 'Quality Hire:',
    subtitle: 'Executive Search',
    description: 'Focused searches secure high-grade leaders in finance, ops, sales, and product through data checks and deep interviews.',
    problem: {
      title: 'Your Problem:',
      text: 'Traditional searches take months and often yield misaligned leaders.',
      highlights: ['take months'],
    },
    solution: {
      title: 'Our Solution:',
      text: 'We use data analytics and structured interviews to find who fit culture and goals.',
      highlights: ['We use data analytics', 'structured interviews'],
    },
    result: {
      title: 'Result:',
      text: 'Positions fill in about 4 weeks. New leaders reach full productivity faster and gain higher trust of stakeholders.',
      highlights: ['reach full productivity faster', 'higher trust of stakeholders'],
    },
  },
  {
    id: 'mentoring',
    icon: '/images/services/feature-1/accordion-icon-5.svg',
    title: 'Mentoring:',
    subtitle: 'Leadership Growth',
    description: 'Seasoned technology executives provide structured one-to-one coaching for newly promoted managers.',
    problem: {
      title: 'Your Problem:',
      text: 'New managers struggle with strategy and people issues, missing early KPIs.',
      highlights: ['missing early KPIs'],
    },
    solution: {
      title: 'Our Solution:',
      text: 'Veteran executives run monthly 1-on-1 coaching sessions, share playbooks, and track progress.',
      highlights: ['monthly 1-on-1 coaching sessions'],
    },
    result: {
      title: 'Result:',
      text: 'Leaders hit targets twice as fast. Team turnover drops within the first quarter.',
      highlights: ['hit targets twice as fast'],
    },
  },
  {
    id: 'teaching',
    icon: '/images/services/feature-1/accordion-icon-6.svg',
    title: 'Teaching:',
    subtitle: 'Upskill Your Organization',
    description: 'Instructor-led AI and machine-learning workshops integrate your live codebase and data to ensure practical learning.',
    problem: {
      title: 'Your Problem:',
      text: 'Standard online courses feel abstract and skills rarely reach production.',
      highlights: ['skills rarely reach production'],
    },
    solution: {
      title: 'Our Solution:',
      text: 'Live AI and ML workshops use your real code and data, plus 30 days of follow-up support.',
      highlights: ['Live AI and ML workshops'],
    },
    result: {
      title: 'Result:',
      text: 'Teams ship AI features up to 4 weeks faster. Staff earn certificates that prove new capability.',
      highlights: ['ship AI features up to 4 weeks faster'],
    },
  },
];

export default function ServiceDetails() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  const renderTextWithHighlights = (text: string, highlights: string[]) => {
    const parts: Array<{ text: string; isHighlight: boolean }> = [];
    let remainingText = text;
    
    highlights.forEach((highlight) => {
      const index = remainingText.indexOf(highlight);
      if (index !== -1) {
        if (index > 0) {
          parts.push({ text: remainingText.substring(0, index), isHighlight: false });
        }
        parts.push({ text: highlight, isHighlight: true });
        remainingText = remainingText.substring(index + highlight.length);
      }
    });
    
    if (remainingText) {
      parts.push({ text: remainingText, isHighlight: false });
    }

    return parts.map((part, index) =>
      part.isHighlight ? (
        <span key={index} className={styles['service-details__highlight']}>
          {part.text}
        </span>
      ) : (
        part.text
      )
    );
  };

  return (
    <section className={styles['service-details']} aria-labelledby="other-services-heading">
      <h2 id="other-services-heading" className="sr-only">
        Detailed Service Information
      </h2>

      {SERVICES_DATA.map((service, index) => (
        <div
          key={service.id}
          className={`${styles['service-details__item']} ${
            index === 0 ? styles['service-details__item--first'] : ''
          } ${index === SERVICES_DATA.length - 1 ? styles['service-details__item--last'] : ''}`}
        >
          {/* Header */}
          <button
            className={styles['service-details__header']}
            onClick={() => toggleService(service.id)}
            aria-expanded={expandedService === service.id}
            aria-controls={`${service.id}-detail`}
          >
            <div className={styles['service-details__header-content']}>
              <div className={styles['service-details__header-title']}>
                <Image src={service.icon} alt={`${service.subtitle} Icon`} width={20} height={20} />
                <h3 className={styles['service-details__title']}>
                  <span className={styles['service-details__title-prefix']}>{service.title}</span> {service.subtitle}
                </h3>
              </div>
              <Image
                src="/images/icon-accordion-arrow-down.svg"
                alt="Arrow Down"
                width={20}
                height={20}
                className={`${styles['service-details__arrow']} ${
                  expandedService === service.id ? styles['service-details__arrow--expanded'] : ''
                }`}
              />
            </div>
          </button>

          {/* Expandable Content */}
          <div
            id={`${service.id}-detail`}
            className={`${styles['service-details__content']} ${
              expandedService === service.id ? styles['service-details__content--expanded'] : ''
            }`}
          >
            <div className={styles['service-details__content-inner']}>
              <p className={styles['service-details__description']}>{service.description}</p>

              <div className={styles['service-details__grid']}>
                {/* Problem */}
                <div className={`${styles['service-details__box']} ${styles['service-details__box--problem']}`}>
                  <div className={styles['service-details__box-bg']}>
                    <Image
                      src="/images/services/feature-1/accordion-bg-1.svg"
                      alt=""
                      width={100}
                      height={100}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles['service-details__box-content']}>
                    <h4 className={styles['service-details__box-title']}>{service.problem.title}</h4>
                    <p className={styles['service-details__box-text']}>
                      {renderTextWithHighlights(service.problem.text, service.problem.highlights)}
                    </p>
                  </div>
                </div>

                {/* Solution */}
                <div className={`${styles['service-details__box']} ${styles['service-details__box--solution']}`}>
                  <div className={styles['service-details__box-bg']}>
                    <Image
                      src="/images/services/feature-1/accordion-bg-2.svg"
                      alt=""
                      width={100}
                      height={100}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles['service-details__box-content']}>
                    <h4 className={styles['service-details__box-title']}>{service.solution.title}</h4>
                    <p className={styles['service-details__box-text']}>
                      {renderTextWithHighlights(service.solution.text, service.solution.highlights)}
                    </p>
                  </div>
                </div>

                {/* Result */}
                <div className={`${styles['service-details__box']} ${styles['service-details__box--result']}`}>
                  <div className={styles['service-details__box-bg']}>
                    <Image
                      src="/images/services/feature-1/accordion-bg-3.svg"
                      alt=""
                      width={100}
                      height={100}
                      aria-hidden="true"
                    />
                  </div>
                  <div className={styles['service-details__box-content']}>
                    <h4 className={styles['service-details__box-title']}>{service.result.title}</h4>
                    <p className={styles['service-details__box-text']}>
                      {renderTextWithHighlights(service.result.text, service.result.highlights)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
