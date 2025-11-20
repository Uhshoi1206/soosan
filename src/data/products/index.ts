import { Truck } from '@/models/TruckTypes';
import { xeTaiProducts } from './xe-tai';
import { xeCauProducts } from './xe-cau';
import { moocProducts } from './mooc';
import { dauKeoProducts } from './dau-keo';
import { getAllCategories } from '@/config/categoryVisibility';

function createPlaceholderProductFor(key: string, name: string): Truck {
  const slug = `${key}-san-pham-mau`;
  return {
    id: `${key}-default-1`,
    name: `${name} - Sản phẩm mẫu`,
    slug,
    brand: 'soosanmotor.com',
    price: 0,
    priceText: 'Liên hệ',
    weightText: '—',
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    dimensions: '—',
    type: key,
    thumbnailUrl: '/placeholder.svg',
    images: ['/placeholder.svg'],
    description: `Danh mục ${name} đang được cập nhật.`,
    isNew: true,
  };
}

const baseKeys = new Set(['xe-tai','xe-cau','mooc','dau-keo']);
const dynamicExtraProducts: Truck[] = [];

// For additional categories, create placeholders
getAllCategories().forEach(cat => {
  if (baseKeys.has(cat.key)) return;
  dynamicExtraProducts.push(createPlaceholderProductFor(cat.key, cat.name));
});

// Export all products
const baseProducts: Truck[] = [
  ...xeTaiProducts,
  ...xeCauProducts,
  ...moocProducts,
  ...dauKeoProducts,
];

export const allProducts: Truck[] = [
  ...baseProducts,
  ...dynamicExtraProducts
];

// Export for compatibility
export const trucks = allProducts;

// Export categories
export const featuredTrucks = xeTaiProducts;
export const specializedCranes = xeCauProducts;
export const semiTrailers = moocProducts;
export const tractors = dauKeoProducts;

// Export weight categories
export const truckWeights = [
  { id: 1, name: "Dưới 1 tấn", minWeight: 0, maxWeight: 1 },
  { id: 2, name: "1 - 2 tấn", minWeight: 1, maxWeight: 2 },
  { id: 3, name: "2 - 3.5 tấn", minWeight: 2, maxWeight: 3.5 },
  { id: 4, name: "3.5 - 5 tấn", minWeight: 3.5, maxWeight: 5 },
  { id: 5, name: "5 - 8 tấn", minWeight: 5, maxWeight: 8 },
  { id: 6, name: "8 - 15 tấn", minWeight: 8, maxWeight: 15 },
  { id: 7, name: "15 - 20 tấn", minWeight: 15, maxWeight: 20 },
  { id: 8, name: "Trên 20 tấn", minWeight: 20, maxWeight: 100 }
];

// Export brands
export const truckBrands = (() => {
  const CANONICAL_BRAND_MAP: Record<string, string> = {
    'hyundai': 'Hyundai', 'isuzu': 'Isuzu', 'hino': 'Hino',
    'dongfeng': 'Dongfeng', 'thaco': 'Thaco', 'kia': 'Kia',
    'suzuki': 'Suzuki', 'veam': 'VEAM', 'soosan': 'Soosan',
    'doosung': 'DOOSUNG', 'cimc': 'CIMC', 'koksan': 'KOKSAN',
    'howo': 'HOWO', 'jac': 'JAC', 'daewoo': 'Daewoo',
    'foton': 'Foton', 'iveco': 'Iveco', 'mercedes-benz': 'Mercedes-Benz',
    'volvo': 'Volvo', 'scania': 'Scania', 'man': 'MAN', 'fuso': 'Fuso'
  };

  const toCanonical = (raw: string) => {
    const key = raw.trim().toLowerCase();
    return CANONICAL_BRAND_MAP[key] || raw.trim();
  };

  const map = new Map<string, string>();
  for (const p of allProducts) {
    const brands = Array.isArray(p.brand) ? p.brand : [p.brand];
    brands.filter(Boolean).forEach((b) => {
      const key = String(b).trim().toLowerCase();
      if (!key) return;
      if (!map.has(key)) map.set(key, toCanonical(String(b)));
    });
  }

  const names = Array.from(map.values()).sort((a, b) => a.localeCompare(b, 'vi'));
  return names.map((name, idx) => ({ id: idx + 1, name }));
})();

export { xeTaiProducts, xeCauProducts, moocProducts, dauKeoProducts };
