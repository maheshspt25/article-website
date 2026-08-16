import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import TableOfContents from '@/components/TableOfContents';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getArticleBySlug, getLatestArticles } from '@/lib/queries';
import { constructMetadata, generateArticleJsonLd, generateFaqJsonLd } from '@/lib/seo';
import { Calendar, Clock, User, GraduationCap, HelpCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface ArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/education/${article.slug}`,
    type: 'article',
  });
}

export default async function EducationArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = await getLatestArticles('education', 4);
  const articleJsonLd = generateArticleJsonLd(article);

  let faqs = [];
  try {
    if (article.faqJson) {
      faqs = JSON.parse(article.faqJson);
    }
  } catch (e) {}

  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={[
          { name: 'Education', url: '/education' },
          { name: article.title, url: `/education/${params.category}/${article.slug}` }
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
        </div>

        {/* Main Article Content */}
        <article className="article-prose bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* <AdSlot slotId="education-detail-ad" /> */}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" /> Frequently Asked Questions
              </h2>
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-slate-900">Q: {faq.q}</h3>
                  <p className="text-xs text-slate-700 mt-1 pl-4">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles */}
        <RelatedContent title="Related Education Articles" articles={relatedArticles} />
      </div>
    </>
  );
}
