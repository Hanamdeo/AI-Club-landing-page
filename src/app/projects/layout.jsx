import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Open Source Systems & Projects Archive',
  description:
    'Production inference engines, real-time 3D Gaussian splatting renderers, neural document parsers, and robotics controllers built by student engineers at MITS Gwalior.',
  path: '/projects',
  keywords: [
    'AI Club Projects',
    'Open Source AI Repositories',
    '3D Gaussian Splatting WebGL',
    'KV Cache Compression Engine',
    'Edge AI Hardware Projects',
    'MITS Student GitHub',
  ],
});

export default function ProjectsLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Projects Archive', url: '/projects' },
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
