'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './CareersHero.module.css';

export default function CareersHero() {
  const [updatedDate, setUpdatedDate] = useState('');

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setUpdatedDate(date);
  }, []);

  const handleOpenJobsSidebar = () => {
    // This will trigger the sidebar from the parent component
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('openJobsSidebar');
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      className={styles['careers-hero']}
      aria-labelledby="leadership-opportunities-heading"
    >
      {/* Background image */}
      <Image
        src="/images/careers/bg-top.png"
        alt=""
        fill
        sizes="100vw"
        className={styles['careers-hero__bg-pattern']}
        loading="eager"
        priority
        aria-hidden="true"
      />

      <div className={styles['careers-hero__container']}>
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <h1
            id="leadership-opportunities-heading"
            className="text-3xl sm:text-4xl lg:text-[40px] text-merriweather font-bold text-[var(--rs-primary-600)] mb-4"
          >
            Explore Leadership Opportunities
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--rs-neutral-600)] max-w-6xl mx-auto">
            Find your next impactful role or join our talent network for future
            opportunities always with discretion.
          </p>
          <p className="text-sm text-[var(--rs-neutral-400)] mt-2">
            Updated: <span>{updatedDate}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-4 justify-center mb-8 px-4">
          {/* Stay Connected Button */}
          <Link
            href="https://www.linkedin.com/company/romega-solutions/jobs/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[590px] mx-auto lg:mx-0"
          >
            <button className="w-full bg-[var(--rs-neutral-100)] text-[var(--rs-neutral-600)] px-6 sm:px-8 py-3 rounded-lg font-semibold text-[18px] sm:text-[20px] lg:text-[22px] border-2 border-[var(--rs-neutral-400)] hover:bg-[var(--rs-neutral-200)] transition flex items-center justify-center gap-2">
              <Image
                src="/images/careers/human.png"
                alt=""
                width={27.5}
                height={27.5}
                className="w-[24px] h-[24px] sm:w-[27.5px] sm:h-[27.5px]"
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className="whitespace-nowrap">Stay Connected for Future Roles</span>
            </button>
          </Link>

          {/* View Open Roles Button */}
          <div className="w-full max-w-[590px] mx-auto lg:mx-0">
            <button
              onClick={handleOpenJobsSidebar}
              className="w-full bg-[var(--rs-primary-500)] text-[var(--rs-primary-100)] px-6 sm:px-8 py-3 rounded-lg font-semibold text-[18px] sm:text-[20px] lg:text-[22px] border-2 border-[var(--rs-primary-600)] hover:bg-[var(--rs-primary-600)] transition flex items-center justify-center gap-2"
            >
              <Image
                src="/images/careers/bag-white.svg"
                alt=""
                width={27.5}
                height={27.5}
                className="w-[24px] h-[24px] sm:w-[27.5px] sm:h-[27.5px]"
                style={{ width: 'auto', height: 'auto' }}
              />
              <span className="whitespace-nowrap">View Open Roles</span>
            </button>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What We're Looking For */}
          <div>
            <h3 className="text-[28px] items-center font-bold text-[var(--rs-primary-600)] mb-6 text-merriweather">
              What We&apos;re Looking For
            </h3>
            <div className="space-y-6 text-[20px]">
              <div className="flex items-start gap-2 items-center">
                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center mt-1">
                  <Image
                    src="/images/careers/search-check.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                    aria-hidden="true"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <p className="text-[var(--rs-neutral-900)] leading-relaxed">
                  We are looking for leaders who think big, move fast, and
                  deliver results that matter.
                </p>
              </div>
              <div className="flex items-start gap-2 items-center">
                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center mt-1">
                  <Image
                    src="/images/careers/search-check.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                    aria-hidden="true"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <p className="text-[var(--rs-neutral-900)] leading-relaxed">
                  If you thrive in high-growth environments, enjoy solving
                  complex challenges, and bring bold solutions to the table, we
                  want to meet you.
                </p>
              </div>
              <div className="flex items-start gap-2 items-center">
                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center mt-1">
                  <Image
                    src="/images/careers/search-check.svg"
                    alt=""
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                    aria-hidden="true"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <p className="text-[var(--rs-neutral-900)] leading-relaxed">
                  We value innovators who take charge of change and inspire
                  teams to do their best work.
                </p>
              </div>
            </div>
          </div>

          {/* What We Love */}
          <div className="text-[20px]">
            <h3 className="text-[28px] font-bold text-[var(--rs-primary-600)] mb-6 text-merriweather">
              What We Love
            </h3>
            <p className="text-[var(--rs-neutral-900)] mb-6 leading-relaxed">
              We love helping exceptional talent build careers that create real
              impact. <span className="font-bold">This drives us to:</span>
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 items-center">
                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center mt-1">
                  <Image
                    src="/images/careers/heart-handshake.svg"
                    alt=""
                    width={40}
                    height={40}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <p className="text-[var(--rs-neutral-900)] leading-relaxed">
                  Connect visionary leaders with world-changing companies
                </p>
              </div>
              <div className="flex items-start gap-2 items-center">
                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center mt-1">
                  <Image
                    src="/images/careers/heart-handshake.svg"
                    alt=""
                    width={40}
                    height={40}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <p className="text-[var(--rs-neutral-900)] leading-relaxed">
                  Support teams that deliver innovation on a global scale
                </p>
              </div>
              <div className="flex items-start gap-2 items-center">
                <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full flex items-center justify-center mt-1">
                  <Image
                    src="/images/careers/heart-handshake.svg"
                    alt=""
                    width={40}
                    height={40}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <p className="text-[var(--rs-neutral-900)] leading-relaxed">
                  Celebrate success stories that inspire others to lead with
                  purpose
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
