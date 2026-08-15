'use client';

import React, { useState, useEffect } from 'react';
import { Globe, Clock, ArrowRight, Check, Copy, RefreshCw, Calendar } from 'lucide-react';

interface ZoneInfo {
  name: string;
  code: string;
  offset: string;
  timeZone: string;
  flag: string;
}

export default function TimezoneConverter() {
  const [sourceTime, setSourceTime] = useState<string>('12:00');
  const [sourceDate, setSourceDate] = useState<string>('2026-08-15');
  const [sourceZone, setSourceZone] = useState<string>('Asia/Kolkata');
  const [copied, setCopied] = useState<boolean>(false);
  const [nowTick, setNowTick] = useState<Date>(new Date());

  // Update live clock every second
  useEffect(() => {
    const timer = setInterval(() => setNowTick(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timezones: ZoneInfo[] = [
    { name: 'India (IST)', code: 'IST', offset: '+05:30', timeZone: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'Coordinated Universal Time', code: 'UTC', offset: '+00:00', timeZone: 'UTC', flag: '🌐' },
    { name: 'US Eastern Time', code: 'EST / EDT', offset: '-04:00', timeZone: 'America/New_York', flag: '🇺🇸' },
    { name: 'US Pacific Time', code: 'PST / PDT', offset: '-07:00', timeZone: 'America/Los_Angeles', flag: '🇺🇸' },
    { name: 'London (UK)', code: 'BST / GMT', offset: '+01:00', timeZone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Singapore', code: 'SGT', offset: '+08:00', timeZone: 'Asia/Singapore', flag: '🇸🇬' },
    { name: 'Tokyo (Japan)', code: 'JST', offset: '+09:00', timeZone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sydney (Australia)', code: 'AEST', offset: '+10:00', timeZone: 'Australia/Sydney', flag: '🇦🇺' },
    { name: 'Dubai (UAE)', code: 'GST', offset: '+04:00', timeZone: 'Asia/Dubai', flag: '🇦🇪' },
  ];

  // Convert source time & date into target timezones
  const getConvertedDate = (targetZone: string) => {
    try {
      const [hours, minutes] = sourceTime.split(':').map(Number);
      const [year, month, day] = sourceDate.split('-').map(Number);

      // Create date object in source zone
      const dt = new Date(Date.UTC(year, month - 1, day, hours, minutes));

      // Format in target timezone
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: targetZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      return formatter.format(dt);
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getLiveTime = (tz: string) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(nowTick);
    } catch (e) {
      return '--:--:--';
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" /> World Clock &amp; Timezone Converter
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Convert date &amp; time between global business timezones (IST, UTC, EST, PST, London, Tokyo, Singapore) for meetings &amp; work.
          </p>
        </div>
      </div>

      {/* Live World Clocks Bar */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-indigo-600" /> Live Global Business Clocks
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {timezones.slice(0, 8).map((tz) => (
            <div key={tz.code} className="bg-slate-900 text-white rounded-2xl p-3.5 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                <span>{tz.flag} {tz.code}</span>
                <span className="text-[10px] text-slate-500 font-mono">{tz.offset}</span>
              </div>
              <div className="text-base font-black font-mono text-emerald-400">
                {getLiveTime(tz.timeZone)}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold truncate">{tz.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Timezone Converter Controls */}
      <div className="space-y-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-5">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Convert Time &amp; Schedule Meetings</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Source Timezone</label>
            <select
              value={sourceZone}
              onChange={(e) => setSourceZone(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs font-bold text-zinc-900 focus:outline-none focus:border-indigo-600"
            >
              {timezones.map((tz) => (
                <option key={tz.timeZone} value={tz.timeZone}>
                  {tz.flag} {tz.name} ({tz.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Source Time</label>
            <input
              type="time"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-900 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 mb-1">Source Date</label>
            <input
              type="date"
              value={sourceDate}
              onChange={(e) => setSourceDate(e.target.value)}
              className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-900 focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Converted Output Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider">Converted Equivalent Local Times</h3>

        <div className="space-y-2">
          {timezones.map((tz) => (
            <div key={tz.timeZone} className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{tz.flag}</span>
                <div>
                  <strong className="font-bold text-zinc-900 text-xs block">{tz.name} ({tz.code})</strong>
                  <span className="text-[11px] text-zinc-500 font-medium">Offset: {tz.offset}</span>
                </div>
              </div>

              <div className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg font-mono">
                {getConvertedDate(tz.timeZone)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
