export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogData } from '@/data/blog-posts';
import { generateBlogSEO } from '@/lib/seo';
import { generateArticleSchema } from '@/lib/structured-data';
import BlogPostClient from './blog-post-client';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { allBlogPosts } = await getBlogData();
  return allBlogPosts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const { allBlogPosts } = await getBlogData();
  const post = allBlogPosts.find((p) => p.category === category && p.slug === slug);

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại.',
    };
  }

  return generateBlogSEO(post);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { category, slug } = await params;
  const { allBlogPosts } = await getBlogData();
  const post = allBlogPosts.find((p) => p.category === category && p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostClient />
    </>
  );
}
