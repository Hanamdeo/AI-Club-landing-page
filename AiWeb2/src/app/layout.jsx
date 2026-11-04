import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

// 1. Inter: Body · Paragraphs · Navigation (400–500 weight)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// 2. Space Grotesk: Headings · Hero · Section Titles (600–700 weight)
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

// 3. IBM Plex Mono: RESEARCH / COMPUTE / 450+ / Telemetry · Badges · Stats
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'AI CLUB // Autonomous Data Centre Experience',
  description:
    'Explore the next-generation collegiate artificial intelligence facility. Continuous 3D architectural journey through research labs, operations, project archives, and student leadership.',
  keywords: [
    'AI Club',
    'Data Centre',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'Computer Vision',
    'Student Research',
  ],
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
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-graphite text-ivory font-sans antialiased selection:bg-sage selection:text-graphite font-feature-normal">
        {children}
      </body>
    </html>
  );
}
