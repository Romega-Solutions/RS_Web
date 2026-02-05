import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact | Romega Solutions',
  description: 'Get in touch with Romega Solutions. Connect with our team for business inquiries, partnerships, or support.',
  openGraph: {
    title: 'Contact - Romega Solutions',
    description: 'Get in touch with Romega Solutions. Connect with our team for business inquiries, partnerships, or support.',
    url: 'https://www.romegasolutions.com/contact',
    images: ['/images/og-image.png'],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
