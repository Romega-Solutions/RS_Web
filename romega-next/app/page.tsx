import HeroSection from '@/components/organisms/home/HeroSection';
import ValueProposition from '@/components/organisms/home/ValueProposition';
import ServicesOverview from '@/components/organisms/home/ServicesOverview';
import CaseStudy from '@/components/organisms/home/CaseStudy';
import LinkedInSection from '@/components/organisms/home/LinkedInSection';

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[var(--rs-primary-50)]">
      <HeroSection />
      <ValueProposition />
      <ServicesOverview />
      <CaseStudy />
      <LinkedInSection />
    </main>
  );
}
