'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <main 
      className="flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 md:px-8 relative overflow-hidden bg-(--rs-neutral-50)"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 opacity-10 -z-10">
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <circle cx="100" cy="100" r="80" fill="var(--rs-primary-300)" opacity="0.3"/>
          <path 
            d="M100 40 L140 80 L140 120 L100 160 L60 120 L60 80 Z" 
            fill="var(--rs-primary-500)" 
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Error Content */}
      <div className="z-10 max-w-full sm:max-w-md md:max-w-2xl pt-5 lg:pt-20">
        {/* Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto" 
            style={{ color: 'var(--rs-error)' }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
          style={{ 
            fontFamily: 'var(--font-serif), Merriweather, serif',
            color: 'var(--rs-primary-600)'
          }}
        >
          Something went wrong
        </h1>

        {/* Description */}
        <p
          className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ 
            fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
            color: 'var(--rs-neutral-700)'
          }}
        >
          We&apos;re sorry, but something unexpected happened. Please try again or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
            style={{ 
              fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
              backgroundColor: 'var(--rs-error)'
            }}
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
              />
            </svg>
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white font-semibold rounded-lg shadow transition-all"
            style={{ 
              fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
              borderWidth: '2px',
              borderColor: 'var(--rs-primary-500)',
              color: 'var(--rs-primary-600)'
            }}
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
            Or contact our support team:
          </p>
          <Link 
            href="/contact"
            className="hover:underline font-medium"
            style={{ 
              fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
              color: 'var(--rs-primary-600)'
            }}
          >
            Get Help →
          </Link>
        </div>

        {/* Error Details (optional - only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg max-w-2xl mx-auto">
            <summary 
              className="cursor-pointer font-semibold mb-2"
              style={{ 
                fontFamily: 'var(--font-sans), "Source Sans 3", sans-serif',
                color: 'var(--rs-neutral-700)'
              }}
            >
              Error Details (Development Only)
            </summary>
            <pre 
              className="text-xs overflow-auto"
              style={{ color: 'var(--rs-neutral-600)' }}
            >
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
              {error.stack && `\n\nStack:\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
