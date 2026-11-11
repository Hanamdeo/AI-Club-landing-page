import { EVENTS } from '@/data/events';
import {
  SITE_URL,
  createMetadata,
  getEventSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';

export async function generateMetadata({ params }) {
  const event = EVENTS.find((e) => e.slug === params?.slug);

  if (!event) {
    return createMetadata({
      title: 'Event Not Found',
      description: 'The requested technical event or hackathon could not be located in our records.',
      path: `/events/${params?.slug || ''}`,
    });
  }

  return createMetadata({
    title: event.title,
    description: event.description,
    path: `/events/${event.slug}`,
    keywords: [
      event.category,
      'AI Club Hackathon',
      'MITS Technical Event',
      'Engineering Workshop',
      'Student Competition Gwalior',
    ],
  });
}

export default function EventDetailLayout({ children, params }) {
  const event = EVENTS.find((e) => e.slug === params?.slug);

  if (!event) {
    return children;
  }

  const eventSchema = getEventSchema({
    name: event.title,
    description: event.description,
    startDate: event.date,
    endDate: event.endDate || event.date,
    url: `/events/${event.slug}`,
    locationName: event.venue,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Events & Operations', url: '/events' },
    { name: event.title, url: `/events/${event.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema),
        }}
      />
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

