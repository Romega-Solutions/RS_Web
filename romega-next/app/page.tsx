import type { Metadata } from 'next';
import HeroSection from '@/components/organisms/home/HeroSection';
import ValueProposition from '@/components/organisms/home/ValueProposition';
import ServicesOverview from '@/components/organisms/home/ServicesOverview';
import CaseStudy from '@/components/organisms/home/CaseStudy';
import LinkedInSection from '@/components/organisms/home/LinkedInSection';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Romega Solutions provides cutting-edge HR solutions, tech talent acquisition, and workforce optimization strategies. Transform your business with our expert team and innovative tools.',
  keywords: [
    'HR solutions',
    'tech talent',
    'remote work',
    'workforce optimization',
    'business growth',
    'talent recruitment',
    'staffing agency',
    'HR consulting',
  ],
  openGraph: {
    title: 'Romega Solutions | Smart HR & Tech Talent Solutions',
    description: 'Transform your HR operations with cutting-edge tools, expert insights, and tailored strategies for business growth.',
    url: 'https://www.romegasolutions.com',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Romega Solutions Homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romega Solutions | Smart HR Solutions',
    description: 'Transform your HR operations with cutting-edge tools and expert insights.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com',
  },
};

export default function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Romega Solutions',
    url: 'https://www.romegasolutions.com',
    logo: 'https://www.romegasolutions.com/images/navbar-company-logo.svg',
    description: 'Transform your HR operations with cutting-edge tools, expert insights, and tailored strategies for business growth.',
    founder: {
      '@type': 'Person',
      name: 'Robbie Galoso',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '222 Pacific Coast Hwy, #10',
      addressLocality: 'El Segundo',
      addressRegion: 'CA',
      postalCode: '90245',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@romega-solutions.com',
      contactType: 'Customer Service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.linkedin.com/company/romega-solutions',
      'https://www.facebook.com/romegasolutions',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
    },
  };

  return (
    <>
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="main-content" className="bg-[var(--rs-primary-50)]">
        <HeroSection />
        <ValueProposition />
        <ServicesOverview />
        <CaseStudy />
        <LinkedInSection />
      </main>
    </>
  );
}
