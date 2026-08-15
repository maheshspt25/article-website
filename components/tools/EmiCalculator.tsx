'use client';

import React, { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000); // 10 Lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(15); // 15 years

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const P = loanAmount;
  const r = interestRate / (12 * 100);
  const n = tenureYears * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    totalPayment = emi * n;
    totalInterest = totalPayment - P;
  }

  const principalPercent = totalPayment > 0 ? Math.round((P / totalPayment) * 100) : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">EMI & Loan Calculator</h2>
          <p className="text-xs text-slate-500">Compute monthly Home Loan, Personal Loan, and Car Loan EMI with interest breakdown.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Loan Amount</span>
              <span className="text-blue-600 font-mono">₹{loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="50000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Interest Rate (p.a.)</span>
              <span className="text-blue-600 font-mono">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="20"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Loan Tenure</span>
              <span className="text-blue-600 font-mono">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Monthly Loan EMI</span>
            <div className="text-3xl font-extrabold text-slate-900 mt-1 flex items-center">
              <IndianRupee className="w-6 h-6 text-emerald-600" />
              {emi.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="space-y-3 my-4 pt-4 border-t border-slate-200 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Principal Amount:</span>
              <strong className="text-slate-900">₹{P.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Interest Payable:</span>
              <strong className="text-amber-700">₹{totalInterest.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t border-slate-200 text-sm">
              <span className="text-slate-900">Total Amount Payable:</span>
              <span className="text-blue-700">₹{totalPayment.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Visual Bar */}
          <div>
            <div className="h-3 w-full bg-amber-400 rounded-full overflow-hidden flex">
              <div style={{ width: `${principalPercent}%` }} className="bg-blue-600 h-full"></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span> Principal ({principalPercent}%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> Interest ({interestPercent}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
