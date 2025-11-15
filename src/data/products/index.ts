import { Truck } from '@/models/TruckTypes';
import { xeTaiProducts } from './xe-tai';
import { xeCauProducts } from './xe-cau';
import { moocProducts } from './mooc';
import { dauKeoProducts } from './dau-keo';
import { getAllCategories } from '@/config/categoryVisibility';

// Tự động nạp sản phẩm từ các thư mục con nếu có (cho danh mục mới)
const modules = import.meta.glob('./*/index.ts', { eager: true }) as Record<string, any>;

// Quét tất cả file sản phẩm (trừ index.ts) để tự động nạp
const productModules = import.meta.glob('./*/**/*.ts', { eager: true }) as Record<string, any>;

function isTruckLike(v: any): v is Truck {
  return v && typeof v === 'object' && 'id' in v && 'type' in v;
}

function extractProductsFromModule(mod: any): Truck[] {
  const candidates = Object.values(mod).filter((v: any) => Array.isArray(v));
  const found = candidates.find((arr: any[]) => arr.length === 0 || arr.every(item => item && typeof item === 'object' && 'id' in item && 'type' in item));
  return (found as Truck[]) || [];
}

function extractTrucksFromAnyModule(mod: any): Truck[] {
  const values = Object.values(mod);
  const result: Truck[] = [];
  for (const v of values) {
    if (Array.isArray(v)) {
      if (v.length === 0 || v.every(isTruckLike)) result.push(...(v as Truck[]));
    } else if (isTruckLike(v)) {
      result.push(v as Truck);
    }
  }
  return result;
}

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

// Tự động phát hiện sản phẩm từ các file con (trừ index.ts)
const discoveredProducts: Truck[] = [];
Object.entries(productModules).forEach(([path, mod]) => {
  if (/\/index\.ts$/.test(path)) return; // bỏ qua file index.ts
  const trucksInMod = extractTrucksFromAnyModule(mod);
  if (trucksInMod.length) discoveredProducts.push(...trucksInMod);
});

// Gom nhóm theo type (danh mục)
const byType: Record<string, Truck[]> = {};
for (const t of discoveredProducts) {
  if (!byType[t.type]) byType[t.type] = [];
  byType[t.type].push(t);
}

getAllCategories().forEach(cat => {
  if (baseKeys.has(cat.key)) return;

  const typeProducts = byType[cat.key] || [];
  if (typeProducts.length > 0) {
    dynamicExtraProducts.push(...typeProducts);
  } else {
    // Fallback: thử đọc qua index.ts của danh mục nếu có
    const path = `./${cat.key}/index.ts`;
    const mod = modules[path];
    if (mod) {
      const arr = extractProductsFromModule(mod);
      if (arr.length > 0) dynamicExtraProducts.push(...arr);
      else dynamicExtraProducts.push(createPlaceholderProductFor(cat.key, cat.name));
    } else {
      dynamicExtraProducts.push(createPlaceholderProductFor(cat.key, cat.name));
    }
  }
});

// Export tất cả sản phẩm
const baseProducts: Truck[] = [
  ...xeTaiProducts,
  ...xeCauProducts,
  ...moocProducts,
  ...dauKeoProducts,
];

const baseIds = new Set(baseProducts.map(p => p.id));
const extraBaseProducts = discoveredProducts.filter(p => baseKeys.has(p.type) && !baseIds.has(p.id));

export const allProducts: Truck[] = [
  ...baseProducts,
  ...extraBaseProducts,
  ...dynamicExtraProducts
];

// Export theo từng loại để dễ sử dụng
export const trucks = allProducts;

// Export các danh mục riêng - hiển thị tất cả sản phẩm thay vì giới hạn
export const featuredTrucks = xeTaiProducts; // Hiển thị tất cả 14 xe tải
export const specializedCranes = xeCauProducts; // Hiển thị tất cả xe cẩu
export const semiTrailers = moocProducts; // Hiển thị tất cả sơ mi rơ mooc
export const tractors = dauKeoProducts; // Hiển thị tất cả xe đầu kéo

// Export thông tin trọng lượng (giữ nguyên từ file cũ)
export const truckWeights = [
  {
    id: 1,
    name: "Dưới 1 tấn",
    minWeight: 0,
    maxWeight: 1
  },
  {
    id: 2,
    name: "1 - 2 tấn",
    minWeight: 1,
    maxWeight: 2
  },
  {
    id: 3,
    name: "2 - 3.5 tấn",
    minWeight: 2,
    maxWeight: 3.5
  },
  {
    id: 4,
    name: "3.5 - 5 tấn",
    minWeight: 3.5,
    maxWeight: 5
  },
  {
    id: 5,
    name: "5 - 8 tấn",
    minWeight: 5,
    maxWeight: 8
  },
  {
    id: 6,
    name: "8 - 15 tấn",
    minWeight: 8,
    maxWeight: 15
  },
  {
    id: 7,
    name: "15 - 20 tấn",
    minWeight: 15,
    maxWeight: 20
  },
  {
    id: 8,
    name: "Trên 20 tấn",
    minWeight: 20,
    maxWeight: 100
  }
];

// Export thương hiệu (giữ nguyên từ file cũ)
export const truckBrands = (() => {
  // Chuẩn hóa tên thương hiệu và loại bỏ trùng (không phân biệt hoa/thường)
  const CANONICAL_BRAND_MAP: Record<string, string> = {
    'hyundai': 'Hyundai',
    'isuzu': 'Isuzu',
    'hino': 'Hino',
    'dongfeng': 'Dongfeng',
    'thaco': 'Thaco',
    'kia': 'Kia',
    'suzuki': 'Suzuki',
    'veam': 'VEAM',
    'soosan': 'Soosan',
    'doosung': 'DOOSUNG',
    'cimc': 'CIMC',
    'koksan': 'KOKSAN',
    'howo': 'HOWO',
    'jac': 'JAC',
    'daewoo': 'Daewoo',
    'foton': 'Foton',
    'iveco': 'Iveco',
    'mercedes-benz': 'Mercedes-Benz',
    'volvo': 'Volvo',
    'scania': 'Scania',
    'man': 'MAN',
    'fuso': 'Fuso'
  };

  const toCanonical = (raw: string) => {
    const key = raw.trim().toLowerCase();
    return CANONICAL_BRAND_MAP[key] || raw.trim();
  };

  const map = new Map<string, string>(); // key: lowercased, value: canonical display
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
