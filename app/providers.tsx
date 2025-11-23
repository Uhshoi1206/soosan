'use client';

import { CompareProvider } from '@/contexts/CompareContext';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CompareProvider>
      {children}
      <Toaster />
    </CompareProvider>
  );
}
