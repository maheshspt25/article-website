'use client';

import React, { useState } from 'react';
import { Code, Check, AlertCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState('{"name":"InfoMitra","type":"Portal","features":["Tech","Guides","Calculators"]}');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
      setFormattedJson('');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
      setFormattedJson('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
          <Code className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">JSON Formatter & Validator</h2>
          <p className="text-xs text-slate-500">Beautify, validate, and minify JSON payloads for web applications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Input JSON String</label>
          <textarea
            rows={10}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleFormat}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs"
            >
              Beautify JSON
            </button>
            <button
              onClick={handleMinify}
              className="flex-1 bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 rounded-lg text-xs"
            >
              Minify JSON
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Formatted Output</label>
          {error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block font-bold mb-1">JSON Syntax Error:</strong>
                {error}
              </div>
            </div>
          ) : (
            <textarea
              readOnly
              rows={10}
              value={formattedJson || inputJson}
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-xl outline-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}
