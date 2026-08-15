import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleCard from '@/components/ArticleCard';
import { getLatestArticles } from '@/lib/queries';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Artificial Intelligence & Generative AI Tools 2026',
  description: 'Top LLM models, ChatGPT, Claude, Copilot coding tools, AI image generators, and automation software.',
  path: '/technology/ai',
});

export default async function TechAiPage() {
  const articles = await getLatestArticles('technology', 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Breadcrumbs items={[
        { name: 'Technology', url: '/technology' },
        { name: 'AI', url: '/technology/ai' }
      ]} />

      <div className="bg-purple-900 text-white rounded-2xl p-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Artificial Intelligence & AI Productivity Tools</h1>
        <p className="text-xs sm:text-sm text-purple-200 mt-1">Generative AI software reviews, prompt engineering guides, and AI tools for developers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <ArticleCard key={art.id} article={art} />
        ))}
      </div>
    </div>
  );
}
