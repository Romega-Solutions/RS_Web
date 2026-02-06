'use client';

import { useState } from 'react';
import AboutHero from '@/components/organisms/about/AboutHero';
import MissionVision from '@/components/organisms/about/MissionVision';
import TeamCarousel from '@/components/organisms/about/TeamCarousel';
import TeamMemberSidebar from '@/components/organisms/about/TeamMemberSidebar';
import TestimonialsCarousel from '@/components/organisms/about/TestimonialsCarousel';
import ContactCTA from '@/components/organisms/shared/ContactCTA';
import { TeamMember } from '@/lib/constants';

export default function AboutPageClient() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <main className="bg-(--rs-primary-50)">
      <AboutHero />
      <MissionVision />
      <TeamCarousel onMemberClick={setSelectedMember} />
      <TestimonialsCarousel />
      <ContactCTA />
      <TeamMemberSidebar
        isOpen={!!selectedMember}
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </main>
  );
}
