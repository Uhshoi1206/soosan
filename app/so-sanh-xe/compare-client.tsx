'use client';

import Layout from '@/components/Layout';
import { useCompare } from '@/contexts/CompareContext';
import CompareTable from '@/components/compare/CompareTable';
import CompareEmptyState from '@/components/compare/CompareEmptyState';

export default function CompareClient() {
  const { compareItems } = useCompare();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">So Sánh Xe</h1>

        {compareItems.length === 0 ? (
          <CompareEmptyState />
        ) : (
          <CompareTable vehicles={compareItems} />
        )}
      </div>
    </Layout>
  );
}
