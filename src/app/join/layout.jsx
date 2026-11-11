import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Join the Network & Research Cohorts',
  description:
    'Application pathways, technical domain prerequisites, and student onboarding for joining the AI Club at Madhav Institute of Technology & Science, Gwalior.',
  path: '/join',
  keywords: [
    'Join AI Club MITS',
    'Student Recruitment AI Club',
    'Machine Learning Cohorts',
    'Technical Club Admissions',
    'MITS Student Chapters Application',
    'AI Club Induction',
  ],
});

export default function JoinLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Join the Network', url: '/join' },
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

