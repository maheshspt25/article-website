'use client';

import React, { useState } from 'react';
import { GitCompare, ArrowLeftRight, CheckCircle2 } from 'lucide-react';

export default function TextDiffTool() {
  const [originalText, setOriginalText] = useState('function helloWorld() {\n  console.log("Hello World");\n  return true;\n}');
  const [modifiedText, setModifiedText] = useState('function helloWorld() {\n  console.log("Hello InfoMitra Platform");\n  return true;\n}');

  const originalLines = originalText.split('\n');
  const modifiedLines = modifiedText.split('\n');
  const maxLines = Math.max(originalLines.length, modifiedLines.length);

  let addedCount = 0;
  let removedCount = 0;
  let unchangedCount = 0;

  const comparisonRows = [];
  for (let i = 0; i < maxLines; i++) {
    const orig = originalLines[i];
    const mod = modifiedLines[i];

    let status: 'unchanged' | 'added' | 'removed' | 'modified' = 'unchanged';
    if (orig === undefined) {
      status = 'added';
      addedCount++;
    } else if (mod === undefined) {
      status = 'removed';
      removedCount++;
    } else if (orig !== mod) {
      status = 'modified';
      addedCount++;
      removedCount++;
    } else {
      unchangedCount++;
    }

    comparisonRows.push({
      lineNum: i + 1,
      orig: orig ?? '',
      mod: mod ?? '',
      status
    });
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-indigo-600" /> Text &amp; Code Diff Comparator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Compare two versions of code, essays, or documents side-by-side to highlight line additions and modifications.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg">
            +{addedCount} Additions
          </span>
          <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-lg">
            -{removedCount} Deletions
          </span>
        </div>
      </div>

      {/* Input Text Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Original Text / Version A</label>
          <textarea
            rows={7}
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
            placeholder="Paste original code or text here..."
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Modified Text / Version B</label>
          <textarea
            rows={7}
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
            placeholder="Paste modified code or text here..."
          />
        </div>
      </div>

      {/* Side-by-Side Diff Output Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-indigo-600" /> Line-by-Line Visual Diff
        </h3>

        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-800 text-xs font-mono">
          <div className="grid grid-cols-12 bg-slate-950 text-slate-400 font-bold p-3 border-b border-slate-800 uppercase text-[11px]">
            <div className="col-span-1 text-center">Line</div>
            <div className="col-span-5 border-r border-slate-800 pr-2">Original Version</div>
            <div className="col-span-6 pl-3">Modified Version</div>
          </div>

          <div className="divide-y divide-slate-800/60 max-h-96 overflow-y-auto">
            {comparisonRows.map((row) => (
              <div
                key={row.lineNum}
                className={`grid grid-cols-12 p-2 ${
                  row.status === 'modified'
                    ? 'bg-amber-500/10 text-amber-200'
                    : row.status === 'added'
                    ? 'bg-emerald-500/10 text-emerald-200'
                    : row.status === 'removed'
                    ? 'bg-rose-500/10 text-rose-200'
                    : 'text-slate-300'
                }`}
              >
                <div className="col-span-1 text-center text-slate-500 font-extrabold text-[10px] select-none">
                  {row.lineNum}
                </div>
                <div className="col-span-5 border-r border-slate-800/80 pr-2 break-all">
                  {row.orig || <span className="text-slate-600 font-sans italic">empty</span>}
                </div>
                <div className="col-span-6 pl-3 break-all">
                  {row.mod || <span className="text-slate-600 font-sans italic">empty</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
