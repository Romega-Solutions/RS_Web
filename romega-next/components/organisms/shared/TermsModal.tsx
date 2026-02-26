'use client';

import { useEffect } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
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
      aria-labelledby="modal-title"
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
            id="modal-title"
            style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}
          >
            Terms & Conditions
          </h3>
        </div>

        {/* Content */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
              Last Updated: August 27, 2025
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
              AGREEMENT TO TERMS
            </h4>
            <p className="text-gray-700 mb-4" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) are a legally binding
              agreement between you (&ldquo;you&rdquo; or &ldquo;user&rdquo;), whether personally or
              on behalf of an organization, and Romega Solutions (&ldquo;Company,&rdquo;
              &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), governing your access to and use of
              www.romega-solutions.com and any related platforms, services, or
              tools (collectively, the &ldquo;Site&rdquo;).
            </p>
            <p className="text-gray-700 mb-4">
              By accessing or using our Site, submitting your information, or
              engaging our services, you agree to be bound by these Terms. If
              you do not agree, you must immediately stop using the Site.
            </p>
            <p className="text-gray-700 mb-6">
              We may update these Terms at any time, and the updated version
              will be indicated by a "Last Updated" date. Your continued use
              of the Site after changes are posted constitutes acceptance of
              those changes.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3" style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}>
              USE OF THE SITE
            </h4>
            <ul className="list-disc pl-6 text-gray-700 mb-6" style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}>
              <li className="mb-2">
                You must be at least 18 years old to use this Site.
              </li>
              <li className="mb-2">
                You agree to use the Site only for lawful purposes and in
                compliance with all applicable laws.
              </li>
              <li className="mb-2">
                You agree not to use the Site in a way that may damage,
                disable, overburden, or impair our systems or interfere with
                others&apos; use.
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              INFORMATION YOU PROVIDE
            </h4>
            <p className="text-gray-700 mb-3">
              By submitting information (such as a resume, job application, or
              business inquiry) you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li className="mb-2">
                The information is accurate, current, and complete.
              </li>
              <li className="mb-2">
                You have the right to share such information with us.
              </li>
              <li className="mb-2">
                You understand your information will be handled according to
                our Privacy Policy.
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              We are not responsible for verifying the accuracy of any
              information submitted by users.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              CLIENT SERVICES
            </h4>
            <p className="text-gray-700 mb-6">
              Clients engaging Romega Solutions for staffing, recruiting, or
              consulting services may be required to enter into separate
              agreements outlining scope, fees, and terms. Those agreements
              shall take precedence over these Terms in the event of conflict.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              INTELLECTUAL PROPERTY
            </h4>
            <p className="text-gray-700 mb-6">
              All content on the Site, including text, graphics, logos, and
              software, is the property of Romega Solutions or its licensors
              and is protected by copyright and trademark laws. You may not
              copy, reproduce, or distribute any content without prior written
              permission.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              THIRD-PARTY LINKS & SERVICES
            </h4>
            <p className="text-gray-700 mb-6">
              The Site may contain links to third-party websites. We are not
              responsible for the content, policies, or practices of any third
              parties. Accessing these sites is at your own risk.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              DISCLAIMERS
            </h4>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li className="mb-2">
                The Site is provided "as is" and "as available." We make no
                warranties, express or implied, about the accuracy,
                reliability, or availability of the Site or its content.
              </li>
              <li className="mb-2">
                Romega Solutions does not guarantee job placement for
                candidates or specific results for clients.
              </li>
              <li className="mb-2">
                We are not liable for any damages resulting from your use of
                the Site or services, including lost profits, data, or
                business opportunities.
              </li>
            </ul>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              INDEMNIFICATION
            </h4>
            <p className="text-gray-700 mb-6">
              You agree to defend, indemnify, and hold harmless Romega
              Solutions, its affiliates, employees, and partners from any
              claims, damages, or expenses arising out of your use of the
              Site, your submissions, or your violation of these Terms.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              GOVERNING LAW & DISPUTE RESOLUTION
            </h4>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of the State of California,
              without regard to conflict of laws principles.
            </p>
            <p className="text-gray-700 mb-6">
              Disputes shall first be attempted to be resolved informally. If
              unresolved, disputes will be subject to binding arbitration in
              Los Angeles County, California, except where prohibited by law.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              TERMINATION
            </h4>
            <p className="text-gray-700 mb-6">
              We reserve the right to suspend or terminate your access to the
              Site at any time, without notice, for conduct that violates
              these Terms or is otherwise harmful to our business interests.
            </p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              CONTACT US
            </h4>
            <p className="text-gray-700 mb-2">
              For questions or concerns regarding these Terms, please contact
              us:
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
