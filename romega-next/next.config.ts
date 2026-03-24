import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    const isProduction = process.env.NODE_ENV === 'production';
    const mediaCdnOrigin = process.env.NEXT_PUBLIC_MEDIA_CDN_ORIGIN?.trim();
    const mediaSrcDirective = mediaCdnOrigin ? `'self' ${mediaCdnOrigin}` : "'self'";

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: isProduction
              ? `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://calendly.com https://assets.calendly.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com; font-src 'self' https://fonts.gstatic.com https://assets.calendly.com; img-src 'self' data: https: blob:; media-src ${mediaSrcDirective}; connect-src 'self' https://www.google-analytics.com https://calendly.com https://*.supabase.co https://*.vercel.app https://api.emailjs.com; frame-src https://calendly.com; object-src 'none'; base-uri 'self'; form-action 'self';`
              : `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://calendly.com https://assets.calendly.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com; font-src 'self' https://fonts.gstatic.com https://assets.calendly.com; img-src 'self' data: https: blob:; media-src ${mediaSrcDirective}; connect-src 'self' https://www.google-analytics.com https://calendly.com https://localhost:* https://*.supabase.co https://*.vercel.app https://api.emailjs.com; frame-src https://calendly.com; object-src 'none';`
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JavaScript chunks
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Production optimization and security
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header

  // Vercel CDN Optimization - Output standalone for optimal edge caching
  // Disabled in CI where we use `next start` for E2E testing
  ...(process.env.CI ? {} : { output: 'standalone' as const }),

  // Compiler options for production optimization
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Target modern browsers to reduce bundle size (ES2020+ features)
  // This reduces legacy JavaScript transpilation significantly
  // Configured via browserslist in package.json
  transpilePackages: [],

  // Image optimization for Vercel CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'www.romegasolutions.com',
      },
    ],
    // Minimize attack surface
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Image optimization formats (Vercel auto-serves based on browser support)
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Image quality options
    qualities: [75, 85, 90],
    // Vercel CDN will cache optimized images at edge
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    // Limit concurrent image optimization (Vercel limits)
    unoptimized: false,
  },

  // Turbopack configuration (Next.js 16+ default)
  // Pin the app root because the repo intentionally contains another lockfile one level up.
  turbopack: {
    root: process.cwd(),
  },

  // Webpack configuration for additional security (fallback for non-Turbopack builds)
  webpack: (config, { isServer }) => {
    // Additional security configurations
    if (!isServer) {
      // Obfuscation in production
      if (process.env.NODE_ENV === 'production') {
        config.optimization.minimize = true;
        config.devtool = false; // Disable source maps in production
      }
    }
    return config;
  },

  // Enable ETags for better caching with Vercel CDN
  generateEtags: true,

  // Compress responses (Vercel handles this at edge, but enable for local dev)
  compress: true,

  // Experimental features for better performance
  experimental: {
    // Optimize CSS loading (requires critters, skip in CI)
    optimizeCss: !process.env.CI,
    // Optimize package imports
    optimizePackageImports: ['lucide-react'],
  },

  // Modern browser targets - reduce legacy JS polyfills
  // This configuration tells Next.js to target modern browsers
  // Reduces bundle size by 10-15% by not transpiling ES2020+ features
  // Supports: Chrome 91+, Edge 91+, Firefox 90+, Safari 15+
  // (covers 95%+ of users as of 2024)
};

export default nextConfig;
