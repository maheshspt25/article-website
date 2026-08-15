'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, Download, Code } from 'lucide-react';

export default function JsonCsvConverter() {
  const [jsonText, setJsonText] = useState<string>(
    '[\n  { "name": "Rahul Sharma", "role": "Software Engineer", "experience": "3 Years" },\n  { "name": "Priya Patel", "role": "Data Analyst", "experience": "2 Years" }\n]'
  );
  const [csvText, setCsvText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const jsonToCsv = () => {
    setError('');
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        setError('JSON must be a non-empty array of objects.');
        return;
      }

      const headers = Object.keys(parsed[0]);
      const csvRows = [headers.join(',')];

      for (const row of parsed) {
        const values = headers.map((header) => {
          const val = row[header] ?? '';
          const escaped = String(val).replace(/"/g, '""');
          return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
      }

      setCsvText(csvRows.join('\n'));
    } catch (e: any) {
      setError(`JSON Parse Error: ${e.message}`);
    }
  };

  const csvToJson = () => {
    setError('');
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setError('CSV must contain a header line and at least one data row.');
        return;
      }

      const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, '').trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',').map((v) => v.replace(/^"|"$/g, '').trim());
        if (currentLine.length === headers.length) {
          const obj: Record<string, string> = {};
          headers.forEach((h, idx) => {
            obj[h] = currentLine[idx];
          });
          result.push(obj);
        }
      }

      setJsonText(JSON.stringify(result, null, 2));
    } catch (e: any) {
      setError(`CSV Parse Error: ${e.message}`);
    }
  };

  const copyCsv = () => {
    navigator.clipboard.writeText(csvText || jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Code className="w-6 h-6 text-indigo-600" /> JSON &amp; CSV 2-Way Data Converter
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Convert JSON arrays to CSV spreadsheets and CSV files to clean JSON objects in real-time.
          </p>
        </div>

        <button
          onClick={copyCsv}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-xs transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied Output!' : 'Copy Result'}
        </button>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3 rounded-xl">
          {error}
        </div>
      )}

      {/* 2 Column Text Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold uppercase text-zinc-700">JSON Source Array</label>
            <button
              onClick={jsonToCsv}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors flex items-center gap-1"
            >
              Convert JSON → CSV
            </button>
          </div>
          <textarea
            rows={10}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold uppercase text-zinc-700">CSV Output / Source</label>
            <button
              onClick={csvToJson}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg text-xs transition-colors flex items-center gap-1"
            >
              Convert CSV → JSON
            </button>
          </div>
          <textarea
            rows={10}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="CSV output will appear here, or paste CSV text to convert to JSON..."
            className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 text-xs font-mono text-zinc-900 focus:bg-white focus:outline-none focus:border-indigo-600 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
