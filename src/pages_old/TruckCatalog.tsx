import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import FilterSidebar from '@/components/FilterSidebar';
import VehicleGrid from '@/components/catalog/VehicleGrid';
import VehicleTypeTabs from '@/components/catalog/VehicleTypeTabs';
import CatalogHeader from '@/components/catalog/CatalogHeader';
import { Truck, TruckFilters, VehicleType } from '@/models/TruckTypes';
import { trucks } from '@/data/products';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger, 
} from '@/components/ui/drawer';
import { filterVisibleTrucks, getEnabledTypes, isTypeEnabled, getCategoryName } from '@/config/categoryVisibility';

const TruckCatalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // State lưu trữ các tham số filter
  const [filters, setFilters] = useState<TruckFilters>({
    brand: searchParams.get('brand'),
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
    minWeight: searchParams.get('minWeight') ? Number(searchParams.get('minWeight')) : null,
    maxWeight: searchParams.get('maxWeight') ? Number(searchParams.get('maxWeight')) : null,
    vehicleType: searchParams.get('type') as VehicleType | null,
    search: searchParams.get('q')
  });
  
  // State lưu trữ kết quả lọc
  const [filteredTrucks, setFilteredTrucks] = useState<Truck[]>(trucks);
  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  // Cập nhật lại các tham số lọc khi URL thay đổi
  useEffect(() => {
    setFilters({
      brand: searchParams.get('brand'),
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null,
      minWeight: searchParams.get('minWeight') ? Number(searchParams.get('minWeight')) : null,
      maxWeight: searchParams.get('maxWeight') ? Number(searchParams.get('maxWeight')) : null,
      vehicleType: searchParams.get('type') as VehicleType | null,
      search: searchParams.get('q')
    });
  }, [searchParams]);
  
  // Áp dụng bộ lọc khi có thay đổi
  useEffect(() => {
    applyFilters();
  }, [filters]);

  // Cuộn trang lên vị trí danh sách xe sau khi lọc
  useEffect(() => {
    if (isFiltersApplied && gridRef.current) {
      const yOffset = -150; // Điều chỉnh vị trí cuộn để hiển thị danh sách xe
      const y = gridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
      setIsFiltersApplied(false);
    }
  }, [filteredTrucks, isFiltersApplied]);
  
  // Hàm áp dụng bộ lọc
  const applyFilters = () => {
    console.log("Áp dụng bộ lọc:", filters);
    let result = filterVisibleTrucks(trucks);
    
    // Lọc theo loại xe
    if (filters.vehicleType) {
      result = result.filter(truck => truck.type === filters.vehicleType);
    }
    
    // Lọc theo thương hiệu - cập nhật để hỗ trợ mảng thương hiệu
    if (filters.brand) {
      result = result.filter(truck => {
        const vehicleBrands = Array.isArray(truck.brand) ? truck.brand : [truck.brand];
        return vehicleBrands.some(brand => 
          brand.toLowerCase().includes(filters.brand!.toLowerCase())
        );
      });
    }
    
    // Lọc theo giá
    if (filters.minPrice !== null) {
      result = result.filter(truck => truck.price >= (filters.minPrice || 0));
    }
    if (filters.maxPrice !== null) {
      result = result.filter(truck => truck.price <= (filters.maxPrice || Infinity));
    }
    
    // Lọc theo tải trọng
    if (filters.minWeight !== null) {
      result = result.filter(truck => truck.weight >= (filters.minWeight || 0));
    }
    if (filters.maxWeight !== null) {
      result = result.filter(truck => truck.weight <= (filters.maxWeight || Infinity));
    }
    
    // Lọc theo từ khóa tìm kiếm - cập nhật để hỗ trợ mảng thương hiệu
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(truck => {
        const nameMatch = truck.name.toLowerCase().includes(searchLower);
        
        const vehicleBrands = Array.isArray(truck.brand) ? truck.brand : [truck.brand];
        const brandMatch = vehicleBrands.some(brand => 
          brand.toLowerCase().includes(searchLower)
        );
        
        const descriptionMatch = truck.description?.toLowerCase().includes(searchLower);
        const weightTextMatch = truck.weightText.toLowerCase().includes(searchLower);
        
        return nameMatch || brandMatch || descriptionMatch || weightTextMatch;
      });
    }
    
    console.log("Kết quả lọc:", result.length, "xe");
    setFilteredTrucks(result);
  };
  
  // Xử lý thay đổi filter
  const handleFilterChange = (keyOrFilter: keyof TruckFilters | TruckFilters, value?: any) => {
    let newFilters: TruckFilters;
    
    // Nếu tham số là toàn bộ object filters
    if (typeof keyOrFilter === 'object') {
      newFilters = { ...keyOrFilter };
    } else {
      // Nếu là cập nhật một key đơn lẻ
      newFilters = { ...filters, [keyOrFilter]: value };
    }

    // Cập nhật URL search params
    const newSearchParams = new URLSearchParams();
    
    if (newFilters.brand) newSearchParams.set('brand', newFilters.brand);
    if (newFilters.minPrice !== null) newSearchParams.set('minPrice', newFilters.minPrice.toString());
    if (newFilters.maxPrice !== null) newSearchParams.set('maxPrice', newFilters.maxPrice.toString());
    if (newFilters.minWeight !== null) newSearchParams.set('minWeight', newFilters.minWeight.toString());
    if (newFilters.maxWeight !== null) newSearchParams.set('maxWeight', newFilters.maxWeight.toString());
    if (newFilters.vehicleType) newSearchParams.set('type', newFilters.vehicleType);
    if (newFilters.search) newSearchParams.set('q', newFilters.search);
    
    setSearchParams(newSearchParams);
    setFilters(newFilters);
    setIsFiltersApplied(true);
    
    // Đóng drawer trên mobile sau khi áp dụng bộ lọc
    if (isMobile) {
      setIsFilterOpen(false);
    }
  };

  // Xử lý đặt lại bộ lọc
  const handleResetFilters = () => {
    setSearchParams({});
    setFilters({
      brand: null,
      minPrice: null,
      maxPrice: null,
      minWeight: null,
      maxWeight: null,
      vehicleType: null,
      search: null
    });
    setIsFiltersApplied(true);
  };

  // Xử lý thay đổi tab loại xe
  const handleVehicleTypeChange = (vehicleType: VehicleType) => {
    handleFilterChange('vehicleType', vehicleType);
  };

  // Tạo title dựa trên loại xe được chọn
  const enabledTypes = getEnabledTypes();
  const safeSelectedType: VehicleType = (filters.vehicleType && isTypeEnabled(filters.vehicleType))
    ? (filters.vehicleType as VehicleType)
    : (enabledTypes[0] || 'xe-tai');
  const getPageTitle = () => {
    const name = getCategoryName(safeSelectedType) || 'Danh mục xe';
    return `${name} | soosanmotor.com - Danh Mục Xe`;
  };

  return (
    <Layout>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Danh mục đầy đủ các loại xe tải, cẩu, sơ mi rơ mooc và các loại xe chuyên dụng khác với đa dạng thương hiệu và tải trọng. Tìm kiếm và so sánh xe phù hợp với nhu cầu của bạn." />
      </Helmet>
      
      <CatalogHeader />
      
      <div className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <VehicleTypeTabs
            selectedType={safeSelectedType}
            onTypeChange={handleVehicleTypeChange}
          />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile Filter Button */}
            {isMobile && (
              <Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DrawerTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="mb-4 flex items-center justify-center gap-2"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Bộ lọc tìm kiếm</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="px-4">
                  <DrawerHeader>
                    <DrawerTitle>Bộ lọc tìm kiếm</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 max-h-[70vh] overflow-y-auto">
                    <FilterSidebar
                      filters={filters}
                      onFilterChange={handleFilterChange}
                      onResetFilters={handleResetFilters}
                    />
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Đóng</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            )}
            
            {/* Desktop Sidebar */}
            {!isMobile && (
              <div className="md:w-1/4 lg:w-1/5">
                <div className="sticky top-24">
                  <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                  />
                </div>
              </div>
            )}
            
            {/* Vehicle Grid */}
            <div ref={gridRef} className="md:w-3/4 lg:w-4/5">
              <VehicleGrid
                vehicles={filteredTrucks}
                onResetFilters={handleResetFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TruckCatalog;
