import React from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { HelpCircle, FileText, Layers, ShieldCheck, CheckCircle2, ArrowRight, BookOpen, Sparkles, Lightbulb } from 'lucide-react';

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <AdminHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-blue-600/30 space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-xs font-extrabold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-200" /> CMS Tutorial & Field Guide
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How to Fill and Use the InfoMitra Admin CMS
          </h1>
          <p className="text-sm text-blue-100 font-medium max-w-3xl leading-relaxed">
            Follow this step-by-step tutorial to learn how each field works, what exact sample values to enter, and how to maximize search engine rankings (SEO & Google Rich Snippets).
          </p>
        </div>

        {/* Section 1: Overview & Navigation */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Sparkles className="w-5 h-5 text-blue-600" /> 1. Quick Navigation & Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                Overview Dashboard
              </div>
              <p className="text-slate-600">
                View total article counts, published status, sub-category distribution, and recently edited articles.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                Articles Directory
              </div>
              <p className="text-slate-600">
                Search guides by keyword/slug, filter by sub-category, edit existing articles, or delete outdated content.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
                Article Editor
              </div>
              <p className="text-slate-600">
                Fill metadata, custom official reference sources, interactive step checklists, and expert FAQs.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Input Field Tutorial */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <FileText className="w-5 h-5 text-blue-600" /> 2. Field-by-Field Input Guide & Sample Values
          </h2>

          <div className="space-y-6">
            {/* Field 1 */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Field: Article Title</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Required</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>What to fill:</strong> Enter a clear, action-oriented topic title starting with &quot;How to...&quot; or key action phrases.
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-800">
                <strong>Sample Value:</strong> How to create application letter
              </div>
            </div>

            {/* Field 2 */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Field: Sub-Category</span>
                <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Required</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>What to fill:</strong> Pick one of the 25 specific subcategories to enable dynamic routing and sitemap indexing.
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-mono text-slate-800">
                <strong>Sample Values:</strong> documents (Forms & Letters), career (Resumes), email (Gmail), whatsapp, iphone, smart-home, digital-payments, ai, devops, git-github, network, windows
              </div>
            </div>

            {/* Field 3 */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Field: Verified Source of Truth & Primary Official Links</span>
                <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">Recommended</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>What to fill:</strong> Add official documentation citations so the live page renders verified authority links.
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-800 space-y-1">
                <div><strong>Reference Title:</strong> Canonical Ubuntu &amp; Open Tech Documentation</div>
                <div><strong>Authority Org Name:</strong> Canonical Ubuntu Documentation</div>
                <div><strong>Official URL:</strong> https://ubuntu.com/tutorials</div>
              </div>
            </div>

            {/* Field 4 */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Field: Interactive Step-by-Step Checklist</span>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">5 to 6 Steps Recommended</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>What to fill:</strong> Add step numbers, step titles, and detailed action instructions for progress tracking.
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-800 space-y-2">
                <div>
                  <span className="text-indigo-600 font-bold">Step 1 Title:</span> Open Word Processor (MS Word / Google Docs)
                </div>
                <div>
                  <span className="text-indigo-600 font-bold">Step 1 Action Text:</span> Open a new blank document in Microsoft Word or Google Docs and set page margins to 1 inch (2.54 cm).
                </div>
              </div>
            </div>

            {/* Field 5 */}
            <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Field: Expert FAQs</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">7 Questions Recommended</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                <strong>What to fill:</strong> Enter realistic user questions and verified answers to trigger Google Rich Snippet FAQ schema.
              </p>
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs font-mono text-slate-800 space-y-2">
                <div>
                  <span className="text-emerald-700 font-bold">Q:</span> What is the standard font and size for an official application letter?
                </div>
                <div>
                  <span className="text-emerald-700 font-bold">A:</span> Use professional fonts like Times New Roman, Arial, or Calibri in 11pt or 12pt size.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Best Practices */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-4 shadow-xs">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" /> 3. Best Practices for High Search Engine Rankings
          </h2>

          <div className="space-y-3 text-xs font-medium text-slate-700">
            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Always Provide 5+ Steps:</strong>
                Search engines prefer detailed multi-step guides over short 2-step summaries.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Always Provide 7+ FAQs:</strong>
                Having 7 FAQs automatically constructs `FAQPage` JSON-LD schema, qualifying your guide for Google search carousel snippets.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Add Official Source Links:</strong>
                Linking to official portals (Canonical, Google, Apple, Microsoft, NPCI, CERT-In) signals high trust and authority to Google search crawlers.
              </div>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <div>
            <h3 className="font-extrabold text-blue-900 text-base">Ready to create or edit an article?</h3>
            <p className="text-xs text-blue-700 font-medium">Head over to the Create Article form to publish new content.</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all"
          >
            Go to Create Form <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
