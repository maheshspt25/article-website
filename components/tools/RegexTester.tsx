'use client';

import React, { useState } from 'react';
import { Code, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState<string>('g');
  const [testText, setTestText] = useState<string>(
    'Contact support at help@infomitra.com or editorial@infomitra.com for verified guidance.'
  );

  let matches: RegExpExecArray[] = [];
  let error = '';

  try {
    if (pattern) {
      const regex = new RegExp(pattern, flags);
      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testText)) !== null) {
          matches.push(match);
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        const match = regex.exec(testText);
        if (match) matches.push(match);
      }
    }
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-600" /> Live RegEx Pattern Tester &amp; Group Matcher
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Test regular expressions in real-time with pattern matching, capture groups, and flags (g, i, m).
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-extrabold px-3 py-1.5 rounded-xl">
          {matches.length} Matches Found
        </div>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" /> Invalid RegEx: {error}
        </div>
      )}

      {/* RegEx Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
        <div className="sm:col-span-3">
          <label className="block text-xs font-extrabold uppercase text-zinc-700 mb-1">Regular Expression Pattern</label>
          <div className="flex items-center bg-white border border-zinc-300 rounded-xl px-3 py-2 font-mono text-sm font-bold text-zinc-900 focus-within:border-indigo-600">
            <span className="text-zinc-400 select-none mr-1">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-transparent focus:outline-none"
              placeholder="e.g. [a-z]+"
            />
            <span className="text-zinc-400 select-none ml-1">/</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase text-zinc-700 mb-1">RegEx Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm font-mono font-bold text-zinc-900 focus:outline-none focus:border-indigo-600 text-center"
            placeholder="g, i, m"
          />
        </div>
      </div>

      {/* Test String */}
      <div className="space-y-2">
        <label className="block text-xs font-extrabold uppercase text-zinc-700">Test String</label>
        <textarea
          rows={5}
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
          placeholder="Paste sample text to test regex matches..."
        />
      </div>

      {/* Extracted Matches List */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Extracted Capture Groups</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {matches.map((m, idx) => (
            <div key={idx} className="bg-slate-900 text-white rounded-xl p-3 text-xs font-mono space-y-1">
              <div className="flex justify-between text-slate-400 font-bold">
                <span>Match #{idx + 1} (Index: {m.index})</span>
                <span className="text-emerald-400 font-bold">{m[0]}</span>
              </div>
              {m.slice(1).map((group, gIdx) => (
                <div key={gIdx} className="text-slate-300 text-[11px]">
                  • Group ${gIdx + 1}: <strong className="text-amber-300">{group}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
