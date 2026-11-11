import localFont from 'next/font/local';
import './globals.css';
import GlobalNavShell from '@/components/ui/GlobalNavShell';
import GlobalFooterShell from '@/components/ui/GlobalFooterShell';
import {
  SITE_URL,
  DEFAULT_SITE_TITLE,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  getOrganizationSchema,
  getWebSiteSchema,
} from '@/lib/seo';

// Local Display Font: LaBeouf
const labeouf = localFont({
  src: [
    {
      path: '../../public/fonts/labeouf/labeouf-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/labeouf/labeouf-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/labeouf/labeouf-italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/labeouf/labeouf-bold-italic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-labeouf',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: 'AI Club MITS',
  authors: [
    { name: 'AI Club MITS Gwalior', url: SITE_URL },
    { name: 'Madhav Institute of Technology and Science', url: 'https://mitsgwalior.in' },
  ],
  generator: 'Next.js',
  keywords: DEFAULT_KEYWORDS,
  creator: 'AI Club MITS Gwalior',
  publisher: 'Madhav Institute of Technology & Science',
  category: 'technology',
  classification: 'Educational & Research Organization',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'en_IN',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI CLUB — Madhav Institute of Technology & Science Official Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@aiclub_mits',
    site: '@aiclub_mits',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0E10',
};

export default function RootLayout({ children }) {
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html
      lang="en"
      className={`dark bg-[#0A0E10] text-[#E6E2D8] ${labeouf.variable}`}
      style={{ backgroundColor: '#0A0E10', color: '#E6E2D8', colorScheme: 'dark' }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body
        className="bg-[#0A0E10] text-ivory font-sans antialiased selection:bg-sage selection:text-graphite font-feature-normal"
        style={{ backgroundColor: '#0A0E10', color: '#E6E2D8' }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:rounded focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <GlobalNavShell />
        {children}
        <GlobalFooterShell />
      </body>
    </html>
  );
}
