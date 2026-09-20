import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import SourceOfTruth from '@/components/SourceOfTruth';
import TextToSpeech from '@/components/TextToSpeech';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getArticleBySlug, getLatestArticles } from '@/lib/queries';
import { constructMetadata, generateArticleJsonLd } from '@/lib/seo';
import { Calendar, Clock, User, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface HealthArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: HealthArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/health/${article.slug}`,
    type: 'article',
  });
}

export default async function HealthDetailCatPage({ params }: HealthArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = await getLatestArticles('health', 4);
  const articleJsonLd = generateArticleJsonLd(article);

  let sources = [
    { title: 'World Health Organization (WHO) Guidelines', url: 'https://www.who.int', authority: 'World Health Organization' },
    { title: 'Ministry of Health and Family Welfare Portal', url: 'https://mohfw.gov.in', authority: 'Govt of India' }
  ];
  try {
    if (article.sourcesJson) {
      const parsed = JSON.parse(article.sourcesJson);
      if (Array.isArray(parsed) && parsed.length > 0) sources = parsed;
    }
  } catch (e) {}

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Health', url: '/health' },
          { name: article.title, url: `/health/${params.category}/${article.slug}` }
        ]} />

        <div className="bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="bg-rose-50 text-rose-800 font-semibold px-2.5 py-0.5 rounded-md uppercase border border-rose-200/60">
              {article.subCategory || article.categorySection}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" /> {article.author?.name || 'InfoMitra Health Desk'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Published {new Date(article.createdAt).toLocaleDateString('en-IN')}
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

          <p className="text-sm text-slate-600 leading-relaxed font-normal bg-slate-50 p-4 rounded-lg border border-slate-200/80">
            {article.summary}
          </p>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">Medical Information Disclaimer:</strong>
              This health article is provided for general informational guidance only and is not a substitute for professional medical diagnosis.
            </div>
          </div>
        </div>

        {/* Text-To-Speech Audio Reader */}
        <TextToSpeech articleTitle={article.title} contentHtml={article.content} />

        {/* Article Body */}
        <article className="article-prose bg-white rounded-xl border border-slate-200/80 p-6 sm:p-8 shadow-xs">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Source of Truth Section */}
          <SourceOfTruth sources={sources} lastVerifiedDate={article.updatedAt} checkerName="InfoMitra Health Verification Desk" />
        </article>

        <RelatedContent title="Related Health Articles" articles={relatedArticles} />
      </div>
    </>
  );
}
