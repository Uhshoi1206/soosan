import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { trucks } from '@/data/products';
import { generateProductSEO } from '@/lib/seo';
import { generateProductSchema } from '@/lib/structured-data';
import ProductDetailClient from './product-client';

interface PageProps {
  params: Promise<{
    type: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return trucks.map((truck) => ({
    type: truck.type,
    slug: truck.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type, slug } = await params;
  const product = trucks.find((t) => t.type === type && t.slug === slug);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm',
      description: 'Sản phẩm bạn đang tìm kiếm không tồn tại.',
    };
  }

  return generateProductSEO(product);
}

export default async function ProductPage({ params }: PageProps) {
  const { type, slug } = await params;
  const product = trucks.find((t) => t.type === type && t.slug === slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient product={product} />
    </>
  );
}
