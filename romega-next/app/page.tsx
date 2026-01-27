import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main id="main-content" className="bg-[var(--rs-primary-50)]">
      {/* Hero Section */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex items-stretch mt-[104px]"
        role="banner"
      >
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-104px)] lg:max-h-[1000px] items-stretch">
          {/* Left side content */}
          <div className="basis-1/2 md:basis-[45%] flex flex-col justify-center p-6 md:p-16 md:pl-24 space-y-6 h-full relative">
            <Image
              src="/images/home/hero-bg-romega.png"
              alt="Romega Solutions background pattern"
              fill
              className="absolute -left-4 top-4 object-cover overflow-hidden"
              priority
            />

            <h1
              id="hero-heading"
              className="text-center xl:text-left text-merriweather-h3 md:text-merriweather-h2 text-[var(--rs-primary-600)] font-bold relative z-10"
            >
              Empower Your Team with
              <span className="mb-0 md:mb-8 text-center xl:text-left block text-merriweather-h2 text-5xl md:text-merriweather-h1">
                Smarte
                <Image
                  src="/images/home/hero-rs-text-hd.png"
                  alt="RS Solutions logo"
                  width={208}
                  height={60}
                  className="inline-block xl:hidden items-end mt-2 -ml-2 w-36 md:w-52 h-auto"
                />
                <Image
                  src="/images/home/hero-rs-text-hd.png"
                  alt="RS Solutions logo"
                  width={208}
                  height={60}
                  className="xl:inline-block hidden items-end absolute -mt-4 w-52 h-auto"
                />
              </span>
            </h1>

            <p className="text-[var(--rs-neutral-700)] text-[1rem] md:text-[1.25rem] text-center xl:text-left relative z-10 max-w-md mx-auto xl:mx-0">
              Transform your HR operations to boost productivity, engagement, and growth for your business:
            </p>

            <ul
              className="text-[var(--rs-neutral-700)] space-y-1 md:text-[1.25rem] z-10 flex flex-col items-center xl:items-start mx-auto xl:mx-0"
              role="list"
            >
              {['Cutting edge tools', 'Expert insights', 'Tailored strategies for growth'].map((item) => (
                <li key={item} className="flex items-center space-x-3" role="listitem">
                  <Image
                    src="/images/home/search-check.svg"
                    alt="checkmark icon"
                    width={28}
                    height={28}
                    className="flex-shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Mobile Button */}
            <div className="lg:hidden mt-8 flex justify-center relative z-10 pb-4">
              <a
                href="https://calendly.com/romega-solutions/discoverycall"
                target="_blank"
                rel="noopener noreferrer"
                className="drop-shadow-xl flex items-center justify-center text-[22.5px] font-semibold rounded-xl text-[var(--rs-primary-100)] bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
                style={{ width: '360px', height: '50px' }}
                aria-label="Book an appointment with Romega Solutions"
              >
                <Image
                  src="/images/home/calendar-days.png"
                  alt="calendar icon"
                  width={32}
                  height={32}
                  className="mr-2"
                />
                Book An Appointment
              </a>
            </div>
          </div>

          {/* Right side content - video */}
          <div className="flex-1 h-full relative">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Romega Solutions promotional video"
              poster="/images/home/hero-right.png"
            >
              <source src="/images/home/webp/WebsiteAssetVideo.mp4" type="video/mp4" />
              <source src="/images/home/webp/WebsiteAssetVideo.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Desktop CTA Button */}
          <a
            href="https://calendly.com/romega-solutions/discoverycall"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex md:text-[22.5px] absolute drop-shadow-lg items-center justify-center text-sm font-medium rounded-xl text-[var(--rs-primary-50)] bg-[var(--rs-primary-500)] hover:bg-blue-700 focus:ring-4 focus:ring-[var(--rs-primary-600)] border-[var(--rs-primary-600)] transition duration-300 left-1/2 bottom-12 transform -translate-x-1/2 z-10"
            style={{ width: '400px', height: '57px' }}
            aria-label="Book an appointment with Romega Solutions"
          >
            <Image
              src="/images/home/calendar-days.png"
              alt="calendar icon"
              width={27}
              height={27}
              className="mr-2"
            />
            Book An Appointment
          </a>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section
        className="py-16 bg-[var(--rs-neutral-50)] relative overflow-hidden lg:max-h-[1000px]"
        aria-labelledby="value-prop-heading"
      >
        <div className="max-w-7xl mx-auto my-auto items-center px-4 relative z-10">
          <div className="flex flex-col space-y-12 items-center">
            <div className="text-center space-y-6">
              <h2
                id="value-prop-heading"
                className="text-4xl text-merriweather-value-h1 font-bold text-[var(--rs-primary-600)] mb-4"
              >
                Why Businesses Choose Romega
              </h2>
              <p className="text-[18px] md:text-[24px] text-[var(--rs-neutral-600)] max-w-4xl mx-auto leading-relaxed">
                Romega delivers{' '}
                <span className="text-[var(--rs-primary-500)] font-semibold">unmatched service quality</span> and{' '}
                <span className="text-[var(--rs-primary-500)] font-semibold">global reach</span>, giving your team the
                confidence to hire anywhere.{' '}
                <span className="text-[var(--rs-primary-500)] font-semibold">With us excellence isn't optional, it's guaranteed</span>.
              </p>

              <div className="flex justify-center">
                <Link
                  href="/about"
                  className="w-full max-w-[400px] h-[50px] sm:h-[57px] inline-flex text-[18px] sm:text-[22.5px] items-center justify-center px-4 sm:px-8 border-2 border-[var(--rs-primary-600)] text-[var(--rs-primary-600)] font-semibold rounded-[12px] hover:bg-blue-600 hover:text-[var(--rs-primary-50)] transition duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Learn more about Romega Solutions"
                >
                  <Image
                    src="/images/home/bag.svg"
                    alt=""
                    width={27}
                    height={27}
                    className="mr-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                  Find Out More
                </Link>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-8 md:px-0 gap-6 md:gap-8">
              {[
                { title: 'Faster Hires', desc: 'Securing senior leaders quickly to keep your business moving forward.' },
                { title: '15% Lower Fees', desc: 'Offering premium recruitment solutions at more competitive, client-friendly rates.' },
                { title: 'Time Saved', desc: 'Streamlining hiring workflows to free your team for strategic work.' },
                { title: 'Cost Savings', desc: 'Protecting revenue by avoiding costly mis-hires and delays with strategies.' },
                { title: 'High Retention', desc: 'Ensuring leaders stay longer and deliver lasting organizational impact.' },
                { title: 'Global Reach', desc: 'Connecting organizations with executive talent across industries worldwide.' },
              ].map((benefit) => (
                <div key={benefit.title} className="rounded-xl p-6 text-center">
                  <h3 className="text-rs-value-source-sans font-bold text-[46px] text-[#15357a] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-[06122C] text-base">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section
        className="py-16 bg-[var(--rs-primary-100)] relative overflow-hidden lg:max-h-[1000px]"
        aria-labelledby="services-heading"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
          <div className="flex flex-col space-y-12">
            <div className="text-center space-y-6">
              <h2
                id="services-heading"
                className="text-4xl text-merriweather-value-h1 font-bold text-[var(--rs-primary-600)] mb-4"
              >
                Cut Your Recruitment Costs with our tools!
              </h2>
              <p className="text-[18px] md:text-[24px] text-[var(--rs-primary-600)] max-w-4xl mx-auto leading-relaxed">
                We simplify every aspect of building and managing leadership teams globally streamlined processes,
                cultural fit insights, and compliance support, all in one trusted partner.
              </p>
            </div>

            {/* Service Tags */}
            <div className="flex flex-wrap justify-start md:max-w-[930px] md:max-h-[71px] items-center gap-2 md:gap-3 mb-8 bg-services-tags py-[20px] md:py-[16px] px-[50px] md:px-[20px] border-[#fde68a] border-2 rounded-[12px] mx-auto">
              {['RPO', 'BPO', 'Strategic HR', 'Quality Hire', 'Mentoring', 'Teaching'].map((tag) => (
                <span
                  key={tag}
                  className="bg-white text-rs-service-source-sans px-[20px] md:px-4 py-1 rounded-full font-medium text-sm md:text-base"
                >
                  {tag}
                </span>
              ))}
              <Link
                href="/services"
                className="bg-[var(--rs-primary-200)] text-rs-service-source-sans px-[20px] md:px-4 py-1 rounded-full font-medium hover:bg-[var(--rs-primary-300)] hover:text-[var(--rs-primary-100)] transition duration-300 cursor-pointer text-sm md:text-base"
              >
                Learn More
              </Link>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
              {[
                {
                  tag: 'Talent Acquisition',
                  image: '/images/home/webp/talent-acquisition.webp',
                  title: 'Drive growth with strategic sales and marketing.',
                },
                {
                  tag: 'HR Services',
                  image: '/images/home/webp/hr-services.webp',
                  title: 'Strengthen HR with our expert-backed solutions',
                },
                {
                  tag: 'Sales and Marketing',
                  image: '/images/home/webp/sales-and-marketing.webp',
                  title: 'Hire top leaders quickly to grow your teams globally',
                },
              ].map((service) => (
                <Link
                  key={service.tag}
                  href="/services"
                  className="bg-services-card border-[#fde68a] border-2 rounded-[12px] p-6 text-center md:text-start text-white relative flex flex-col transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer"
                >
                  <div className="mb-4 flex justify-center md:justify-start">
                    <span className="bg-gray-200 text-rs-service-source-sans-sm px-3 py-1 rounded-full text-sm font-medium inline-block">
                      {service.tag}
                    </span>
                  </div>
                  <div className="mb-6 flex-shrink-0">
                    <Image
                      src={service.image}
                      alt={service.tag}
                      width={280}
                      height={180}
                      className="w-[176px] sm:w-[177px] md:w-[280px] h-[150px] sm:h-[151px] md:h-[180px] object-contain mx-auto"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <h3 className="text-[24px] sm:text-[20px] md:text-[22px] font-bold mb-4">{service.title}</h3>
                    <div className="text-white text-[1rem] text-rs-service-source px-4 py-2 rounded-lg hover:bg-white hover:text-blue-800 transition duration-300 flex items-center mx-auto md:mx-0 mt-auto">
                      View Details
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All Services Button */}
            <div className="flex justify-center mt-8">
              <Link
                href="/services"
                className="w-[400px] h-[57px] inline-flex text-[22.5px] items-center justify-center px-8 py-3 group border-2 bg-[var(--rs-primary-100)] border-[var(--rs-primary-600)] text-[var(--rs-primary-600)] font-semibold rounded-[12px] hover:bg-blue-600 hover:text-[var(--rs-primary-50)] transition duration-300"
              >
                <Image
                  src="/images/home/bag.svg"
                  alt="Bag Icon"
                  width={27}
                  height={27}
                  className="mr-2 group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-300"
                />
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section
        className="py-16 bg-case relative overflow-hidden lg:max-h-[1000px]"
        aria-labelledby="case-study-heading"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
          <div className="flex flex-col space-y-12">
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
                Discover how we help businesses scale faster with seamless hiring, HR support, and leadership advisory.
              </p>
            </div>

            {/* Case Study Card */}
            <div className="flex flex-col items-center space-y-8 md:space-y-12">
              <div className="w-full flex justify-center xl:hidden">
                <Image
                  src="/images/home/webp/Case Study Photo.webp"
                  alt="Professional team meeting"
                  width={500}
                  height={300}
                  className="w-[376px] sm:w-[500px] h-[220px] sm:h-[300px] object-cover rounded-lg"
                />
              </div>

              <div className="hidden xl:flex xl:flex-row items-center gap-8 md:gap-12 w-full">
                <div className="flex-1 space-y-6">
                  <h3 className="text-[30px] md:text-[40px] text-rs-case-primary-color text-merriweather-value-h1 font-bold leading-tight">
                    How Romega helped a <br />PE-backed firm fill critical leadership roles
                  </h3>
                  <blockquote className="text-rs-case-secondary-color text-rs-case-source-sans text-lg md:text-[20px] leading-relaxed">
                    "Romega placed three VP-level executives in record time, helping us avoid months of lost revenue."
                  </blockquote>
                  <cite className="text-rs-case-secondary-color text-base text-rs-case-source-sans md:text-lg font-medium not-italic">
                    — Martin Reyes, CEO
                  </cite>
                </div>

                <div className="flex-shrink-0">
                  <Image
                    src="/images/home/webp/Case Study Photo.webp"
                    alt="Professional team meeting"
                    width={600}
                    height={350}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="xl:hidden text-center space-y-6 px-4">
                <h3 className="text-[24px] sm:text-[30px] text-rs-case-primary-color text-merriweather-value-h1 font-bold leading-tight">
                  How Romega helped a PE-backed firm fill critical leadership roles
                </h3>
                <blockquote className="text-rs-case-secondary-color text-rs-case-source-sans text-base sm:text-lg leading-relaxed">
                  "Romega placed three VP-level executives in record time, helping us avoid months of lost revenue."
                </blockquote>
                <cite className="text-rs-case-secondary-color text-sm sm:text-base text-rs-case-source-sans font-medium not-italic">
                  — Martin Reyes, CEO
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn Section */}
      <section className="py-16 bg-rs-primary relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-4 relative z-10">
          <div className="flex flex-col space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-[30px] md:text-[40px] text-rs-linked text-merriweather-value-h1 font-bold">
                Stay Connected With Us on LinkedIn
              </h2>
              <p className="text-[18px] md:text-[20px] text-rs-linked-neutral max-w-lg mx-auto leading-relaxed">
                Follow Romega on LinkedIn for leadership insights, hiring strategies, and the latest success stories.
              </p>
            </div>

            <div className="flex justify-center mt-8">
              <a
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
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
