'use client';

import React, { useState } from 'react';
import { Award, AlertCircle, CheckCircle2, Calculator } from 'lucide-react';

export default function AttendanceCalculator() {
  const [attended, setAttended] = useState<number>(45);
  const [total, setTotal] = useState<number>(60);
  const [target, setTarget] = useState<number>(75);

  const currentPercent = total > 0 ? (attended / total) * 100 : 0;

  // Calculate required future classes or allowable bunks
  let statusMessage = '';
  let subMessage = '';
  let isSafe = false;

  if (currentPercent >= target) {
    isSafe = true;
    // Calculate how many future classes can be bunked while staying >= target
    // (attended) / (total + x) >= target/100  =>  x <= (100*attended - target*total)/target
    const maxBunks = Math.floor((100 * attended - target * total) / target);
    statusMessage = `Your attendance is ${currentPercent.toFixed(1)}%! You are SAFE! 🎉`;
    subMessage = maxBunks > 0
      ? `You can bunk the next ${maxBunks} upcoming classes and still maintain ${target}% attendance.`
      : `You are exactly on target! Do not miss any upcoming classes to stay above ${target}%.`;
  } else {
    isSafe = false;
    // Calculate how many consecutive classes must be attended to reach target
    // (attended + x) / (total + x) >= target/100  =>  x >= (target*total - 100*attended) / (100 - target)
    const reqClasses = Math.ceil((target * total - 100 * attended) / (100 - target));
    statusMessage = `Your attendance is ${currentPercent.toFixed(1)}%! Shortage Alert! ⚠️`;
    subMessage = `You must attend the next ${reqClasses} consecutive classes without missing any to reach ${target}% attendance.`;
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-indigo-600" /> Attendance &amp; Class Bunk Calculator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Calculate your current college attendance percentage and see how many classes you can bunk or MUST attend.
          </p>
        </div>
      </div>

      {/* Main Status Display */}
      <div className={`p-6 rounded-2xl border text-white space-y-2 shadow-md ${
        isSafe ? 'bg-gradient-to-r from-emerald-800 to-slate-900 border-emerald-700' : 'bg-gradient-to-r from-rose-900 to-slate-900 border-rose-800'
      }`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Calculated Attendance</span>
          <span className="text-3xl font-black text-white">{currentPercent.toFixed(1)}%</span>
        </div>

        <div className="text-lg font-extrabold text-white pt-2">{statusMessage}</div>
        <p className="text-xs text-slate-200 font-medium leading-relaxed">{subMessage}</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Classes Attended</label>
          <input
            type="number"
            min="0"
            value={attended}
            onChange={(e) => setAttended(parseInt(e.target.value, 10) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Total Classes Conducted</label>
          <input
            type="number"
            min="1"
            value={total}
            onChange={(e) => setTotal(parseInt(e.target.value, 10) || 1)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Target Attendance (%)</label>
          <select
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value, 10))}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          >
            <option value={75}>75% Target (Standard University Rule)</option>
            <option value={80}>80% Target (Strict Medical/Engg Rule)</option>
            <option value={85}>85% Target (Honors Rule)</option>
            <option value={60}>60% Target (Condonation Limit)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
