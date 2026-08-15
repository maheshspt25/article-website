'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { ArrowLeft, Save, Plus, Trash2, CheckCircle, FileText, HelpCircle, Layers, Link as LinkIcon, ShieldCheck } from 'lucide-react';

interface StepItem {
  step: number;
  title: string;
  text: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface SourceItem {
  title: string;
  url: string;
  authority: string;
}

export default function CreateArticlePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySection, setCategorySection] = useState('how-to');
  const [subCategory, setSubCategory] = useState('documents');
  const [summary, setSummary] = useState('');
  const [readingTime, setReadingTime] = useState('5 min read');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);

  // Dynamic Steps State
  const [steps, setSteps] = useState<StepItem[]>([
    { step: 1, title: 'Open Application / Document Workspace', text: 'Launch your primary application workspace and open a new document or configuration panel.' },
    { step: 2, title: 'Navigate to Target Feature Settings', text: 'Locate target sub-menu options and configure primary preference parameters.' },
    { step: 3, title: 'Configure Custom Preferences', text: 'Input target parameters, format document text, or adjust system sliders.' },
    { step: 4, title: 'Save Configuration Settings', text: 'Click Apply / Save Changes to register preferences in local or cloud storage.' },
    { step: 5, title: 'Verify & Test Setup', text: 'Return to main application screen and test functionality to confirm clean execution.' }
  ]);

  // Dynamic FAQs State
  const [faqs, setFaqs] = useState<FaqItem[]>([
    { q: 'What are the technical prerequisites for this guide?', a: 'Requires active device connectivity, updated application software, and appropriate user permissions.' },
    { q: 'Does this setup work offline?', a: 'Local configuration preferences operate offline; cloud features require an active network connection.' },
    { q: 'Is this process free to configure?', a: 'Yes, standard configuration features are provided free without extra license fees.' },
    { q: 'How to troubleshoot unexpected errors?', a: 'Restart your app or device, clear temporary cache files, and verify software update status.' },
    { q: 'Can configuration changes be undone later?', a: 'Yes, you can re-open settings and restore default preferences anytime.' },
    { q: 'Does this guide apply across both desktop and mobile?', a: 'Settings synchronize across linked desktop applications and mobile app versions.' },
    { q: 'Where to access official support documentation?', a: 'Refer to official manufacturer documentation and primary support portals.' }
  ]);

  // Dynamic Sources State
  const [sources, setSources] = useState<SourceItem[]>([
    {
      title: 'Canonical Ubuntu & Open Tech Documentation',
      url: 'https://ubuntu.com/tutorials',
      authority: 'Canonical Ubuntu Documentation'
    }
  ]);

  const subCategoryOptions = [
    { label: 'Fitness Routines', value: 'fitness' },
    { label: 'Exercise & Training', value: 'exercise' },
    { label: 'Nutrition & Diet', value: 'nutrition' },
    { label: 'Weight Management', value: 'weight-management' },
    { label: 'Sleep Hygiene', value: 'sleep' },
    { label: 'Mental Wellness', value: 'mental-wellness' },
    { label: 'Fitness Equipment', value: 'fitness-equipment' },
    { label: 'Workout Plans', value: 'workout-plans' },
    { label: 'Online Forms & Documents', value: 'documents' },
    { label: 'Resume & Career', value: 'career' },
    { label: 'Gmail & Email', value: 'email' },
    { label: 'Google Services', value: 'google' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'iPhone & iOS', value: 'iphone' },
    { label: 'Social Media', value: 'social-media' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'Microsoft Office', value: 'microsoft-office' },
    { label: 'Chrome & Browsers', value: 'browsers' },
    { label: 'Wi-Fi & Network', value: 'network' },
    { label: 'Git & GitHub', value: 'git-github' },
    { label: 'Docker & DevOps', value: 'devops' },
    { label: 'AI Tools', value: 'ai' },
    { label: 'Files & Storage', value: 'files-storage' },
    { label: 'Smart TV & Streaming', value: 'smart-tv' },
    { label: 'Printer & Scanner', value: 'printer' },
    { label: 'Smart Home & IoT', value: 'smart-home' },
    { label: 'Digital Payments & UPI', value: 'digital-payments' },
    { label: 'Online Security & Privacy', value: 'security' },
    { label: 'Windows 11', value: 'windows' },
    { label: 'Android', value: 'android' },
    { label: 'PDF Tools', value: 'pdf' },
    { label: 'Linux', value: 'linux' },
    { label: 'Internet', value: 'internet' }
  ];

  // Helper step handlers
  const handleAddStep = () => {
    setSteps([...steps, { step: steps.length + 1, title: '', text: '' }]);
  };

  const handleStepChange = (index: number, field: 'title' | 'text', val: string) => {
    const updated = [...steps];
    updated[index][field] = val;
    setSteps(updated);
  };

  const handleRemoveStep = (index: number) => {
    const updated = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 }));
    setSteps(updated);
  };

  // Helper FAQ handlers
  const handleAddFaq = () => {
    setFaqs([...faqs, { q: '', a: '' }]);
  };

  const handleFaqChange = (index: number, field: 'q' | 'a', val: string) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  // Helper Source handlers
  const handleAddSource = () => {
    setSources([...sources, { title: '', url: 'https://', authority: '' }]);
  };

  const handleSourceChange = (index: number, field: 'title' | 'url' | 'authority', val: string) => {
    const updated = [...sources];
    updated[index][field] = val;
    setSources(updated);
  };

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !summary || !content) {
      alert('Title, summary, and content HTML are required!');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: slug || undefined,
          categorySection,
          subCategory,
          summary,
          readingTime,
          content,
          published,
          stepByStepJson: steps,
          faqJson: faqs,
          sourcesJson: sources
        })
      });

      const data = await res.json();
      if (data.success) {
        alert('Article created successfully!');
        router.push('/admin/articles');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Failed to save article.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      <AdminHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Main Metadata */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <FileText className="w-5 h-5 text-blue-600" /> Basic Article Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to create application letter"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Category Section</label>
                  <select
                    value={categorySection}
                    onChange={(e) => setCategorySection(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                  >
                    <option value="how-to">how-to</option>
                    <option value="technology">technology</option>
                    <option value="education">education</option>
                    <option value="finance">finance</option>
                    <option value="health">health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Sub-Category</label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-semibold"
                  >
                    {subCategoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.value})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Custom Slug (Optional)</label>
                  <input
                    type="text"
                    placeholder="Auto-generated if left blank"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Reading Time</label>
                  <input
                    type="text"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Article Summary *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Brief summary explaining what this guide accomplishes..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">Article Content (HTML) *</label>
                <textarea
                  required
                  rows={6}
                  placeholder="<p>Detailed step-by-step introduction content...</p>"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 font-mono text-xs leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="publishedToggle"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="publishedToggle" className="text-sm font-bold text-slate-900 cursor-pointer">
                  Publish Article Immediately (Live on Site & Search Engines)
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Official Primary Reference Citations Manager */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-600" /> Verified Source of Truth & Primary Official Links ({sources.length} Citations)
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage official documentation reference links (e.g. Canonical Ubuntu, Google Support, Apple Support)</p>
              </div>

              <button
                type="button"
                onClick={handleAddSource}
                className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-sky-200"
              >
                <Plus className="w-3.5 h-3.5" /> Add Official Link
              </button>
            </div>

            <div className="space-y-4">
              {sources.map((src, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1">
                      <LinkIcon className="w-3.5 h-3.5" /> Official Citation #{idx + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveSource(idx)}
                      className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Reference Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Canonical Ubuntu & Open Tech Documentation"
                        value={src.title}
                        onChange={(e) => handleSourceChange(idx, 'title', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Authority Org Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Canonical Ubuntu Documentation"
                        value={src.authority}
                        onChange={(e) => handleSourceChange(idx, 'authority', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-sky-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Official Documentation URL</label>
                    <input
                      type="url"
                      placeholder="https://ubuntu.com/tutorials"
                      value={src.url}
                      onChange={(e) => handleSourceChange(idx, 'url', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-sky-700 focus:outline-none focus:border-sky-600 font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Dynamic Step-by-Step Checklist */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" /> Interactive Step-by-Step Checklist ({steps.length} Steps)
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Customize exact tutorial steps displayed in progress tracker</p>
              </div>

              <button
                type="button"
                onClick={handleAddStep}
                className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-indigo-200"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>

            <div className="space-y-4">
              {steps.map((st, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="bg-indigo-100 text-indigo-800 font-extrabold text-xs px-2.5 py-0.5 rounded border border-indigo-200">
                      Step {st.step}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveStep(idx)}
                      className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Step Title (e.g. Open Word Processor)"
                      value={st.title}
                      onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 font-bold"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Detailed Step Action Text..."
                      value={st.text}
                      onChange={(e) => handleStepChange(idx, 'text', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Dynamic FAQs */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-600" /> Expert FAQs ({faqs.length} Questions)
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Generates FAQPage JSON-LD schema for Google Rich Snippets</p>
              </div>

              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-emerald-200"
              >
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      FAQ #{idx + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="text-rose-600 hover:text-rose-700 text-xs font-bold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Question (e.g. What is the standard font size?)"
                      value={faq.q}
                      onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Detailed Verified Answer..."
                      value={faq.a}
                      onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
            <Link
              href="/admin/articles"
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-bold transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-xl text-sm shadow-md transition-all border border-blue-500/30 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {submitting ? 'Saving Article...' : 'Save & Create Article'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
