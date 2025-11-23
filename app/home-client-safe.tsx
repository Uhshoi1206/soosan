'use client';

import { Suspense } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import ContactSection from '@/components/home/ContactSection';

function SafeHomePage() {
  return (
    <Layout>
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Chào mừng đến với soosanmotor.com
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Website đang được cập nhật...
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactSection />
      </Suspense>
    </Layout>
  );
}

export default SafeHomePage;
