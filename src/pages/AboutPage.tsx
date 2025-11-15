
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Giới Thiệu | soosanmotor.com - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam</title>
        <meta name="description" content="Tìm hiểu về Soosan Vina Motor - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam." />
      </Helmet>
      
      <Header />
      
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">Giới Thiệu</h1>
          <p className="text-gray-300">
            Tìm hiểu về Soosan Vina Motor - Nhà sản xuất sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu, xe chuyên dụng hàng đầu tại Việt Nam
          </p>
        </div>
      </div>
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Chúng Tôi Là Ai?</h2>
              <p className="text-gray-700 mb-4">
                Soosan Vina Motor tự hào là nhà sản xuất đa dạng các dòng phương tiện vận tải hàng đầu tại Việt Nam. Với hơn 20 năm kinh nghiệm, chúng tôi cung cấp đầy đủ các loại sơ mi rơ moóc, cẩu, thùng xe tải đông lạnh, Xe xitéc (bồn) chở xăng dầu và các loại xe chuyên dụng khác từ các thương hiệu uy tín như Soosan, Doosung, Hyundai, Hino, Isuzu, Dongfeng, Chenglong,...
              </p>
              <p className="text-gray-700 mb-8">
                Sứ mệnh của chúng tôi là mang đến cho khách hàng những giải pháp vận tải toàn diện với giá cả hợp lý nhất, cùng dịch vụ hậu mãi chuyên nghiệp và tận tâm. Chúng tôi luôn lắng nghe và tư vấn để khách hàng lựa chọn được dòng xe phù hợp nhất với nhu cầu sử dụng và điều kiện tài chính.
              </p>
              <Button asChild className="bg-primary hover:bg-red-700">
                <Link to="/lien-he">Liên hệ với chúng tôi</Link>
              </Button>
            </div>
            <div className="order-first lg:order-last">
              <OptimizedImage 
                src="https://cdn.soosanmotor.com/soosanmotor.com_show-room-Soosan-Vina-Motor.webp" 
                alt="Showroom Soosan Vina Motor"
                className="rounded-lg shadow-lg w-full"
                useCase="gallery"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Tại Sao Chọn Soosan Vina Motor?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Với nhiều năm kinh nghiệm trong lĩnh vực phương tiện vận tải, chúng tôi tự tin mang đến cho khách hàng 
              những sản phẩm và dịch vụ tốt nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-primary mb-4 font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Sản phẩm chất lượng</h3>
                <p className="text-gray-600">
                  Cung cấp xe chính hãng với đầy đủ giấy tờ và bảo hành từ nhà sản xuất.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-primary mb-4 font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Giá cả cạnh tranh</h3>
                <p className="text-gray-600">
                  Cam kết giá bán tốt nhất thị trường và nhiều chương trình khuyến mãi hấp dẫn.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-primary mb-4 font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Hỗ trợ tài chính</h3>
                <p className="text-gray-600">
                  Hỗ trợ khách hàng vay ngân hàng lên đến 70% giá trị xe với lãi suất ưu đãi.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-primary mb-4 font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">Dịch vụ hậu mãi</h3>
                <p className="text-gray-600">
                  Đội ngũ kỹ thuật chuyên nghiệp, hỗ trợ 24/7 và mạng lưới dịch vụ rộng khắp.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Our Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tầm Nhìn & Sứ Mệnh</h2>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Tầm nhìn</h3>
                <p className="text-gray-700">
                  Trở thành đơn vị sản xuất phương tiện vận chuyển hàng đầu Việt Nam, mang lại giá trị thiết thực cho khách hàng 
                  và đóng góp vào sự phát triển của ngành vận tải trong nước.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Sứ mệnh</h3>
                <p className="text-gray-700">
                  Cung cấp những sản phẩm chất lượng nhất, dịch vụ chuyên nghiệp nhất với giá thành 
                  hợp lý nhất, giúp khách hàng tối ưu hóa hiệu quả kinh doanh vận tải.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Giá Trị Cốt Lõi</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-primary mr-4 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Chất lượng</h3>
                    <p className="text-gray-700">
                      Cam kết cung cấp sản phẩm chất lượng và dịch vụ hoàn hảo cho khách hàng.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-primary mr-4 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Tin cậy</h3>
                    <p className="text-gray-700">
                      Xây dựng mối quan hệ dựa trên sự tin cậy và minh bạch với khách hàng và đối tác.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-primary mr-4 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Tận tâm</h3>
                    <p className="text-gray-700">
                      Luôn đặt lợi ích của khách hàng lên hàng đầu và tận tâm hỗ trợ giải quyết mọi vấn đề.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-primary mr-4 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Sáng tạo</h3>
                    <p className="text-gray-700">
                      Không ngừng cải tiến và áp dụng giải pháp mới nhằm nâng cao chất lượng dịch vụ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Bạn cần tư vấn?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Liên hệ ngay với chúng tôi để nhận tư vấn về sản phẩm và dịch vụ. 
            Đội ngũ chuyên viên của chúng tôi sẽ hỗ trợ bạn chọn lựa phương tiện phù hợp nhất.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-red-700">
              <Link to="/lien-he">Liên hệ ngay</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
              <Link to="/danh-muc-xe">Xem danh mục xe</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
