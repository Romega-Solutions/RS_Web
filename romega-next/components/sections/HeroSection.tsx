import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Calendar } from 'lucide-react';

export default function HeroSection() {
  return (
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
            className="absolute -left-4 top-4 w-full h-full sm:h-[80%] object-cover overflow-hidden"
            loading="eager"
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
                height={80}
                className="inline-block xl:hidden items-end mt-2 -ml-2 w-36 md:w-52 h-auto"
                loading="eager"
                priority
              />
              <Image
                src="/images/home/hero-rs-text-hd.png"
                alt="RS Solutions logo"
                width={208}
                height={80}
                className="xl:inline-block hidden items-end absolute -mt-4 w-52 h-auto"
                loading="eager"
                priority
              />
            </span>
          </h1>

          <p className="text-[var(--rs-neutral-700)] text-[1rem] md:text-[1.25rem] text-center xl:text-left relative z-10 max-w-md mx-auto xl:mx-0">
            Transform your HR operations to boost productivity, engagement, and
            growth for your business:
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
                  className="w-[28px] h-[28px] flex-shrink-0"
                  role="presentation"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <div className="lg:hidden mt-8 flex justify-center relative z-10 pb-4">
            <Button
              href="https://calendly.com/romega-solutions/discoverycall"
              variant="primary"
              icon={Calendar}
              external
              ariaLabel="Book an appointment with Romega Solutions"
              className="drop-shadow-xl"
            >
              Book An Appointment
            </Button>
          </div>
        </div>

        {/* Right side - video */}
        <div className="flex-1 h-full relative">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Romega Solutions promotional video"
            poster="/images/home/hero-right.png"
            role="img"
          >
            <source src="/images/home/webp/WebsiteAssetVideo.mp4" type="video/mp4" />
            <source src="/images/home/webp/WebsiteAssetVideo.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Desktop CTA Button */}
        <Button
          href="https://calendly.com/romega-solutions/discoverycall"
          variant="primary"
          icon={Calendar}
          external
          ariaLabel="Book an appointment with Romega Solutions"
          className="hidden lg:flex absolute drop-shadow-lg left-1/2 bottom-12 transform -translate-x-1/2 z-10"
        >
          Book An Appointment
        </Button>
      </div>
    </section>
  );
}
