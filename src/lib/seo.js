/**
 * src/lib/seo.js
 * Centralized SEO Architecture for AI Club MITS Gwalior.
 * Implements 100% SEO-compliant OpenGraph, Twitter Cards, Canonical URLs,
 * Robots directives, and Schema.org (JSON-LD) Structured Data generators.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://aiclub.mitsgwalior.in');

export const DEFAULT_SITE_TITLE = 'AI CLUB — Madhav Institute of Technology & Science';
export const SITE_NAME = 'AI Club — MITS Gwalior';

export const DEFAULT_DESCRIPTION =
  'Official Artificial Intelligence & Computing Research Club at MITS Gwalior. Exploring cutting-edge machine learning, computer vision, embodied robotics, and distributed systems with student-led open source engineering.';

export const DEFAULT_KEYWORDS = [
  'AI Club',
  'AI Club MITS Gwalior',
  'MITS Gwalior',
  'Madhav Institute of Technology and Science',
  'Artificial Intelligence Club',
  'Machine Learning Research',
  'Deep Learning Student Chapter',
  'Computer Vision',
  'Generative AI',
  'Large Language Models',
  'Robotics and Embodied AI',
  'Student Engineering Society',
  'Open Source AI India',
  'CUDA Acceleration',
  'Distributed Systems',
  'NEX-01 AI Companion',
  'BDX-01 Bot',
  'MITS CSE AI',
  'College AI Research',
  'Hackathons Gwalior',
  'Data Science Student Club',
  'TensorRT Inference',
  'TinyML Microcontrollers',
  'Technical Student Chapters India',
];

/**
 * Standard Next.js 14 Metadata generator helper.
 */
export function createMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  ogType = 'website',
  image = '/og-image.png',
  keywords = [],
  publishedTime,
  modifiedTime,
  authors,
}) {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;

  const resolvedKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    keywords: resolvedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title ? `${title} | ${SITE_NAME}` : DEFAULT_SITE_TITLE,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      alternateLocale: 'en_IN',
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title || DEFAULT_SITE_TITLE} — Official AI Club MITS Preview`,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${SITE_NAME}` : DEFAULT_SITE_TITLE,
      description,
      images: [imageUrl],
      creator: '@aiclub_mits',
      site: '@aiclub_mits',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * JSON-LD: Educational Organization Schema
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: 'AI Club MITS Gwalior',
    alternateName: [
      'AI CLUB MITS',
      'Artificial Intelligence & Computing Research Club',
      'MITS AI Club',
    ],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.png`,
      caption: 'AI Club MITS Official Emblem',
    },
    image: `${SITE_URL}/og-image.png`,
    description: DEFAULT_DESCRIPTION,
    email: 'aiclub@mitsgwalior.in',
    telephone: '+91-751-2409300',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Department of CSE & AI, Madhav Institute of Technology & Science, Racecourse Road',
      addressLocality: 'Gwalior',
      addressRegion: 'Madhya Pradesh',
      postalCode: '474005',
      addressCountry: 'IN',
    },
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: 'Madhav Institute of Technology & Science (Deemed to be University)',
      url: 'https://mitsgwalior.in',
    },
    sameAs: [
      'https://github.com/aiclub-mits',
      'https://linkedin.com/company/aiclub-mits',
      'https://x.com/aiclub_mits',
      'https://discord.gg/aiclub',
    ],
  };
}

/**
 * JSON-LD: WebSite Schema with SearchAction
 */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * JSON-LD: BreadcrumbList Schema
 */
export function getBreadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      })),
    ],
  };
}

/**
 * JSON-LD: Blog Posting Schema
 */
export function getBlogPostingSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = 'AI Club Research Cohort',
  image = '/og-image.png',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    },
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: 'en-US',
  };
}

/**
 * JSON-LD: Event Schema
 */
export function getEventSchema({
  name,
  description,
  startDate,
  endDate,
  url,
  image = '/og-image.png',
  locationName = 'Department of CSE & AI, MITS Gwalior',
  isVirtual = false,
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate: endDate || startDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: isVirtual
      ? 'https://schema.org/OnlineEventAttendanceMode'
      : 'https://schema.org/OfflineEventAttendanceMode',
    location: isVirtual
      ? {
          '@type': 'VirtualLocation',
          url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
        }
      : {
          '@type': 'Place',
          name: locationName,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Madhav Institute of Technology & Science, Racecourse Road',
            addressLocality: 'Gwalior',
            addressRegion: 'Madhya Pradesh',
            postalCode: '474005',
            addressCountry: 'IN',
          },
        },
    image: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    organizer: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

