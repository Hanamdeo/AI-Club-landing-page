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
      className={`dark ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-graphite text-ivory font-sans antialiased selection:bg-sage selection:text-graphite font-feature-normal">
        {children}
      </body>
    </html>
  );
}
