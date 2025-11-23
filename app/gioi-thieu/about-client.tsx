'use client';

import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutClient() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Giới Thiệu</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Về Chúng Tôi</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              Chúng tôi là nhà phân phối và sản xuất các loại xe tải, đầu kéo, sơ mi rơ moóc,
              và xe chuyên dụng hàng đầu tại Việt Nam.
            </p>
            <p>
              Với nhiều năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến cho khách hàng
              những sản phẩm chất lượng cao với giá cả hợp lý nhất.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sứ Mệnh</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Cung cấp giải pháp vận tải tối ưu cho doanh nghiệp với sản phẩm chất lượng
              và dịch vụ chuyên nghiệp.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
