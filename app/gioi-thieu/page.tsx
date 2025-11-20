export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import AboutClient from './about-client';

export const metadata: Metadata = generateSEO({
  title: 'Giới Thiệu - soosanmotor.com',
  description: 'Tìm hiểu về soosanmotor.com - Nhà sản xuất và phân phối xe tải, xe cẩu, sơ mi rơ moóc hàng đầu tại Việt Nam với hơn X năm kinh nghiệm.',
  keywords: ['giới thiệu', 'về chúng tôi', 'soosanmotor', 'xe tải việt nam'],
  canonical: '/gioi-thieu',
});

export default function AboutPage() {
  return <AboutClient />;
}
