'use client';

import { Inter } from 'next/font/google';
import '../src/index.css';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structured-data';
import { CompareProvider } from '@/contexts/CompareContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </head>
      <body className={inter.className}>
        <CompareProvider>
          {children}
          <Toaster />
        </CompareProvider>
      </body>
    </html>
  );
}
