import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'AI Radar & Industry News',
  description:
    'Curated artificial intelligence developments, open weight releases, frontier model architectures, and student commentary at MITS Gwalior.',
  path: '/news',
  keywords: [
    'AI Industry News',
    'Open Weights Releases',
    'Machine Learning Radar',
    'DeepSeek Updates',
    'Frontier Model Commentary',
    'AI Club Tech Feed',
  ],
});

export default function NewsLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'AI Radar', url: '/news' },
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

