import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import Analytics from '@/components/Analytics';
import { constructMetadata, generateOrganizationJsonLd, generateWebSiteJsonLd } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={orgJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
