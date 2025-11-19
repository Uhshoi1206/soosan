// src/components/TruckDetail/CostEstimator.tsx
import React from 'react';
import { Truck } from '@/models/TruckTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RollingCostCalculator from './RollingCostCalculator';
import LoanCalculator from './LoanCalculator';

interface CostEstimatorProps {
  truck: Truck;
}

const CostEstimator: React.FC<CostEstimatorProps> = ({ truck }) => {
  if (!truck) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center">Công Cụ Dự Toán Chi Phí</h2>
      <Tabs defaultValue="rolling-cost" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="rolling-cost">Dự toán chi phí lăn bánh</TabsTrigger>
          <TabsTrigger value="loan-estimation">Dự toán vay mua xe</TabsTrigger>
        </TabsList>
        <TabsContent value="rolling-cost">
          <RollingCostCalculator truck={truck} />
        </TabsContent>
        <TabsContent value="loan-estimation">
          <LoanCalculator truckPrice={truck.price ?? 0} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostEstimator;
