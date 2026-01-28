import Image from 'next/image';
import Link from 'next/link';

export default function LinkedInSection() {
  return (
    <section className="py-16 bg-rs-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
        <div className="flex flex-col space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h2 className="text-[30px] md:text-[40px] text-rs-linked text-merriweather-value-h1 font-bold">
              Stay Connected With Us on LinkedIn
            </h2>
            <p className="text-[18px] md:text-[20px] text-rs-linked-neutral max-w-lg mx-auto leading-relaxed">
              Follow Romega on LinkedIn for leadership insights, hiring strategies,
              and the latest success stories.
            </p>
          </div>

          {/* Visit LinkedIn Button */}
          <div className="flex justify-center mt-8">
            <Link
              href="https://www.linkedin.com/company/romega-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[400px] h-[57px] inline-flex text-[22.5px] items-center justify-center px-8 py-3 group border-2 bg-[var(--rs-primary-100)] border-[var(--rs-primary-600)] text-[var(--rs-primary-600)] font-semibold rounded-[12px] hover:bg-blue-600 hover:text-[var(--rs-primary-50)] transition duration-300"
            >
              <Image
                src="/images/home/linkedinIcon.png"
                alt="LinkedIn Icon"
                width={27}
                height={27}
                className="mr-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
              />
              Visit Romega on LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
