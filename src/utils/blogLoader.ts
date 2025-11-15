
import { BlogPost } from '@/models/BlogPost';

// Tự động load tất cả bài viết từ thư mục industry-news
const loadIndustryNewsPosts = async (): Promise<BlogPost[]> => {
  try {
    const modules = import.meta.glob('/src/data/blog-posts/industry-news/*.ts', { eager: true });
    const posts: BlogPost[] = [];
    
    for (const path in modules) {
      const module = modules[path] as any;
      // Lấy tất cả exports từ file (trừ default export)
      Object.keys(module).forEach(key => {
        if (key !== 'default' && module[key] && typeof module[key] === 'object' && module[key].id) {
          posts.push(module[key]);
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading industry news posts:', error);
    return [];
  }
};

// Tự động load tất cả bài viết từ thư mục product-review
const loadProductReviewPosts = async (): Promise<BlogPost[]> => {
  try {
    const modules = import.meta.glob('/src/data/blog-posts/product-review/*.ts', { eager: true });
    const posts: BlogPost[] = [];
    
    for (const path in modules) {
      if (path.includes('index.ts')) continue; // Bỏ qua file index.ts
      
      const module = modules[path] as any;
      // Lấy tất cả exports từ file (trừ default export)
      Object.keys(module).forEach(key => {
        if (key !== 'default' && module[key] && typeof module[key] === 'object' && module[key].id) {
          posts.push(module[key]);
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading product review posts:', error);
    return [];
  }
};

// Tự động load tất cả bài viết từ thư mục buying-guide
const loadBuyingGuidePosts = async (): Promise<BlogPost[]> => {
  try {
    const modules = import.meta.glob('/src/data/blog-posts/buying-guide/*.ts', { eager: true });
    const posts: BlogPost[] = [];
    
    for (const path in modules) {
      if (path.includes('index.ts')) continue;
      
      const module = modules[path] as any;
      Object.keys(module).forEach(key => {
        if (key !== 'default' && module[key] && typeof module[key] === 'object' && module[key].id) {
          posts.push(module[key]);
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading buying guide posts:', error);
    return [];
  }
};

// Tự động load tất cả bài viết từ thư mục driver-tips
const loadDriverTipsPosts = async (): Promise<BlogPost[]> => {
  try {
    const modules = import.meta.glob('/src/data/blog-posts/driver-tips/*.ts', { eager: true });
    const posts: BlogPost[] = [];
    
    for (const path in modules) {
      if (path.includes('index.ts')) continue;
      
      const module = modules[path] as any;
      Object.keys(module).forEach(key => {
        if (key !== 'default' && module[key] && typeof module[key] === 'object' && module[key].id) {
          posts.push(module[key]);
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading driver tips posts:', error);
    return [];
  }
};

// Tự động load tất cả bài viết từ thư mục maintenance
const loadMaintenancePosts = async (): Promise<BlogPost[]> => {
  try {
    const modules = import.meta.glob('/src/data/blog-posts/maintenance/*.ts', { eager: true });
    const posts: BlogPost[] = [];
    
    for (const path in modules) {
      if (path.includes('index.ts')) continue;
      
      const module = modules[path] as any;
      Object.keys(module).forEach(key => {
        if (key !== 'default' && module[key] && typeof module[key] === 'object' && module[key].id) {
          posts.push(module[key]);
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading maintenance posts:', error);
    return [];
  }
};

// Tự động load tất cả bài viết từ thư mục technology
const loadTechnologyPosts = async (): Promise<BlogPost[]> => {
  try {
    const modules = import.meta.glob('/src/data/blog-posts/technology/*.ts', { eager: true });
    const posts: BlogPost[] = [];
    
    for (const path in modules) {
      if (path.includes('index.ts')) continue;
      
      const module = modules[path] as any;
      Object.keys(module).forEach(key => {
        if (key !== 'default' && module[key] && typeof module[key] === 'object' && module[key].id) {
          posts.push(module[key]);
        }
      });
    }
    
    return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  } catch (error) {
    console.error('Error loading technology posts:', error);
    return [];
  }
};

// Function chính để load tất cả bài viết
export const loadAllBlogPosts = async (): Promise<{
  industryNewsPosts: BlogPost[];
  productReviewPosts: BlogPost[];
  buyingGuidePosts: BlogPost[];
  driverTipsPosts: BlogPost[];
  maintenancePosts: BlogPost[];
  technologyPosts: BlogPost[];
  allBlogPosts: BlogPost[];
}> => {
  const [
    industryNewsPosts,
    productReviewPosts,
    buyingGuidePosts,
    driverTipsPosts,
    maintenancePosts,
    technologyPosts
  ] = await Promise.all([
    loadIndustryNewsPosts(),
    loadProductReviewPosts(),
    loadBuyingGuidePosts(),
    loadDriverTipsPosts(),
    loadMaintenancePosts(),
    loadTechnologyPosts()
  ]);

  const allBlogPosts = [
    ...industryNewsPosts,
    ...productReviewPosts,
    ...buyingGuidePosts,
    ...driverTipsPosts,
    ...maintenancePosts,
    ...technologyPosts
  ].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return {
    industryNewsPosts,
    productReviewPosts,
    buyingGuidePosts,
    driverTipsPosts,
    maintenancePosts,
    technologyPosts,
    allBlogPosts
  };
};
