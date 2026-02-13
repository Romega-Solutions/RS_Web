'use client';

import { useState } from 'react';
import ContactHero from '@/components/organisms/contact/ContactHero';
import ContactContainer from '@/components/organisms/contact/ContactContainer';
import TermsModal from '@/components/organisms/shared/TermsModal';
import PrivacyModal from '@/components/organisms/shared/PrivacyModal';

export default function ContactPageClient() {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full max-w-7xl mx-auto overflow-hidden xl:overflow-visible mt-26" id="main-content">
      {/* Background Decorative Elements */}
      <div className="bg-clip-content">
        <img
          src="/images/contact/bg-romega.svg"
          width="530"
          height="654"
          className="absolute top-0 -left-16 w-auto h-auto opacity-10 -z-10"
          aria-hidden="true"
          alt=""
          fetchPriority="high"
        />
        {/* Ellipse 793 BG Top Right 1 */}
        <span className="size-80 bg-blue-100 rounded-full absolute -top-32.75 -right-7.5" aria-hidden="true" />
        {/* Ellipse 794 BG Top Right 2 */}
        <span className="size-80 bg-blue-200 rounded-full absolute top-13.75 -right-32 opacity-80" aria-hidden="true" />
        {/* Ellipse 795 BG Bottom Left 1 */}
        <span className="size-80 bg-blue-100 rounded-full absolute -bottom-40 -left-33.5" aria-hidden="true" />
        {/* Ellipse 796 BG Bottom Left 2 */}
        <span className="size-80 bg-blue-200 rounded-full absolute -bottom-64.5 left-13" aria-hidden="true" />
      </div>

      {/* Content Overlay */}
      <section className="py-20 relative z-10 min-h-screen max-w-7xl mx-auto px-4">
        <ContactHero />
        <ContactContainer 
          onOpenTerms={() => setIsTermsOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />

        {/* Bottom Section - Desktop Only */}
        <div className="hidden lg:block xl:block text-center mt-12 mx-auto max-w-321 w-10/12">
          <div className="w-full max-w-321 h-px bg-(--rs-neutral-400) mb-4" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
            <div className="flex-1" />
            <p className="text-(--rs-neutral-600) text-base shrink-0">
              © 2025 Romega Solutions. All rights reserved
            </p>
            <div className="flex gap-6 text-base flex-1 justify-end mr-23.75">
              <button
                type="button"
                className="text-(--rs-neutral-700) hover:text-rs-neutral-900 hover:cursor-pointer hover:underline bg-transparent border-none cursor-pointer p-0"
                aria-label="Open Privacy Policy"
                onClick={() => setIsPrivacyOpen(true)}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                className="text-(--rs-neutral-700) hover:text-rs-neutral-900 hover:cursor-pointer hover:underline bg-transparent border-none cursor-pointer p-0"
                aria-label="Open Terms of Service"
                onClick={() => setIsTermsOpen(true)}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </main>
  );
}
