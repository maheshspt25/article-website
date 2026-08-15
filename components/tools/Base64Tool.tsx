'use client';

import React, { useState } from 'react';
import { Binary } from 'lucide-react';

export default function Base64Tool() {
  const [input, setInput] = useState('Hello InfoMitra!');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e: any) {
      setOutput('Error: Invalid input for Base64 processing.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl mx-auto space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
          <Binary className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Base64 Encoder & Decoder</h2>
          <p className="text-xs text-slate-500">Safely encode text strings into Base64 format and decode Base64 data.</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('encode')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
            mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
          }`}
        >
          Decode from Base64
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Input Text</label>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <button
        onClick={handleProcess}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs"
      >
        {mode === 'encode' ? 'Encode' : 'Decode'} Now
      </button>

      {output && (
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Result Output</label>
          <textarea
            readOnly
            rows={4}
            value={output}
            className="w-full bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm font-mono text-slate-900 outline-none"
          />
        </div>
      )}
    </div>
  );
}
