'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ContactForm.module.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  company: string;
  phone: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    company: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/[\+]?[0-9\s\-\(\)]{10,}/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement EmailJS or your preferred email service
      // For now, simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        company: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={styles['contact-form']}>
      <form onSubmit={handleSubmit} className={styles['contact-form__form']} noValidate>
        {/* Honeypot field for bot detection */}
        <input type="text" name="botfield" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

        {/* Name Fields Row */}
        <div className={styles['contact-form__row']}>
          <div className={styles['contact-form__field']}>
            <label htmlFor="firstName" className={styles['contact-form__label']}>
              First Name <span className={styles['contact-form__required']}>*</span>
            </label>
            <input
              type="text"
              placeholder="John"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={styles['contact-form__input']}
              aria-describedby="firstName-error"
            />
            {errors.firstName && (
              <div id="firstName-error" className={styles['contact-form__error']} role="alert">
                {errors.firstName}
              </div>
            )}
          </div>
          <div className={styles['contact-form__field']}>
            <label htmlFor="lastName" className={styles['contact-form__label']}>
              Last Name <span className={styles['contact-form__required']}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              className={styles['contact-form__input']}
              aria-describedby="lastName-error"
            />
            {errors.lastName && (
              <div id="lastName-error" className={styles['contact-form__error']} role="alert">
                {errors.lastName}
              </div>
            )}
          </div>
        </div>

        {/* Email and Subject Row */}
        <div className={styles['contact-form__row']}>
          <div className={styles['contact-form__field']}>
            <label htmlFor="email" className={styles['contact-form__label']}>
              Email <span className={styles['contact-form__required']}>*</span>
            </label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles['contact-form__input']}
              aria-describedby="email-error"
            />
            {errors.email && (
              <div id="email-error" className={styles['contact-form__error']} role="alert">
                {errors.email}
              </div>
            )}
          </div>
          <div className={styles['contact-form__field']}>
            <label htmlFor="subject" className={styles['contact-form__label']}>
              Select Subject <span className={styles['contact-form__required']}>*</span>
            </label>
            <div className={styles['contact-form__select-wrapper']}>
              <div className={styles['contact-form__select-icon--left']} aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="8" r="3" fill="currentColor" />
                </svg>
              </div>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles['contact-form__select']}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="business">Business Partnership</option>
                <option value="support">Technical Support</option>
                <option value="careers">Career Opportunities</option>
              </select>
              {errors.subject && (
                <div id="subject-error" className={styles['contact-form__error']} role="alert">
                  {errors.subject}
                </div>
              )}
              <div className={styles['contact-form__select-icon--right']} aria-hidden="true">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details and Contact Number */}
        <div className={styles['contact-form__row']}>
          <div className={styles['contact-form__field']}>
            <label htmlFor="company" className={styles['contact-form__label']}>
              Company Name
              <span className={styles['contact-form__optional']}>(Optional)</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              placeholder="Your company name"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              className={styles['contact-form__input']}
              aria-describedby="company-hint"
            />
            <div id="company-hint" className="sr-only">
              Optional field for your company or organization name
            </div>
          </div>
          <div className={styles['contact-form__field']}>
            <label htmlFor="phone" className={styles['contact-form__label']}>
              Phone Number <span className={styles['contact-form__required']}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={styles['contact-form__input']}
              aria-describedby="phone-error phone-hint"
              pattern="[\+]?[0-9\s\-\(\)]{10,}"
            />
            {errors.phone && (
              <div id="phone-error" className={styles['contact-form__error']} role="alert">
                {errors.phone}
              </div>
            )}
            <div id="phone-hint" className="sr-only">
              Enter your phone number including country code if international
            </div>
          </div>
        </div>

        {/* Message Field */}
        <div className={styles['contact-form__field--message']}>
          <label htmlFor="message" className={styles['contact-form__label--floating']}>
            Message <span className={styles['contact-form__required']}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            className={styles['contact-form__textarea']}
            aria-describedby="message-error"
          />
          {errors.message && (
            <div id="message-error" className={styles['contact-form__error']} role="alert">
              {errors.message}
            </div>
          )}
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className={styles['contact-form__success']} role="status">
            Thank you! Your message has been sent successfully.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className={styles['contact-form__error-message']} role="alert">
            Sorry, there was an error sending your message. Please try again.
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles['contact-form__actions']}>
          {/* Send Message Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles['contact-form__submit']}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Image
              src="/images/icon-send.svg"
              alt=""
              width={20}
              height={20}
              style={{ width: 'auto' }}
              aria-hidden="true"
            />
          </button>

          {/* or line - Mobile only */}
          <div className={styles['contact-form__divider']}>
            <div className={styles['contact-form__divider-line']} />
            <span className={styles['contact-form__divider-text']}>or</span>
            <div className={styles['contact-form__divider-line']} />
          </div>

          {/* Schedule Meeting Button */}
          <div className={styles['contact-form__schedule']}>
            <Link
              href="https://calendly.com/romega-solutions/discoverycall"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['contact-form__schedule-button']}
            >
              <div className={styles['contact-form__schedule-content']}>
                <Image
                  src="/images/icon-calendar-days.svg"
                  alt=""
                  width={20}
                  height={20}
                />
                <span>Schedule a Meeting</span>
              </div>
            </Link>
            <span className={styles['contact-form__schedule-text']}>via Calendly</span>
          </div>
        </div>
      </form>

      {/* Background Image */}
      <div className={styles['contact-form__bg']} aria-hidden="true">
        <Image
          src="/images/contact/bg-letter-send.png"
          alt=""
          width={300}
          height={300}
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  );
}
