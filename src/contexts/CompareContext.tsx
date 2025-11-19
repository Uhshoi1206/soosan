
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Truck } from '@/models/TruckTypes';
import { toast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

interface CompareContextType {
  compareItems: Truck[];
  addToCompare: (truck: Truck) => void;
  removeFromCompare: (truckId: string) => void;
  clearCompare: () => void;
  isInCompare: (truckId: string) => boolean;
  generateCompareUrl: () => string;
  loadTrucksFromUrl: (trucks: Truck[]) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 3;
const STORAGE_KEY = 'xetaiviet_compare_items';

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Truck[]>([]);
  
  // Đảm bảo hooks này chỉ được gọi trong context của Router
  const navigate = useNavigate();
  const location = useLocation();
  
  // Load từ localStorage khi khởi tạo
  useEffect(() => {
    const storedItems = localStorage.getItem(STORAGE_KEY);
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        setCompareItems(parsedItems);
      } catch (error) {
        console.error('Error parsing stored compare items', error);
      }
    }
  }, []);

  // Lưu vào localStorage khi state thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
  }, [compareItems]);

  // Thêm xe vào danh sách so sánh
  const addToCompare = (truck: Truck) => {
    if (compareItems.length >= MAX_COMPARE_ITEMS) {
      toast({
        title: "Danh sách so sánh đã đầy",
        description: `Bạn chỉ có thể so sánh tối đa ${MAX_COMPARE_ITEMS} xe cùng lúc.`,
        variant: "destructive",
      });
      return;
    }
    
    if (isInCompare(truck.id)) {
      toast({
        title: "Đã có trong danh sách",
        description: "Xe này đã được thêm vào danh sách so sánh.",
      });
      return;
    }
    
    setCompareItems(prev => [...prev, truck]);
    
    toast({
      title: "Đã thêm vào so sánh",
      description: `${truck.name} đã được thêm vào danh sách so sánh.`,
    });
  };

  // Xóa xe khỏi danh sách so sánh
  const removeFromCompare = (truckId: string) => {
    setCompareItems(prev => prev.filter(item => item.id !== truckId));
    
    toast({
      title: "Đã xóa khỏi so sánh",
      description: "Xe đã được xóa khỏi danh sách so sánh.",
    });
  };

  // Xóa toàn bộ danh sách
  const clearCompare = () => {
    setCompareItems([]);
    
    toast({
      title: "Đã xóa tất cả",
      description: "Danh sách so sánh đã được xóa.",
    });
  };

  // Kiểm tra xe đã có trong danh sách chưa
  const isInCompare = (truckId: string) => {
    return compareItems.some(item => item.id === truckId);
  };
  
  // Tạo URL cho trang so sánh
  const generateCompareUrl = () => {
    if (compareItems.length === 0) {
      return '/so-sanh-xe';
    }
    
    // Tạo URL với ID các xe được chọn
    const truckIds = compareItems.map(truck => truck.id).join('-');
    return `/so-sanh-xe/${truckIds}`;
  };
  
  // Load danh sách xe từ URL
  const loadTrucksFromUrl = (trucks: Truck[]) => {
    if (trucks.length > 0) {
      setCompareItems(trucks);
    }
  };
  
  const value = {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    generateCompareUrl,
    loadTrucksFromUrl
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
