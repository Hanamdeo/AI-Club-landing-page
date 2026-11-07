import { Inter, Archivo, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

// Primary Neo-Grotesque Body typography
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Powerful Archivo Display typography for Master Headings
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['400', '600', '700', '800', '900'],
});

// Space Grotesk for High-Tech / Futuristic Section Titles
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
});

// Precision Monospace for Telemetry, HUD, UNIX terminal & Technical Labels
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500', '600'],
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
      className={`dark ${inter.variable} ${archivo.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-graphite text-ivory font-sans antialiased selection:bg-sage selection:text-graphite font-feature-normal">
        {children}
      </body>
    </html>
  );
}
