
import { BlogPost } from '@/models/BlogPost';
import { loadAllBlogPosts } from '@/utils/blogLoader';
import * as industryNewsModule from './industry-news';
import * as productReviewModule from './product-review';
import * as buyingGuideModule from './buying-guide';
import * as driverTipsModule from './driver-tips';
import * as maintenanceModule from './maintenance';
import * as technologyModule from './technology';

// Tạo một instance để lưu trữ dữ liệu đã được load
let cachedBlogData: {
  industryNewsPosts: BlogPost[];
  productReviewPosts: BlogPost[];
  buyingGuidePosts: BlogPost[];
  driverTipsPosts: BlogPost[];
  maintenancePosts: BlogPost[];
  technologyPosts: BlogPost[];
  allBlogPosts: BlogPost[];
} | null = null;

// Load dữ liệu blog và luôn refresh để có bài viết mới nhất
const getBlogData = () => {
  // Synchronous load for static export
  if (!cachedBlogData || cachedBlogData.allBlogPosts.length === 0) {
    cachedBlogData = loadAllBlogPostsSync();
  }
  return cachedBlogData;
};

// Synchronous version for build time
const loadAllBlogPostsSync = () => {
  const industryNews = Object.values(industryNewsModule).filter((item): item is BlogPost =>
    typeof item === 'object' && item !== null && 'id' in item
  );
  const productReviews = Object.values(productReviewModule).filter((item): item is BlogPost =>
    typeof item === 'object' && item !== null && 'id' in item
  );
  const buyingGuides = Object.values(buyingGuideModule).filter((item): item is BlogPost =>
    typeof item === 'object' && item !== null && 'id' in item
  );
  const driverTips = Object.values(driverTipsModule).filter((item): item is BlogPost =>
    typeof item === 'object' && item !== null && 'id' in item
  );
  const maintenance = Object.values(maintenanceModule).filter((item): item is BlogPost =>
    typeof item === 'object' && item !== null && 'id' in item
  );
  const technology = Object.values(technologyModule).filter((item): item is BlogPost =>
    typeof item === 'object' && item !== null && 'id' in item
  );

  const allPosts = [
    ...industryNews,
    ...productReviews,
    ...buyingGuides,
    ...driverTips,
    ...maintenance,
    ...technology,
  ];

  return {
    allBlogPosts: allPosts,
    industryNewsPosts: industryNews,
    productReviewPosts: productReviews,
    buyingGuidePosts: buyingGuides,
    driverTipsPosts: driverTips,
    maintenancePosts: maintenance,
    technologyPosts: technology,
  };
};

// Initialize data immediately
cachedBlogData = loadAllBlogPostsSync();

// Export initialized data
const industryNewsPosts = cachedBlogData.industryNewsPosts;
const productReviewPosts = cachedBlogData.productReviewPosts;
const buyingGuidePosts = cachedBlogData.buyingGuidePosts;
const driverTipsPosts = cachedBlogData.driverTipsPosts;
const maintenancePosts = cachedBlogData.maintenancePosts;
const technologyPosts = cachedBlogData.technologyPosts;
const allBlogPosts = cachedBlogData.allBlogPosts;

export { 
  industryNewsPosts, 
  productReviewPosts, 
  buyingGuidePosts, 
  driverTipsPosts, 
  maintenancePosts, 
  technologyPosts, 
  allBlogPosts,
  getBlogData 
};
