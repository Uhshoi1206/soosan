import { BlogPost } from '@/models/BlogPost';
import * as industryNews from '@/data/blog-posts/industry-news';
import * as productReview from '@/data/blog-posts/product-review';
import * as buyingGuide from '@/data/blog-posts/buying-guide';
import * as driverTips from '@/data/blog-posts/driver-tips';
import * as maintenance from '@/data/blog-posts/maintenance';
import * as technology from '@/data/blog-posts/technology';

const loadIndustryNewsPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  Object.keys(industryNews).forEach(key => {
    const item = (industryNews as any)[key];
    if (key !== 'default' && item && typeof item === 'object' && item.id) {
      posts.push(item);
    }
  });
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

const loadProductReviewPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  Object.keys(productReview).forEach(key => {
    const item = (productReview as any)[key];
    if (key !== 'default' && item && typeof item === 'object' && item.id) {
      posts.push(item);
    }
  });
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

const loadBuyingGuidePosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  Object.keys(buyingGuide).forEach(key => {
    const item = (buyingGuide as any)[key];
    if (key !== 'default' && item && typeof item === 'object' && item.id) {
      posts.push(item);
    }
  });
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

const loadDriverTipsPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  Object.keys(driverTips).forEach(key => {
    const item = (driverTips as any)[key];
    if (key !== 'default' && item && typeof item === 'object' && item.id) {
      posts.push(item);
    }
  });
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

const loadMaintenancePosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  Object.keys(maintenance).forEach(key => {
    const item = (maintenance as any)[key];
    if (key !== 'default' && item && typeof item === 'object' && item.id) {
      posts.push(item);
    }
  });
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

const loadTechnologyPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  Object.keys(technology).forEach(key => {
    const item = (technology as any)[key];
    if (key !== 'default' && item && typeof item === 'object' && item.id) {
      posts.push(item);
    }
  });
  return posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

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
    industryNewsPostsData,
    productReviewPostsData,
    buyingGuidePostsData,
    driverTipsPostsData,
    maintenancePostsData,
    technologyPostsData
  ] = await Promise.all([
    loadIndustryNewsPosts(),
    loadProductReviewPosts(),
    loadBuyingGuidePosts(),
    loadDriverTipsPosts(),
    loadMaintenancePosts(),
    loadTechnologyPosts()
  ]);

  const allBlogPosts = [
    ...industryNewsPostsData,
    ...productReviewPostsData,
    ...buyingGuidePostsData,
    ...driverTipsPostsData,
    ...maintenancePostsData,
    ...technologyPostsData
  ].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return {
    industryNewsPosts: industryNewsPostsData,
    productReviewPosts: productReviewPostsData,
    buyingGuidePosts: buyingGuidePostsData,
    driverTipsPosts: driverTipsPostsData,
    maintenancePosts: maintenancePostsData,
    technologyPosts: technologyPostsData,
    allBlogPosts
  };
};
