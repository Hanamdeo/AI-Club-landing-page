import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Research Archives & Papers',
  description:
    'Academic publications, technical whitepapers, preprint benchmarks, and algorithmic proofs produced by student research cohorts at MITS Gwalior.',
  path: '/research',
  keywords: [
    'AI Research Papers MITS',
    'Machine Learning Preprints',
    'Deep Learning Benchmarks',
    'Sparse Attention Research',
    'KV Cache Compression',
    'Spatial Perception AI',
  ],
});

export default function ResearchLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Research Archives', url: '/research' },
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

