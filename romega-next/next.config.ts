import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
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
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
        ],
      },
    ];
  },

  // Production optimization and security
  reactStrictMode: true,
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Compiler options for production optimization
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Image optimization security
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
  },

  // Turbopack configuration (Next.js 16+ default)
  // Empty config to acknowledge Turbopack usage and silence webpack warning
  turbopack: {},

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

  // Disable x-powered-by and other identifying headers
  generateEtags: false,
  
  // Compress responses
  compress: true,
};

export default nextConfig;
