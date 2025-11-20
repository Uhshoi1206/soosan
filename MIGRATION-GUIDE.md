# Next.js Migration & SEO Optimization Guide

## Overview
This project has been migrated from Vite + React to Next.js 14+ with comprehensive SEO optimization for top Google search rankings.

## Project Structure

```
project/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with global SEO
│   ├── page.tsx                 # Homepage (server component)
│   ├── home-client.tsx          # Homepage client component
│   ├── [type]/[slug]/           # Dynamic product pages
│   │   ├── page.tsx            # Product detail (server)
│   │   └── product-client.tsx  # Product detail (client)
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── blog-client.tsx
│   ├── [category]/[slug]/       # Dynamic blog posts
│   │   ├── page.tsx            # Blog post (server)
│   │   └── blog-post-client.tsx
│   ├── danh-muc-xe/            # Catalog page
│   ├── lien-he/                # Contact page
│   ├── gioi-thieu/             # About page
│   ├── so-sanh-xe/             # Compare page
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── robots.ts               # Robots.txt configuration
├── lib/
│   ├── seo.ts                  # SEO utilities & metadata generators
│   └── structured-data.ts      # JSON-LD schema generators
├── components/
│   └── OptimizedImage.tsx      # Next.js Image wrapper
├── src/                        # Existing React components (reused)
├── next.config.mjs             # Next.js configuration
├── tsconfig.next.json          # TypeScript for Next.js
└── .env.example                # Environment variables template
```

## Key SEO Features Implemented

### 1. Dynamic Metadata API
Every page uses Next.js `generateMetadata` for:
- Dynamic meta titles with brand and keywords
- SEO-optimized descriptions (155 chars)
- Vietnamese language targeting (vi_VN)
- Canonical URLs for duplicate content
- Open Graph tags for social sharing
- Twitter Card integration

### 2. Structured Data (JSON-LD)

**Organization Schema** (`layout.tsx`)
```typescript
{
  "@type": "Organization",
  "name": "soosanmotor.com",
  "description": "Nhà sản xuất sơ mi rơ moóc...",
  ...
}
```

**Product Schema** (All vehicle pages)
```typescript
{
  "@type": "Product",
  "name": "Hyundai Xcient Đầu Kéo",
  "brand": { "@type": "Brand", "name": "Hyundai" },
  "offers": { ... },
  ...
}
```

**Article Schema** (Blog posts)
```typescript
{
  "@type": "Article",
  "headline": "Title",
  "datePublished": "2025-01-01",
  ...
}
```

**Breadcrumb Schema** (All pages)
```typescript
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### 3. Performance Optimization

**Next.js Image Component**
- Automatic WebP/AVIF conversion
- Responsive image sizes
- Lazy loading by default
- Priority loading for above-fold images

**Code Splitting**
- Automatic route-based splitting
- Dynamic imports for heavy components
- Optimized package imports (lucide-react, radix-ui)

**Caching Strategy**
- Static page generation (SSG) for products
- Incremental Static Regeneration (ISR)
- Proper cache headers

### 4. Technical SEO

**Sitemap.xml** (`app/sitemap.ts`)
- Dynamically generated from all routes
- Includes all products, blog posts, static pages
- Priority and change frequency optimization
- Vietnamese content metadata

**Robots.txt** (`app/robots.ts`)
- Allow all search engines
- Disallow admin/api routes
- Sitemap reference

**URL Structure**
```
✅ Good: /xe-tai/hyundai-mighty-ex8
✅ Good: /industry-news/xe-tai-2025-xu-huong
❌ Bad: /product?id=123
```

## SEO Checklist

### Meta Tags
- [x] Unique title tags (50-60 chars)
- [x] Meta descriptions (150-160 chars)
- [x] Keywords targeting Vietnamese market
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Canonical URLs
- [x] Robots meta tags
- [x] Language tags (vi_VN)

### Structured Data
- [x] Organization schema
- [x] WebSite schema with SearchAction
- [x] Product schema for all vehicles
- [x] Article schema for blog posts
- [x] BreadcrumbList for navigation
- [x] LocalBusiness schema

### Performance
- [x] Next.js Image optimization
- [x] Code splitting & lazy loading
- [x] Font optimization
- [x] CSS optimization
- [x] Bundle size optimization
- [x] Compression enabled

### Content
- [x] Semantic HTML structure
- [x] Proper heading hierarchy (H1-H6)
- [x] Alt text for images
- [x] Internal linking strategy
- [x] Vietnamese language optimization

### Technical
- [x] XML Sitemap
- [x] Robots.txt
- [x] 404 error handling
- [x] Mobile responsive
- [x] HTTPS ready
- [x] Fast page load times

## Running the Next.js Application

### Development
```bash
npm run dev:next
```
Access at: http://localhost:3000

### Production Build
```bash
npm run build:next
npm start
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://soosanmotor.com
```

## Migration Steps Completed

1. ✅ Installed Next.js 16+ with all dependencies
2. ✅ Created App Router structure
3. ✅ Implemented SEO utility functions
4. ✅ Created structured data generators
5. ✅ Migrated all pages with server/client split
6. ✅ Added dynamic metadata generation
7. ✅ Implemented sitemap.xml generation
8. ✅ Configured robots.txt
9. ✅ Created optimized image component
10. ✅ Configured Next.js for production

## Expected Performance Metrics

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Google PageSpeed Insights
- **Mobile**: 90+ score
- **Desktop**: 95+ score

### SEO Scores
- **Google Search Console**: 100% indexable
- **Schema validation**: 0 errors
- **Mobile usability**: Pass all tests

## Google Search Console Setup

1. **Verify ownership**
   - Add HTML meta tag
   - Or upload verification file

2. **Submit sitemap**
   ```
   https://soosanmotor.com/sitemap.xml
   ```

3. **Monitor coverage**
   - Check indexed pages
   - Fix any errors
   - Monitor Core Web Vitals

4. **Rich results testing**
   ```
   https://search.google.com/test/rich-results
   ```
   Test product and article pages

## Vietnamese SEO Best Practices

1. **Keywords Research**
   - "xe tải [brand] [model]"
   - "giá xe tải [specs]"
   - "mua xe tải [location]"
   - "so sánh xe tải"

2. **Content Strategy**
   - Vietnamese language throughout
   - Local business information
   - Regional targeting (Hà Nội, Sài Gòn, etc.)
   - Customer testimonials in Vietnamese

3. **Technical**
   - Language tag: vi-VN
   - Currency: VND
   - Date format: DD/MM/YYYY
   - Vietnamese character encoding (UTF-8)

## Monitoring & Maintenance

### Weekly Tasks
- Check Google Search Console for errors
- Monitor Core Web Vitals
- Review new indexed pages
- Check mobile usability

### Monthly Tasks
- Update sitemap if products change
- Review and update meta descriptions
- Analyze search queries performance
- Update structured data if needed

### Quarterly Tasks
- Full SEO audit
- Competitor analysis
- Update content strategy
- Performance benchmarking

## Common Issues & Solutions

### Images not optimizing
- Ensure images are in supported formats (JPG, PNG, WebP)
- Check `next.config.mjs` image configuration
- Use OptimizedImage component

### Sitemap not updating
- Rebuild application: `npm run build:next`
- Check dynamic data sources are accessible
- Verify NEXT_PUBLIC_SITE_URL is set

### Poor Core Web Vitals
- Reduce image sizes
- Minimize JavaScript bundles
- Use proper lazy loading
- Implement caching headers

### Structured data errors
- Validate at: https://validator.schema.org/
- Check JSON-LD syntax
- Ensure required fields are present

## Next Steps

1. **Deploy to production**
   - Vercel, Netlify, or VPS
   - Set environment variables
   - Configure custom domain

2. **Submit to Google**
   - Google Search Console
   - Google Business Profile
   - Google Analytics 4

3. **Content optimization**
   - Write more blog posts
   - Add product comparisons
   - Create buying guides
   - Customer case studies

4. **Link building**
   - Industry directories
   - Business listings
   - Partner websites
   - Social media profiles

## Resources

- [Next.js SEO](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Vietnamese SEO Guide](https://support.google.com/webmasters/)

## Support

For questions or issues:
1. Check this guide first
2. Review Next.js documentation
3. Test with Google's tools
4. Monitor Search Console reports

---

**Version**: 1.0.0
**Last Updated**: November 2025
**Next.js Version**: 16.0.3
