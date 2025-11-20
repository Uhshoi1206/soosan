const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://soosanmotor.com';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'soosanmotor.com',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, xe xitéc chở xăng dầu và xe chuyên dụng hàng đầu tại Việt Nam',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'VN',
      addressLocality: 'Việt Nam',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Tư vấn bán hàng',
      areaServed: 'VN',
      availableLanguage: 'Vietnamese',
    },
    sameAs: [],
  };
}

export function generateProductSchema(product: {
  name: string;
  brand: string | string[];
  price?: number;
  priceText?: string;
  description: string;
  thumbnailUrl?: string;
  slug: string;
  type: string;
  weight?: number;
  weightText?: string;
}) {
  const brandName = Array.isArray(product.brand) ? product.brand[0] : product.brand;
  const productUrl = `${SITE_URL}/${product.type}/${product.slug}`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    image: product.thumbnailUrl || `${SITE_URL}/placeholder.svg`,
    url: productUrl,
    sku: product.slug,
  };

  if (product.price && product.price > 0) {
    schema.offers = {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      seller: {
        '@type': 'Organization',
        name: 'soosanmotor.com',
      },
    };
  } else {
    schema.offers = {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: productUrl,
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '0',
        priceCurrency: 'VND',
      },
      seller: {
        '@type': 'Organization',
        name: 'soosanmotor.com',
      },
    };
  }

  if (product.weight || product.weightText) {
    schema.weight = {
      '@type': 'QuantitativeValue',
      value: product.weight || product.weightText,
      unitText: 'tấn',
    };
  }

  return schema;
}

export function generateArticleSchema(article: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  publishDate: string;
  modifiedDate?: string;
  author?: string;
  featuredImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage || `${SITE_URL}/og-image.jpg`,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    author: {
      '@type': 'Person',
      name: article.author || 'soosanmotor.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'soosanmotor.com',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${article.category}/${article.slug}`,
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'soosanmotor.com',
    url: SITE_URL,
    description: 'Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, xe xitéc chở xăng dầu và xe chuyên dụng hàng đầu tại Việt Nam',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateItemListSchema(items: Array<{
  name: string;
  url: string;
  image?: string;
  position: number;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: item.url,
        image: item.image,
      },
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'soosanmotor.com',
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: '+84-XXX-XXX-XXX',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Việt Nam',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.762622,
      longitude: 106.660172,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  };
}
