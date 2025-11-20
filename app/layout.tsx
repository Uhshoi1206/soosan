import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/index.css';
import { generateSEO } from '@/lib/seo';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = generateSEO({
  title: 'Trang Chủ | soosanmotor.com - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam',
  description: 'Chuyên sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu và các loại xe chuyên dụng khác với đa dạng thương hiệu: Soosan, Doosung, Hyundai, Hino, Isuzu, Dongfeng, Chenglong... Giá tốt nhất thị trường!',
  keywords: [
    'xe tải',
    'sơ mi rơ moóc',
    'xe cẩu',
    'xe đầu kéo',
    'soosan',
    'doosung',
    'hyundai',
    'isuzu',
    'hino',
    'xe tải việt nam',
    'mua xe tải',
    'giá xe tải',
    'xe chuyên dụng',
    'thùng đông lạnh',
    'xe xitéc',
    'bồn chở xăng dầu',
  ],
  canonical: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
