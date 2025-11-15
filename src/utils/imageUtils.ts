/**
 * Utility functions for handling image CDN transformations
 * Converts local image URLs to CDN URLs while maintaining SEO benefits
 */

const CDN_BASE_URL = 'https://cdn.soosanmotor.com';

/**
 * Converts a local image path or external URL to CDN URL
 * For SEO purposes, maintains the appearance of local hosting
 */
export function getCDNImageUrl(originalUrl: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}): string {
  // If already a CDN URL, return as is
  if (originalUrl.includes('cdn.soosanmotor.com')) {
    return originalUrl;
  }

  // If it's an external URL (like unsplash), convert to CDN
  if (originalUrl.startsWith('http')) {
    // Extract filename from URL for CDN mapping
    const urlParts = originalUrl.split('/');
    const filename = urlParts[urlParts.length - 1];
    
    // Create a SEO-friendly CDN URL that appears local
    const seoPath = `/images/${filename}`;
    
    // Apply transformations if specified
    let cdnUrl = `${CDN_BASE_URL}${seoPath}`;
    
    if (options) {
      const params = new URLSearchParams();
      if (options.width) params.append('w', options.width.toString());
      if (options.height) params.append('h', options.height.toString());
      if (options.quality) params.append('q', options.quality.toString());
      if (options.format) params.append('f', options.format);
      
      if (params.toString()) {
        cdnUrl += `?${params.toString()}`;
      }
    }
    
    return cdnUrl;
  }

  // For local paths, convert to CDN
  const cleanPath = originalUrl.startsWith('/') ? originalUrl : `/${originalUrl}`;
  return `${CDN_BASE_URL}${cleanPath}`;
}

/**
 * Generates responsive image URLs for different screen sizes
 */
export function getResponsiveImageUrls(originalUrl: string) {
  return {
    mobile: getCDNImageUrl(originalUrl, { width: 400, quality: 80, format: 'webp' }),
    tablet: getCDNImageUrl(originalUrl, { width: 768, quality: 80, format: 'webp' }),
    desktop: getCDNImageUrl(originalUrl, { width: 1200, quality: 85, format: 'webp' }),
    original: getCDNImageUrl(originalUrl)
  };
}

/**
 * Optimizes image URL for specific use cases
 */
export function getOptimizedImageUrl(originalUrl: string, useCase: 'thumbnail' | 'hero' | 'gallery' | 'detail'): string {
  switch (useCase) {
    case 'thumbnail':
      return getCDNImageUrl(originalUrl, { width: 400, height: 300, quality: 80, format: 'webp' });
    case 'hero':
      return getCDNImageUrl(originalUrl, { width: 1920, height: 800, quality: 90, format: 'webp' });
    case 'gallery':
      return getCDNImageUrl(originalUrl, { width: 800, height: 600, quality: 85, format: 'webp' });
    case 'detail':
      return getCDNImageUrl(originalUrl, { width: 1200, quality: 90, format: 'webp' });
    default:
      return getCDNImageUrl(originalUrl);
  }
}
