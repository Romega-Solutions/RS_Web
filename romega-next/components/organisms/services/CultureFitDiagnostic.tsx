import Image from 'next/image';
import Link from 'next/link';
import styles from './CultureFitDiagnostic.module.css';

export default function CultureFitDiagnostic() {
  return (
    <section className={styles['culture-fit']} aria-labelledby="culture-fit-heading">
      {/* Background */}
      <div className={styles['culture-fit__bg']} aria-hidden="true" />

      {/* Main Content Container */}
      <div className={styles['culture-fit__container']}>
        <div className={styles['culture-fit__process']}>
          {/* Step 1: Discover */}
          <article className={`${styles['culture-fit__step']} ${styles['culture-fit__step--1']}`}>
            <Image
              src="/images/services/feature-2/rs-services-road-icon-1.png"
              alt="Discover"
              width={153}
              height={153}
              className={styles['culture-fit__step-icon']}
            />
            <div className={styles['culture-fit__step-content']}>
              <h3 className={styles['culture-fit__step-title']}>
                01 Discover
              </h3>
              <p className={styles['culture-fit__step-text']}>
                We meet with key stakeholders to confirm the role goals, company values, and day-to-day team
                dynamics. The outcome is a clear{' '}
                <span className={styles['culture-fit__step-text--highlight']}>success profile</span>
                {' '}that becomes the{' '}
                <span className={styles['culture-fit__step-text--primary']}>screening baseline</span>.
              </p>
            </div>
          </article>

          {/* Step 2: Map */}
          <article className={`${styles['culture-fit__step']} ${styles['culture-fit__step--2']}`}>
            <div className={styles['culture-fit__step-content']}>
              <h3 className={styles['culture-fit__step-title']}>
                02 Map
              </h3>
              <p className={styles['culture-fit__step-text']}>
                Your cultural values are converted into{' '}
                <span className={styles['culture-fit__step-text--primary']}>measurable behaviors</span>
                {' '}and added to a{' '}
                <span className={styles['culture-fit__step-text--highlight']}>hiring scorecard</span>.
                At the same time, we map the talent market and create a targeted sourcing plan.
              </p>
            </div>
            <Image
              src="/images/services/feature-2/rs-services-road-icon-2.png"
              alt="Map"
              width={153}
              height={153}
              className={styles['culture-fit__step-icon']}
            />
          </article>

          {/* Step 3: Validate */}
          <article className={`${styles['culture-fit__step']} ${styles['culture-fit__step--3']}`}>
            <Image
              src="/images/services/feature-2/rs-services-road-icon-3.png"
              alt="Validate"
              width={153}
              height={153}
              className={styles['culture-fit__step-icon']}
            />
            <div className={styles['culture-fit__step-content']}>
              <h3 className={styles['culture-fit__step-title']}>
                03 Validate
              </h3>
              <p className={styles['culture-fit__step-text']}>
                Short-listed candidates complete{' '}
                <span className={styles['culture-fit__step-text--primary']}>structured interviews</span>
                {' '}and optional assessments. Each person is rated against the{' '}
                <span className={styles['culture-fit__step-text--highlight']}>culture scorecard</span>
                {' '}as well as technical criteria.
              </p>
            </div>
          </article>

          {/* Step 4: Report */}
          <article className={`${styles['culture-fit__step']} ${styles['culture-fit__step--4']}`}>
            <div className={styles['culture-fit__step-content']}>
              <h3 className={styles['culture-fit__step-title']}>
                04 Report
              </h3>
              <p className={`${styles['culture-fit__step-text']} ${styles['culture-fit__step-text--cyan']}`}>
                You receive a{' '}
                <span className={styles['culture-fit__step-text--highlight']}>side-by-side report</span>
                {' '}that shows every candidate&apos;s{' '}
                <span className={styles['culture-fit__step-text--primary-600']}>culture-fit score</span>,
                key strengths, risks, and our hire / no-hire recommendation. We also outline onboarding next steps.
              </p>
            </div>
            <Image
              src="/images/services/feature-2/rs-services-road-icon-4.png"
              alt="Report"
              width={153}
              height={153}
              className={styles['culture-fit__step-icon']}
            />
          </article>

          {/* CTA Button */}
          <div className={styles['culture-fit__cta']}>
            <Link
              href="https://calendly.com/romega-solutions/discoverycall"
              className={styles['culture-fit__cta-button']}
            >
              <Image
                src="/images/icon-calendar-days.svg"
                alt=""
                width={22}
                height={22}
                className={styles['culture-fit__cta-icon']}
              />
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
