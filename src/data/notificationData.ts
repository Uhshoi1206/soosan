
import { Truck } from "@/models/TruckTypes";
import { trucks } from "./truckData";

// Interface cho dữ liệu thông báo
export interface OrderNotification {
  id: number;
  customerName: string;
  gender: "male" | "female" | "company";
  phone: string;
  productId: string;
  timestamp: number;
}

// Danh sách tên đệm nam giới Việt Nam
const maleMiddleNames = ["Văn", "Hữu", "Đình", "Công", "Quang", "Minh", "Đức", "Quốc", "Mạnh", "Thành", "Anh"];

// Danh sách tên đệm nữ giới Việt Nam
const femaleMiddleNames = ["Thị", "Ngọc", "Phương", "Kim", "Thu", "Thanh", "Hồng", "Thúy", "Minh", "Quỳnh", "Thùy"];

// Danh sách họ Việt Nam
const lastNames = [
  "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Vũ", "Võ", "Phan", "Trương", 
  "Bùi", "Đặng", "Đỗ", "Ngô", "Hồ", "Dương", "Đinh", "Lý", "Mai", "Tô"
];

// Danh sách tên nam
const maleFirstNames = [
  "Hùng", "Nam", "Tuấn", "Cường", "Dũng", "Long", "Tùng", "Thắng", "Hiếu", "Phong",
  "Vương", "Thành", "Tâm", "Khoa", "Trung", "Kiên", "Hải", "Hoàng", "Đức", "Bảo"
];

// Danh sách tên nữ
const femaleFirstNames = [
  "Hương", "Lan", "Phương", "Thảo", "Trang", "Hà", "Hồng", "Ngọc", "Linh", "Mai",
  "Anh", "Chi", "Yến", "Hạnh", "Hiền", "Giang", "Thu", "Huyền", "Thùy", "Hằng"
];

// Danh sách tên công ty
const companyNames = [
  "Công ty TNHH Vận Tải Phương Đông",
  "Công ty CP Logistics Tân Cảng",
  "Công ty TNHH Vận Chuyển Hàng Hóa Toàn Cầu",
  "Công ty CP Giao Nhận Thành Công",
  "Công ty TNHH Vận Tải Hoàng Gia",
  "Công ty TNHH Logistics Hải Đăng",
  "Công ty CP Vận Tải & Thương Mại Á Châu",
  "Công ty TNHH Vận Tải và Xây Dựng Minh Phát",
  "Công ty CP Dịch Vụ Vận Tải Phú Tài",
  "Công ty TNHH Giao Nhận Thương Mại Việt Hưng",
  "Công ty TNHH Vận Tải Quốc Dũng",
  "Công ty CP Logistics Đông Nam Á",
  "Công ty TNHH Vận Tải Đại Phát",
  "Công ty TNHH Dịch Vụ Vận Tải Hoàng Long",
  "Công ty CP Giao Nhận Vận Tải Tín Thành"
];

// Tạo số điện thoại ngẫu nhiên và che một phần
function generateMaskedPhone(): string {
  // Các đầu số điện thoại phổ biến ở Việt Nam
  const prefixes = ["096", "097", "098", "032", "033", "034", "035", "036", "037", "038", "039", "086", "088", "089", "090", "093", "070", "079", "077", "076"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  const fullPhone = prefix + suffix;
  
  // Che giấu 3 số cuối của số điện thoại (hiển thị dạng: 0901234***)
  return fullPhone.substring(0, fullPhone.length - 3) + "***";
}

// Tạo tên khách hàng ngẫu nhiên
function generateCustomerName(gender: "male" | "female" | "company"): string {
  if (gender === "company") {
    return companyNames[Math.floor(Math.random() * companyNames.length)];
  }

  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const middleName = gender === "male" 
    ? maleMiddleNames[Math.floor(Math.random() * maleMiddleNames.length)]
    : femaleMiddleNames[Math.floor(Math.random() * femaleMiddleNames.length)];
  const firstName = gender === "male"
    ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
    : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];

  return `${lastName} ${middleName} ${firstName}`;
}

// Thêm danh xưng phù hợp với giới tính
function getFormOfAddress(name: string, gender: "male" | "female" | "company"): string {
  if (gender === "company") {
    return name;
  } else if (gender === "male") {
    return `Anh ${name}`;
  } else {
    return `Chị ${name}`;
  }
}

// Tạo danh sách thông báo ngẫu nhiên
export function generateRandomNotifications(count = 50): OrderNotification[] {
  const notifications: OrderNotification[] = [];
  const now = Date.now();
  
  // Sử dụng sản phẩm từ truckData.ts
  const availableProducts = trucks;
  
  for (let i = 0; i < count; i++) {
    const gender = ["male", "female", "company"][Math.floor(Math.random() * 3)] as "male" | "female" | "company";
    const customerName = generateCustomerName(gender);
    const displayName = getFormOfAddress(customerName, gender);
    
    // Thời gian thông báo ngẫu nhiên trong 30 ngày qua
    const randomTime = now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000);
    
    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    
    notifications.push({
      id: i + 1,
      customerName: displayName,
      gender,
      phone: generateMaskedPhone(),
      productId: randomProduct.id,
      timestamp: randomTime,
    });
  }
  
  // Sắp xếp thông báo theo thời gian giảm dần (mới nhất lên đầu)
  return notifications.sort((a, b) => b.timestamp - a.timestamp);
}

// Tạo danh sách thông báo
export const notifications = generateRandomNotifications(50);

// Hàm lấy thông tin sản phẩm từ ID
export function getProductNameById(productId: string): string {
  const product = trucks.find(truck => truck.id === productId);
  return product?.name || "Sản phẩm không xác định";
}
