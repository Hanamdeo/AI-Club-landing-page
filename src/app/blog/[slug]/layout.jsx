import { BLOG_POSTS } from '@/data/blog';
import {
  SITE_URL,
  createMetadata,
  getBlogPostingSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params?.slug);

  if (!post) {
    return createMetadata({
      title: 'Article Not Found',
      description: 'The requested technical research article could not be located in the AI Club archives.',
      path: `/blog/${params?.slug || ''}`,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.publishDate,
    authors: [post.author],
    keywords: post.tags || [],
  });
}

export default function BlogPostLayout({ children, params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params?.slug);

  if (!post) {
    return children;
  }

  const articleSchema = getBlogPostingSchema({
    title: post.title,
    description: post.summary,
    url: `/blog/${post.slug}`,
    datePublished: post.publishDate,
    author: post.author,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Engineering Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
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

