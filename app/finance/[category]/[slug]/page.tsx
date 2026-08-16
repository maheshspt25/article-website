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
import { Calendar, Clock, User, ShieldAlert, HelpCircle, ExternalLink, Info, CheckCircle2 } from 'lucide-react';

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
    { title: 'Reserve Bank of India Regulatory Guidelines', url: 'https://rbi.org.in', authority: 'Reserve Bank of India' },
    { title: 'SEBI Investor Information Portal', url: 'https://www.sebi.gov.in', authority: 'Securities and Exchange Board of India' }
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

  const publishedDateFormatted = new Date(article.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const updatedDateFormatted = new Date(article.updatedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

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
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-medium">
            <span className="bg-indigo-50 text-indigo-800 font-bold px-2.5 py-0.5 rounded uppercase border border-indigo-200/60">
              {article.subCategory || article.categorySection}
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

          {/* YMYL Financial Editorial & Transparency Panel */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 space-y-4 border border-slate-800 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" /> Financial Content Transparency & Sourcing
              </span>
              <span className="text-[11px] text-slate-400 font-mono">YMYL Compliance</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 font-medium block text-[11px]">Published:</span>
                <strong className="text-white font-semibold flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" /> {publishedDateFormatted}
                </strong>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 font-medium block text-[11px]">Last updated:</span>
                <strong className="text-white font-semibold flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {updatedDateFormatted}
                </strong>
              </div>

              <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-slate-400 font-medium block text-[11px]">Reviewed by:</span>
                <strong className="text-white font-semibold flex items-center gap-1 mt-0.5">
                  <User className="w-3.5 h-3.5 text-indigo-400" /> {article.author?.name || 'InfoMitra Editorial Desk'}
                </strong>
              </div>
            </div>

            {/* Primary Reference Sources List */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Sources & Official Portals:</span>
              <div className="flex flex-wrap gap-2">
                {sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-sky-300 text-[11px] font-medium px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3 text-sky-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Important Assumptions Box */}
            <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-xl text-[11px] space-y-1 text-slate-300">
              <strong className="text-amber-400 font-bold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-amber-400" /> Important Assumptions:
              </strong>
              <p className="leading-relaxed">
                Calculations &amp; interest rates are based on official government gazettes, RBI notifications, and Finance Act provisions. Investment returns are estimated projections; past performance does not guarantee future results. Zero guaranteed returns are implied for market-linked instruments.
              </p>
            </div>
          </div>

          {/* Mandatory Finance Disclaimer Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block mb-0.5">Disclaimer:</strong>
              {article.disclaimer || 'Information published on this page is provided solely for educational and informational purposes and does not constitute personalized financial, investment, or tax advice. Please consult a SEBI-registered advisor or Chartered Accountant (CA) for professional financial guidance.'}
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
