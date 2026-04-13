import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Romega Solutions - a US-based company founded by Robbie Galoso. Discover our mission to be a steady growth partner for businesses by building strong teams and credible brands, and our vision for the future of work.',
  keywords: [
    'about romega solutions',
    'robbie galoso',
    'company mission',
    'HR innovation',
    'remote work experts',
    'tech talent team',
    'company values',
  ],
  openGraph: {
    title: 'About Us | Romega Solutions',
    description: 'Learn about Romega Solutions, our mission, vision, and the team helping businesses grow with strong teams and credible brands.',
    url: 'https://www.romegasolutions.com/about',
    type: 'website',
    images: [
      {
        url: '/images/og-about.png',
        width: 1200,
        height: 630,
        alt: 'About Romega Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Romega Solutions',
    description: 'Learn about our mission, vision, and team helping businesses grow with strong teams and credible brands.',
    images: ['/images/og-about.png'],
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com/about',
  },
};

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Romega Solutions',
    description: 'Learn about Romega Solutions, our mission, and the team driving innovation.',
    url: 'https://www.romegasolutions.com/about',
    mainEntity: {
      '@type': 'Organization',
      name: 'Romega Solutions',
      founder: {
        '@type': 'Person',
        name: 'Robbie Galoso',
      },
    },
  };

  return (
    <>
      <Script
        id="structured-data-about"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AboutPageClient />
    </>
  );
}
