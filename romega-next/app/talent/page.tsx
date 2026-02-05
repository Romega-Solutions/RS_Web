import type { Metadata } from 'next';
import TalentPageClient from './TalentPageClient';
import TalentPool from '@/components/organisms/talent/TalentPool';
import ContactCTA from '@/components/organisms/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Talent Pool | Romega Solutions',
  description: 'Discover exceptional tech talent in our curated pool of professionals. Connect with skilled developers, designers, and tech experts ready for your next project.',
  openGraph: {
    title: 'Talent Pool | Romega Solutions',
    description: 'Discover exceptional tech talent in our curated pool of professionals ready for your next project.',
    url: 'https://romegasolutions.com/talent',
    type: 'website',
  },
};

export default function TalentPage() {
  return (
    <main className="bg-[var(--rs-primary-50)]">
      <TalentPageClient />
      <TalentPool />
      <ContactCTA />
    </main>
  );
}
