'use client';

import React, { useState } from 'react';
import { Search, Copy, Check, Eye, Globe } from 'lucide-react';

export default function SeoMetaGenerator() {
  const [title, setTitle] = useState<string>('How to create application letter - Step-by-Step Guide 2026');
  const [description, setDescription] = useState<string>('Learn how to create an official application letter with verified step-by-step instructions, ATS resume rules, and expert FAQs.');
  const [url, setUrl] = useState<string>('https://infomitra.com/how-to/documents/create-application-letter');
  const [copied, setCopied] = useState<boolean>(false);

  const metaHtml = `<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${url}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="article" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${url}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />`;

  const copyMeta = () => {
    navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-600" /> SEO Meta Tag &amp; Google SERP Snippet Preview Generator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Generate Google-compliant meta titles, meta descriptions, OpenGraph tags, and preview live search results.
          </p>
        </div>

        <button
          onClick={copyMeta}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied HTML Meta!' : 'Copy Meta Tags'}
        </button>
      </div>

      {/* Google SERP Snippet Live Preview */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-2 shadow-xs">
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
          <Eye className="w-4 h-4 text-blue-600" /> Google Search Engine SERP Snippet Live Preview
        </span>

        <div className="space-y-1 font-sans max-w-2xl pt-2">
          <div className="text-xs text-zinc-600 flex items-center gap-1 font-mono truncate">
            <Globe className="w-3.5 h-3.5 text-zinc-400" /> {url || 'https://example.com/page'}
          </div>
          <div className="text-lg font-bold text-blue-800 hover:underline cursor-pointer leading-tight truncate">
            {title || 'Page Title Placeholder'}
          </div>
          <div className="text-xs text-zinc-600 leading-normal line-clamp-2">
            {description || 'Page meta description placeholder text...'}
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div>
          <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
            <span>Meta Title Tag ({title.length} / 60 Chars)</span>
            <span className={title.length > 60 ? 'text-rose-600 font-extrabold' : 'text-emerald-600 font-bold'}>
              {title.length <= 60 ? 'Optimal Length' : 'Title Exceeds 60 Chars'}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-bold text-zinc-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-zinc-700 mb-1">
            <span>Meta Description Tag ({description.length} / 160 Chars)</span>
            <span className={description.length > 160 ? 'text-rose-600 font-extrabold' : 'text-emerald-600 font-bold'}>
              {description.length <= 160 ? 'Optimal Length' : 'Description Exceeds 160 Chars'}
            </span>
          </div>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-xs font-medium text-zinc-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 mb-1">Canonical URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-xs font-mono text-zinc-900 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>
    </div>
  );
}
