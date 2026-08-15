import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { getArticleBySlug, getLatestArticles } from '@/lib/queries';
import { constructMetadata, generateArticleJsonLd } from '@/lib/seo';
import { Calendar, Clock, User } from 'lucide-react';

interface ArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/shopping/${article.slug}`,
    type: 'article',
  });
}

export default async function ShoppingDetailCatPage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = await getLatestArticles('shopping', 4);
  const articleJsonLd = generateArticleJsonLd(article);

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Shopping', url: '/shopping' },
          { name: article.title, url: `/shopping/${params.category}/${article.slug}` }
        ]} />

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded uppercase">
              {article.subCategory || article.categorySection}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {article.author?.name || 'Editorial Desk'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Published {new Date(article.createdAt).toLocaleDateString('en-IN')}
            </span>
            {article.readingTime && (
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5" /> {article.readingTime}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {article.summary}
          </p>

          <AffiliateDisclosure />
        </div>

        {/* Article Body */}
        <article className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
          {/* <AdSlot slotId="shopping-detail-ad" /> */}
        </article>

        {/* Related Articles */}
        <RelatedContent title="Related Shopping Guides" articles={relatedArticles} />
      </div>
    </>
  );
}
