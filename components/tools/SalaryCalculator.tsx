'use client';

import React, { useState } from 'react';
import { IndianRupee, Calculator, PieChart, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState<number>(1200000); // 12 LPA default
  const [bonus, setBonus] = useState<number>(100000);
  const [pfOpt, setPfOpt] = useState<boolean>(true);

  // Calculations
  const grossSalary = Math.max(0, ctc - bonus);
  const monthlyGross = grossSalary / 12;

  // Basic Pay ~ 50% of Gross Salary
  const basicAnnual = grossSalary * 0.5;
  const hraAnnual = grossSalary * 0.3;

  // Employee EPF (12% of Basic Pay capped at 1800/mo or actual)
  const monthlyPf = pfOpt ? Math.min(1800, (basicAnnual / 12) * 0.12) : 0;
  const annualPf = monthlyPf * 12;

  // Professional Tax (~200/mo in India)
  const monthlyPt = 200;
  const annualPt = 2400;

  // Estimated Tax under New Tax Regime FY 2026-27 (Standard Deduction 75,000)
  const taxableIncome = Math.max(0, grossSalary - 75000 - annualPt);

  let annualTax = 0;
  if (taxableIncome <= 700000) {
    annualTax = 0; // Tax rebate u/s 87A up to 7 Lakhs
  } else if (taxableIncome <= 1000000) {
    annualTax = (taxableIncome - 700000) * 0.10 + 20000;
  } else if (taxableIncome <= 1200000) {
    annualTax = (taxableIncome - 1000000) * 0.15 + 50000;
  } else if (taxableIncome <= 1500000) {
    annualTax = (taxableIncome - 1200000) * 0.20 + 80000;
  } else {
    annualTax = (taxableIncome - 1500000) * 0.30 + 140000;
  }

  // Add 4% Health & Education Cess
  annualTax += annualTax * 0.04;
  const monthlyTax = annualTax / 12;

  // Monthly Net Take-Home Salary
  const monthlyTakeHome = Math.max(0, monthlyGross - monthlyPf - monthlyPt - monthlyTax);
  const annualTakeHome = monthlyTakeHome * 12;

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <IndianRupee className="w-6 h-6 text-emerald-600" /> Monthly Take-Home Salary &amp; Tax Calculator
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Calculate your exact in-hand salary per month after EPF, Professional Tax, and Income Tax (New Regime).
          </p>
        </div>
      </div>

      {/* Main Results Display */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Monthly Take-Home Salary</span>
          <div className="text-4xl font-black text-white">
            ₹{Math.round(monthlyTakeHome).toLocaleString('en-IN')} <span className="text-xs text-emerald-300 font-normal">/ mo</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Annual Take-Home Salary</span>
          <div className="text-3xl font-extrabold text-emerald-300">
            ₹{Math.round(annualTakeHome).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">Estimated Monthly Income Tax</span>
          <div className="text-3xl font-extrabold text-amber-300">
            ₹{Math.round(monthlyTax).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Total Annual CTC (Cost to Company)</label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-zinc-400 font-bold text-sm">₹</span>
            <input
              type="number"
              step="50000"
              value={ctc}
              onChange={(e) => setCtc(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">e.g. ₹12,000,00 for 12 LPA CTC</p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Annual Variable Bonus / Retainers</label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-zinc-400 font-bold text-sm">₹</span>
            <input
              type="number"
              step="10000"
              value={bonus}
              onChange={(e) => setBonus(parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-zinc-300 rounded-xl pl-9 pr-4 py-2 text-sm font-extrabold text-zinc-900 focus:outline-none focus:border-emerald-600"
            />
          </div>
          <p className="text-[11px] text-zinc-500 font-medium">Bonus excluded from fixed monthly payout</p>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-600" /> Monthly Salary Breakdown (In-Hand vs Deductions)
        </h3>

        <div className="overflow-x-auto border border-zinc-200 rounded-xl">
          <table className="w-full text-left text-xs text-zinc-800">
            <thead className="bg-zinc-100 text-zinc-600 uppercase font-bold text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Component</th>
                <th className="py-2.5 px-4 text-right">Monthly Amount</th>
                <th className="py-2.5 px-4 text-right">Annual Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-semibold">
              <tr>
                <td className="py-2.5 px-4 text-zinc-900">Gross Fixed Salary</td>
                <td className="py-2.5 px-4 text-right">₹{Math.round(monthlyGross).toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4 text-right">₹{Math.round(grossSalary).toLocaleString('en-IN')}</td>
              </tr>
              <tr className="text-rose-600 bg-rose-50/50">
                <td className="py-2.5 px-4 font-bold">- Employee EPF (12%)</td>
                <td className="py-2.5 px-4 text-right font-bold">₹{Math.round(monthlyPf).toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4 text-right font-bold">₹{Math.round(annualPf).toLocaleString('en-IN')}</td>
              </tr>
              <tr className="text-rose-600 bg-rose-50/50">
                <td className="py-2.5 px-4 font-bold">- Professional Tax (PT)</td>
                <td className="py-2.5 px-4 text-right font-bold">₹{Math.round(monthlyPt).toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4 text-right font-bold">₹{Math.round(annualPt).toLocaleString('en-IN')}</td>
              </tr>
              <tr className="text-rose-600 bg-rose-50/50">
                <td className="py-2.5 px-4 font-bold">- Income Tax (TDS New Regime)</td>
                <td className="py-2.5 px-4 text-right font-bold">₹{Math.round(monthlyTax).toLocaleString('en-IN')}</td>
                <td className="py-2.5 px-4 text-right font-bold">₹{Math.round(annualTax).toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-emerald-50 text-emerald-900 font-extrabold text-sm border-t-2 border-emerald-200">
                <td className="py-3 px-4">Net Monthly Take-Home</td>
                <td className="py-3 px-4 text-right">₹{Math.round(monthlyTakeHome).toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 text-right">₹{Math.round(annualTakeHome).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
