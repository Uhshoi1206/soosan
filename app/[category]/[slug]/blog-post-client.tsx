'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { BlogPost, blogCategorySlugs } from '@/models/BlogPost';
import Layout from '@/components/Layout';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { CalendarDays, ChevronRight, Clock, Share2, User, Facebook, Twitter, Linkedin, Copy, ArrowLeft } from 'lucide-react';
import useRelatedTruckForBlogPost from '@/hooks/useRelatedTruckForBlogPost';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import { getVehicleUrlPrefix } from '@/models/TruckTypes';
import ContactForm from '@/components/ContactForm';
import TableOfContents from '@/components/blog/TableOfContents';
import { getBlogData } from '@/data/blog-posts';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const { toast } = useToast();
  const relatedTruck = useRelatedTruckForBlogPost(post);
  const { allBlogPosts } = getBlogData();

  const relatedPosts = allBlogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const recommendedPosts = allBlogPosts
    .filter(p => p.category !== post.category && p.id !== post.id)
    .slice(0, 2);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getCategorySlug = (category: string) => {
    return blogCategorySlugs[category as keyof typeof blogCategorySlugs] || category;
  };

  const getPostUrl = (blogPost: BlogPost) => {
    const categorySlug = getCategorySlug(blogPost.category);
    return `/${categorySlug}/${blogPost.slug}`;
  };

  const handleShareClick = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;

    switch (platform) {
      case 'copy':
        if (typeof navigator !== 'undefined') {
          navigator.clipboard.writeText(url).then(() => {
            toast({
              title: 'Đã sao chép đường dẫn',
              description: 'Đường dẫn bài viết đã được sao chép vào clipboard',
            });
          });
        }
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

  const currentCategorySlug = getCategorySlug(post.category);

  useEffect(() => {
    console.log(`Đã xem bài viết: ${post.title}`);
    if (relatedTruck) {
      console.log(`Bài viết có đề cập sản phẩm: ${relatedTruck.name}`);
    }
  }, [post.title, relatedTruck]);

  return (
    <Layout>
      <article className="bg-white">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <nav className="flex items-center text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{post.title}</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getInitials(post.author)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-gray-900">{post.author}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{new Date(post.publishDate).toLocaleDateString('vi-VN')}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} phút đọc</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags && post.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <OptimizedImage
              src={post.images[0]}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg"
              useCase="hero"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div
                className="prose prose-lg max-w-none blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {relatedTruck && (
                <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-primary">Sản phẩm liên quan</span>
                  </h3>
                  <div className="flex items-center gap-4">
                    <OptimizedImage
                      src={relatedTruck.images[0]}
                      alt={relatedTruck.name}
                      className="w-24 h-24 object-cover rounded-lg"
                      useCase="thumbnail"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{relatedTruck.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{relatedTruck.description}</p>
                      <Button asChild size="sm" className="mt-2">
                        <Link href={`/${getVehicleUrlPrefix(relatedTruck.type)}/${relatedTruck.slug}`}>
                          Xem chi tiết
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Separator className="my-8" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Chia sẻ bài viết:</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleShareClick('copy')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShareClick('facebook')}>
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShareClick('twitter')}>
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleShareClick('linkedin')}>
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-8" />

              {relatedPosts.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Bài viết liên quan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={getPostUrl(relatedPost)} className="group">
                        <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                          <OptimizedImage
                            src={relatedPost.images[0]}
                            alt={relatedPost.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                            useCase="thumbnail"
                          />
                          <div className="p-4">
                            <h4 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarDays className="h-3 w-3" />
                              <span>{new Date(relatedPost.publishDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                <TableOfContents content={post.content} />

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">Liên hệ tư vấn</h3>
                  <ContactForm compact />
                </div>

                {recommendedPosts.length > 0 && (
                  <div className="bg-white border rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Bài viết đề xuất</h3>
                    <div className="space-y-4">
                      {recommendedPosts.map((recPost) => (
                        <Link key={recPost.id} href={getPostUrl(recPost)} className="group flex gap-3">
                          <OptimizedImage
                            src={recPost.images[0]}
                            alt={recPost.title}
                            className="w-20 h-20 object-cover rounded group-hover:scale-105 transition-transform"
                            useCase="thumbnail"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                              {recPost.title}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>{recPost.readTime} phút</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại trang Blog
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </Layout>
  );
}
