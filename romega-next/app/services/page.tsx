import type { Metadata } from 'next';
import ServicesHero from '@/components/organisms/services/ServicesHero';
import ServiceDetails from '@/components/organisms/services/ServiceDetails';
import CultureFitDiagnostic from '@/components/organisms/services/CultureFitDiagnostic';
import FAQ from '@/components/organisms/services/FAQ';
import ContactCTA from '@/components/organisms/shared/ContactCTA';

export const metadata: Metadata = {
  title: 'Services | Romega Solutions',
  description: 'Explore the services offered by Romega Solutions, including web development, digital marketing, and more. Enhance your business with our expert solutions.',
  openGraph: {
    title: 'Services - Romega Solutions',
    description: 'Explore the services offered by Romega Solutions, including web development, digital marketing, and more.',
    url: 'https://romegasolutions.com/services',
    type: 'website',
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
