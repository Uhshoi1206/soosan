import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import CompareClient from './compare-client';

export const metadata: Metadata = generateSEO({
  title: 'So Sánh Xe - So Sánh Giá & Thông Số Xe Tải',
  description: 'So sánh chi tiết giá cả, thông số kỹ thuật của các dòng xe tải, xe cẩu, sơ mi rơ moóc để chọn xe phù hợp nhất.',
  keywords: ['so sánh xe tải', 'so sánh giá', 'thông số xe', 'chọn mua xe tải'],
  canonical: '/so-sanh-xe',
});

export default function ComparePage() {
  return <CompareClient />;
}
