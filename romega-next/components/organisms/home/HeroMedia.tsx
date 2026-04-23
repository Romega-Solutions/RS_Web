'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroMediaProps {
  wrapperClassName: string;
  mediaClassName: string;
  ariaLabel: string;
}

interface NetworkInformationLike {
  saveData?: boolean;
  effectiveType?: string;
}

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

// CDN URLs preferred; fall back to the local public file so the video always
// renders during development or when CDN is not yet configured.
const HERO_VIDEO_MP4_URL = (process.env.NEXT_PUBLIC_HERO_VIDEO_MP4_URL || '/romega-video.mp4').trim();
const HERO_VIDEO_WEBM_URL = (process.env.NEXT_PUBLIC_HERO_VIDEO_WEBM_URL || '').trim();
const HERO_VIDEO_POSTER_URL = (process.env.NEXT_PUBLIC_HERO_VIDEO_POSTER_URL || '').trim();

function shouldSkipVideoForVisitor(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  if (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return true;
  }

  const connection = (navigator as NavigatorWithConnection).connection;
  if (connection?.saveData) {
    return true;
  }

  if (connection?.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) {
    return true;
  }

  return false;
}

export default function HeroMedia({
  wrapperClassName,
  mediaClassName,
  ariaLabel,
}: HeroMediaProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [hasPlaybackError, setHasPlaybackError] = useState(false);

  const posterSrc = HERO_VIDEO_POSTER_URL || undefined;
  const hasConfiguredVideoSource = HERO_VIDEO_MP4_URL.length > 0 || HERO_VIDEO_WEBM_URL.length > 0;

  useEffect(() => {
    if (!hasConfiguredVideoSource || shouldSkipVideoForVisitor()) {
      return;
    }

    const element = wrapperRef.current;
    if (!element || typeof window.IntersectionObserver !== 'function') {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasConfiguredVideoSource]);

  const showVideo = hasConfiguredVideoSource && shouldLoadVideo && !hasPlaybackError;

  return (
    <div className={wrapperClassName} data-testid="home-hero-media-wrapper" ref={wrapperRef}>
      {showVideo ? (
        <video
          className={mediaClassName}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={ariaLabel}
          poster={posterSrc}
          data-testid="home-hero-video"
          onError={() => setHasPlaybackError(true)}
        >
          {HERO_VIDEO_WEBM_URL ? <source src={HERO_VIDEO_WEBM_URL} type="video/webm" /> : null}
          {HERO_VIDEO_MP4_URL ? <source src={HERO_VIDEO_MP4_URL} type="video/mp4" /> : null}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          aria-hidden="true"
          className={mediaClassName}
          data-testid="home-hero-poster"
        />
      )}
    </div>
  );
}
