'use client';

import React, { useState } from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateAge = () => {
    if (!birthDate) return null;
    const dob = new Date(birthDate);
    const target = new Date(targetDate);

    if (dob > target) {
      return { error: 'Date of birth cannot be in the future!' };
    }

    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total days & next birthday
    const totalDiffTime = Math.abs(target.getTime() - dob.getTime());
    const totalDays = Math.floor(totalDiffTime / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;

    // Next birthday calculation
    let nextBday = new Date(target.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday < target) {
      nextBday.setFullYear(target.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      daysToNextBday,
    };
  };

  const res = calculateAge();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Age Calculator</h2>
          <p className="text-xs text-slate-500">Calculate exact age in years, months, days, total hours, and next birthday countdown.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Age at Date of</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {res && 'error' in res ? (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-medium">
          {res.error}
        </div>
      ) : res ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-5 text-center shadow-md">
            <span className="text-xs font-medium uppercase tracking-wider text-blue-100">Your Current Age</span>
            <div className="text-3xl font-extrabold mt-1">
              {res.years} <span className="text-base font-normal">Years</span>, {res.months} <span className="text-base font-normal">Months</span>, {res.days} <span className="text-base font-normal">Days</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <span className="text-[11px] text-slate-500 font-semibold block">Total Days</span>
              <span className="text-lg font-bold text-slate-900">{res.totalDays.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
              <span className="text-[11px] text-slate-500 font-semibold block">Total Hours</span>
              <span className="text-lg font-bold text-slate-900">{res.totalHours.toLocaleString('en-IN')}</span>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <span className="text-[11px] text-amber-700 font-semibold flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Next Birthday
              </span>
              <span className="text-lg font-bold text-amber-900">{res.daysToNextBday} Days</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
