'use client';

import { Truck } from '@/models/TruckTypes';
import Layout from '@/components/Layout';
import { OptimizedImage } from '@/components/ui/optimized-image';
import CompareButton from '@/components/CompareButton';
import ContactForm from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ChevronRight, Phone } from 'lucide-react';

interface ProductDetailClientProps {
  product: Truck;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/danh-muc-xe" className="hover:text-primary transition-colors">Danh mục xe</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <OptimizedImage
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg mb-4"
              useCase="hero"
            />
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((img, idx) => (
                <OptimizedImage
                  key={idx}
                  src={img}
                  alt={`${product.name} ${idx + 2}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  useCase="thumbnail"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{product.brand}</Badge>
              <Badge variant="outline">{product.type}</Badge>
            </div>

            <div className="text-2xl font-bold text-primary mb-6">
              {product.price ? `${product.price.toLocaleString()} VNĐ` : 'Liên hệ'}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-lg">Thông số kỹ thuật</h3>
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mb-6">
              <Button asChild size="lg" className="flex-1">
                <a href="tel:0123456789">
                  <Phone className="mr-2 h-4 w-4" />
                  Gọi ngay
                </a>
              </Button>
              <CompareButton truck={product} variant="outline" size="lg" />
            </div>
          </div>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Mô tả sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liên hệ tư vấn</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
