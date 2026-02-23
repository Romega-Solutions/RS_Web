import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getTalentById, getTalentExperience, getTalentProjects, getTalentTestimonials } from '@/lib/supabase/talents';
import TalentProfileClient from '@/components/organisms/talent/TalentProfileClient';

interface TalentProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: TalentProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const talent = await getTalentById(id);

  if (!talent) {
    return {
      title: 'Talent Not Found | Romega Solutions',
    };
  }

  return {
    title: `${talent.name} - ${talent.role} | Romega Solutions`,
    description: talent.tagline || talent.bio || `Hire ${talent.name}, a ${talent.role} with ${talent.experience_years}+ years of experience in ${talent.skills.slice(0, 3).join(', ')}.`,
    openGraph: {
      title: `${talent.name} - ${talent.role}`,
      description: talent.tagline || talent.bio,
      images: talent.avatar_url ? [talent.avatar_url] : [],
    },
  };
}

export default async function TalentProfilePage({ params }: TalentProfilePageProps) {
  const { id } = await params;
  const talent = await getTalentById(id);

  if (!talent) {
    notFound();
  }

  // Fetch related data in parallel
  const [experience, projects, testimonials] = await Promise.all([
    getTalentExperience(id),
    getTalentProjects(id),
    getTalentTestimonials(id),
  ]);

  return (
    <TalentProfileClient
      talent={talent}
      experience={experience ?? []}
      projects={projects ?? []}
      testimonials={testimonials ?? []}
    />
  );
}
