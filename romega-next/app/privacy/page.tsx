import type { Metadata } from 'next';
import PrivacyPolicyContent from '@/components/organisms/shared/PrivacyPolicyContent';
import {
  PRIVACY_POLICY_LAST_UPDATED,
  PRIVACY_POLICY_VERSION,
} from '@/lib/legal/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the Romega Solutions Applicant Data Privacy and Consent Policy, including collection, processing, retention, sharing, security, and rights.',
  alternates: {
    canonical: 'https://www.romegasolutions.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main
      className="bg-(--rs-primary-50) min-h-screen mt-26"
      id="main-content"
      aria-labelledby="privacy-page-title"
    >
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-wide text-(--rs-neutral-500)">
            Legal and Compliance
          </p>
          <h1
            id="privacy-page-title"
            className="text-3xl sm:text-4xl font-bold text-(--rs-primary-700)"
            style={{ fontFamily: 'var(--font-serif), Merriweather, serif' }}
          >
            Applicant Data Privacy and Consent Policy
          </h1>
          <p className="text-(--rs-neutral-600) mt-3">
            Version {PRIVACY_POLICY_VERSION} | Last updated {PRIVACY_POLICY_LAST_UPDATED}
          </p>
        </header>

        <article className="rounded-2xl border border-(--rs-neutral-300) bg-white shadow-sm p-6 sm:p-8">
          <PrivacyPolicyContent />
        </article>
      </section>
    </main>
  );
}
