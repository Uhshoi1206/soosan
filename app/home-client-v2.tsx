'use client';

import Layout from '@/components/Layout';
import Hero from '@/components/Hero';

export default function HomePageV2() {
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Chào mừng đến với soosanmotor.com
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu,
          xe chuyên dụng hàng đầu tại Việt Nam
        </p>
      </div>
    </Layout>
  );
}
