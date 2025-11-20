export const dynamic = 'force-dynamic';
import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import CatalogClient from './catalog-client';

export const metadata: Metadata = generateSEO({
  title: 'Danh Mục Xe - Xe Tải, Cẩu, Sơ Mi Rơ Moóc, Đầu Kéo',
  description: 'Tìm kiếm và so sánh các dòng xe tải, xe cẩu, sơ mi rơ moóc, xe đầu kéo từ các thương hiệu hàng đầu. Giá tốt nhất, đa dạng tải trọng.',
  keywords: [
    'danh mục xe tải',
    'mua xe tải',
    'so sánh xe tải',
    'giá xe tải 2025',
    'xe cẩu',
    'mooc',
    'đầu kéo',
  ],
  canonical: '/danh-muc-xe',
});

export default function CatalogPage() {
  return <CatalogClient />;
}
