import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import SourceOfTruth from '@/components/SourceOfTruth';
import TextToSpeech from '@/components/TextToSpeech';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getArticleBySlug, getLatestArticles } from '@/lib/queries';
import { constructMetadata, generateArticleJsonLd, generateFaqJsonLd } from '@/lib/seo';
import { Calendar, Clock, User, ShieldAlert, HelpCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface FinanceArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: FinanceArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/finance/${article.slug}`,
    type: 'article',
  });
}

export default async function FinanceArticlePage({ params }: FinanceArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = await getLatestArticles('finance', 4);
  const articleJsonLd = generateArticleJsonLd(article);

  let faqs = [];
  try {
    if (article.faqJson) {
      faqs = JSON.parse(article.faqJson);
    }
  } catch (e) {}

  let sources = [
    { title: 'Income Tax Department Official Portal', url: 'https://incometax.gov.in', authority: 'Ministry of Finance, Govt of India' },
    { title: 'Reserve Bank of India Regulatory Guidelines', url: 'https://rbi.org.in', authority: 'Reserve Bank of India' }
  ];
  try {
    if (article.sourcesJson) {
      const parsed = JSON.parse(article.sourcesJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        sources = parsed;
      }
    }
  } catch (e) {}

  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Finance', url: '/finance' },
          { name: article.title, url: `/finance/${params.category}/${article.slug}` }
        ]} />

        {/* Header */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-medium">
            <span className="bg-indigo-50 text-indigo-800 font-bold px-2.5 py-0.5 rounded uppercase">
              {article.subCategory || article.categorySection}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {article.author?.name || 'InfoMitra Financial Desk'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Verified: {new Date(article.updatedAt).toLocaleDateString('en-IN')}
            </span>
            {article.readingTime && (
              <span className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3.5 h-3.5" /> {article.readingTime}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-sm text-zinc-600 leading-relaxed font-medium bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
            {article.summary}
          </p>

          {/* Mandatory Finance Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-0.5">Financial & Tax Disclaimer:</strong>
              {article.disclaimer || 'Information on this page is for general educational guidance only and does not constitute personalized financial advice. Please consult a qualified CA.'}
            </div>
          </div>
        </div>

        {/* Text-To-Speech Audio Reader */}
        <TextToSpeech articleTitle={article.title} contentHtml={article.content} />

        {/* Article Body */}
        <article className="article-prose bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Source of Truth Section */}
          <SourceOfTruth sources={sources} lastVerifiedDate={article.updatedAt} checkerName="InfoMitra Financial Fact Desk" />

          {/* <AdSlot slotId="finance-detail-ad" /> */}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-zinc-200 space-y-4">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" /> Frequently Asked Questions
              </h2>
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-zinc-900">Q: {faq.q}</h3>
                  <p className="text-xs text-zinc-700 mt-1 pl-4">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles */}
        <RelatedContent title="Related Financial Guides" articles={relatedArticles} />
      </div>
    </>
  );
}
