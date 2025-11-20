import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

const SITE_NAME = 'soosanmotor.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://soosanmotor.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    authors = [],
    noindex = false,
  } = config;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: authors.map(name => ({ name })),
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'vi_VN',
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function generateProductSEO(product: {
  name: string;
  brand: string | string[];
  price?: number;
  priceText?: string;
  description: string;
  thumbnailUrl?: string;
  slug: string;
  type: string;
}): Metadata {
  const brandName = Array.isArray(product.brand) ? product.brand[0] : product.brand;
  const priceInfo = product.priceText || (product.price ? `${product.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ');

  return generateSEO({
    title: `${product.name} - ${brandName} | Giá ${priceInfo}`,
    description: `${product.description.slice(0, 155)}. Liên hệ ngay để nhận báo giá tốt nhất cho ${product.name} tại ${SITE_NAME}.`,
    keywords: [
      product.name,
      brandName,
      product.type,
      'xe tải',
      'giá xe tải',
      'mua xe tải',
      'soosan',
      'doosung',
      'vietnam',
    ],
    canonical: `/${product.type}/${product.slug}`,
    ogImage: product.thumbnailUrl || DEFAULT_OG_IMAGE,
    ogType: 'product',
  });
}

export function generateBlogSEO(post: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  publishDate: string;
  author?: string;
  featuredImage?: string;
  tags?: string[];
}): Metadata {
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags || [post.category, 'xe tải', 'tin tức', 'blog'],
    canonical: `/${post.category}/${post.slug}`,
    ogImage: post.featuredImage || DEFAULT_OG_IMAGE,
    ogType: 'article',
    publishedTime: post.publishDate,
    authors: post.author ? [post.author] : ['soosanmotor.com'],
  });
}

export function generateBreadcrumbList(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
