
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { truckBrands } from '@/data/truckData';

interface BrandFilterProps {
  selectedBrand: string | null;
  onBrandChange: (brand: string | null) => void;
}

export const BrandFilter: React.FC<BrandFilterProps> = ({
  selectedBrand,
  onBrandChange,
}) => {
  console.log("BrandFilter được render với selectedBrand:", selectedBrand);
  
  return (
    <div>
      <h3 className="text-base font-medium mb-2">Thương hiệu</h3>
      <div className="space-y-2">
        {truckBrands.map((brand) => (
          <div key={brand.id} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${brand.id}`}
              checked={selectedBrand === brand.name}
              onCheckedChange={(checked) => {
                console.log(`Chọn brand ${brand.name}:`, checked);
                onBrandChange(checked ? brand.name : null);
              }}
            />
            <Label
              htmlFor={`brand-${brand.id}`}
              className="cursor-pointer text-sm flex-1"
            >
              {brand.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
