import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';
import { Briefcase } from 'lucide-react';

const serviceTags = ['RPO', 'BPO', 'Strategic HR', 'Quality Hire', 'Mentoring', 'Teaching'];

const services = [
  {
    tag: 'Talent Acquisition',
    image: '/images/home/webp/talent-acquisition.webp',
    title: 'Drive growth with strategic sales and marketing.',
    width: 280,
    height: 180,
  },
  {
    tag: 'HR Services',
    image: '/images/home/webp/hr-services.webp',
    title: 'Strengthen HR with our expert-backed solutions',
    width: 280,
    height: 180,
  },
  {
    tag: 'Sales and Marketing',
    image: '/images/home/webp/sales-and-marketing.webp',
    title: 'Hire top leaders quickly to grow your teams globally',
    width: 280,
    height: 180,
  },
];

export default function ServicesOverview() {
  return (
    <section
      className="py-16 bg-(--rs-primary-100) relative overflow-hidden lg:max-h-250"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
        <div className="flex flex-col space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h2
              id="services-heading"
              className="text-4xl text-merriweather-value-h1 font-bold text-(--rs-primary-600) mb-4"
            >
              Cut Your Recruitment Costs with our tools!
            </h2>
            <p className="text-[18px] md:text-[24px] text-(--rs-primary-600) max-w-4xl mx-auto leading-relaxed">
              We simplify every aspect of building and managing leadership teams
              globally streamlined processes, cultural fit insights, and compliance
              support, all in one trusted partner.
            </p>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap justify-center md:justify-start md:max-w-232.5 items-center gap-2 md:gap-3 mb-8 bg-services-tags py-5 md:py-4 px-6 md:px-5 border-yellow-200 border-2 rounded-xl mx-auto">
            {serviceTags.map((tag) => (
              <span
                key={tag}
                className="bg-white text-rs-service-source-sans px-4 md:px-4 py-2 rounded-full font-medium text-sm md:text-base hover:bg-rs-primary-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-default"
              >
                {tag}
              </span>
            ))}
            <Link
              href="/services"
              className="bg-rs-primary-200 text-rs-service-source-sans px-4 md:px-4 py-2 rounded-full font-medium hover:bg-rs-primary-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer text-sm md:text-base"
              aria-label="Learn more about our services"
            >
              Learn More About Services
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.tag}
                href="/services"
                className="bg-services-card border-yellow-200 border-2 rounded-xl p-6 text-center md:text-start text-white relative flex flex-col transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer"
              >
                <div className="mb-4 flex justify-center md:justify-start">
                  <span className="bg-gray-200 text-rs-service-source-sans-sm px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {service.tag}
                  </span>
                </div>
                <div className="mb-6 shrink-0">
                  <Image
                    src={service.image}
                    alt={`${service.tag} Services`}
                    width={service.width}
                    height={service.height}
                    className="w-44 sm:w-44.25 md:w-70 h-auto object-contain mx-auto"
                    loading="lazy"
                    style={{ aspectRatio: `${service.width}/${service.height}` }}
                  />
                </div>
                <div className="grow flex flex-col justify-between">
                  <h3 className="text-[24px] sm:text-[20px] md:text-[22px] font-bold mb-4">
                    {service.title}
                  </h3>
                  <div className="text-white text-[1rem] text-rs-service-source px-4 py-2 rounded-lg bg-transparent border border-white hover:bg-white hover:!text-[#1e3a5f] hover:border-white transition duration-300 flex items-center mx-auto md:mx-0 mt-auto">
                    View {service.tag} Details
                    <svg
                      className="w-4 h-4 ml-2 transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Services Button */}
          <div className="flex justify-center mt-8">
            <Button
              href="/services"
              variant="secondary"
              icon={Briefcase}
            >
              View All Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
