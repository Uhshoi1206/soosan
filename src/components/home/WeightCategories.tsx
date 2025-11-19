
import React from 'react';
import { Link } from 'react-router-dom';
import { truckWeights } from '@/data/truckData';
import SectionTitle from '@/components/SectionTitle';
import { Truck } from 'lucide-react';

const WeightCategories: React.FC = () => {
  // Hàm trả về kích thước biểu tượng dựa trên chỉ số của mục tải trọng
  const getIconSize = (index: number): number => {
    // Tăng dần kích thước từ 24px đến 45px theo 8 mức tải trọng
    const baseSize = 24;
    const increment = 3;
    return baseSize + (index * increment);
  };
  
  return (
    <section className="py-16 w-full overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Phân Loại Theo Tải Trọng"
          description="Lựa chọn phương tiện vận tải phù hợp với nhu cầu vận chuyển của bạn dựa theo tải trọng"
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {truckWeights.map((weight, index) => (
            <Link 
              key={weight.id} 
              to={`/danh-muc-xe?minWeight=${weight.minWeight}&maxWeight=${weight.maxWeight}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-100 hover:border-primary/20 transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-primary mb-2">
                  <Truck 
                    className="mx-auto" 
                    strokeWidth={1.5}
                    size={getIconSize(index)}
                  />
                </div>
                <h3 className="font-bold group-hover:text-primary transition-colors mb-1 text-sm sm:text-base">{weight.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeightCategories;
