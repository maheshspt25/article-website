'use client';

import React, { useState } from 'react';
import { Percent } from 'lucide-react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<number | ''>(20);
  const [m1Y, setM1Y] = useState<number | ''>(500);

  // Mode 2: X is what percent of Y?
  const [m2X, setM2X] = useState<number | ''>(75);
  const [m2Y, setM2Y] = useState<number | ''>(150);

  // Mode 3: Percentage increase/decrease from X to Y
  const [m3X, setM3X] = useState<number | ''>(100);
  const [m3Y, setM3Y] = useState<number | ''>(125);

  const res1 = (m1X !== '' && m1Y !== '') ? (Number(m1X) / 100) * Number(m1Y) : 0;
  const res2 = (m2X !== '' && m2Y !== '' && Number(m2Y) !== 0) ? (Number(m2X) / Number(m2Y)) * 100 : 0;
  
  let res3 = 0;
  let isIncrease = true;
  if (m3X !== '' && m3Y !== '' && Number(m3X) !== 0) {
    const diff = Number(m3Y) - Number(m3X);
    res3 = (diff / Number(m3X)) * 100;
    isIncrease = diff >= 0;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
          <Percent className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Percentage Calculator</h2>
          <p className="text-xs text-slate-500">Calculate percentage values, percentage ratios, and percentage change instantly.</p>
        </div>
      </div>

      {/* Mode 1 */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">1. Calculate Percentage Value (What is X% of Y?)</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>What is</span>
          <input
            type="number"
            value={m1X}
            onChange={(e) => setM1X(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-24 bg-white border border-slate-300 rounded-lg p-2 font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span>% of</span>
          <input
            type="number"
            value={m1Y}
            onChange={(e) => setM1Y(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-28 bg-white border border-slate-300 rounded-lg p-2 font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span>=</span>
          <span className="font-extrabold text-blue-700 text-lg bg-blue-100 px-4 py-1.5 rounded-lg font-mono">
            {res1.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Mode 2 */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">2. Calculate Percentage Ratio (X is what % of Y?)</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <input
            type="number"
            value={m2X}
            onChange={(e) => setM2X(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-24 bg-white border border-slate-300 rounded-lg p-2 font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span>is what % of</span>
          <input
            type="number"
            value={m2Y}
            onChange={(e) => setM2Y(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-28 bg-white border border-slate-300 rounded-lg p-2 font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span>=</span>
          <span className="font-extrabold text-purple-700 text-lg bg-purple-100 px-4 py-1.5 rounded-lg font-mono">
            {res2.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Mode 3 */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">3. Percentage Increase / Decrease (From X to Y)</h3>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>From</span>
          <input
            type="number"
            value={m3X}
            onChange={(e) => setM3X(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-24 bg-white border border-slate-300 rounded-lg p-2 font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span>to</span>
          <input
            type="number"
            value={m3Y}
            onChange={(e) => setM3Y(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-28 bg-white border border-slate-300 rounded-lg p-2 font-mono text-center focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span>=</span>
          <span className={`font-extrabold text-lg px-4 py-1.5 rounded-lg font-mono ${
            isIncrease ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
          }`}>
            {isIncrease ? '+' : ''}{res3.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
