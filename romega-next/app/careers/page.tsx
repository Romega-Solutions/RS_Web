import type { Metadata } from 'next';
import CareersPageClient from './CareersPageClient';
import JobListings from '@/components/organisms/careers/JobListings';
import PrivacyPriority from '@/components/organisms/careers/PrivacyPriority';
import WhyJoinUs from '@/components/organisms/careers/WhyJoinUs';
import ContactCTA from '@/components/organisms/shared/ContactCTA';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Careers & Talent Opportunities',
  description: 'Join Romega Solutions and be part of a dynamic team driving innovation in remote work and tech talent solutions. Explore exciting career opportunities, competitive benefits, and grow with a forward-thinking company. Remote positions available.',
  keywords: [
    'career opportunities',
    'tech jobs',
    'remote work careers',
    'HR jobs',
    'talent acquisition careers',
    'join our team',
    'employment opportunities',
    'remote positions',
  ],
  openGraph: {
    title: 'Careers & Talent Opportunities | Romega Solutions',
    description: 'Join our dynamic team driving innovation in remote work and tech talent solutions. Explore career opportunities today.',
    url: 'https://www.romegasolutions.com/careers',
    type: 'website',
    images: [
      {
        url: '/images/og-careers.png',
        width: 1200,
        height: 630,
        alt: 'Romega Solutions Careers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Romega Solutions',
    description: 'Join our team and drive innovation in HR and tech talent solutions.',
    images: ['/images/og-careers.png'],
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com/careers',
  },
};

export default function CareersPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Careers at Romega Solutions',
    description: 'Join our team and explore exciting career opportunities in HR and tech talent solutions.',
    url: 'https://www.romegasolutions.com/careers',
    mainEntity: {
      '@type': 'Organization',
      name: 'Romega Solutions',
      url: 'https://www.romegasolutions.com',
    },
  };

  return (
    <>
      <Script
        id="structured-data-careers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="bg-[var(--rs-primary-50)]">
        <CareersPageClient />
        <JobListings />
        <PrivacyPriority />
        <WhyJoinUs />
        <ContactCTA />
      </main>
    </>
  );
}
