
import { BlogPost } from '@/models/BlogPost';
import { loadAllBlogPosts } from '@/utils/blogLoader';

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
const getBlogData = async () => {
  // Luôn load lại để đảm bảo có bài viết mới nhất
  cachedBlogData = await loadAllBlogPosts();
  return cachedBlogData;
};

// Tạo các biến empty để export ngay lập tức, sau đó sẽ được populate
let industryNewsPosts: BlogPost[] = [];
let productReviewPosts: BlogPost[] = [];
let buyingGuidePosts: BlogPost[] = [];
let driverTipsPosts: BlogPost[] = [];
let maintenancePosts: BlogPost[] = [];
let technologyPosts: BlogPost[] = [];
let allBlogPosts: BlogPost[] = [];

// Load dữ liệu ngay khi module được import
getBlogData().then(data => {
  industryNewsPosts.length = 0;
  productReviewPosts.length = 0;
  buyingGuidePosts.length = 0;
  driverTipsPosts.length = 0;
  maintenancePosts.length = 0;
  technologyPosts.length = 0;
  allBlogPosts.length = 0;
  
  industryNewsPosts.push(...data.industryNewsPosts);
  productReviewPosts.push(...data.productReviewPosts);
  buyingGuidePosts.push(...data.buyingGuidePosts);
  driverTipsPosts.push(...data.driverTipsPosts);
  maintenancePosts.push(...data.maintenancePosts);
  technologyPosts.push(...data.technologyPosts);
  allBlogPosts.push(...data.allBlogPosts);
});

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
