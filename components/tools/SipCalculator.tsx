'use client';

import React, { useState } from 'react';
import { TrendingUp, IndianRupee } from 'lucide-react';

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [investmentYears, setInvestmentYears] = useState(10);

  // Future Value = P * [ (1 + i)^n - 1 ] * (1 + i) / i
  const P = monthlyInvestment;
  const i = expectedRate / (12 * 100);
  const n = investmentYears * 12;

  let totalInvested = P * n;
  let futureValue = 0;
  let estimatedReturns = 0;

  if (P > 0 && i > 0 && n > 0) {
    futureValue = Math.round(P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    estimatedReturns = futureValue - totalInvested;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">SIP Calculator</h2>
          <p className="text-xs text-slate-500">Estimate wealth growth for Mutual Fund Systematic Investment Plans (SIP).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Monthly Investment</span>
              <span className="text-blue-600 font-mono">₹{monthlyInvestment.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Expected Annual Return Rate (p.a)</span>
              <span className="text-blue-600 font-mono">{expectedRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={expectedRate}
              onChange={(e) => setExpectedRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Time Period</span>
              <span className="text-blue-600 font-mono">{investmentYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Output */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expected Future Value</span>
            <div className="text-3xl font-extrabold text-blue-700 mt-1 flex items-center">
              <IndianRupee className="w-6 h-6 text-blue-600" />
              {futureValue.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="space-y-3 my-4 pt-4 border-t border-slate-200 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Invested Amount:</span>
              <strong className="text-slate-900">₹{totalInvested.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Estimated Wealth Gain:</span>
              <strong className="text-emerald-600">₹{estimatedReturns.toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
