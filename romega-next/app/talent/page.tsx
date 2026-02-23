import type { Metadata } from 'next';
import TalentPageClient from './TalentPageClient';
import TalentPool from '@/components/organisms/talent/TalentPool';
import TalentCTA from '@/components/organisms/talent/TalentCTA';
import { getTalents } from '@/lib/supabase/talents';

export const metadata: Metadata = {
  title: 'Talent Pool - Find Top Tech Professionals',
  description: 'Discover exceptional tech talent in our curated pool of professionals. Connect with skilled developers, designers, engineers, and tech experts ready for your next project. Pre-vetted talent for remote and on-site positions.',
  keywords: [
    'tech talent pool',
    'hire developers',
    'tech professionals',
    'skilled designers',
    'software engineers',
    'pre-vetted talent',
    'remote developers',
    'tech recruitment',
  ],
  openGraph: {
    title: 'Talent Pool | Romega Solutions',
    description: 'Discover exceptional pre-vetted tech talent ready for your next project. Developers, designers, and engineers.',
    url: 'https://www.romegasolutions.com/talent',
    type: 'website',
    images: [
      {
        url: '/images/og-talent.png',
        width: 1200,
        height: 630,
        alt: 'Romega Solutions Talent Pool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Talent Pool | Romega Solutions',
    description: 'Discover exceptional tech talent ready for your next project.',
    images: ['/images/og-talent.png'],
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com/talent',
  },
};

export default async function TalentPage() {
  // Fetch talents from Supabase on the server
  const talents = await getTalents();

  return (
    <main className="bg-(--rs-primary-50)">
      <TalentPageClient />
      <TalentPool talents={talents} />
      <TalentCTA />
    </main>
  );
}
