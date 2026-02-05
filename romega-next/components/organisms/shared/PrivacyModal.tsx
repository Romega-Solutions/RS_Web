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
      className="fixed inset-0 z-[9999] overflow-y-auto animate-fadeIn" 
      aria-labelledby="privacy-modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Background overlay */}
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
          {/* Header */}
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-2xl font-bold leading-6 text-gray-900" id="privacy-modal-title">
                Privacy Policy
              </h3>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[70vh] overflow-y-auto px-4 pb-4 sm:px-6">
            <div className="prose prose-sm max-w-none">
              <p className="text-lg text-gray-800 font-medium mb-6">
                At Romega Solutions, your privacy matters to us. Whether you&apos;re
                a client or a job seeker, we only collect and use your
                information to connect talent with opportunities and deliver the
                services you expect.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                What we collect
              </h4>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
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

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                How we use your information
              </h4>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
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

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                How we protect your information
              </h4>
              <p className="text-gray-700 mb-6">
                We use security measures and trusted third-party providers to
                keep your data safe. We never sell your personal information.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Sharing information
              </h4>
              <p className="text-gray-700 mb-3">
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

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Your choice
              </h4>
              <p className="text-gray-700 mb-6">
                You can visit our website without sharing personal data. You may
                also unsubscribe from communications at any time.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Updates
              </h4>
              <p className="text-gray-700 mb-6">
                This Privacy Policy was last updated on August 27, 2025. Any
                changes will be posted on our website.
              </p>

              <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Contact us
              </h4>
              <p className="text-gray-700 mb-2">
                Have questions about how we handle your data? Reach out at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">📧 info@romega-solutions.com</p>
                <p className="text-gray-700 mb-2">🌐 www.romega-solutions.com</p>
                <p className="text-gray-700">
                  🏢 222 Pacific Coast Hwy, #10, El Segundo, CA 90245
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
              onClick={onClose}
            >
              I Understand
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .prose h4 {
          color: #1f2937;
          font-weight: 600;
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose p {
          margin-bottom: 1rem;
          line-height: 1.625;
        }
        
        .prose ul {
          margin-bottom: 1.5rem;
        }
        
        .prose li {
          line-height: 1.625;
        }
      `}</style>
    </div>
  );
}
