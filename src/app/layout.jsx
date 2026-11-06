import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

// Unified Inter typography system across whole project
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Monospace reserved for UNIX terminal CLI buffers and system commands
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata = {
  title: 'THE SIGNAL — AI CLUB // Immersive 3D Experience + BDX-01 Projector',
  description:
    'Explore the next-generation collegiate artificial intelligence facility. 3D corridor journey with autonomous robotic companion BDX-01, interactive holographic projector, and editorial research archive.',
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
      className={`dark ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-graphite text-ivory font-sans antialiased selection:bg-sage selection:text-graphite font-feature-normal">
        {children}
      </body>
    </html>
  );
}
