import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'About the Collective',
  description:
    'Charter, verified history, computational philosophy, and open engineering standards of the AI Club at Madhav Institute of Technology & Science, Gwalior.',
  path: '/about',
  keywords: [
    'About AI Club MITS',
    'AI Club Charter',
    'MITS Gwalior Engineering Society',
    'Student Research Laboratory',
    'Machine Intelligence History',
    'Open Source AI Mission',
  ],
});

export default function AboutLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'About Charter', url: '/about' },
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

