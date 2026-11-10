import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import '../events/events.css';

// 1. Barlow: Clean Grotesque typography for body descriptions & problem statements on the projects page
const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

// 2. Barlow Condensed: Headings, Hero titles, Project card titles and Section headings
const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

// 3. IBM Plex Mono: Navigation labels, tags, tech stacks, benchmarks and action buttons
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono-events',
  display: 'swap',
});

export const metadata = {
  title: 'Project Archive — AI CLUB',
  description:
    'Open-source model serving engines, real-time spatial renderers, and verified benchmarks engineered by AI Club student cohorts at MITS Gwalior.',
};

export default function ProjectsLayout({ children }) {
  return (
    <div
      className={`projects-page events-page ${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`}
    >
      {children}
    </div>
  );
}

