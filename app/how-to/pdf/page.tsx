import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'PDF Conversion, Compression & Editing Tutorials',
  description: 'How to convert PDF to Word, compress PDF file size under 200KB, merge PDF pages, and unlock protected PDFs.',
  path: '/how-to/pdf',
});

export default async function HowToPdfPage() {
  const articles = await getLatestArticles('how-to', 100, 'pdf');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'How-To', url: '/how-to' },
        { name: 'PDF', url: '/how-to/pdf' }
      ]} />

      <div className="bg-red-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">PDF Documents & Conversion Guides</h1>
        <p className="text-xs sm:text-sm text-red-200 mt-1">Easy document conversion solutions for official job applications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
