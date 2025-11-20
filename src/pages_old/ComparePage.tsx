import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import CompareTable from '@/components/compare/CompareTable';
import CompareEmptyState from '@/components/compare/CompareEmptyState';
import { useCompare } from '@/contexts/CompareContext';
import { trucks } from '@/data/truckData';
import { Truck } from '@/models/TruckTypes';
import { Helmet } from 'react-helmet-async';

const ComparePage = () => {
  const { trucks: trucksParam } = useParams<{ trucks?: string }>();
  const { compareItems, loadTrucksFromUrl } = useCompare();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Tối ưu SEO với useEffect
  useEffect(() => {
    // Thêm title động dựa trên số lượng xe đang so sánh
    if (compareItems.length > 0) {
      const truckNames = compareItems.map(truck => truck.name).join(' vs ');
      document.title = `So Sánh: ${truckNames} | soosanmotor.com - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam`;
    } else {
      document.title = "So Sánh Xe | soosanmotor.com - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam";
    }

    // Cập nhật URL khi danh sách so sánh thay đổi
    if (compareItems.length > 0 && !trucksParam) {
      const slugs = compareItems.map(item => item.slug).join('-vs-');
      navigate(`/so-sanh-xe/${slugs}`, { replace: true });
    }
    
    // Cuộn lên đầu nội dung khi danh sách so sánh thay đổi
    if (contentRef.current) {
      const yOffset = -100;
      const y = contentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [compareItems, navigate, trucksParam]);
  
  // Khi URL có tham số trucks, tải xe từ URL
  useEffect(() => {
    if (trucksParam) {
      loadTrucksFromUrlParam(trucksParam);
    }
  }, [trucksParam]);
  
  // Hàm tải xe từ URL param - đã được tối ưu để tránh reload
  const loadTrucksFromUrlParam = (param: string) => {
    // Tách các slug xe từ URL
    const truckSlugs = param.split('-vs-');
    
    // Nếu không có slug nào, không cần xử lý
    if (truckSlugs.length === 0) return;
    
    // Nếu số lượng xe trong danh sách so sánh đã bằng với số lượng slug, kiểm tra xem có cùng slug không
    if (compareItems.length === truckSlugs.length) {
      const allSlugsMatch = truckSlugs.every(slug => 
        compareItems.some(item => item.slug === slug)
      );
      
      // Nếu tất cả slug đều khớp, không cần tải lại
      if (allSlugsMatch) return;
    }
    
    // Tìm các xe từ dữ liệu có slug khớp với URL
    const trucksFromUrl: Truck[] = [];
    truckSlugs.forEach(slug => {
      const truck = trucks.find(t => t.slug === slug);
      if (truck) {
        trucksFromUrl.push(truck);
      }
    });
    
    // Nếu tìm thấy ít nhất một xe, cập nhật danh sách so sánh
    if (trucksFromUrl.length > 0) {
      loadTrucksFromUrl(trucksFromUrl);
    }
  };

  // Tạo structured data schema cho SEO
  const generateStructuredData = () => {
    if (compareItems.length === 0) return null;

    const comparisonData = {
      "@context": "https://schema.org",
      "@type": "ComparisonTable",
      "about": compareItems.map(truck => ({
        "@type": "Product",
        "name": truck.name,
        "brand": truck.brand,
        "description": `${truck.name} - ${truck.weightText}`,
        "image": truck.thumbnailUrl,
        "offers": {
          "@type": "Offer",
          "price": truck.price,
          "priceCurrency": "VND"
        }
      }))
    };

    return JSON.stringify(comparisonData);
  };

  return (
    <Layout>
      <Helmet>
        <title>
          {compareItems.length > 0 
            ? `So Sánh: ${compareItems.map(truck => truck.name).join(' vs ')} | soosanmotor.com` 
            : "So Sánh Xe | soosanmotor.com"}
        </title>
        <meta name="description" content="So sánh chi tiết các thông số kỹ thuật, giá cả và tính năng của các phương tiện vận tải: xe tải, cẩu, sơ mi rơ moóc và các loại xe chuyên dụng khác." />
        <meta name="keywords" content="so sánh xe tải, so sánh xe cẩu, so sánh sơ mi rơ moóc, đặc điểm kỹ thuật xe tải, giá xe tải" />
        <meta property="og:title" content="So Sánh Xe | soosanmotor.com - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam" />
        <meta property="og:description" content="So sánh chi tiết các thông số kỹ thuật, giá cả và tính năng của các phương tiện vận tải: xe tải, cẩu, sơ mi rơ moóc và các loại xe chuyên dụng khác." />
        <link rel="canonical" href={`https://soosanmotor.com/so-sanh-xe${trucksParam ? '/' + trucksParam : ''}`} />
        {compareItems.length > 0 && (
          <script type="application/ld+json">
            {generateStructuredData()}
          </script>
        )}
      </Helmet>
      
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">So Sánh Xe</h1>
          <p className="text-gray-300">
            So sánh chi tiết các thông số kỹ thuật, giá cả và tính năng của các phương tiện vận tải
          </p>
        </div>
      </div>

      <div ref={contentRef} className="container mx-auto my-12 px-4">
        {compareItems.length > 0 ? (
          <CompareTable trucks={compareItems} />
        ) : (
          <CompareEmptyState />
        )}
      </div>
    </Layout>
  );
};

export default ComparePage;
