import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import BlogPageClient from './blog-client';


export const metadata: Metadata = generateSEO({
  title: 'Blog - Tin tức & Kiến thức về Xe Tải',
  description: 'Cập nhật tin tức mới nhất về ngành xe tải, hướng dẫn mua xe, bảo dưỡng xe và chia sẻ kinh nghiệm lái xe an toàn.',
  keywords: [
    'blog xe tải',
    'tin tức xe tải',
    'hướng dẫn mua xe',
    'bảo dưỡng xe tải',
    'kinh nghiệm lái xe',
    'xe tải 2025',
  ],
  canonical: '/blog',
});

export default function BlogPage() {
  return <BlogPageClient />;
}
