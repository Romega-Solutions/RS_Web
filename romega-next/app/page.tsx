import HeroSection from '@/components/sections/HeroSection';
import ValueProposition from '@/components/sections/ValueProposition';
import ServicesOverview from '@/components/sections/ServicesOverview';
import CaseStudy from '@/components/sections/CaseStudy';
import LinkedInSection from '@/components/sections/LinkedInSection';

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
