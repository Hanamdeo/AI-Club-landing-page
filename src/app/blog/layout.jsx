import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Engineering Blog & Technical Insights',
  description:
    'Deep dives into custom Triton kernels, low-rank attention compression, model context protocols, and production ML pipelines by AI Club researchers at MITS Gwalior.',
  path: '/blog',
  keywords: [
    'AI Engineering Blog',
    'Triton GPU Kernels',
    'Multi-Head Latent Attention',
    'Model Context Protocol',
    'Student Tech Articles',
    'Machine Learning Deep Dives',
  ],
});

export default function BlogLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Engineering Blog', url: '/blog' },
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

