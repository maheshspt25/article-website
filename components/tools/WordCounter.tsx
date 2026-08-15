'use client';

import React, { useState } from 'react';
import { FileCode, Clock } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphs = text.trim() ? text.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMinutes = Math.ceil(words / 200);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
          <FileCode className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Word & Character Counter</h2>
          <p className="text-xs text-slate-500">Real-time word count, character limit checker, and estimated reading time calculator.</p>
        </div>
      </div>

      <div className="space-y-4">
        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here to count words..."
          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none leading-relaxed"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <span className="text-[11px] text-slate-500 font-semibold block">Words</span>
            <strong className="text-xl font-bold text-slate-900">{words.toLocaleString('en-IN')}</strong>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <span className="text-[11px] text-slate-500 font-semibold block">Characters</span>
            <strong className="text-xl font-bold text-slate-900">{characters.toLocaleString('en-IN')}</strong>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <span className="text-[11px] text-slate-500 font-semibold block">Sentences</span>
            <strong className="text-xl font-bold text-slate-900">{sentences}</strong>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg">
            <span className="text-[11px] text-slate-500 font-semibold block">Paragraphs</span>
            <strong className="text-xl font-bold text-slate-900">{paragraphs}</strong>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 bg-orange-50 border border-orange-200 p-3 rounded-lg">
          <span className="flex items-center gap-1 font-semibold text-orange-900">
            <Clock className="w-4 h-4 text-orange-600" /> Estimated Reading Time:
          </span>
          <strong className="text-orange-950 font-bold">{readingTimeMinutes} min read</strong>
        </div>
      </div>
    </div>
  );
}
