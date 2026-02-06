'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import styles from './ServicesFAQ.module.css';

const FAQ_DATA = [
  {
    id: 'faq-1',
    question: 'How long does the typical RPO engagement last?',
    answer: 'Our RPO engagements are flexible and can range from 3 months to multi-year partnerships. We design each program based on your hiring volume, timeline, and business needs. Many clients start with a pilot program to test the waters before committing to a longer-term partnership.',
  },
  {
    id: 'faq-2',
    question: 'What makes your Culture Fit Diagnostic different from other assessments?',
    answer: "Unlike generic personality tests, our Culture Fit Diagnostic is customized to your specific company culture. We don't just measure traits—we measure alignment with your values, behaviors, and work environment. This ensures every hire not only has the skills but also fits seamlessly into your team.",
  },
  {
    id: 'faq-3',
    question: 'Can you help us hire for remote or hybrid roles?',
    answer: 'Absolutely! We specialize in remote and hybrid hiring. Our global talent network allows us to source top candidates regardless of location. We also assess candidates for traits critical to remote success, such as self-motivation, communication skills, and adaptability.',
  },
  {
    id: 'faq-4',
    question: 'How do you measure the success of your services?',
    answer: 'We track key metrics such as time-to-fill, cost-per-hire, quality of hire, and retention rates. Each engagement includes regular reporting and analytics, so you can see the impact of our services in real-time. We also conduct quarterly business reviews to ensure alignment with your goals.',
  },
  {
    id: 'faq-5',
    question: 'What industries do you serve?',
    answer: 'We work across a wide range of industries, including technology, finance, healthcare, manufacturing, and professional services. Our team has deep expertise in executive search, technical recruiting, and specialized roles. No matter your industry, we can tailor our services to meet your needs.',
  },
  {
    id: 'faq-6',
    question: 'Do you offer support after a candidate is hired?',
    answer: 'Yes! We provide post-hire support to ensure a smooth onboarding process. This includes check-ins with both the candidate and your team during the first 90 days. If any issues arise, we work with you to address them quickly. Our goal is long-term success, not just filling a seat.',
  },
  {
    id: 'faq-7',
    question: 'How do your pricing models work?',
    answer: "We offer flexible pricing models to fit your budget and hiring needs. Options include fixed-fee retainers, per-hire fees, or monthly subscriptions for ongoing support. During our discovery call, we'll discuss your requirements and recommend the best pricing structure for your situation.",
  },
];

export default function ServicesFAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const toggleAllFAQs = () => {
    if (showAll) {
      setExpandedFAQ(null);
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  return (
    <section className={styles['faq']} aria-labelledby="faq-heading">
      <div className={styles['faq__container']}>
        {/* Header */}
        <header className={styles['faq__header']}>
          <h2 id="faq-heading" className={styles['faq__title']}>
            HR & Talent Acquisition FAQ
          </h2>
          <p className={styles['faq__subtitle']}>
            Here are some answers for you that is clear, concise, and designed for HR leaders seeking faster, smarter executive hiring.
          </p>
        </header>

        {/* FAQ List */}
        <div className={styles['faq__list']} role="list">
          {FAQ_DATA.map((faq) => (
            <div key={faq.id} className={styles['faq__item']}>
              <div className={styles['faq__item-wrapper']}>
                <button
                  className={styles['faq__question-button']}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={expandedFAQ === faq.id || showAll}
                  aria-controls={`${faq.id}-answer`}
                >
                  <span className={styles['faq__question']}>
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={`${styles['faq__icon']} ${
                      expandedFAQ === faq.id || showAll ? styles['faq__icon--expanded'] : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {(expandedFAQ === faq.id || showAll) && (
                  <div
                    id={`${faq.id}-answer`}
                    className={styles['faq__answer']}
                  >
                    <p className={styles['faq__answer-text']}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle All Button */}
        <footer className={styles['faq__actions']}>
          <button
            className={styles['faq__toggle-button']}
            onClick={toggleAllFAQs}
            aria-label={showAll ? 'Collapse all FAQ answers' : 'Show all FAQ answers'}
          >
            {showAll ? 'Collapse All' : 'Show All'}
          </button>
        </footer>
      </div>
    </section>
  );
}
