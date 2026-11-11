import { createMetadata, getBreadcrumbSchema } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Media Gallery & Facility Archive',
  description:
    'Visual documentation of hackathons, robotics testbenches, compute laboratory sessions, and technical symposiums at AI Club MITS Gwalior.',
  path: '/gallery',
  keywords: [
    'AI Club Gallery',
    'MITS Gwalior Hackathon Photos',
    'Robotics Testbench Images',
    'Compute Lab Workshops',
    'AI Club Events Media',
  ],
});

export default function GalleryLayout({ children }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Media Gallery', url: '/gallery' },
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

