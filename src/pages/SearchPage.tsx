import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TruckItem from '@/components/TruckItem';
import { trucks } from '@/data/products';
import { blogPosts } from '@/data/blogData';
import { Truck, VehicleType } from '@/models/TruckTypes';
import { getCategoryName } from '@/config/categoryVisibility';
import { BlogPost } from '@/models/BlogPost';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  // Nhóm xe theo loại
  const groupTrucksByType = (trucks: Truck[]): Record<VehicleType, Truck[]> => {
    return trucks.reduce((acc, truck) => {
      if (!acc[truck.type]) {
        acc[truck.type] = [];
      }
      acc[truck.type].push(truck);
      return acc;
    }, {} as Record<VehicleType, Truck[]>);
  };

  useEffect(() => {
    const performSearch = () => {
      if (!query) return;

      // Tìm kiếm xe - cập nhật để hỗ trợ mảng thương hiệu
      const trucksResult = trucks.filter(truck => {
        const nameMatch = truck.name.toLowerCase().includes(query.toLowerCase());
        
        // Xử lý tìm kiếm thương hiệu cho cả string và mảng
        const vehicleBrands = Array.isArray(truck.brand) ? truck.brand : [truck.brand];
        const brandMatch = vehicleBrands.some(brand => 
          brand.toLowerCase().includes(query.toLowerCase())
        );
        
        const descriptionMatch = truck.description.toLowerCase().includes(query.toLowerCase());
        
        return nameMatch || brandMatch || descriptionMatch;
      });
      setFilteredTrucks(trucksResult);

      // Tìm kiếm bài viết
      const postsResult = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) || 
        post.description.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(postsResult);
    };

    performSearch();
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set('q', searchTerm);
    }
    window.location.href = `/search?${params.toString()}`;
  };

  // Nhóm xe theo loại
  const groupedTrucks = groupTrucksByType(filteredTrucks);
  const vehicleTypes: VehicleType[] = ['xe-tai', 'xe-cau', 'dau-keo', 'mooc'];

  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Kết quả tìm kiếm</h1>
          <p className="text-gray-600 mb-6">
            Tìm kiếm cho từ khóa: <span className="font-semibold">"{query}"</span>
          </p>

          {/* Form tìm kiếm */}
          <form onSubmit={handleSearch} className="flex mb-8 max-w-lg">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm, bài viết..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="ml-2">
              Tìm kiếm
            </Button>
          </form>

          {/* Hiển thị kết quả tìm kiếm */}
          <div className="space-y-10">
            {/* Phần hiển thị sản phẩm theo từng loại */}
            {vehicleTypes.map(type => {
              const vehicles = groupedTrucks[type] || [];
              if (vehicles.length === 0) return null;

              return (
                <div key={type}>
                  <h2 className="text-2xl font-bold mb-4">
                    {getCategoryName(type)} ({vehicles.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {vehicles.map((truck) => (
                      <TruckItem key={truck.id} truck={truck} />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Phần hiển thị bài viết */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Bài viết ({filteredPosts.length})</h2>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition h-full flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={post.images[0]}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Không tìm thấy bài viết nào phù hợp.</p>
              )}
            </div>
          </div>

          {/* Hiển thị khi không có kết quả nào */}
          {filteredTrucks.length === 0 && filteredPosts.length === 0 && query && (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">😢</div>
              <h3 className="text-2xl font-bold mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-600 mb-4">
                Rất tiếc, chúng tôi không tìm thấy kết quả nào cho "{query}".
                <br />
                Vui lòng thử với từ khóa khác.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
