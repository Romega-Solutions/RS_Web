import type { Metadata } from "next";
import { Source_Sans_3, Merriweather } from "next/font/google";
import { Header } from "@/components/organisms/layout/Header";
import { Footer } from "@/components/organisms/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import CopyProtection from "@/components/layout/CopyProtection";
import "./globals.css";
import "@/app/styles/styles.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.romegasolutions.com'),
  title: {
    default: 'Romega Solutions | Smart HR & Tech Talent Solutions for Business Growth',
    template: '%s | Romega Solutions',
  },
  description: "Transform your HR operations with Romega Solutions' cutting-edge tools, expert insights, and tailored strategies. Specializing in remote work, tech talent acquisition, and workforce optimization.",
  keywords: [
    'HR solutions',
    'tech talent acquisition',
    'remote work solutions',
    'workforce optimization',
    'business growth strategies',
    'talent recruitment',
    'HR consulting',
    'staffing solutions',
    'employee productivity',
    'digital transformation',
  ],
  authors: [{ name: 'Romega Solutions', url: 'https://www.romegasolutions.com' }],
  creator: 'Romega Solutions',
  publisher: 'Romega Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.romegasolutions.com',
    siteName: 'Romega Solutions',
    title: 'Romega Solutions | Smart HR & Tech Talent Solutions',
    description: "Transform your HR operations with cutting-edge tools, expert insights, and tailored strategies for business growth.",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Romega Solutions - Smart HR & Tech Talent Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romega Solutions | Smart HR & Tech Talent Solutions',
    description: 'Transform your HR operations with cutting-edge tools and expert insights.',
    images: ['/images/og-image.png'],
    creator: '@romegasolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon-192.png',
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://www.romegasolutions.com',
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to critical external domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0A2540" />
      </head>
      <body
        className={`${sourceSans.variable} ${merriweather.variable} antialiased bg-(--rs-primary-50) overflow-x-hidden`}
      >
        <CopyProtection />
        <GoogleAnalytics />
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-9999"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
