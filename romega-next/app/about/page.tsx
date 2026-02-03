import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us | Romega Solutions',
  description: 'Learn about Romega Solutions, our mission, vision, and the talented team driving innovation in remote work and tech talent solutions.',
  openGraph: {
    title: 'About Us | Romega Solutions',
    description: 'Learn about Romega Solutions, our mission, vision, and the talented team driving innovation in remote work and tech talent solutions.',
    url: 'https://romegasolutions.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
