import Image from 'next/image';

export default function CaseStudy() {
  return (
    <section
      className="py-16 bg-case relative overflow-hidden lg:max-h-250"
      aria-labelledby="case-study-heading"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
        <div className="flex flex-col space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h2
              id="case-study-heading"
              className="text-[30px] md:text-[40px] text-merriweather-value-h1 font-bold text-rs-case-primary-color mb-4"
            >
              Smart solutions that empower
            </h2>
            <h3 className="text-[30px] md:text-[40px] text-merriweather-value-h1 font-bold text-rs-case-primary-color mb-6">
              global teams to thrive
            </h3>
            <p className="text-[20px] text-rs-case-source-sans text-rs-case-secondary-color max-w-3xl mx-auto leading-relaxed">
              Discover how we help businesses scale faster with seamless hiring, HR
              support, and leadership advisory.
            </p>
          </div>

          {/* Case Study Card */}
          <div className="flex flex-col items-center space-y-8 md:space-y-12">
            {/* Image - Centered for mobile/sm, positioned for desktop */}
            <div className="w-full flex justify-center xl:hidden">
              <Image
                src="/images/home/webp/Case Study Photo.webp"
                alt="Professional team meeting discussing leadership solutions"
                width={500}
                height={300}
                className="w-94 sm:w-125 h-auto object-cover rounded-lg"
                loading="lazy"
                style={{ aspectRatio: '5/3' }}
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden xl:flex xl:flex-row items-center gap-8 md:gap-12 w-full">
              {/* Left Content */}
              <div className="flex-1 space-y-6">
                <h3 className="text-[30px] md:text-[40px] text-rs-case-primary-color text-merriweather-value-h1 font-bold leading-tight">
                  How Romega helped a <br />
                  PE-backed firm fill critical leadership roles
                </h3>
                <blockquote className="text-rs-case-secondary-color text-rs-case-source-sans text-lg md:text-[20px] leading-relaxed">
                  &quot;Romega placed three VP-level executives in record time, helping us
                  avoid months of lost revenue.&quot;
                </blockquote>
                <cite className="text-rs-case-secondary-color text-base text-rs-case-source-sans md:text-lg font-medium not-italic">
                  — Martin Reyes, CEO
                </cite>
              </div>

              {/* Right Image - Desktop only */}
              <div className="shrink-0">
                <Image
                  src="/images/home/webp/Case Study Photo.webp"
                  alt="Professional team meeting discussing leadership solutions"
                  width={600}
                  height={350}
                  className="w-150 h-auto object-cover rounded-lg"
                  loading="lazy"
                  style={{ aspectRatio: '12/7' }}
                />
              </div>
            </div>

            {/* Mobile/Tablet Content - Below image */}
            <div className="xl:hidden text-center space-y-6 px-4">
              <h3 className="text-[24px] sm:text-[30px] text-rs-case-primary-color text-merriweather-value-h1 font-bold leading-tight">
                How Romega helped a PE-backed firm fill critical leadership roles
              </h3>
              <blockquote className="text-rs-case-secondary-color text-rs-case-source-sans text-base sm:text-lg leading-relaxed">
                &quot;Romega placed three VP-level executives in record time, helping us
                avoid months of lost revenue.&quot;
              </blockquote>
              <cite className="text-rs-case-secondary-color text-sm sm:text-base text-rs-case-source-sans font-medium not-italic">
                — Martin Reyes, CEO
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
