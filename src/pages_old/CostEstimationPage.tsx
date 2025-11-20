import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  PROVINCES, 
  REGISTRATION_PLATE_FEES, 
  ROAD_MAINTENANCE_FEES_TRUCK,
  ROAD_MAINTENANCE_FEES_TRACTOR,
  INSPECTION_FEE_DATA,
  CIVIL_LIABILITY_INSURANCE_FEES_PRE_VAT,
  BEFORE_REGISTRATION_FEE_RATE,
  VAT_RATE
} from '@/data/feeData';
import { formatCurrencyInput, parseCurrencyInput } from '@/utils/formatUtils';

const CostEstimationPage = () => {
  const [vehiclePrice, setVehiclePrice] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [otherFees, setOtherFees] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [weightCategory, setWeightCategory] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const handleVehiclePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setVehiclePrice(formatted);
  };

  const handleOtherFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setOtherFees(formatted);
  };

  const calculateCosts = () => {
    if (!vehiclePrice || !province || !vehicleType || !weightCategory) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const price = parseCurrencyInput(vehiclePrice);
    const otherFeesAmount = parseCurrencyInput(otherFees);
    
    const selectedProvince = PROVINCES.find(p => p.value === province);
    const plateArea = selectedProvince?.area_key || 'OTHERS';
    
    // Tính các khoản phí
    const beforeRegistrationFee = price * BEFORE_REGISTRATION_FEE_RATE;
    const plateFee = REGISTRATION_PLATE_FEES[plateArea];
    
    let roadMaintenanceFee = 0;
    let inspectionFee = 0;
    let insuranceFee = 0;

    if (vehicleType === 'truck' || vehicleType === 'crane') {
      // Xe tải và xe cẩu
      roadMaintenanceFee = ROAD_MAINTENANCE_FEES_TRUCK[weightCategory] || 0;
      inspectionFee = INSPECTION_FEE_DATA.TRUCK[weightCategory] || 0;
      insuranceFee = CIVIL_LIABILITY_INSURANCE_FEES_PRE_VAT.TRUCK[weightCategory] || 0;
    } else if (vehicleType === 'tractor') {
      // Xe đầu kéo
      roadMaintenanceFee = ROAD_MAINTENANCE_FEES_TRACTOR[weightCategory] || 0;
      inspectionFee = INSPECTION_FEE_DATA.TRACTOR[weightCategory] || 0;
      insuranceFee = CIVIL_LIABILITY_INSURANCE_FEES_PRE_VAT.TRACTOR[weightCategory] || 0;
    } else if (vehicleType === 'trailer') {
      // Sơ mi rơ mooc
      roadMaintenanceFee = 0; // Mooc không phải đóng phí bảo trì đường bộ riêng
      inspectionFee = INSPECTION_FEE_DATA.TRAILER;
      insuranceFee = CIVIL_LIABILITY_INSURANCE_FEES_PRE_VAT.TRAILER; // = 0
    }

    const insuranceFeeWithVAT = insuranceFee * (1 + VAT_RATE);
    const totalCost = price + beforeRegistrationFee + plateFee + roadMaintenanceFee + inspectionFee + insuranceFeeWithVAT + otherFeesAmount;

    setResults({
      vehiclePrice: price,
      beforeRegistrationFee,
      plateFee,
      roadMaintenanceFee,
      inspectionFee,
      insuranceFee: insuranceFeeWithVAT,
      otherFees: otherFeesAmount,
      totalCost
    });
  };

  const getWeightOptions = () => {
    if (vehicleType === 'trailer') {
      return [
        { value: 'FROM_19_TO_UNDER_27_TONS', label: '19 - 27 tấn' },
        { value: 'FROM_27_TONS_UP', label: 'Trên 27 tấn' }
      ];
    } else if (vehicleType === 'tractor') {
      return [
        { value: 'UNDER_19_TONS', label: 'Dưới 19 tấn' },
        { value: 'FROM_19_TO_UNDER_27_TONS', label: '19 - 27 tấn' },
        { value: 'FROM_27_TO_UNDER_40_TONS', label: '27 - 40 tấn' },
        { value: 'FROM_40_TONS_UP', label: 'Trên 40 tấn' }
      ];
    }
    // Xe tải và xe cẩu
    return [
      { value: 'UNDER_4_TONS', label: 'Dưới 4 tấn' },
      { value: 'FROM_4_TO_UNDER_8_5_TONS', label: '4 - 8.5 tấn' },
      { value: 'FROM_8_5_TO_UNDER_13_TONS', label: '8.5 - 13 tấn' },
      { value: 'FROM_13_TO_UNDER_19_TONS', label: '13 - 19 tấn' },
      { value: 'FROM_19_TO_UNDER_27_TONS', label: '19 - 27 tấn' },
      { value: 'FROM_27_TONS_UP', label: 'Trên 27 tấn' }
    ];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <Layout>
      <Helmet>
        <title>Dự Toán Chi Phí Lăn Bánh - soosanmotor.com</title>
        <meta 
          name="description" 
          content="Công cụ dự toán chi phí lăn bánh sơ mi rơ moóc, cẩu, xe tải, và các loại xe chuyên dụng khác. Tính toán chính xác các khoản phí cần thiết." 
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-primary mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Dự Toán Chi Phí Lăn Bánh</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Công cụ hỗ trợ tính toán chi phí lăn bánh cho sơ mi rơ moóc, cẩu, xe tải, và các loại xe chuyên dụng khác
            </p>
          </div>

          {/* Form tính toán */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Thông Tin Xe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vehiclePrice">Giá xe (đã bao gồm VAT)</Label>
                <Input
                  id="vehiclePrice"
                  placeholder="Nhập giá xe (VNĐ)"
                  value={vehiclePrice}
                  onChange={handleVehiclePriceChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Tỉnh/thành phố đăng ký</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tỉnh/thành phố" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicleType">Loại xe</Label>
                <Select value={vehicleType} onValueChange={setVehicleType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại xe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="truck">Xe tải</SelectItem>
                    <SelectItem value="crane">Xe cẩu</SelectItem>
                    <SelectItem value="trailer">Sơ mi rơ mooc</SelectItem>
                    <SelectItem value="tractor">Xe đầu kéo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weightCategory">Phân loại tải trọng</Label>
                <Select value={weightCategory} onValueChange={setWeightCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tải trọng" />
                  </SelectTrigger>
                  <SelectContent>
                    {getWeightOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="otherFees">Phí dịch vụ khác (VNĐ)</Label>
                <Input
                  id="otherFees"
                  placeholder="Nhập phí dịch vụ khác (không bắt buộc)"
                  value={otherFees}
                  onChange={handleOtherFeesChange}
                />
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={calculateCosts} className="w-full">
                <Calculator className="mr-2 h-4 w-4" />
                Tính Toán Chi Phí Lăn Bánh
              </Button>
            </div>
          </div>

          {/* Kết quả tính toán */}
          {results && (
            <div className="bg-green-50 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-green-800">Kết Quả Tính Toán</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Giá trị xe:</span>
                    <span className="font-semibold">{formatCurrency(results.vehiclePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phí trước bạ (2%):</span>
                    <span className="font-semibold">{formatCurrency(results.beforeRegistrationFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phí biển số:</span>
                    <span className="font-semibold">{formatCurrency(results.plateFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phí đăng kiểm:</span>
                    <span className="font-semibold">{formatCurrency(results.inspectionFee)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Bảo hiểm TNDS:</span>
                    <span className="font-semibold">{formatCurrency(results.insuranceFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phí bảo trì đường bộ:</span>
                    <span className="font-semibold">{formatCurrency(results.roadMaintenanceFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Phí dịch vụ khác:</span>
                    <span className="font-semibold">{formatCurrency(results.otherFees)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-3">
                    <span className="text-lg font-bold text-green-800">Tổng chi phí:</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(results.totalCost)}</span>
                  </div>
                </div>
              </div>
              
              {/* Thêm ghi chú đặc biệt cho sơ mi rơ mooc */}
              {vehicleType === 'trailer' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Lưu ý đặc biệt cho sơ mi rơ mooc:</strong> Sơ mi rơ mooc không phải đóng phí bảo trì đường bộ riêng và thường được bảo hiểm chung với xe đầu kéo. Chi phí có thể thấp hơn so với các loại xe khác.
                  </p>
                </div>
              )}

              {/* Thêm ghi chú cho xe đầu kéo */}
              {vehicleType === 'tractor' && (
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-700">
                    <strong>Lưu ý cho xe đầu kéo:</strong> Xe đầu kéo có mức phí đăng kiểm và bảo hiểm cao hơn xe tải thường do tính chất vận hành đặc biệt. Phí bảo hiểm đã bao gồm cả rơ mooc kéo theo.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Các Khoản Chi Phí Lăn Bánh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-700">Phí Trước Bạ</h3>
                  <p className="text-sm text-gray-600">2% giá trị xe cho tất cả các loại xe</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-700">Bảo Hiểm Bắt Buộc</h3>
                  <p className="text-sm text-gray-600">Tùy theo loại xe và tải trọng (mooc có thể miễn)</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-700">Phí Đăng Ký</h3>
                  <p className="text-sm text-gray-600">20.000 - 50.000 VND</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-700">Phí Đăng Kiểm</h3>
                  <p className="text-sm text-gray-600">Tùy theo loại xe và tải trọng</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-700">Phí Biển Số</h3>
                  <p className="text-sm text-gray-600">Tùy theo địa phương đăng ký</p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-semibold text-gray-700">Phí Bảo Trì Đường Bộ</h3>
                  <p className="text-sm text-gray-600">Tùy theo tải trọng xe (mooc miễn phí)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">Lưu Ý Quan Trọng</h2>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Chi phí có thể thay đổi theo địa phương và thời điểm
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Xe đầu kéo có phí đăng kiểm cao hơn xe tải thường
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Sơ mi rơ mooc thường có chi phí thấp hơn vì không có động cơ riêng
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Xe cẩu có cùng mức phí như xe tải cùng tải trọng
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Phí bảo hiểm xe đầu kéo đã bao gồm rơ mooc kéo theo
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Liên hệ với chúng tôi để được tư vấn chi tiết
              </li>
            </ul>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Cần Tư Vấn Chi Tiết?</h3>
              <p className="text-gray-600 mb-4">Liên hệ ngay với chúng tôi để được báo giá chính xác</p>
              <a 
                href="tel:0764678901"
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Gọi ngay: 0764 6789 01
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CostEstimationPage;
