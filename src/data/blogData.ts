
import { BlogPost } from '@/models/BlogPost';
import { allBlogPosts } from './blog-posts';

// Sử dụng hệ thống blog posts mới từ các file riêng lẻ
export const blogPosts: BlogPost[] = allBlogPosts;

// Danh mục blog
export const blogCategories: Record<string, string> = {
  'industry-news': 'Tin Tức Ngành Vận Tải',
  'product-review': 'Đánh Giá Xe',
  'driver-tips': 'Kinh Nghiệm Lái Xe',
  'maintenance': 'Bảo Dưỡng',
  'buying-guide': 'Tư Vấn Mua Xe',
  'technology': 'Công Nghệ & Đổi Mới'
};
