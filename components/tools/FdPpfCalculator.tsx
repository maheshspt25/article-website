'use client';

import React, { useState } from 'react';
import { IndianRupee, TrendingUp, PiggyBank, PieChart } from 'lucide-react';

export default function FdPpfCalculator() {
  const [calcType, setCalcType] = useState<'fd' | 'ppf'>('fd');
  const [deposit, setDeposit] = useState<number>(100000);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [rate, setRate] = useState<number>(7.1); // 7.1% default for PPF / 7.5% for FD

  // FD Compound Interest Formula: A = P * (1 + r/n)^(n*t) compounded quarterly (n=4)
  // PPF Compound Interest: Year-end compounding on annual deposit
  let totalInvested = 0;
  let maturityAmount = 0;

  if (calcType === 'fd') {
    totalInvested = deposit;
    const r = rate / 100;
    maturityAmount = deposit * Math.pow(1 + r / 4, 4 * tenureYears);
  } else {
    // PPF: Annual investment at start of year for N years @ 7.1%
    totalInvested = deposit * tenureYears;
    let accumulated = 0;
    const r = rate / 100;
    for (let i = 0; i < tenureYears; i++) {
      accumulated = (accumulated + deposit) * (1 + r);
    }
    maturityAmount = accumulated;
  }

  const totalInterest = Math.max(0, maturityAmount - totalInvested);

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-emerald-600" /> FD &amp; PPF Maturity Calculator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Calculate estimated maturity returns, total interest earned, and compound wealth growth for FD and PPF savings.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl">
          <button
            onClick={() => { setCalcType('fd'); setRate(7.5); setTenureYears(5); }}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              calcType === 'fd' ? 'bg-emerald-600 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Fixed Deposit (FD)
          </button>
          <button
            onClick={() => { setCalcType('ppf'); setRate(7.1); setTenureYears(15); }}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
              calcType === 'ppf' ? 'bg-emerald-600 text-white shadow-xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Public Provident Fund (PPF)
          </button>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Total Maturity Value</span>
          <div className="text-4xl font-black text-white">
            ₹{Math.round(maturityAmount).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Total Principal Invested</span>
          <div className="text-3xl font-extrabold text-slate-200">
            ₹{Math.round(totalInvested).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Total Compound Interest</span>
          <div className="text-3xl font-extrabold text-emerald-400">
            ₹{Math.round(totalInterest).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">
            {calcType === 'fd' ? 'Lump-sum Deposit (₹)' : 'Annual Investment (₹)'}
          </label>
          <input
            type="number"
            step="10000"
            value={deposit}
            onChange={(e) => setDeposit(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Interest Rate (% p.a.)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Duration (Years)</label>
          <input
            type="number"
            min="1"
            max="30"
            value={tenureYears}
            onChange={(e) => setTenureYears(parseInt(e.target.value, 10) || 1)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}
