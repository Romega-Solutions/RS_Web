import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Romega Solutions for business inquiries, partnerships, or support. Located in El Segundo, CA. Reach us via email at info@romega-solutions.com or schedule a consultation. We\'re here to help transform your HR operations.',
  keywords: [
    'contact romega solutions',
    'business inquiries',
    'partnerships',
    'customer support',
    'schedule consultation',
    'get in touch',
    'el segundo location',
  ],
  openGraph: {
    title: 'Contact Us | Romega Solutions',
    description: 'Get in touch with our team for business inquiries, partnerships, or support.',
    url: 'https://www.romegasolutions.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/og-contact.png',
        width: 1200,
        height: 630,
        alt: 'Contact Romega Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Romega Solutions',
    description: 'Get in touch with our team for inquiries, partnerships, or support.',
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com/contact',
  },
};

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Romega Solutions',
    description: 'Get in touch with Romega Solutions for business inquiries, partnerships, or support.',
    url: 'https://www.romegasolutions.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Romega Solutions',
      email: 'info@romega-solutions.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '222 Pacific Coast Hwy, #10',
        addressLocality: 'El Segundo',
        addressRegion: 'CA',
        postalCode: '90245',
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <Script
        id="structured-data-contact"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ContactPageClient />
    </>
  );
}
