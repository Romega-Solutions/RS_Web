'use client';

import { useEffect } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Manage body overflow
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 animate-fadeIn" 
      aria-labelledby="privacy-modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl transform transition-all animate-slideUp overflow-hidden">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-white px-6 pt-8 pb-4 border-b border-gray-200">
          <h3 
            className="text-2xl font-bold text-gray-900" 
            id="privacy-modal-title"
            style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}
          >
            Privacy Policy
          </h3>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
            <div className="prose prose-sm max-w-none">
              <p className="text-lg text-gray-800 font-medium mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                At Romega Solutions, your privacy matters to us. Whether you&apos;re
                a client or a job seeker, we only collect and use your
                information to connect talent with opportunities and deliver the
                services you expect.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                What we collect
              </h4>
              <ul className="list-disc pl-6 text-gray-700 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                <li className="mb-2">
                  Basic contact details (name, email, phone, etc.) when you fill
                  out a form, subscribe, or apply for a role.
                </li>
                <li className="mb-2">
                  Professional information such as your resume or work history
                  (for applicants).
                </li>
                <li className="mb-2">
                  Website usage data (via tools like Google Analytics) to
                  improve your browsing experience.
                </li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                How we use your information
              </h4>
              <ul className="list-disc pl-6 text-gray-700 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                <li className="mb-2">
                  To connect candidates with career opportunities and support
                  our clients&apos; hiring needs.
                </li>
                <li className="mb-2">
                  To communicate updates, respond to inquiries, and share
                  relevant opportunities.
                </li>
                <li className="mb-2">To improve our website and services.</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                How we protect your information
              </h4>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                We use security measures and trusted third-party providers to
                keep your data safe. We never sell your personal information.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                Sharing information
              </h4>
              <p className="text-gray-700 mb-3" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                We may share your details only with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li className="mb-2">
                  Our trusted service providers (e.g., analytics or applicant
                  systems).
                </li>
                <li className="mb-2">
                  Clients, but only if you apply or agree to be considered for a
                  role.
                </li>
                <li className="mb-2">When required by law.</li>
              </ul>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                Your choice
              </h4>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                You can visit our website without sharing personal data. You may
                also unsubscribe from communications at any time.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                Updates
              </h4>
              <p className="text-gray-700 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                This Privacy Policy was last updated on August 27, 2025. Any
                changes will be posted on our website.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
                Contact us
              </h4>
              <p className="text-gray-700 mb-2" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                Have questions about how we handle your data? Reach out at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>📧 info@romega-solutions.com</p>
                <p className="text-gray-700 mb-2" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>🌐 www.romega-solutions.com</p>
                <p className="text-gray-700" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
                  🏢 222 Pacific Coast Hwy, #10, El Segundo, CA 90245
                </p>
              </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onClose}
            style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
          >
            Close
          </button>
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            onClick={onClose}
            style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
