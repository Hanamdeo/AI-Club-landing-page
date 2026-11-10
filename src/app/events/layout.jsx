import { Barlow_Condensed, Manrope, IBM_Plex_Mono } from 'next/font/google';
import './events.css';

// 1. Barlow Condensed: Headings, Hero titles, Event titles and Section headings
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

// 2. Manrope: Body descriptions, paragraphs, and supporting text
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

// 3. IBM Plex Mono: Navigation labels, dates, event metadata, tags, timestamps and buttons
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono-events',
  display: 'swap',
});

export const metadata = {
  title: 'Operations Board // Events — AI CLUB',
  description:
    'Flagship hackathons, low-level hardware acceleration workshops, and algorithmic code sprints organized by AI Club cohorts at MITS Gwalior.',
};

export default function EventsLayout({ children }) {
  return (
    <div
      className={`events-page ${barlowCondensed.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      {children}
    </div>
  );
}

