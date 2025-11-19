
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { trucks, truckWeights } from '@/data/truckData';

interface WeightFilterProps {
  weightRange: number[];
  onWeightChange: (value: number[]) => void;
}

// Tính toán giá trị tối đa của tải trọng từ dữ liệu xe
const calculateMaxWeight = (): number => {
  let maxWeight = 0;
  trucks.forEach(truck => {
    if (truck.weight > maxWeight) {
      maxWeight = truck.weight;
    }
  });
  
  // Làm tròn lên 5 tấn gần nhất để có khoảng giá trị đẹp hơn
  return Math.ceil(maxWeight / 5) * 5;
};

// Lưu trữ giá trị tải trọng tối đa để tránh tính toán lại
const MAX_WEIGHT = 100; // Thay đổi từ 20 lên 100 tấn

export const WeightFilter: React.FC<WeightFilterProps> = ({
  weightRange,
  onWeightChange,
}) => {
  // Theo dõi xem đã có filter nào được áp dụng chưa
  const [isFiltered, setIsFiltered] = useState(false);
  
  useEffect(() => {
    // Kiểm tra nếu giá trị hiện tại khác với giá trị mặc định
    if (weightRange[0] > 0 || weightRange[1] < MAX_WEIGHT) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [weightRange]);
  
  // Hiển thị tên phạm vi tải trọng dựa trên giá trị đã chọn
  const getWeightRangeLabel = () => {
    // Nếu chưa có filter nào được áp dụng, trả về trạng thái mặc định
    if (!isFiltered && weightRange[0] === 0 && weightRange[1] >= MAX_WEIGHT) {
      return "Tất cả tải trọng";
    }
    
    // Tìm xem phạm vi trọng lượng hiện tại có khớp với một trong các phạm vi đã định nghĩa không
    const matchingWeight = truckWeights.find(
      w => Math.abs(w.minWeight - weightRange[0]) < 0.1 && 
           Math.abs(w.maxWeight - weightRange[1]) < 0.1
    );
    
    if (matchingWeight) {
      return matchingWeight.name;
    }
    
    // Các trường hợp khác, hiển thị theo khoảng giá trị
    return `${weightRange[0]} - ${weightRange[1]} tấn`;
  };

  return (
    <div>
      <h3 className="text-base font-medium mb-2">Tải trọng</h3>
      <div className="px-2">
        <Slider
          defaultValue={[0, MAX_WEIGHT]}
          max={MAX_WEIGHT}
          step={0.5}
          value={weightRange}
          onValueChange={onWeightChange}
          className="mb-6"
        />
        <div className="flex justify-between text-sm">
          <span>{weightRange[0]} tấn</span>
          <span>{weightRange[1] >= MAX_WEIGHT ? `Trên ${MAX_WEIGHT} tấn` : `${weightRange[1]} tấn`}</span>
        </div>
        
        {/* Hiển thị thông tin chi tiết về phạm vi tải trọng đang chọn */}
        <div className="text-xs text-muted-foreground mt-2 text-center font-medium">
          Đang chọn: <span className="text-primary">{getWeightRangeLabel()}</span>
        </div>
      </div>
    </div>
  );
};
