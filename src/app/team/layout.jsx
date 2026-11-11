import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Official Cadre & Research Team',
  description:
    'Approved faculty advisors, student leadership, domain architects, and departmental coordinators directing machine learning and autonomous systems at MITS Gwalior.',
  path: '/team',
  keywords: [
    'AI Club Team',
    'MITS AI Leadership',
    'Faculty Mentors AI Club',
    'Student ML Engineers',
    'Core Heads AI Club MITS',
    'Technical Coordinators',
  ],
});

export default function TeamLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Official Cadre', url: '/team' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}

