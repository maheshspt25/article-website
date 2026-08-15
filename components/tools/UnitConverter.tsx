'use client';

import React, { useState } from 'react';
import { Ruler } from 'lucide-react';

export default function UnitConverter() {
  const [category, setCategory] = useState<'length' | 'weight' | 'temperature'>('length');
  const [val, setVal] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('meter');
  const [toUnit, setToUnit] = useState<string>('kilometer');

  const lengthRates: Record<string, number> = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    foot: 3.28084,
    inch: 39.3701,
    mile: 0.000621371,
  };

  const weightRates: Record<string, number> = {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
  };

  let result = 0;
  if (category === 'length') {
    const meters = val / (lengthRates[fromUnit] || 1);
    result = meters * (lengthRates[toUnit] || 1);
  } else if (category === 'weight') {
    const kgs = val / (weightRates[fromUnit] || 1);
    result = kgs * (weightRates[toUnit] || 1);
  } else if (category === 'temperature') {
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      result = (val * 9) / 5 + 32;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      result = ((val - 32) * 5) / 9;
    } else {
      result = val;
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center">
          <Ruler className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Unit Converter</h2>
          <p className="text-xs text-slate-500">Convert length, weight, area, and temperature units easily.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          {(['length', 'weight', 'temperature'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                if (cat === 'length') { setFromUnit('meter'); setToUnit('kilometer'); }
                if (cat === 'weight') { setFromUnit('kilogram'); setToUnit('gram'); }
                if (cat === 'temperature') { setFromUnit('celsius'); setToUnit('fahrenheit'); }
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-colors ${
                category === cat ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">From Value</label>
            <input
              type="number"
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-mono"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full mt-2 bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium"
            >
              {category === 'length' && Object.keys(lengthRates).map((u) => <option key={u} value={u}>{u}</option>)}
              {category === 'weight' && Object.keys(weightRates).map((u) => <option key={u} value={u}>{u}</option>)}
              {category === 'temperature' && ['celsius', 'fahrenheit'].map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Converted Result</label>
            <div className="w-full bg-teal-50 border border-teal-200 rounded-lg p-2.5 text-sm font-mono font-bold text-teal-900 truncate">
              {result.toLocaleString('en-IN', { maximumFractionDigits: 4 })}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full mt-2 bg-white border border-slate-300 rounded-lg p-2 text-xs font-medium"
            >
              {category === 'length' && Object.keys(lengthRates).map((u) => <option key={u} value={u}>{u}</option>)}
              {category === 'weight' && Object.keys(weightRates).map((u) => <option key={u} value={u}>{u}</option>)}
              {category === 'temperature' && ['celsius', 'fahrenheit'].map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
