'use client';

import React, { useState } from 'react';
import { Clock, Copy, Check, RefreshCw } from 'lucide-react';

export default function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
  const [humanDate, setHumanDate] = useState<string>(new Date().toISOString());

  const currentEpoch = Math.floor(Date.now() / 1000);

  const convertTimestampToDate = (ts: number) => {
    try {
      const date = new Date(ts * 1000);
      setHumanDate(date.toUTCString() + ' / ' + date.toLocaleString());
    } catch (e) {}
  };

  const setNow = () => {
    const now = Math.floor(Date.now() / 1000);
    setTimestamp(now);
    convertTimestampToDate(now);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-indigo-600" /> Unix Timestamp &amp; Epoch Converter
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Convert Unix timestamps (seconds since Jan 01 1970) to human-readable UTC and local dates in real-time.
          </p>
        </div>

        <button
          onClick={setNow}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs transition-colors shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Current Epoch ({currentEpoch})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Unix Timestamp (Seconds)</label>
          <input
            type="number"
            value={timestamp}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10) || 0;
              setTimestamp(val);
              convertTimestampToDate(val);
            }}
            className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-zinc-900 focus:outline-none focus:border-indigo-600"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-extrabold uppercase text-zinc-700">Human Readable Date (UTC / IST)</label>
          <div className="bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-900 leading-snug">
            {new Date(timestamp * 1000).toUTCString()}
            <div className="text-xs text-indigo-600 font-bold mt-1">
              Local: {new Date(timestamp * 1000).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
