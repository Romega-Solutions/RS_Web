import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Romega Solutions',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 relative overflow-hidden bg-(--rs-neutral-50)"
    >
      {/* Background Logo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 opacity-10 -z-10">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <circle cx="100" cy="100" r="80" fill="var(--rs-primary-300)" opacity="0.3" />
          <path
            d="M100 40 L140 80 L140 120 L100 160 L60 120 L60 80 Z"
            fill="var(--rs-primary-500)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* 404 Content */}
      <div className="z-10 max-w-full sm:max-w-md md:max-w-2xl pt-5 lg:pt-20">
        {/* Large 404 Number */}
        <div
          className="text-8xl sm:text-9xl md:text-[12rem] font-bold mb-4 leading-none"
          style={{
            fontFamily: 'var(--font-serif), Merriweather, serif',
            color: 'var(--rs-primary-600)',
            opacity: 0.2
          }}
        >
          404
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-serif), Merriweather, serif',
            color: 'var(--rs-primary-600)'
          }}
        >
          Oops! This page doesn&apos;t exist.
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{
            fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
            color: 'var(--rs-neutral-700)'
          }}
        >
          We couldn&apos;t find what you were looking for. It might have been
          moved, renamed, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-(--rs-primary-500) text-white font-semibold rounded-lg shadow-lg hover:bg-(--rs-primary-700) transition-all transform hover:scale-105"
            style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Homepage
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-(--rs-primary-500) text-(--rs-primary-600) font-semibold rounded-lg shadow hover:bg-(--rs-primary-50) transition-all"
            style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Support
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-(--rs-neutral-300)">
          <p
            className="text-sm mb-4"
            style={{
              fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
              color: 'var(--rs-neutral-600)'
            }}
          >
            Or explore our popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/about"
              className="text-(--rs-primary-600) hover:text-(--rs-primary-700) hover:underline font-medium"
              style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
            >
              About Us
            </Link>
            <span style={{ color: 'var(--rs-neutral-400)' }}>•</span>
            <Link
              href="/services"
              className="text-(--rs-primary-600) hover:text-(--rs-primary-700) hover:underline font-medium"
              style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
            >
              Services
            </Link>
            <span style={{ color: 'var(--rs-neutral-400)' }}>•</span>
            <Link
              href="/careers"
              className="text-(--rs-primary-600) hover:text-(--rs-primary-700) hover:underline font-medium"
              style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
            >
              Careers
            </Link>
            <span style={{ color: 'var(--rs-neutral-400)' }}>•</span>
            <Link
              href="/talent"
              className="text-(--rs-primary-600) hover:text-(--rs-primary-700) hover:underline font-medium"
              style={{ fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif' }}
            >
              Talent Pool
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
