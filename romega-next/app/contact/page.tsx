import type { Metadata } from 'next';
import ContactHero from '@/components/organisms/contact/ContactHero';
import ContactContainer from '@/components/organisms/contact/ContactContainer';

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
  return (
    <main className="relative min-h-screen w-full max-w-[1440px] mx-auto overflow-hidden xl:overflow-visible" id="main-content">
      {/* Background Decorative Elements */}
      <div className="bg-clip-content">
        <img
          src="/images/contact/bg-romega.svg"
          className="absolute top-0 left-[-64px] w-auto h-auto opacity-10 -z-10"
          aria-hidden="true"
          alt=""
        />
        {/* Ellipse 793 BG Top Right 1 */}
        <span className="size-80 bg-blue-100 rounded-full absolute top-[-131px] right-[-30px]" aria-hidden="true" />
        {/* Ellipse 794 BG Top Right 2 */}
        <span className="size-80 bg-blue-200 rounded-full absolute top-[55px] right-[-128px] opacity-80" aria-hidden="true" />
        {/* Ellipse 795 BG Bottom Left 1 */}
        <span className="size-80 bg-blue-100 rounded-full absolute bottom-[-160px] left-[-134px]" aria-hidden="true" />
        {/* Ellipse 796 BG Bottom Left 2 */}
        <span className="size-80 bg-blue-200 rounded-full absolute bottom-[-258px] left-[52px]" aria-hidden="true" />
      </div>

      {/* Content Overlay */}
      <section className="py-20 relative z-10 min-h-screen max-w-7xl mx-auto px-4">
        <ContactHero />
        <ContactContainer />

        {/* Bottom Section - Desktop Only */}
        <div className="hidden lg:block xl:block text-center mt-12 mx-auto max-w-[1284px] w-10/12">
          <div className="w-full max-w-[1284px] h-px bg-[var(--rs-neutral-400)] mb-4" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
            <div className="flex-1" />
            <p className="text-[var(--rs-neutral-400)] text-base flex-shrink-0">
              © 2025 Romega Solutions. All rights reserved
            </p>
            <div className="flex gap-6 text-base flex-1 justify-end mr-[95px]">
              <button
                type="button"
                className="text-[var(--rs-neutral-500)] hover:text-rs-neutral-900 hover:cursor-pointer hover:underline bg-transparent border-none cursor-pointer p-0"
                aria-label="Open Privacy Policy"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                className="text-[var(--rs-neutral-500)] hover:text-rs-neutral-900 hover:cursor-pointer hover:underline bg-transparent border-none cursor-pointer p-0"
                aria-label="Open Terms of Service"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
