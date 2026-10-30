import './globals.css';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';

export const metadata = {
  metadataBase: new URL('https://aiclub.engineering'),
  title: 'AI CLUB // Bespoke Cyber-Circuit Engineering Collective',
  description: 'Student-led research collective exploring foundational deep learning, high-agency autonomous agent systems, and custom CUDA compiler kernels.',
  keywords: ['AI Club', 'Artificial Intelligence', 'Cybernetic Systems', 'Autonomous Agents', 'Deep Learning', 'GPU Kernels', 'Three.js'],
  authors: [{ name: 'AI CLUB Engineering Core' }],
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'AI CLUB // Bespoke Cyber-Circuit Engineering Collective',
    description: 'Student-led research collective exploring foundational deep learning, high-agency autonomous agent systems, and custom CUDA compiler kernels.',
    url: 'https://aiclub.engineering',
    siteName: 'AI CLUB',
    images: [
      {
        url: '/logo.png',
        width: 602,
        height: 571,
        alt: 'AI CLUB Official Cyber-Circuit Crest',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI CLUB // Bespoke Cyber-Circuit Engineering Collective',
    description: 'Student-led research collective exploring foundational deep learning and high-agency autonomous systems.',
    images: ['/logo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050507',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                background-color: #050507 !important;
                color: #F4F6F8 !important;
                font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 0;
              }
              a { color: inherit; text-decoration: none; }
            `,
          }}
        />
      </head>
      <body className="bg-background text-text-primary antialiased overflow-x-hidden selection:bg-circuit-cyan selection:text-[#050507] min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <NoiseOverlay />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
