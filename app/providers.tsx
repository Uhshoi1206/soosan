'use client';

import { CompareProvider } from '@/contexts/CompareContext';
import { Toaster } from '@/components/ui/toaster';
import { useEffect } from 'react';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add structured data on client side
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
      document.head.removeChild(orgScript);
      document.head.removeChild(webScript);
    };
  }, []);

  return (
    <CompareProvider>
      {children}
      <Toaster />
    </CompareProvider>
  );
}
