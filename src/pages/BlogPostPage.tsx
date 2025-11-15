

import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { blogPosts, blogCategories } from '@/data/blogData';
import { blogCategoryLabels, blogCategorySlugs, slugToBlogCategory } from '@/models/BlogPost';
import Layout from '@/components/Layout';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { CalendarDays, ChevronRight, Clock, Share2, User, ThumbsUp, MessageCircle, BookmarkPlus, Facebook, Twitter, Linkedin, Copy, ArrowLeft, ExternalLink } from 'lucide-react';
import useRelatedTruckForBlogPost from '@/hooks/useRelatedTruckForBlogPost';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import { getVehicleUrlPrefix } from '@/models/TruckTypes';
import ContactForm from '@/components/ContactForm';
import TableOfContents from '@/components/blog/TableOfContents';
import { Helmet } from 'react-helmet-async';

const BlogPostPage = () => {
  const { slug, category } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  
  // Tìm bài viết dựa trên slug
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return (
      <Layout>
        <Helmet>
          <title>Bài viết không tồn tại | soosanmotor.com</title>
        </Helmet>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Bài viết không tồn tại</h1>
          <p className="mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
          <Link to="/blog" className="text-primary hover:underline">Quay lại trang Blog</Link>
        </div>
      </Layout>
    );
  }

  // Lấy slug tiếng Việt cho danh mục
  const getCategorySlug = (category: string) => {
    return blogCategorySlugs[category as keyof typeof blogCategorySlugs] || category;
  };

  // Tìm sản phẩm liên quan nếu bài viết tập trung vào 1 sản phẩm cụ thể
  const relatedTruck = useRelatedTruckForBlogPost(post);

  // Lấy các bài viết liên quan (cùng danh mục, trừ bài viết hiện tại)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
    
  // Các bài viết đề xuất (khác danh mục)
  const recommendedPosts = blogPosts
    .filter(p => p.category !== post.category && p.id !== post.id)
    .slice(0, 2);

  // Tạo initials cho avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  // Tạo URL cho bài viết dựa trên danh mục
  const getPostUrl = (blogPost: typeof post) => {
    const categorySlug = getCategorySlug(blogPost.category);
    return `/${categorySlug}/${blogPost.slug}`;
  };
  
  // Xử lý chia sẻ bài viết
  const handleShareClick = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          toast({
            title: 'Đã sao chép đường dẫn',
            description: 'Đường dẫn bài viết đã được sao chép vào clipboard',
          });
        });
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
    }
  };

  // Lấy ra category slug hiện tại
  const currentCategorySlug = getCategorySlug(post.category);

  // Theo dõi analytics
  useEffect(() => {
    // Tăng lượt xem bài viết (giả lập, thực tế cần API)
    console.log(`Đã xem bài viết: ${post.title}`);
    
    // Ghi nhận nếu có sản phẩm liên quan
    if (relatedTruck) {
      console.log(`Bài viết có đề cập sản phẩm: ${relatedTruck.name}`);
    }
  }, [post.title, relatedTruck]);

  // Tạo structured data schema cho SEO
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description || post.title,
      "image": post.images,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "soosanmotor.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://soosanmotor.com/favicon.ico"
        }
      },
      "datePublished": post.publishDate,
      "dateModified": post.publishDate
    };

    return JSON.stringify(structuredData);
  };

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | soosanmotor.com</title>
        <meta name="description" content={post.description || post.title} />
        <meta name="keywords" content={post.tags?.join(', ') || ''} />
        <meta property="og:title" content={`${post.title} | soosanmotor.com`} />
        <meta property="og:description" content={post.description || post.title} />
        <meta property="og:image" content={post.images[0]} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | soosanmotor.com`} />
        <meta name="twitter:description" content={post.description || post.title} />
        <meta name="twitter:image" content={post.images[0]} />
        <link rel="canonical" href={`https://soosanmotor.com${getPostUrl(post)}`} />
        <script type="application/ld+json">
          {generateStructuredData()}
        </script>
      </Helmet>

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6 py-2">
            <Link to="/" className="text-gray-500 hover:text-primary">Trang chủ</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <Link to="/blog" className="text-gray-500 hover:text-primary">Blog</Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <Link to={`/danh-muc-bai-viet/${currentCategorySlug}`} className="text-gray-500 hover:text-primary">
              {blogCategoryLabels[post.category]}
            </Link>
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            <span className="truncate max-w-[200px] text-gray-700">{post.title}</span>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Quay lại button và meta info */}
                <div className="p-4 md:p-6">
                  <Link to={`/danh-muc-bai-viet/${currentCategorySlug}`} className="inline-flex items-center text-primary hover:underline mb-4">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Quay lại {blogCategoryLabels[post.category]}
                  </Link>
                  
                  {/* Category badge */}
                  <Link 
                    to={`/danh-muc-bai-viet/${currentCategorySlug}`} 
                    className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-4"
                  >
                    {blogCategoryLabels[post.category]}
                  </Link>
                  
                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {post.title}
                  </h1>
                  
                  {/* Post meta */}
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-2">
                        <AvatarImage src="" alt={post.author} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {getInitials(post.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-xs text-gray-500">Chuyên gia xe tải</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{new Date(post.publishDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime} phút đọc</span>
                    </div>
                  </div>
                </div>
                
                {/* Cover image */}
                <div className="aspect-[21/9] relative">
                  <OptimizedImage
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    useCase="hero"
                  />
                </div>
                
                {/* Content with better typography */}
                <div className="p-4 md:p-8">
                  {/* Post content */}
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span key={index} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Share and Like buttons */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-wrap justify-between items-center">
                      <div className="flex gap-4 mb-4 sm:mb-0">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-primary">
                          <ThumbsUp className="h-5 w-5" />
                          <span>Thích</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-primary">
                          <MessageCircle className="h-5 w-5" />
                          <span>Bình luận</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-primary">
                          <BookmarkPlus className="h-5 w-5" />
                          <span>Lưu bài</span>
                        </button>
                      </div>
                      
                      <div className="flex gap-3">
                        <span className="text-sm text-gray-500 mr-2 hidden sm:block">Chia sẻ:</span>
                        <button 
                          className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90"
                          onClick={() => handleShareClick('facebook')}
                        >
                          <Facebook className="h-4 w-4" />
                        </button>
                        <button 
                          className="w-8 h-8 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90"
                          onClick={() => handleShareClick('twitter')}
                        >
                          <Twitter className="h-4 w-4" />
                        </button>
                        <button 
                          className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90"
                          onClick={() => handleShareClick('linkedin')}
                        >
                          <Linkedin className="h-4 w-4" />
                        </button>
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300"
                          onClick={() => handleShareClick('copy')}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Author bio */}
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start bg-gray-50 rounded-xl p-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt={post.author} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xl">
                          {getInitials(post.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg mb-1 text-center sm:text-left">{post.author}</h3>
                        <p className="text-gray-600 mb-3 text-center sm:text-left">Chuyên gia xe tải với hơn 10 năm kinh nghiệm trong ngành vận tải.</p>
                        <div className="flex gap-2 justify-center sm:justify-start">
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Facebook className="h-4 w-4 mr-1" />
                            Theo dõi
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Twitter className="h-4 w-4 mr-1" />
                            Tweet
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* --- Section Sản phẩm đề xuất --- */}
              {relatedTruck && (
                <div className="mt-8">
                  <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      <span className="relative">
                        Sản phẩm đề xuất từ bài viết
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/70"></span>
                      </span>
                    </h2>
                    
                    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6 border border-primary/20">
                      <div className="w-full md:w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-md relative group">
                        <OptimizedImage
                          src={relatedTruck.images[0]}
                          alt={relatedTruck.name}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          useCase="thumbnail"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="flex-1 min-w-0 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="text-xl font-semibold text-primary mb-1 md:mb-0">
                            {relatedTruck.name}
                          </h3>
                          <div className="text-rose-600 font-bold text-lg">
                            {relatedTruck.priceText}
                          </div>
                        </div>
                        
                        <div className="text-gray-700 mb-3 line-clamp-2">
                          {relatedTruck.description}
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
                          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            <span className="font-semibold mr-1">Tải trọng:</span> {relatedTruck.weightText}
                          </span>
                          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            <span className="font-semibold mr-1">Kích thước:</span> {relatedTruck.dimensions}
                          </span>
                          <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            <span className="font-semibold mr-1">Xuất xứ:</span> {relatedTruck.origin || 'Chính hãng'}
                          </span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                          <Button asChild size="lg">
                            <Link 
                              to={`/${getVehicleUrlPrefix(relatedTruck.type)}/${relatedTruck.slug}`}
                              className="flex items-center gap-2"
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              Xem chi tiết xe
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="lg" asChild>
                            <Link to="/lien-he" className="flex items-center gap-2">
                              Liên hệ tư vấn
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600 text-center">
                      <p>Sản phẩm được đề xuất dựa trên nội dung bài viết bạn đang đọc.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bài viết liên quan */}
              {relatedPosts.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">Bài viết liên quan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <Link key={relatedPost.id} to={getPostUrl(relatedPost)} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
                          <div className="aspect-video relative overflow-hidden">
                            <OptimizedImage
                              src={relatedPost.images[0]}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              useCase="thumbnail"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                              <span className="flex items-center">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                {new Date(relatedPost.publishDate).toLocaleDateString('vi-VN')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {relatedPost.readTime} phút
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Danh mục phổ biến */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Danh Mục</h3>
                <div className="space-y-2">
                  {Object.entries(blogCategories).map(([key, label]) => (
                    <Link 
                      key={key} 
                      to={`/danh-muc-bai-viet/${getCategorySlug(key)}`}
                      className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        key === post.category 
                          ? 'bg-primary/20 text-primary font-medium' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Bài viết đề xuất */}
              {recommendedPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">Bài Viết Đề Xuất</h3>
                  <div className="space-y-4">
                    {recommendedPosts.map(recPost => (
                      <Link key={recPost.id} to={getPostUrl(recPost)} className="flex gap-3 group">
                        <div className="w-1/3 aspect-square rounded-md overflow-hidden flex-shrink-0">
                          <OptimizedImage 
                            src={recPost.images[0]} 
                            alt={recPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            useCase="thumbnail"
                          />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-primary font-medium block mb-1">
                            {blogCategories[recPost.category]}
                          </span>
                          <h4 className="text-sm font-bold line-clamp-2 group-hover:text-primary transition-colors">
                            {recPost.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {recPost.readTime} phút
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Form đăng ký tư vấn - Sử dụng ContactForm component */}
              <div className="bg-primary/10 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Đăng Ký Nhận Tư Vấn</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Để lại thông tin để nhận tư vấn miễn phí về sản phẩm phù hợp với nhu cầu của bạn
                </p>
                <ContactForm source="bai-viet-blog" />
              </div>
              
              {/* Tags */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4">Từ Khóa Phổ Biến</h3>
                <div className="flex flex-wrap gap-2">
                  <Link to="/blog?tag=hyundai" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #hyundai
                  </Link>
                  <Link to="/blog?tag=xe-tai" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #xe_tải
                  </Link>
                  <Link to="/blog?tag=van-tai" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #vận_tải
                  </Link>
                  <Link to="/blog?tag=xe-tai-nhe" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #xe_tải_nhẹ
                  </Link>
                  <Link to="/blog?tag=xe-cau" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #xe_cẩu
                  </Link>
                  <Link to="/blog?tag=so-mi-ro-mooc" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #sơ_mi_rơ_mooc
                  </Link>
                  <Link to="/blog?tag=dong-co" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #động_cơ
                  </Link>
                  <Link to="/blog?tag=lai-xe" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #lái_xe
                  </Link>
                  <Link to="/blog?tag=bao-duong" className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm">
                    #bảo_dưỡng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Table of Contents Component */}
      <TableOfContents content={post.content} />
    </Layout>
  );
};

export default BlogPostPage;

