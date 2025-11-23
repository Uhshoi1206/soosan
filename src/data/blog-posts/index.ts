
import { BlogPost } from '@/models/BlogPost';
import * as industryNewsModule from './industry-news';
import * as productReviewModule from './product-review';
import * as buyingGuideModule from './buying-guide';
import * as driverTipsModule from './driver-tips';
import * as maintenanceModule from './maintenance';
import * as technologyModule from './technology';

// Synchronous loader
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

// Initialize data immediately for synchronous access
const cachedBlogData = loadAllBlogPostsSync();

// Synchronous getter for build time
export const getBlogData = () => cachedBlogData;

// Export initialized data
export const industryNewsPosts = cachedBlogData.industryNewsPosts;
export const productReviewPosts = cachedBlogData.productReviewPosts;
export const buyingGuidePosts = cachedBlogData.buyingGuidePosts;
export const driverTipsPosts = cachedBlogData.driverTipsPosts;
export const maintenancePosts = cachedBlogData.maintenancePosts;
export const technologyPosts = cachedBlogData.technologyPosts;
export const allBlogPosts = cachedBlogData.allBlogPosts;
