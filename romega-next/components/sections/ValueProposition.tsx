import Image from 'next/image';
import Link from 'next/link';

const benefits = [
  {
    title: 'Faster Hires',
    description: 'Securing senior leaders quickly to keep your business moving forward.',
  },
  {
    title: '15% Lower Fees',
    description: 'Offering premium recruitment solutions at more competitive, client-friendly rates.',
  },
  {
    title: 'Time Saved',
    description: 'Streamlining hiring workflows to free your team for strategic work.',
  },
  {
    title: 'Cost Savings',
    description: 'Protecting revenue by avoiding costly mis-hires and delays with strategies.',
  },
  {
    title: 'High Retention',
    description: 'Ensuring leaders stay longer and deliver lasting organizational impact.',
  },
  {
    title: 'Global Reach',
    description: 'Connecting organizations with executive talent across industries worldwide.',
  },
];

export default function ValueProposition() {
  return (
    <section
      className="py-16 bg-[var(--rs-neutral-50)] relative overflow-hidden lg:max-h-[1000px]"
      aria-labelledby="value-prop-heading"
    >
      <div className="max-w-7xl mx-auto my-auto items-center px-4 relative z-10">
        <div className="flex flex-col space-y-12 items-center">
          {/* Upper Section */}
          <div className="text-center space-y-6">
            <h2
              id="value-prop-heading"
              className="text-4xl text-merriweather-value-h1 font-bold text-[var(--rs-primary-600)] mb-4"
            >
              Why Businesses Choose Romega
            </h2>
            <p className="text-[18px] md:text-[24px] text-[var(--rs-neutral-600)] max-w-4xl mx-auto leading-relaxed">
              Romega delivers{' '}
              <span className="text-[var(--rs-primary-500)] font-semibold">
                unmatched service quality
              </span>{' '}
              and{' '}
              <span className="text-[var(--rs-primary-500)] font-semibold">
                global reach
              </span>
              , giving your team the confidence to hire anywhere.{' '}
              <span className="text-[var(--rs-primary-500)] font-semibold pb-4">
                With us excellence isn&apos;t optional, it&apos;s guaranteed
              </span>
              .
            </p>

            <div className="flex justify-center">
              <Link
                href="/about"
                className="w-full max-w-[400px] h-[50px] sm:h-[57px] inline-flex text-[18px] sm:text-[22.5px] items-center justify-center px-4 sm:px-8 border-2 border-[var(--rs-primary-600)] text-[var(--rs-primary-600)] font-semibold rounded-[12px] hover:bg-blue-600 hover:text-[var(--rs-primary-50)] transition duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Learn more about Romega Solutions and our company values"
                role="button"
              >
                <Image
                  src="/images/home/bag.svg"
                  alt=""
                  width={27}
                  height={27}
                  className="w-5 sm:w-[27.5px] mr-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  role="presentation"
                />
                Find Out More
              </Link>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 md:px-0 gap-6 md:gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-xl p-6 text-center">
                  <h3 className="text-rs-value-source-sans font-bold text-[46px] text-[#15357a] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[06122C] text-base">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
