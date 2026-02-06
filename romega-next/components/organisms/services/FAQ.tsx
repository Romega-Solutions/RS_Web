'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './FAQ.module.css';

const FAQ_DATA = [
  {
    id: 1,
    question: "What industries does Romega specialize in?",
    answer: "We focus on tech-driven organizations, private equity firms, and global enterprises needing leadership hires in sales, operations, finance, and technology."
  },
  {
    id: 2,
    question: "How does the Culture Fit Diagnostic work?",
    answer: "Our process assesses cultural alignment alongside technical skills. Through a streamlined workflow and data-driven insights, we help you hire leaders who thrive in your unique environment. A downloadable one-pager is also available for internal presentations."
  },
  {
    id: 3,
    question: "Can Romega manage bulk hiring across multiple companies?",
    answer: "Yes. We provide scalable RPO solutions and multi-role hiring for enterprise clients, supported by a secure client portal for real-time updates across all active searches."
  },
  {
    id: 4,
    question: "What's your average time-to-hire?",
    answer: "We fill senior roles in as little as 14 days, helping you minimize leadership gaps and reduce operational downtime."
  },
  {
    id: 5,
    question: "What technology supports your recruitment process?",
    answer: "We leverage AI-powered matching, a discreet candidate intake system, and an enterprise-grade portal keeping your hiring process fast, private, and transparent."
  },
  {
    id: 6,
    question: "How transparent is Romega's pricing?",
    answer: "We offer upfront pricing models tailored for single placements or enterprise-scale engagements. Every proposal includes service level guarantees for clarity and confidence."
  },
  {
    id: 7,
    question: "What happens after I book a call?",
    answer: "You'll be matched with a dedicated account lead who will walk you through next steps, timeline estimates, and a tailored hiring plan for your organization."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [showAll, setShowAll] = useState(false);

  const toggleFAQ = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const toggleAllFAQs = () => {
    if (showAll) {
      setOpenItems([]);
      setShowAll(false);
    } else {
      setOpenItems(FAQ_DATA.map(item => item.id));
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
          {FAQ_DATA.map((faq) => {
            const isOpen = openItems.includes(faq.id);
            return (
              <div key={faq.id} className={styles['faq__item']}>
                <div className={styles['faq__item-wrapper']}>
                  {/* Question Button */}
                  <button
                    className={styles['faq__question']}
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${faq.id}`}
                  >
                    <div className={styles['faq__question-text']}>
                      {faq.id}. {faq.question}
                    </div>
                    <div className={styles['faq__icon-wrapper']}>
                      <Image
                        src="/images/icon-accordion-arrow-right.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={`${styles['faq__icon']} ${isOpen ? styles['faq__icon--open'] : ''}`}
                      />
                    </div>
                  </button>

                  {/* Answer */}
                  {isOpen && (
                    <div id={`faq-${faq.id}`} className={styles['faq__answer']}>
                      <div className={styles['faq__answer-content']}>
                        <div className={styles['faq__answer-box']}>
                          <div className={styles['faq__answer-label']}>
                            Answer:
                          </div>
                          <div className={styles['faq__answer-text']}>
                            {faq.answer}
                          </div>
                          <div className={styles['faq__answer-icon']} aria-hidden="true">
                            <Image
                              src="/images/services/services-qna-icon.svg"
                              alt=""
                              width={112}
                              height={112}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle All Button */}
        <footer className={styles['faq__actions']}>
          <button
            className={styles['faq__toggle-all']}
            onClick={toggleAllFAQs}
            aria-label={showAll ? 'Hide all FAQ answers' : 'Show all FAQ answers'}
          >
            {showAll ? 'Hide All' : 'Show All'}
          </button>
        </footer>
      </div>
    </section>
  );
}
