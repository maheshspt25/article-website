'use client';

import React, { useState } from 'react';
import { Receipt, IndianRupee } from 'lucide-react';

export default function GstCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'exclusive' | 'inclusive'>('exclusive');

  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  if (gstType === 'exclusive') {
    netAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = netAmount + gstAmount;
  } else {
    totalAmount = amount;
    netAmount = amount / (1 + gstRate / 100);
    gstAmount = totalAmount - netAmount;
  }

  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
          <Receipt className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">GST Calculator</h2>
          <p className="text-xs text-slate-500">Calculate GST amount, CGST, SGST, and total gross value for Indian tax slabs.</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Initial Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">GST Tax Rate (%)</label>
          <div className="flex gap-2">
            {[5, 12, 18, 28].map((rate) => (
              <button
                key={rate}
                onClick={() => setGstRate(rate)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                  gstRate === rate ? 'bg-amber-500 text-slate-900 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">GST Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGstType('exclusive')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                gstType === 'exclusive' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Add GST (Exclusive)
            </button>
            <button
              onClick={() => setGstType('inclusive')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                gstType === 'inclusive' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Remove GST (Inclusive)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-600">Net Amount (Excl. Tax):</span>
          <strong className="text-slate-900">₹{netAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">CGST ({(gstRate / 2)}%):</span>
          <strong className="text-slate-800">₹{cgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">SGST ({(gstRate / 2)}%):</span>
          <strong className="text-slate-800">₹{sgst.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong>
        </div>
        <div className="flex justify-between text-amber-700 font-semibold pt-2 border-t border-slate-200">
          <span>Total GST Amount:</span>
          <span>₹{gstAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
        <div className="flex justify-between text-base font-extrabold text-blue-900 pt-2 border-t border-slate-200">
          <span>Gross Total Amount:</span>
          <span>₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
        </div>
      </div>
    </div>
  );
}
