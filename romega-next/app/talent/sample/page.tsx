import type { Metadata } from 'next';
import TalentProfileSample from '@/components/organisms/talent/TalentProfileSample';

export const metadata: Metadata = {
  title: 'Profile Sample | Romega Solutions',
  description: 'Sample talent profile design.',
  robots: { index: false, follow: false },
};

export default function TalentSamplePage() {
  return <TalentProfileSample />;
}
