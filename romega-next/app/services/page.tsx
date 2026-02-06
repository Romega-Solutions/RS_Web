import type { Metadata } from 'next';
import ServicesHero from '@/components/organisms/services/ServicesHero';
import ServiceDetails from '@/components/organisms/services/ServiceDetails';
import CultureFitDiagnostic from '@/components/organisms/services/CultureFitDiagnostic';
import FAQ from '@/components/organisms/services/FAQ';
import ContactCTA from '@/components/organisms/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore comprehensive HR and tech talent solutions including recruitment, workforce optimization, remote team management, culture fit assessment, and digital transformation services. Enhance your business with our expert solutions tailored for growth.',
  keywords: [
    'HR services',
    'talent recruitment',
    'workforce optimization',
    'remote team management',
    'culture fit assessment',
    'digital transformation',
    'staffing solutions',
    'tech talent acquisition',
  ],
  openGraph: {
    title: 'Our Services | Romega Solutions',
    description: 'Explore comprehensive HR and tech talent solutions including recruitment, workforce optimization, and culture fit assessment.',
    url: 'https://www.romegasolutions.com/services',
    type: 'website',
    images: [
      {
        url: '/images/og-services.png',
        width: 1200,
        height: 630,
        alt: 'Romega Solutions Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Romega Solutions',
    description: 'Comprehensive HR and tech talent solutions for business growth.',
    images: ['/images/og-services.png'],
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com/services',
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-pattern pt-[104px] bg-[var(--rs-primary-50)]">
      <ServicesHero />
      <ServiceDetails />
      <CultureFitDiagnostic />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
