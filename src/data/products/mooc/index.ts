
import { Truck } from '@/models/TruckTypes';

// Tự động quét tất cả file sản phẩm trong thư mục mooc (trừ index.ts)
const productModules = import.meta.glob('./*.ts', { eager: true }) as Record<string, any>;

function isTruckLike(v: any): v is Truck {
  return v && typeof v === 'object' && 'id' in v && 'type' in v;
}

const collected: Truck[] = [];
Object.entries(productModules).forEach(([path, mod]) => {
  if (/\/index\.ts$/.test(path)) return; // bỏ qua chính file index.ts
  const values = Object.values(mod);
  for (const v of values) {
    if (Array.isArray(v)) {
      if (v.length === 0 || v.every(isTruckLike)) collected.push(...v);
    } else if (isTruckLike(v)) {
      collected.push(v);
    }
  }
});

export const moocProducts: Truck[] = collected;
