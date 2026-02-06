import { MetadataRoute } from 'next';

/**
 * Web App Manifest for PWA Support
 * Defines how the app appears when installed on devices
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Romega Solutions - Smart HR Solutions',
    short_name: 'Romega Solutions',
    description: 'Transform your HR operations with cutting-edge tools, expert insights, and tailored strategies for business growth.',
    start_url: '/',
    display: 'standalone',
    background_color: '#E8F3FC',
    theme_color: '#125BA1',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity', 'hr'],
    lang: 'en-US',
  };
}
