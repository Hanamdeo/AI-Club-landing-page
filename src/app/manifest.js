import { SITE_NAME, DEFAULT_DESCRIPTION } from '@/lib/seo';

/**
 * Next.js App Router Web App Manifest
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest() {
  return {
    name: 'AI CLUB — Madhav Institute of Technology & Science',
    short_name: 'AI Club MITS',
    description: DEFAULT_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0E10',
    theme_color: '#0A0E10',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

