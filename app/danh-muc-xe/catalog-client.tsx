'use client';

import Layout from '@/components/Layout';
import { trucks } from '@/data/products';
import TruckItem from '@/components/TruckItem';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CatalogClient() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const vehicleTypes = [
    { value: 'all', label: 'Tất cả' },
    { value: 'xe-tai', label: 'Xe tải' },
    { value: 'dau-keo', label: 'Đầu kéo' },
    { value: 'mooc', label: 'Sơ mi rơ moóc' },
    { value: 'xe-cau', label: 'Xe cẩu' },
  ];

  const filteredTrucks = selectedType === 'all'
    ? trucks
    : trucks.filter(truck => truck.type === selectedType);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Danh Mục Xe</h1>

        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            {vehicleTypes.map(type => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrucks.map(truck => (
            <TruckItem key={truck.id} truck={truck} />
          ))}
        </div>

        {filteredTrucks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Không có xe nào trong danh mục này.
          </div>
        )}
      </div>
    </Layout>
  );
}
