import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Briefcase } from 'lucide-react';

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
              <Button
                href="/about"
                variant="secondary"
                icon={Briefcase}
                ariaLabel="Learn more about Romega Solutions and our company values"
              >
                Find Out More
              </Button>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 md:px-0 gap-6 md:gap-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="rounded-xl p-6 text-center">
                  <h3 className="text-rs-value-source-sans font-bold text-[46px] text-rs-primary-600 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-rs-neutral-700 text-base">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
