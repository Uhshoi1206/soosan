
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import QuickContact from "./components/QuickContact";
import Index from "./pages/Index";
import TruckCatalog from "./pages/TruckCatalog";
import TruckDetail from "./pages/TruckDetail";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import BlogCategoryPage from "./pages/BlogCategoryPage";
import SearchPage from "./pages/SearchPage";
import ComparePage from "./pages/ComparePage";
import CostEstimationPage from "./pages/CostEstimationPage";
import LoanCalculatorPage from "./pages/LoanCalculatorPage";
import OrderNotification from "./components/OrderNotification";
import { CompareProvider } from "./contexts/CompareContext";
import { getEnabledTypes } from "@/config/categoryVisibility";

// Component để cuộn lên đầu trang khi chuyển trang
function ScrollToTopOnMount() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

const App = () => {
  const [isQuickContactOpen, setIsQuickContactOpen] = useState(false);

  const handleOpenQuickContact = () => {
    setIsQuickContactOpen(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CompareProvider>
              {/* Thêm component ScrollToTopOnMount vào đây */}
              <ScrollToTopOnMount />
              <QuickContact isOpen={isQuickContactOpen} setIsOpen={setIsQuickContactOpen} />
              <OrderNotification onOpenQuickContact={handleOpenQuickContact} />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/danh-muc-xe" element={<TruckCatalog />} />
                
                {/* Các route riêng cho từng loại phương tiện - tự động theo cấu hình */}
                {getEnabledTypes().map((type) => (
                  <Route key={type} path={`/${type}/:slug`} element={<TruckDetail />} />
                ))}
                
                {/* Route cho trang so sánh xe */}
                <Route path="/so-sanh-xe" element={<ComparePage />} />
                {/* Thêm route cho so sánh xe với URL thân thiện với SEO */}
                <Route path="/so-sanh-xe/:trucks" element={<ComparePage />} />
                
                {/* Routes cho các trang mới */}
                <Route path="/du-toan-chi-phi" element={<CostEstimationPage />} />
                <Route path="/tinh-lai-suat" element={<LoanCalculatorPage />} />
                
                <Route path="/lien-he" element={<ContactPage />} />
                <Route path="/gioi-thieu" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                
                {/* Cập nhật URL cho danh mục blog */}
                <Route path="/danh-muc-bai-viet/:slug" element={<BlogCategoryPage />} />
                
                {/* Cập nhật URL cho bài viết blog theo cấu trúc mới */}
                <Route path="/:category/:slug" element={<BlogPostPage />} />
                
                {/* Giữ lại URL cũ cho bài viết blog để đảm bảo các liên kết cũ vẫn hoạt động */}
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CompareProvider>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
