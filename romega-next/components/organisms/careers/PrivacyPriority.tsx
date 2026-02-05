import Image from 'next/image';

interface PrivacyFeature {
  icon: string;
  title: string;
}

const PRIVACY_FEATURES: PrivacyFeature[] = [
  {
    icon: '/images/careers/shield.svg',
    title: 'Fully confidential process',
  },
  {
    icon: '/images/careers/eye.svg',
    title: 'Your role stays private',
  },
  {
    icon: '/images/careers/human-check.svg',
    title: 'We never share without approval',
  },
  {
    icon: '/images/careers/lock.svg',
    title: 'GDPR compliant by default',
  },
];

export default function PrivacyPriority() {
  return (
    <>
      {/* Divider */}
      <hr className="border border-[var(--rs-neutral-400)] sm:mx-12 md:mx-20 lg:mx-32" />

      {/* Privacy Section */}
      <section
        className="relative bg-[var(--rs-neutral-50)] pb-12 md:py-20 pt-12 overflow-hidden lg:max-h-[1000px]"
        aria-labelledby="privacy-section-heading"
      >
        {/* Background image */}
        <Image
          src="/images/careers/bg-top.png"
          alt=""
          fill
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none select-none"
          loading="lazy"
          aria-hidden="true"
          style={{ objectFit: 'cover' }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              id="privacy-section-heading"
              className="text-[28px] font-merriweather font-bold mb-4"
              style={{ color: 'var(--rs-primary-600)' }}
            >
              Your Privacy, Our Priority
            </h2>
            <p className="text-2xl font-source-sans max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--rs-neutral-600)' }}>
              We treat every career journey with the highest level of
              confidentiality.
            </p>
            <p className="text-2xl font-source-sans max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--rs-neutral-600)' }}>
              Your information stays secure and your current role is never
              compromised.
            </p>
          </div>

          {/* Privacy Features Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {PRIVACY_FEATURES.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center bg-[var(--rs-neutral-50)] min-w-[180px] h-[160px] p-6 rounded-lg border border-[var(--rs-neutral-300)] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center mb-4">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px]"
                  />
                </div>
                <h3 className="text-[18px] font-source-sans mb-2" style={{ color: 'var(--rs-neutral-700)' }}>
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute w-full left-0 bottom-[-40px]" style={{ zIndex: 1 }} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[100px] md:h-[160px]"><path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="#374151" opacity="1"></path></svg>
        </div>
      </section>
    </>
  );
}
