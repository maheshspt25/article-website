'use client';

import React, { useState } from 'react';
import { FileCode, Download, Copy, Check, Eye } from 'lucide-react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState<string>(
    '# Student & Professional Report\n\nWelcome to the **InfoMitra Markdown Live Editor**!\n\n## Key Features\n- Live HTML Preview\n- Fast Client-side Parsing\n- 1-Click Code Export\n\n> "Simplicity is prerequisite for reliability." - Edsger W. Dijkstra\n\n```javascript\nconsole.log("Hello InfoMitra World!");\n```'
  );

  const [copiedHtml, setCopiedHtml] = useState(false);

  // Basic client-side markdown to HTML parser
  const renderHtml = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-zinc-900 mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-black text-zinc-900 mt-5 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-black text-zinc-900 mt-6 mb-3">$1</h1>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-600 pl-4 py-1 my-3 text-zinc-600 italic font-medium bg-indigo-50/50 rounded-r-lg">$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-black text-zinc-900">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/gim, '<code class="bg-zinc-100 text-indigo-600 px-1.5 py-0.5 rounded font-mono text-xs font-bold">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 underline font-bold" target="_blank">$1</a>')
      .replace(/\n$/gim, '<br />')
      .replace(/\n/gim, '<br />');
  };

  const htmlContent = renderHtml(markdown);

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const downloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <FileCode className="w-6 h-6 text-indigo-600" /> Markdown Live Editor &amp; HTML Converter
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Write markdown notes, essays, or README files with instant side-by-side HTML preview and export capabilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyHtml}
            className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors border border-zinc-200"
          >
            {copiedHtml ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copiedHtml ? 'Copied HTML!' : 'Copy HTML'}
          </button>

          <button
            onClick={downloadMd}
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-1.5 rounded-xl text-xs transition-all shadow-xs"
          >
            <Download className="w-4 h-4" /> Download .md
          </button>
        </div>
      </div>

      {/* Side-by-side Editor & Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Markdown Raw Source</label>
          <textarea
            rows={14}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
            placeholder="Type your markdown text here..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700 flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-indigo-600" /> Live Rendered Preview
          </label>
          <div
            className="w-full min-h-[300px] bg-zinc-50/50 border border-zinc-200 rounded-2xl p-4 text-xs text-zinc-800 font-sans leading-relaxed overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </div>
  );
}
