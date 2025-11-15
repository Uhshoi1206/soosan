import type { VehicleType, Truck } from '@/models/TruckTypes';

export type CategoryKey = VehicleType;

// Registry danh mục: thêm/sửa tại đây là toàn site tự nhận
export interface CategoryConfig {
  key: CategoryKey;         // mã danh mục (slug ngắn): vd: 'xe-tai'
  name: string;             // Tên hiển thị: vd: 'Xe Tải'
  slug?: string;            // Đường dẫn SEO nếu cần (mặc định = key)
  enabled: boolean;         // Bật/tắt hiển thị danh mục
  keywords?: string[];      // Từ khóa liên quan phục vụ blog/suggest
}

// Cấu hình mặc định 4 danh mục hiện có
export const categories: CategoryConfig[] = [
  {
    key: 'xe-tai',
    name: 'Xe Tải',
    enabled: true,
    keywords: ['xe tải','truck','tải trọng','thùng','vận chuyển','hàng hóa']
  },
  {
    key: 'xe-cau',
    name: 'Xe Cẩu',
    enabled: true,
    keywords: ['cẩu','crane','nâng','cần cẩu','xe cẩu','lifting']
  },
  {
    key: 'mooc',
    name: 'Sơ Mi Rơ Mooc',
    enabled: true,
    keywords: ['mooc','sơ mi rơ mooc','rơ mooc','semi-trailer','trailer','container']
  },
  {
    key: 'dau-keo',
    name: 'Xe Đầu Kéo',
    enabled: true,
    keywords: ['đầu kéo','tractor','kéo','xe đầu kéo']
  }
];

// Helper lấy config theo key
export const getCategoryByKey = (key: CategoryKey): CategoryConfig | undefined =>
  categories.find(c => c.key === key);

export const getCategoryName = (key: CategoryKey): string =>
  getCategoryByKey(key)?.name || key;

export const getCategorySlug = (key: CategoryKey): string =>
  getCategoryByKey(key)?.slug || key;

export const getTypeKeywords = (key: CategoryKey): string[] =>
  getCategoryByKey(key)?.keywords || [getCategoryName(key).toLowerCase()];

// Bật/tắt danh mục
export const isTypeEnabled = (type: CategoryKey): boolean =>
  getCategoryByKey(type)?.enabled !== false;

export const getAllCategories = (): CategoryConfig[] => categories;

export const getEnabledTypes = (): VehicleType[] =>
  categories.filter(c => c.enabled).map(c => c.key as VehicleType);

export const filterVisibleTrucks = <T extends Truck>(list: T[]): T[] =>
  list.filter(item => isTypeEnabled(item.type));
