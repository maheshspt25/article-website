import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import SourceOfTruth from '@/components/SourceOfTruth';
import TextToSpeech from '@/components/TextToSpeech';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { getArticleBySlug, getLatestArticles } from '@/lib/queries';
import { constructMetadata, generateArticleJsonLd, generateFaqJsonLd } from '@/lib/seo';
import { Calendar, Clock, User, HelpCircle, ThumbsUp } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface TechArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: TechArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/technology/${article.slug}`,
    type: 'article',
  });
}

export default async function TechArticlePage({ params }: TechArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = await getLatestArticles('technology', 4);
  const articleJsonLd = generateArticleJsonLd(article);

  let comparisonData = null;
  try {
    if (article.comparisonJson) {
      comparisonData = JSON.parse(article.comparisonJson);
    }
  } catch (e) {}

  let faqs = [];
  try {
    if (article.faqJson) {
      faqs = JSON.parse(article.faqJson);
    }
  } catch (e) {}

  let sources = [
    { title: 'Official Developer Documentation & Benchmark Specs', url: 'https://developer.android.com', authority: 'Official Tech Standards' }
  ];
  try {
    if (article.sourcesJson) {
      const parsed = JSON.parse(article.sourcesJson);
      if (Array.isArray(parsed) && parsed.length > 0) sources = parsed;
    }
  } catch (e) {}

  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Technology', url: '/technology' },
          { name: article.title, url: `/technology/${params.category}/${article.slug}` }
        ]} />

        {/* Header */}
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-medium">
            <span className="bg-indigo-50 text-indigo-800 font-bold px-2.5 py-0.5 rounded uppercase">
              {article.subCategory || article.categorySection}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {article.author?.name || 'InfoMitra Tech Desk'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Published {new Date(article.createdAt).toLocaleDateString('en-IN')}
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

          <AffiliateDisclosure />
        </div>

        {/* Side-by-side comparison table if present */}
        {comparisonData && (
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 border-b pb-3">
              Side-by-Side Specifications Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-zinc-950 text-white">
                    <th className="p-3 border border-zinc-800">Feature</th>
                    <th className="p-3 border border-zinc-800">{comparisonData.item1}</th>
                    <th className="p-3 border border-zinc-800">{comparisonData.item2}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.rows?.map((row: any, idx: number) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                      <td className="p-3 border border-zinc-200 font-bold text-zinc-900">{row.feature}</td>
                      <td className="p-3 border border-zinc-200 text-zinc-800 font-medium">{row.val1}</td>
                      <td className="p-3 border border-zinc-200 text-zinc-800 font-medium">{row.val2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-emerald-950 flex items-center gap-1.5 text-sm">
                  <ThumbsUp className="w-4 h-4 text-emerald-600" /> Who Should Buy {comparisonData.item1}?
                </h3>
                <p className="text-emerald-900 leading-relaxed">{comparisonData.whoShouldBuy1}</p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-indigo-950 flex items-center gap-1.5 text-sm">
                  <ThumbsUp className="w-4 h-4 text-indigo-600" /> Who Should Buy {comparisonData.item2}?
                </h3>
                <p className="text-indigo-900 leading-relaxed">{comparisonData.whoShouldBuy2}</p>
              </div>
            </div>
          </div>
        )}

        {/* Text-To-Speech Audio Reader */}
        <TextToSpeech articleTitle={article.title} contentHtml={article.content} />

        {/* Article Body */}
        <article className="article-prose bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Source of Truth Section */}
          <SourceOfTruth sources={sources} lastVerifiedDate={article.updatedAt} checkerName="InfoMitra Tech Testing Lab" />

          {/* <AdSlot slotId="tech-detail-ad" /> */}

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
        <RelatedContent title="Related Technology Articles" articles={relatedArticles} />
      </div>
    </>
  );
}
