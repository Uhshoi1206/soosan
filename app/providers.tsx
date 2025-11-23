'use client';

import { CompareProvider } from '@/contexts/CompareContext';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Add structured data on client side
    try {
      const organizationSchema = generateOrganizationSchema();
      const websiteSchema = generateWebSiteSchema();

      // Add organization schema
      const orgScript = document.createElement('script');
      orgScript.type = 'application/ld+json';
      orgScript.text = JSON.stringify(organizationSchema);
      document.head.appendChild(orgScript);

      // Add website schema
      const webScript = document.createElement('script');
      webScript.type = 'application/ld+json';
      webScript.text = JSON.stringify(websiteSchema);
      document.head.appendChild(webScript);

      return () => {
        try {
          if (document.head.contains(orgScript)) {
            document.head.removeChild(orgScript);
          }
          if (document.head.contains(webScript)) {
            document.head.removeChild(webScript);
          }
        } catch (e) {
          console.error('Error removing scripts', e);
        }
      };
    } catch (error) {
      console.error('Error adding structured data', error);
    }
  }, []);

  return (
    <CompareProvider>
      {children}
      <Toaster />
    </CompareProvider>
  );
}
