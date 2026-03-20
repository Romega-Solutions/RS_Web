'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PrivacyPolicyContent from './PrivacyPolicyContent';

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
            Applicant Data Privacy and Consent Policy
          </h3>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
          <PrivacyPolicyContent showCanonicalLink />
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <Link
            href="/privacy"
            className="px-6 py-2.5 text-sm font-semibold text-blue-700 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center"
            onClick={onClose}
            style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
          >
            Open Full Policy Page
          </Link>
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onClose}
            style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
