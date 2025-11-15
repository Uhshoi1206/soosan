
import React, { useState, useEffect, useRef } from 'react';
import { notifications, getProductNameById } from '../data/notificationData';
import { Check, X } from 'lucide-react';

interface OrderNotificationProps {
  onOpenQuickContact: () => void;
}

const OrderNotification: React.FC<OrderNotificationProps> = ({ onOpenQuickContact }) => {
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Hiệu ứng chạy khi component được mount
  useEffect(() => {
    // Đặt thời gian hiển thị thông báo sau khi trang web tải
    const initialDelay = setTimeout(() => {
      showNextNotification();
    }, 5000);

    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Hiển thị thông báo tiếp theo
  const showNextNotification = () => {
    if (dismissed) return;
    
    // Hiển thị thông báo
    setIsVisible(true);

    // Sau 10 giây, ẩn thông báo
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      
      // Sau khi ẩn, đợi 20 giây và hiển thị thông báo tiếp theo
      const nextTimeout = setTimeout(() => {
        // Chuyển sang thông báo tiếp theo
        setCurrentNotificationIndex((prevIndex) => (prevIndex + 1) % notifications.length);
        showNextNotification();
      }, 20000);
      
      timeoutRef.current = nextTimeout;
    }, 10000);
    
    timeoutRef.current = hideTimeout;
  };

  // Xử lý khi người dùng click vào thông báo
  const handleNotificationClick = () => {
    onOpenQuickContact();
  };

  // Xử lý khi người dùng đóng thông báo
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setDismissed(true);
  };

  const currentNotification = notifications[currentNotificationIndex];
  if (!currentNotification || !isVisible) return null;

  const productName = getProductNameById(currentNotification.productId);
  
  // Định dạng thời gian
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    const intervals = {
      'năm': 31536000,
      'tháng': 2592000,
      'tuần': 604800,
      'ngày': 86400,
      'giờ': 3600,
      'phút': 60,
      'giây': 1
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      
      if (interval > 0) {
        return `${interval} ${unit}${interval === 1 ? '' : ''} trước`;
      }
    }
    
    return 'vừa xong';
  };

  return (
    <div 
      className={`fixed bottom-2 left-4 max-w-xs sm:max-w-sm w-full z-50 transform transition-all duration-500 ${
        isVisible 
          ? 'translate-x-0 opacity-100' 
          : '-translate-x-full opacity-0'
      }`}
      onClick={handleNotificationClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-primary relative overflow-hidden group cursor-pointer">
        {/* Hiệu ứng gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 pointer-events-none" />
        
        {/* Nút đóng */}
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Đóng thông báo"
        >
          <X size={14} />
        </button>

        <div className="flex items-start">
          {/* Icon check */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="bg-primary/10 rounded-full p-1.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
          </div>
          
          {/* Nội dung */}
          <div className="ml-3 pr-6">
            <p className="text-sm font-semibold text-gray-800">
              {currentNotification.customerName} - <span className="text-primary font-bold">{currentNotification.phone}</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Vừa đặt mua <span className="font-semibold text-primary">{productName}</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {formatTimeAgo(currentNotification.timestamp)}
            </p>
          </div>
        </div>

        {/* Hiệu ứng gợn sóng khi hover */}
        <span className="absolute right-0 bottom-0 h-full w-16 bg-gradient-to-l from-white to-transparent opacity-50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
      </div>
    </div>
  );
};

export default OrderNotification;
