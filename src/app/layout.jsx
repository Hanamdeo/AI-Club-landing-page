import localFont from 'next/font/local';
import './globals.css';
import GlobalNavShell from '@/components/ui/GlobalNavShell';
import GlobalFooterShell from '@/components/ui/GlobalFooterShell';

// Futuristic Techno Display Font: LaBeouf (Local - zero network overhead)
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
  title: 'AI CLUB — Madhav Institute of Technology & Science',
  description:
    'Explore the collegiate artificial intelligence research collective at MITS Gwalior. 3D facility journey with robotic companion BDX-01, interactive research archives, and open student engineering.',
  keywords: [
    'AI Club',
    'BDX-01',
    'Autonomous Projector',
    'Data Centre',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Computer Vision',
    'Student Research',
    'MITS Gwalior',
  ],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark bg-[#0A0E10] text-[#E6E2D8] ${labeouf.variable}`}
      style={{ backgroundColor: '#0A0E10', color: '#E6E2D8', colorScheme: 'dark' }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800;900&family=Barlow+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
        />
      </head>
      <body
        className="bg-[#0A0E10] text-ivory font-sans antialiased selection:bg-sage selection:text-graphite font-feature-normal"
        style={{ backgroundColor: '#0A0E10', color: '#E6E2D8' }}
      >
        <GlobalNavShell />
        {children}
        <GlobalFooterShell />
      </body>
    </html>
  );
}
