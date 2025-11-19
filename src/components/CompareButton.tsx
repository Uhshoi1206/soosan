
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCompare } from '@/contexts/CompareContext';
import { Truck } from '@/models/TruckTypes';
import { GitCompare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompareButtonProps {
  truck: Truck;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showCompareNow?: boolean;
}

const CompareButton: React.FC<CompareButtonProps> = ({ 
  truck, 
  variant = "outline", 
  size = "sm",
  className = "",
  showCompareNow = false
}) => {
  const { addToCompare, removeFromCompare, isInCompare, compareItems } = useCompare();
  const isAdded = isInCompare(truck.id);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAdded) {
      removeFromCompare(truck.id);
    } else {
      addToCompare(truck);
      
      // Nếu có ít nhất một xe khác trong danh sách so sánh
      if (compareItems.length >= 1 && showCompareNow) {
        setTimeout(() => {
          const shouldNavigate = window.confirm('Bạn đã thêm xe vào danh sách so sánh. Bạn có muốn đi đến trang so sánh ngay bây giờ không?');
          if (shouldNavigate) {
            navigate('/so-sanh-xe');
          }
        }, 300);
      }
    }
  };

  return (
    <Button
      variant={isAdded ? "default" : variant}
      size={size}
      onClick={handleClick}
      className={`flex items-center gap-2 ${isAdded ? 'bg-primary hover:bg-primary-600 text-white' : ''} ${className}`}
    >
      <GitCompare className="h-4 w-4" />
      <span>{isAdded ? 'Đã thêm vào so sánh' : 'Thêm vào so sánh'}</span>
    </Button>
  );
};

export default CompareButton;
