import React from 'react';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import RelatedContent from '@/components/RelatedContent';
import SourceOfTruth from '@/components/SourceOfTruth';
import TextToSpeech from '@/components/TextToSpeech';
import HowToStepTracker from '@/components/HowToStepTracker';
import JsonLd from '@/components/JsonLd';
import AdSlot from '@/components/AdSlot';
import { getArticleBySlug, getLatestArticles } from '@/lib/queries';
import { constructMetadata, generateArticleJsonLd, generateFaqJsonLd } from '@/lib/seo';
import { Calendar, Clock, User, HelpCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface HowToArticlePageProps {
  params: { category: string; slug: string };
}

export async function generateMetadata({ params }: HowToArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return constructMetadata({
    title: article.title,
    description: article.summary,
    path: `/how-to/${params.category}/${article.slug}`,
    type: 'article',
  });
}

function getDefaultSources(subCategory?: string | null) {
  const cat = (subCategory || '').toLowerCase();

  if (cat.includes('windows') || cat.includes('files-storage')) {
    return [
      { title: 'Microsoft Support & Windows System Documentation', url: 'https://support.microsoft.com/windows', authority: 'Microsoft Official Documentation' }
    ];
  }
  if (cat.includes('android')) {
    return [
      { title: 'Google Android Official Help & Device Management', url: 'https://support.google.com/android', authority: 'Google Android Official Documentation' }
    ];
  }
  if (cat.includes('mobile') || cat.includes('iphone')) {
    return [
      { title: 'Apple Official Support & iOS Documentation', url: 'https://support.apple.com', authority: 'Apple Official Support' }
    ];
  }
  if (cat.includes('internet') || cat.includes('network')) {
    return [
      { title: 'Cloudflare 1.1.1.1 & Network Infrastructure Documentation', url: 'https://1.1.1.1', authority: 'Cloudflare & Infrastructure Support' }
    ];
  }
  if (cat.includes('pdf') || cat.includes('documents')) {
    return [
      { title: 'Adobe Acrobat & Document Cloud Support', url: 'https://helpx.adobe.com/acrobat.html', authority: 'Adobe Systems Official Support' }
    ];
  }
  if (cat.includes('productivity') || cat.includes('microsoft-office')) {
    return [
      { title: 'Microsoft Office & Workspace Support', url: 'https://support.microsoft.com/office', authority: 'Microsoft Office Support' }
    ];
  }
  if (cat.includes('email') || cat.includes('google')) {
    return [
      { title: 'Google Account & Workspace Official Help', url: 'https://support.google.com', authority: 'Google Official Help Center' }
    ];
  }
  if (cat.includes('whatsapp')) {
    return [
      { title: 'WhatsApp Official Help Center', url: 'https://faq.whatsapp.com', authority: 'Meta WhatsApp Security Desk' }
    ];
  }
  if (cat.includes('social-media')) {
    return [
      { title: 'Meta & Instagram Official Help Center', url: 'https://help.instagram.com', authority: 'Meta Safety & Privacy Portal' }
    ];
  }
  if (cat.includes('youtube')) {
    return [
      { title: 'YouTube Creator & Account Official Support', url: 'https://support.google.com/youtube', authority: 'Google YouTube Help' }
    ];
  }
  if (cat.includes('browsers')) {
    return [
      { title: 'Google Chrome & Web Browser Help Center', url: 'https://support.google.com/chrome', authority: 'Google Chrome Official Documentation' }
    ];
  }
  if (cat.includes('git-github')) {
    return [
      { title: 'GitHub Official Documentation', url: 'https://docs.github.com', authority: 'GitHub & Git Docs' }
    ];
  }
  if (cat.includes('devops')) {
    return [
      { title: 'Docker Official Documentation', url: 'https://docs.docker.com', authority: 'Docker & DevOps Portal' }
    ];
  }
  if (cat.includes('ai')) {
    return [
      { title: 'OpenAI Help Center & Documentation', url: 'https://help.openai.com', authority: 'OpenAI Research Support' }
    ];
  }
  if (cat.includes('smart-tv')) {
    return [
      { title: 'Google TV & Apple TV Support', url: 'https://support.google.com/googletv', authority: 'Google TV Official Support' }
    ];
  }
  if (cat.includes('printer')) {
    return [
      { title: 'HP & Canon Official Support', url: 'https://support.hp.com', authority: 'Printer Manufacturer Support' }
    ];
  }
  if (cat.includes('smart-home')) {
    return [
      { title: 'Google Nest & Home Support', url: 'https://support.google.com/googlenest', authority: 'Google Smart Home Support' }
    ];
  }
  if (cat.includes('digital-payments')) {
    return [
      { title: 'NPCI Official UPI Portal', url: 'https://www.npci.org.in', authority: 'National Payments Corporation of India' }
    ];
  }
  if (cat.includes('career')) {
    return [
      { title: 'National Career Service Portal', url: 'https://www.ncs.gov.in', authority: 'Ministry of Labour & Employment' }
    ];
  }
  if (cat.includes('security')) {
    return [
      { title: 'CERT-In Indian Computer Emergency Response Team', url: 'https://www.cert-in.org.in', authority: 'Ministry of Electronics & IT (MeitY)' }
    ];
  }

  return [
    { title: 'Canonical Ubuntu & Open Tech Documentation', url: 'https://ubuntu.com/tutorials', authority: 'Canonical Ubuntu Documentation' }
  ];
}

export default async function HowToArticlePage({ params }: HowToArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    notFound();
  }

  const relatedArticles = await getLatestArticles('how-to', 4);
  const articleJsonLd = generateArticleJsonLd(article);

  let steps = [];
  try {
    if (article.stepByStepJson) {
      steps = JSON.parse(article.stepByStepJson);
    }
  } catch (e) {}

  let faqs = [];
  try {
    if (article.faqJson) {
      faqs = JSON.parse(article.faqJson);
    }
  } catch (e) {}

  let sources = getDefaultSources(article.subCategory);
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
          { name: 'How-To', url: '/how-to' },
          { name: article.title, url: `/how-to/${params.category}/${article.slug}` }
        ]} />

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
            <span className="bg-blue-50 text-blue-800 font-extrabold px-2.5 py-0.5 rounded uppercase border border-blue-200/60">
              {article.subCategory || article.categorySection}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" /> {article.author?.name || 'InfoMitra Editorial Desk'}
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

          <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
            {article.summary}
          </p>
        </div>

        {/* Interactive Step Tracker */}
        {steps.length > 0 && (
          <HowToStepTracker steps={steps} articleSlug={article.slug} />
        )}

        {/* Text-To-Speech Audio Reader */}
        <TextToSpeech articleTitle={article.title} contentHtml={article.content} />

        {/* Article Body */}
        <article className="article-prose bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Source of Truth Section */}
          <SourceOfTruth sources={sources} lastVerifiedDate={article.updatedAt} checkerName="InfoMitra Systems Testing Desk" />

          {/* <AdSlot slotId="howto-detail-ad" /> */}

          {/* FAQs */}
          {faqs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" /> Frequently Asked Questions
              </h2>
              {faqs.map((faq: any, idx: number) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-slate-900">Q: {faq.q}</h3>
                  <p className="text-xs text-slate-700 mt-1 pl-4 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </article>

        {/* Related Articles */}
        <RelatedContent title="Related How-To Guides" articles={relatedArticles} />
      </div>
    </>
  );
}
