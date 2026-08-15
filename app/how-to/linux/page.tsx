import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Linux Terminal Tutorials & Dual Boot Guides',
  description: 'How to install Ubuntu dual boot, master essential Bash commands, and configure Linux servers.',
  path: '/how-to/linux',
});

export default async function HowToLinuxPage() {
  const articles = await getLatestArticles('how-to', 100, 'linux');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'How-To', url: '/how-to' },
        { name: 'Linux', url: '/how-to/linux' }
      ]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Linux Tutorials & Command Line Guides</h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">Ubuntu, Debian, and Fedora tutorials for students and developers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
