import Image from 'next/image';
import Link from 'next/link';
import styles from './ContactInfo.module.css';

interface ContactInfoProps {
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export default function ContactInfo({ onOpenTerms, onOpenPrivacy }: ContactInfoProps) {
  return (
    <div className={styles['contact-info']} role="complementary" aria-labelledby="contact-info-heading">
      {/* Background decorative elements */}
      <div className={styles['contact-info__bg']}>
        <span className={styles['contact-info__bg-circle--1']} aria-hidden="true" />
        <span className={styles['contact-info__bg-circle--2']} aria-hidden="true" />
      </div>

      <div className={styles['contact-info__content']}>
        <h2 id="contact-info-heading" className={styles['contact-info__title']}>
          Contact Information
        </h2>
        <p className={styles['contact-info__description']}>
          If you're interested in collaborating, please provide your information, and we will contact you soon. We look forward to connecting with you.
        </p>

        {/* Contact Details */}
        <div className={styles['contact-info__details']}>
          <div className={styles['contact-info__details-box']}>
            <div className={styles['contact-info__details-label']}>
              <h3>Reach us out</h3>
            </div>

            <div className={styles['contact-info__details-content']}>
              <div className={styles['contact-info__detail-item']}>
                <h4 className={styles['contact-info__detail-heading']}>EMAIL US</h4>
                <div className={styles['contact-info__detail-group']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 7L13.009 12.727C12.7039 12.9042 12.3573 12.9976 12.0045 12.9976C11.6517 12.9976 11.3051 12.9042 11 12.727L2 7M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z"
                      stroke="#5381AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <a href="mailto:info@romega-solutions.com">
                    info@romega-solutions.com
                  </a>
                </div>
              </div>

              <div className={styles['contact-info__detail-item']}>
                <h4 className={styles['contact-info__detail-heading']}>HEADQUARTERS</h4>
                <div className={styles['contact-info__detail-group']}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 14.993 7.539 20.193 9.399 21.799C9.57237 21.929 9.78329 21.9992 10 21.999M18 22V19M15 22C14.7348 22 14.4804 21.8946 14.2929 21.7071C14.1054 21.5196 14 21.2652 14 21V17C14 16.8354 14.0406 16.6734 14.1182 16.5282C14.1958 16.3831 14.3081 16.2593 14.445 16.168L17.445 14.168C17.6093 14.0584 17.8025 13.9999 18 13.9999C18.1975 13.9999 18.3907 14.0584 18.555 14.168L21.555 16.168C21.6919 16.2593 21.8042 16.3831 21.8818 16.5282C21.9594 16.6734 22 16.8354 22 17V21C22 21.2652 21.8946 21.5196 21.7071 21.7071C21.5196 21.8946 21.2652 22 21 22H15ZM13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z"
                      stroke="#5381AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <a 
                    href="https://www.google.com/maps?q=222+Pacific+Coast+Hwy,+%2310,+El+Segundo,+CA+90245"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    222 Pacific Coast Hwy, #10 in El Segundo, CA 90245
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className={styles['contact-info__social']}>
          <span className={styles['contact-info__social-label']}>Follow us on</span>
          <div className={styles['contact-info__social-links']}>
            <Link
              href="https://www.linkedin.com/company/romega-solutions"
              target="_blank"
              rel="noopener"
              className={styles['contact-info__social-link']}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M18.6562 0.375H2.34375C1.08984 0.375 0.078125 1.38672 0.078125 2.64062V18.9531C0.078125 20.207 1.08984 21.2188 2.34375 21.2188H18.6562C19.9102 21.2188 20.9219 20.207 20.9219 18.9531V2.64062C20.9219 1.38672 19.9102 0.375 18.6562 0.375ZM6.53906 18.1172H3.44531V8.24219H6.53906V18.1172ZM4.99219 6.88672C3.97266 6.88672 3.14844 6.0625 3.14844 5.04297C3.14844 4.02344 3.97266 3.19922 4.99219 3.19922C6.01172 3.19922 6.83594 4.02344 6.83594 5.04297C6.83594 6.0625 6.01172 6.88672 4.99219 6.88672ZM17.8203 18.1172H14.7266V13.3125C14.7266 12.1172 14.707 10.582 13.0547 10.582C11.3828 10.582 11.1328 11.8945 11.1328 13.2266V18.1172H8.03906V8.24219H11.0156V9.63672H11.0547C11.4727 8.84766 12.5312 8.01562 14.1055 8.01562C17.2383 8.01562 17.8203 10.1328 17.8203 12.8828V18.1172Z" fill="currentColor"/>
              </svg>
              <span>LINKEDIN</span>
            </Link>
            <Link
              href="https://www.facebook.com/romegasolutions"
              target="_blank"
              rel="noopener"
              className={styles['contact-info__social-link']}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                <path d="M20.9219 10.7969C20.9219 5.17969 16.3672 0.625 10.75 0.625C5.13281 0.625 0.578125 5.17969 0.578125 10.7969C0.578125 15.8125 4.20312 19.9844 8.98438 20.8281V13.7188H6.46094V10.7969H8.98438V8.58594C8.98438 6.10156 10.4766 4.72656 12.7461 4.72656C13.8438 4.72656 14.9922 4.92188 14.9922 4.92188V7.38281H13.7266C12.4805 7.38281 12.0625 8.16406 12.0625 8.96484V10.7969H14.875L14.4023 13.7188H12.0625V20.8281C16.8438 19.9844 20.9219 15.8125 20.9219 10.7969Z" fill="currentColor"/>
              </svg>
              <span>FACEBOOK</span>
            </Link>
          </div>
        </div>

        {/* Bottom Section - Mobile/Tablet */}
        <div className={styles['contact-info__footer']}>
          <div className={styles['contact-info__footer-divider']} />
          <div className={styles['contact-info__footer-content']}>
            <div className="flex-1" />
            <p className={styles['contact-info__footer-text']}>
              © 2025 Romega Solutions. All rights reserved
            </p>
            <div className={styles['contact-info__footer-links']}>
              <button
                type="button"
                className={styles['contact-info__footer-link']}
                aria-label="Open Privacy Policy"
                onClick={onOpenPrivacy}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                className={styles['contact-info__footer-link']}
                aria-label="Open Terms of Service"
                onClick={onOpenTerms}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
