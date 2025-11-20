'use client';

import TruckDetail from '@/pages_old/TruckDetail';
import { Truck } from '@/models/TruckTypes';

interface ProductDetailClientProps {
  product: Truck;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  return <TruckDetail />;
}
