import './events.css';
import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Operations Board & Technical Events',
  description:
    'Flagship national hackathons, low-level hardware acceleration workshops, and algorithmic code sprints organized by AI Club cohorts at MITS Gwalior.',
  path: '/events',
  keywords: [
    'AI Events MITS Gwalior',
    'National Hackathon 2026',
    'CUDA Bootcamp',
    'Machine Learning Workshops',
    'Student Coding Competitions',
    'AI Symposium Gwalior',
  ],
});

export default function EventsLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Events & Operations', url: '/events' },
  ]);

  return (
    <div className="events-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </div>
  );
}
