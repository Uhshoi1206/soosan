
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts, blogCategories } from '@/data/blogData';
import { blogCategoryLabels, BlogPost, blogCategorySlugs } from '@/models/BlogPost';
import Layout from '@/components/Layout';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { CalendarDays, User, ChevronRight, Clock, Search, Tag, TrendingUp, Eye, Lightbulb, Zap, MessageCircle, BookOpen, ArrowRight, Mail, Bell, Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import NewsletterForm from '@/components/NewsletterForm';

const BlogPage = () => {
  // State để lưu trữ kết quả tìm kiếm và phân trang
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // Số bài viết hiển thị trên mỗi trang
  
  // Lấy ra tất cả bài viết và sắp xếp theo thời gian mới nhất
  const allPosts = [...blogPosts].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  
  // Lấy ra 5 bài viết mới nhất cho phần hero
  const latestPosts = allPosts.slice(0, 5);
  
  // Lấy ra top 5 bài viết được xem nhiều nhất
  const mostViewedPosts = [...blogPosts]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);
    
  // Lấy ra top 5 bài viết có nhiều bình luận nhất
  const mostCommentedPosts = [...blogPosts]
    .sort((a, b) => (b.comments || 0) - (a.comments || 0))
    .slice(0, 5);
  
  // Biểu tượng tương ứng cho mỗi danh mục
  const categoryIcons = {
    'industry-news': <TrendingUp className="h-6 w-6" />,
    'product-review': <Tag className="h-6 w-6" />,
    'driver-tips': <User className="h-6 w-6" />,
    'maintenance': <Eye className="h-6 w-6" />,
    'buying-guide': <Lightbulb className="h-6 w-6" />,
    'technology': <Zap className="h-6 w-6" />
  };

  // Mô tả cho mỗi danh mục
  const categoryDescriptions = {
    'industry-news': 'Tin tức mới nhất về ngành vận tải',
    'product-review': 'Đánh giá chi tiết các dòng xe',
    'driver-tips': 'Kỹ năng và kinh nghiệm lái xe',
    'maintenance': 'Bảo dưỡng và chăm sóc xe',
    'buying-guide': 'Hướng dẫn mua xe phù hợp nhu cầu',
    'technology': 'Công nghệ mới trong ngành vận tải'
  };
  
  // Lấy slug tiếng Việt cho danh mục
  const getCategorySlug = (category: string) => {
    return blogCategorySlugs[category as keyof typeof blogCategorySlugs] || category;
  };
  
  // Tạo URL cho bài viết dựa trên danh mục
  const getPostUrl = (blogPost: BlogPost) => {
    const categorySlug = getCategorySlug(blogPost.category);
    return `/${categorySlug}/${blogPost.slug}`;
  };
  
  // Lọc bài viết dựa trên tab đang active và từ khóa tìm kiếm
  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeTab === "all" || post.category === activeTab;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Reset trang khi thay đổi filter hoặc search
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);
  
  // Hàm xử lý tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // Tự động cuộn xuống phần kết quả tìm kiếm
    const resultsSection = document.getElementById('blog-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Cuộn lên đầu kết quả khi chuyển trang
    const resultsSection = document.getElementById('blog-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tạo array số trang để hiển thị pagination
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Layout>
      <Helmet>
        <title>Blog Xe Tải Việt - Tin tức mới nhất về xe tải, xe cẩu, mooc & đầu kéo</title>
        <meta 
          name="description" 
          content="Cập nhật thông tin mới nhất về xe tải, xe cẩu, mooc và đầu kéo. Tư vấn chọn xe, kỹ thuật lái xe, bảo dưỡng và xu hướng công nghệ mới trong ngành vận tải." 
        />
        <meta name="keywords" content="blog xe tải, tin tức xe tải, xe cẩu, mooc, đầu kéo, vận tải việt nam" />
        <link rel="canonical" href="https://preview--ban-xe-tai-viet-78.lovable.app/blog" />
        {/* Schema markup cho BlogPosting */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Blog Xe Tải Việt",
              "url": "https://preview--ban-xe-tai-viet-78.lovable.app/blog",
              "description": "Thông tin hữu ích về xe tải, xe cẩu, mooc và đầu kéo tại Việt Nam",
              "publisher": {
                "@type": "Organization",
                "name": "Xe Tải Việt",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://preview--ban-xe-tai-viet-78.lovable.app/logo.png"
                }
              }
            }
          `}
        </script>
      </Helmet>

      {/* Blog Header Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog Xe Tải Việt</h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
                Thông tin hữu ích về xe tải, xe cẩu, sơ mi rơ mooc, xe đầu kéo và ngành vận tải thương mại tại Việt Nam
              </p>
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  className="pl-10 py-6 rounded-full border-gray-600 bg-gray-800/50 focus:bg-gray-800 text-white" 
                  placeholder="Tìm kiếm bài viết, thông tin xe..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="absolute right-1 top-1 rounded-full px-6">
                  Tìm kiếm
                </Button>
              </form>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="flex flex-col space-y-4">
                {latestPosts.slice(0, 1).map(post => (
                  <Link key={post.id} to={getPostUrl(post)} className="group">
                    <div className="flex items-center bg-gray-800/40 rounded-lg p-3 hover:bg-gray-800 transition">
                      <div className="hidden sm:block w-16 h-16 flex-shrink-0 mr-4">
                        <OptimizedImage 
                          src={post.images[0]} 
                          alt={post.title} 
                          className="w-full h-full object-cover rounded"
                          useCase="thumbnail"
                        />
                      </div>
                      <div>
                        <span className="text-primary text-xs font-medium mb-1 block">
                          {blogCategories[post.category]} • {new Date(post.publishDate).toLocaleDateString('vi-VN')}
                        </span>
                        <h3 className="text-white font-medium group-hover:text-primary/90 transition-colors line-clamp-1">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  {latestPosts.slice(1, 5).map(post => (
                    <Link key={post.id} to={getPostUrl(post)} className="group">
                      <div className="bg-gray-800/40 p-3 rounded-lg hover:bg-gray-800 transition">
                        <span className="text-xs text-primary font-medium mb-1 block">
                          {blogCategories[post.category]}
                        </span>
                        <h3 className="text-sm text-white font-medium group-hover:text-primary/90 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh mục Blog với biểu tượng đẹp mắt */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Object.entries(blogCategories).map(([category, label]) => (
              <Link 
                key={category} 
                to={`/danh-muc-bai-viet/${getCategorySlug(category)}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-center border border-gray-100 hover:border-primary/20 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {category === 'industry-news' && <TrendingUp className="h-6 w-6" />}
                  {category === 'product-review' && <Tag className="h-6 w-6" />}
                  {category === 'driver-tips' && <User className="h-6 w-6" />}
                  {category === 'maintenance' && <Eye className="h-6 w-6" />}
                  {category === 'buying-guide' && <Lightbulb className="h-6 w-6" />}
                  {category === 'technology' && <Zap className="h-6 w-6" />}
                </div>
                <h2 className="text-xl font-bold mb-1">{label}</h2>
                <p className="text-gray-600 text-sm">
                  {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Filter & Blog Posts Section */}
      <div id="blog-results" className="container mx-auto px-4 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Bài Viết Mới Nhất</h2>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 flex flex-wrap bg-transparent h-auto p-0 gap-2">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-4 py-2 text-sm"
              >
                Tất cả
              </TabsTrigger>
              {Object.entries(blogCategories).map(([category, label]) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-4 py-2 text-sm"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-6">
              {searchQuery && (
                <p className="mb-4 text-gray-600">
                  Kết quả tìm kiếm cho "{searchQuery}": {filteredPosts.length} bài viết
                </p>
              )}
              
              {/* Hiển thị thông tin phân trang */}
              {filteredPosts.length > 0 && (
                <div className="mb-4 flex justify-between items-center text-sm text-gray-600">
                  <span>
                    Hiển thị {startIndex + 1}-{Math.min(startIndex + postsPerPage, filteredPosts.length)} trong tổng số {filteredPosts.length} bài viết
                  </span>
                  <span>
                    Trang {currentPage} / {totalPages}
                  </span>
                </div>
              )}
              
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map(post => (
                      <Link key={post.id} to={getPostUrl(post)} className="group">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
                          <div className="aspect-video relative overflow-hidden">
                            <OptimizedImage
                              src={post.images[0]}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              useCase="thumbnail"
                            />
                            <div className="absolute top-3 left-3">
                              <Link 
                                to={`/danh-muc-bai-viet/${getCategorySlug(post.category)}`}
                                className="inline-block bg-white/80 backdrop-blur-sm text-primary rounded-full px-3 py-1 text-xs font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {blogCategories[post.category]}
                              </Link>
                            </div>
                            {post.views && (
                              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{post.views}</span>
                              </div>
                            )}
                          </div>
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center">
                                <CalendarDays className="h-3 w-3 mr-1" />
                                {new Date(post.publishDate).toLocaleDateString('vi-VN')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {post.readTime} phút
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                              {post.description}
                            </p>
                            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                              <div className="flex items-center text-sm">
                                <User className="h-4 w-4 mr-1 text-primary/80" />
                                <span className="text-gray-700">{post.author}</span>
                              </div>
                              {post.comments && (
                                <div className="flex items-center text-sm text-gray-500">
                                  <MessageCircle className="h-4 w-4 mr-1" />
                                  <span>{post.comments}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          {currentPage > 1 && (
                            <PaginationItem>
                              <PaginationPrevious 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(currentPage - 1);
                                }}
                              />
                            </PaginationItem>
                          )}
                          
                          {getVisiblePages().map((page, index) => (
                            <PaginationItem key={index}>
                              {page === 'ellipsis' ? (
                                <PaginationEllipsis />
                              ) : (
                                <PaginationLink
                                  href="#"
                                  isActive={currentPage === page}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (typeof page === 'number') {
                                      handlePageChange(page);
                                    }
                                  }}
                                >
                                  {page}
                                </PaginationLink>
                              )}
                            </PaginationItem>
                          ))}
                          
                          {currentPage < totalPages && (
                            <PaginationItem>
                              <PaginationNext 
                                href="#" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(currentPage + 1);
                                }}
                              />
                            </PaginationItem>
                          )}
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-10 text-center">
                  <p className="text-gray-600">Không tìm thấy bài viết nào phù hợp với từ khóa "{searchQuery}"</p>
                </div>
              )}
            </div>
          </Tabs>
        </div>
        
        {/* Bài viết nổi bật & xem nhiều */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* Bài viết đọc nhiều */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Eye className="mr-2 h-5 w-5 text-primary" />
              Đọc Nhiều Nhất
            </h3>
            <div className="space-y-4">
              {mostViewedPosts.map((post, index) => (
                <Link key={post.id} to={getPostUrl(post)} className="group">
                  <div className="flex gap-3 items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition">
                    <span className="font-bold text-xl text-gray-400 group-hover:text-primary transition-colors">{index + 1}</span>
                    <div className="flex-shrink-0 w-16 h-16">
                      <OptimizedImage 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded" 
                        useCase="thumbnail"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Eye className="h-3 w-3 mr-1" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Bài viết bình luận nhiều nhất */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              Thảo Luận Sôi Nổi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mostCommentedPosts.map(post => (
                <Link key={post.id} to={getPostUrl(post)} className="group">
                  <div className="flex gap-3 items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition h-full">
                    <div className="flex-shrink-0 w-20 h-20">
                      <OptimizedImage 
                        src={post.images[0]} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded" 
                        useCase="thumbnail"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-xs text-primary font-medium">{blogCategories[post.category]}</span>
                      <h4 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                        <span className="flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>{post.comments} bình luận</span>
                        </span>
                        <span className="flex items-center group-hover:text-primary transition-colors text-xs">
                          Xem thêm
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Đăng ký nhận tin mới nhất - Section được thiết kế đẹp mắt */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-br from-primary/5 via-white to-blue-50/30 rounded-2xl p-8 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Phần thông tin bên trái */}
              <div>
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Đăng Ký Nhận Tin Mới Nhất</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Nhận thông tin mới nhất về sản phẩm, khuyến mãi và bài viết hữu ích về ngành vận tải thương mại trực tiếp qua email của bạn.
                </p>
                
                {/* Danh sách lợi ích */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Bell className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Tin tức cập nhật hàng tuần về thị trường xe tải</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Gift className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Thông báo khuyến mãi và ưu đãi đặc biệt</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Bài viết chuyên sâu về kỹ thuật và bảo dưỡng</span>
                  </div>
                </div>
              </div>
              
              {/* Form đăng ký bên phải */}
              <div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <NewsletterForm 
                    source="blog"
                    title="Thông Tin Liên Hệ"
                    placeholder="Nhập email của bạn để nhận tin tức mới nhất"
                    buttonText="Đăng Ký Ngay"
                  />
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      Bằng cách đăng ký, bạn đồng ý nhận email từ chúng tôi. Bạn có thể hủy đăng ký bất cứ lúc nào.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
