'use client';

import React, { useState } from 'react';
import { Type, Copy, Check, Trash2, ArrowRightLeft } from 'lucide-react';

export default function TextCaseConverter() {
  const [text, setText] = useState<string>('how to CREATE application LETTER for college and JOBS');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  const toUpper = () => setText(text.toUpperCase());
  const toLower = () => setText(text.toLowerCase());
  const toTitle = () => {
    setText(
      text.toLowerCase().replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase())
    );
  };
  const toSentence = () => {
    setText(
      text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
    );
  };
  const toCamel = () => {
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    );
  };
  const toSnake = () => {
    setText(
      text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/(^_|_$)/g, '')
    );
  };
  const toKebab = () => {
    setText(
      text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    );
  };

  const removeExtraSpaces = () => {
    setText(text.replace(/\s+/g, ' ').trim());
  };

  const removeDuplicateLines = () => {
    const lines = text.split('\n');
    const unique = Array.from(new Set(lines));
    setText(unique.join('\n'));
  };

  const sortLines = () => {
    const lines = text.split('\n').filter((l) => l.trim().length > 0);
    lines.sort((a, b) => a.localeCompare(b));
    setText(lines.join('\n'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Type className="w-6 h-6 text-indigo-600" /> Text Case Converter &amp; String Manipulator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Convert text case (UPPER, lower, Title Case, camelCase, snake_case), sort lines, and clean duplicate spaces.
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>

      {/* Main Text Area */}
      <div className="space-y-2">
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type text to convert..."
          className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-medium text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed font-mono"
        />
        <div className="flex items-center justify-between text-xs text-zinc-500 font-bold px-1">
          <span>Words: <strong>{words}</strong></span>
          <span>Characters: <strong>{chars}</strong></span>
          <span>Lines: <strong>{text.split('\n').length}</strong></span>
        </div>
      </div>

      {/* Conversion Actions */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Case Transformations</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={toUpper} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200">
            UPPERCASE
          </button>
          <button onClick={toLower} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200">
            lowercase
          </button>
          <button onClick={toTitle} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200">
            Title Case
          </button>
          <button onClick={toSentence} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200">
            Sentence case
          </button>
          <button onClick={toCamel} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200 font-mono">
            camelCase
          </button>
          <button onClick={toSnake} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200 font-mono">
            snake_case
          </button>
          <button onClick={toKebab} className="px-3.5 py-2 bg-zinc-100 hover:bg-indigo-600 hover:text-white text-zinc-800 text-xs font-extrabold rounded-xl transition-colors border border-zinc-200 font-mono">
            kebab-case
          </button>
        </div>

        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider pt-2">Text Cleaning &amp; Formatting</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={removeExtraSpaces} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors border border-slate-200">
            Remove Extra Spaces
          </button>
          <button onClick={removeDuplicateLines} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors border border-slate-200">
            Remove Duplicate Lines
          </button>
          <button onClick={sortLines} className="px-3.5 py-2 bg-slate-100 hover:bg-slate-800 hover:text-white text-slate-800 text-xs font-bold rounded-xl transition-colors border border-slate-200">
            Sort Lines A-Z
          </button>
        </div>
      </div>
    </div>
  );
}
