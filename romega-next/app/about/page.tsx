import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Romega Solutions - a US-based holding company founded by Robbie Galoso. Discover our mission to transform HR operations through innovative solutions, our vision for the future of work, and meet the talented team driving innovation in remote work and tech talent solutions.',
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
    description: 'Learn about Romega Solutions, our mission, vision, and the talented team driving innovation in remote work and tech talent solutions.',
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
    description: 'Learn about our mission, vision, and team driving innovation in HR solutions.',
    images: ['/images/og-about.png'],
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
