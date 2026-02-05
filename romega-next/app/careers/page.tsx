import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';
import JobListings from '@/components/organisms/careers/JobListings';
import PrivacyPriority from '@/components/organisms/careers/PrivacyPriority';
import WhyJoinUs from '@/components/organisms/careers/WhyJoinUs';
import ContactCTA from '@/components/organisms/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Careers & Talent | Romega Solutions',
  description: 'Join Romega Solutions and be part of a dynamic team driving innovation in remote work and tech talent solutions. Explore career opportunities and grow with us.',
  openGraph: {
    title: 'Careers & Talent | Romega Solutions',
    description: 'Join Romega Solutions and be part of a dynamic team driving innovation in remote work and tech talent solutions.',
    url: 'https://romegasolutions.com/careers',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <main className="bg-[var(--rs-primary-50)]">
      <CareersPageClient />
      {/* <JobListings /> */}
      <PrivacyPriority />
      <WhyJoinUs />
      <ContactCTA />
    </main>
  );
}
