'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import {
  featuredTrucks,
  specializedCranes,
  semiTrailers,
  tractors,
  trucks
} from '@/data/products';
import { getBlogData } from '@/data/blog-posts';
import { blogCategories } from '@/data/blogData';
import { BlogPost } from '@/models/BlogPost';
import VehicleCarousel from '@/components/home/VehicleCarousel';
import BrandCategories from '@/components/home/BrandCategories';
import ContactSection from '@/components/home/ContactSection';
import BlogSection from '@/components/home/BlogSection';
import WeightCategories from '@/components/home/WeightCategories';
import TestimonialSection from '@/components/home/TestimonialSection';
import { isTypeEnabled, getAllCategories } from '@/config/categoryVisibility';

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const data = await getBlogData();
        setBlogPosts(data.allBlogPosts);
      } catch (error) {
        console.error('Error loading blog data:', error);
        setBlogPosts([]);
      }
    };

    loadBlogData();
  }, []);

  const sortedPosts = [...blogPosts].sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  const baseKeys = new Set(['xe-tai', 'xe-cau', 'mooc', 'dau-keo']);
  const extraCategories = getAllCategories().filter(cat => cat.enabled && !baseKeys.has(cat.key));

  return (
    <Layout>
      <Hero />

      <div className="w-full overflow-hidden">
        {isTypeEnabled('xe-tai') && (
          <VehicleCarousel
            vehicles={featuredTrucks}
            title="Xe Tải"
            description="Các dòng xe tải được nhiều khách hàng tin dùng, đa dạng tải trọng và thương hiệu"
            viewAllUrl="/danh-muc-xe?type=xe-tai"
            viewAllText="Xem tất cả xe tải"
          />
        )}

        {isTypeEnabled('xe-cau') && (
          <VehicleCarousel
            vehicles={specializedCranes}
            title="Cẩu"
            description="Các dòng xe cẩu chuyên dụng, đa dạng tải trọng và thương hiệu"
            viewAllUrl="/danh-muc-xe?type=xe-cau"
            viewAllText="Xem tất cả cẩu"
          />
        )}

        {isTypeEnabled('mooc') && (
          <VehicleCarousel
            vehicles={semiTrailers}
            title="Sơ Mi Rơ Mooc"
            description="Các dòng mooc chuyên dụng, đa dạng loại và thương hiệu"
            viewAllUrl="/danh-muc-xe?type=mooc"
            viewAllText="Xem tất cả sơ mi rơ mooc"
          />
        )}

        {isTypeEnabled('dau-keo') && (
          <VehicleCarousel
            vehicles={tractors}
            title="Xe Đầu Kéo"
            description="Các dòng xe đầu kéo, đa dạng công suất và thương hiệu"
            viewAllUrl="/danh-muc-xe?type=dau-keo"
            viewAllText="Xem tất cả xe đầu kéo"
          />
        )}

        {extraCategories.map(cat => (
          isTypeEnabled(cat.key as any) && (
            <VehicleCarousel
              key={cat.key}
              vehicles={trucks.filter(t => t.type === cat.key)}
              title={cat.name}
              description={`Các dòng ${cat.name.toLowerCase()} chuyên dụng, đa dạng mẫu mã`}
              viewAllUrl={`/danh-muc-xe?type=${cat.key}`}
              viewAllText={`Xem tất cả ${cat.name.toLowerCase()}`}
            />
          )
        ))}

        <div className="bg-gray-50 w-full">
          <WeightCategories />
        </div>

        <BrandCategories trucks={trucks} />

        <TestimonialSection products={trucks} />

        <ContactSection />

        <BlogSection posts={sortedPosts.slice(0, 6)} categories={blogCategories} />
      </div>
    </Layout>
  );
}
