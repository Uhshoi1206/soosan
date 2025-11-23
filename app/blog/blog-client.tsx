'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { getBlogData } from '@/data/blog-posts';
import { BlogPost } from '@/models/BlogPost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export default function BlogPageClient() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const data = getBlogData();
    setBlogPosts(data.allBlogPosts);
  }, []);

  const categories = [
    { slug: 'all', name: 'Tất cả' },
    { slug: 'industry-news', name: 'Tin tức' },
    { slug: 'product-review', name: 'Đánh giá sản phẩm' },
    { slug: 'buying-guide', name: 'Hướng dẫn mua xe' },
    { slug: 'driver-tips', name: 'Kinh nghiệm lái xe' },
    { slug: 'maintenance', name: 'Bảo dưỡng' },
    { slug: 'technology', name: 'Công nghệ' },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog - Tin tức & Kiến thức</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <Badge
              key={cat.slug}
              variant={selectedCategory === cat.slug ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Link
              key={post.id}
              href={`/${post.category}/${post.slug}`}
              className="block hover:shadow-lg transition-shadow"
            >
              <Card>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('vi-VN')}
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Không có bài viết nào trong danh mục này.
          </div>
        )}
      </div>
    </Layout>
  );
}
