import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo';
import HomePage from './home-client';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = generateSEO({
  title: 'Trang Chủ | soosanmotor.com - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam',
  description: 'Chuyên sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu và các loại xe chuyên dụng khác với đa dạng thương hiệu: Soosan, Doosung, Hyundai, Hino, Isuzu, Dongfeng, Chenglong... Giá tốt nhất thị trường!',
  keywords: [
    'xe tải việt nam',
    'mua xe tải',
    'giá xe tải 2025',
    'sơ mi rơ moóc',
    'xe cẩu soosan',
    'xe đầu kéo',
    'doosung mooc',
    'hyundai xcient',
    'isuzu giga',
    'hino 500',
    'xe chuyên dụng',
    'thùng đông lạnh',
    'xe xitéc xăng dầu',
  ],
  canonical: '/',
});

export default function Page() {
  return <HomePage />;
}
