
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: BlogCategory;
  images: string[];
  publishDate: number;
  readTime: number;
  author: string;
  tags?: string[];
  views?: number;
  comments?: number;
}

// Định nghĩa các danh mục blog
export type BlogCategory = 'industry-news' | 'product-review' | 'driver-tips' | 'maintenance' | 'buying-guide' | 'technology';

// Nhãn hiển thị cho các danh mục
export const blogCategoryLabels: Record<BlogCategory, string> = {
  'industry-news': 'Tin Tức Ngành Vận Tải',
  'product-review': 'Đánh Giá Xe',
  'driver-tips': 'Kinh Nghiệm Lái Xe',
  'maintenance': 'Bảo Dưỡng',
  'buying-guide': 'Tư Vấn Mua Xe',
  'technology': 'Công Nghệ & Đổi Mới'
};

// Slug tiếng Việt không dấu cho các danh mục
export const blogCategorySlugs: Record<BlogCategory, string> = {
  'industry-news': 'tin-tuc-nganh-van-tai',
  'product-review': 'danh-gia-xe',
  'driver-tips': 'kinh-nghiem-lai-xe',
  'maintenance': 'bao-duong',
  'buying-guide': 'tu-van-mua-xe',
  'technology': 'cong-nghe-doi-moi'
};

// Ánh xạ ngược từ slug tiếng Việt sang BlogCategory
export const slugToBlogCategory: Record<string, BlogCategory> = {
  'tin-tuc-nganh-van-tai': 'industry-news',
  'danh-gia-xe': 'product-review',
  'kinh-nghiem-lai-xe': 'driver-tips',
  'bao-duong': 'maintenance',
  'tu-van-mua-xe': 'buying-guide',
  'cong-nghe-doi-moi': 'technology'
};
