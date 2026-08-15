'use client';

import React, { useState } from 'react';
import { Calculator, Users, IndianRupee, Percent } from 'lucide-react';

export default function SplitBillCalculator() {
  const [billAmount, setBillAmount] = useState<number>(2500);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [people, setPeople] = useState<number>(4);

  const discountAmount = (billAmount * discountPercent) / 100;
  const discountedBill = Math.max(0, billAmount - discountAmount);
  const tipAmount = (discountedBill * tipPercent) / 100;
  const grandTotal = discountedBill + tipAmount;
  const perPerson = people > 0 ? grandTotal / people : 0;

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> Group Bill Splitter, Tip &amp; Discount Calculator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Split restaurant bills, travel expenses, and party costs evenly between friends with custom tip &amp; discount calculations.
          </p>
        </div>
      </div>

      {/* Main Results Box */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Per Person Share</span>
          <div className="text-4xl font-black text-white">
            ₹{Math.round(perPerson).toLocaleString('en-IN')} <span className="text-xs text-indigo-300 font-normal">/ person</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Grand Total Bill</span>
          <div className="text-3xl font-extrabold text-emerald-400">
            ₹{Math.round(grandTotal).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Tip Amount</span>
          <div className="text-3xl font-extrabold text-amber-300">
            ₹{Math.round(tipAmount).toLocaleString('en-IN')} ({tipPercent}%)
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div>
          <label className="block text-xs font-extrabold uppercase text-zinc-700 mb-1">Total Bill (₹)</label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase text-zinc-700 mb-1">Tip (%)</label>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase text-zinc-700 mb-1">Discount (%)</label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold uppercase text-zinc-700 mb-1">Number of People</label>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(parseInt(e.target.value, 10) || 1)}
            className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
