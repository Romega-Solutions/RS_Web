import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';
import { Linkedin } from 'lucide-react';

const LinkedInIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const linkedInPosts = [
  {
    url: 'https://www.linkedin.com/posts/romega-solutions_visiondriven-rebrandingwithpurpose-remoteleadership-activity-7348718391022481408-jpoo',
    image: '/images/home/webp/linkedin-post-1.webp',
    alt: 'Romega LinkedIn post about leadership insights',
  },
  {
    url: 'https://www.linkedin.com/posts/romega-solutions_romegasolutions-rebrandreveal-futureofwork-activity-7346111145188986880-b_0c',
    image: '/images/home/webp/linkedin-post-2.webp',
    alt: 'Romega LinkedIn post about hiring strategies',
  },
  {
    url: 'https://www.linkedin.com/posts/romega-solutions_romegasolutions-logoreveal-leadershipsearch-ugcPost-7347144834798800897-Kfip',
    image: '/images/home/webp/linkedin-post-3.webp',
    alt: 'Romega LinkedIn post about success stories',
  },
  {
    url: 'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A105941209&keywords=romega%20solutions',
    image: '/images/home/webp/linkedin-post-4.webp',
    alt: 'Romega LinkedIn post about industry trends',
  },
];

export default function LinkedInSection() {
  return (
    <section className="py-16 bg-rs-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
        <div className="flex flex-col space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h2 className="text-[30px] md:text-[40px] text-rs-primary-700 text-merriweather-value-h1 font-bold">
              Stay Connected With Us on LinkedIn
            </h2>
            <p className="text-lg md:text-xl text-rs-neutral-700 max-w-lg mx-auto leading-relaxed">
              Follow Romega on LinkedIn for leadership insights, hiring strategies,
              and the latest success stories.
            </p>
          </div>

          {/* LinkedIn Images Grid */}
          <div className="flex flex-col items-center">
            {/* Mobile Layout - 2x2 Grid Staggered */}
            <div className="sm:hidden w-full max-w-sm mx-auto">
              {/* First Row */}
              <div className="flex justify-center items-start gap-4 mb-4">
                {/* Left Column */}
                <div className="flex flex-col">
                  <Link
                    href={linkedInPosts[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <Image
                      src={linkedInPosts[0].image}
                      alt={linkedInPosts[0].alt}
                      width={140}
                      height={140}
                      className="w-35 h-auto rounded-lg shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <LinkedInIcon />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Right Column - Offset down */}
                <div className="flex flex-col mt-8">
                  <Link
                    href={linkedInPosts[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <Image
                      src={linkedInPosts[1].image}
                      alt={linkedInPosts[1].alt}
                      width={140}
                      height={140}
                      className="w-35 h-auto rounded-lg shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <LinkedInIcon />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Second Row - Reverse stagger */}
              <div className="flex justify-center items-start gap-4">
                {/* Left Column - Offset up */}
                <div className="flex flex-col -mt-8">
                  <Link
                    href={linkedInPosts[2].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <Image
                      src={linkedInPosts[2].image}
                      alt={linkedInPosts[2].alt}
                      width={140}
                      height={140}
                      className="w-35 h-auto rounded-lg shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <LinkedInIcon />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Right Column */}
                <div className="flex flex-col">
                  <Link
                    href={linkedInPosts[3].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <Image
                      src={linkedInPosts[3].image}
                      alt={linkedInPosts[3].alt}
                      width={140}
                      height={140}
                      className="w-35 h-auto rounded-lg shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <LinkedInIcon />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Small Screen Layout - Up-Down Staggered */}
            <div className="hidden sm:flex lg:hidden justify-center items-start gap-4">
              {linkedInPosts.map((post, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'mt-12' : ''}`}>
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <Image
                      src={post.image}
                      alt={post.alt}
                      width={180}
                      height={180}
                      className="w-45 h-auto rounded-lg shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <LinkedInIcon />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop Layout - Up-Down Staggered */}
            <div className="hidden lg:flex justify-center items-start gap-6">
              {linkedInPosts.map((post, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'mt-16' : ''}`}>
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block"
                  >
                    <Image
                      src={post.image}
                      alt={post.alt}
                      width={220}
                      height={220}
                      className="w-55 h-auto rounded-lg shadow-md group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:-translate-y-2"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white p-3 rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <LinkedInIcon />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Visit LinkedIn Button */}
          <div className="flex justify-center mt-8">
            <Button
              href="https://www.linkedin.com/company/romega-solutions"
              variant="secondary"
              icon={Linkedin}
              external
            >
              Visit Romega on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
