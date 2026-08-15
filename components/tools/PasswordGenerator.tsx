'use client';

import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, ShieldCheck, RefreshCw } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generate = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Entropy Security Score calculation
  let poolSize = 0;
  if (useUpper) poolSize += 26;
  if (useLower) poolSize += 26;
  if (useNumbers) poolSize += 10;
  if (useSymbols) poolSize += 32;

  const entropy = Math.round(length * Math.log2(poolSize || 1));
  let strengthLabel = 'Very Weak';
  let strengthColor = 'bg-rose-500';

  if (entropy > 80) {
    strengthLabel = 'Military Grade High Security (80+ Bits)';
    strengthColor = 'bg-emerald-500';
  } else if (entropy > 50) {
    strengthLabel = 'Strong Password (50+ Bits)';
    strengthColor = 'bg-blue-500';
  } else if (entropy > 30) {
    strengthLabel = 'Moderate Strength (30+ Bits)';
    strengthColor = 'bg-amber-500';
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-indigo-600" /> High-Entropy Password Generator &amp; Security Tester
          </h1>
          <p className="text-xs text-zinc-500 font-medium mt-1">
            Generate cryptographically secure passwords for corporate portals, student logins, and cloud accounts.
          </p>
        </div>
      </div>

      {/* Generated Password Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Generated Password</span>
          <span className="text-xs font-bold text-slate-300 font-mono">Entropy: {entropy} Bits</span>
        </div>

        <div className="flex items-center justify-between gap-3 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3">
          <div className="text-lg sm:text-xl font-mono font-bold tracking-wider text-emerald-400 break-all select-all">
            {password || 'Select options below'}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={generate}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
              title="Generate New Password"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-4 py-2 rounded-lg text-xs transition-all shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Strength Meter Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-300">Password Security Strength:</span>
            <span className="text-emerald-400 font-extrabold">{strengthLabel}</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className={`h-full ${strengthColor}`} style={{ width: `${Math.min(100, (entropy / 90) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Options Controls */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-zinc-900 mb-2">
            <span>Password Length:</span>
            <span className="font-mono text-indigo-600 font-extrabold text-sm">{length} Characters</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold text-zinc-800 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={(e) => setUseUpper(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 border-zinc-300 focus:ring-0"
            />
            Uppercase (A-Z)
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useLower}
              onChange={(e) => setUseLower(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 border-zinc-300 focus:ring-0"
            />
            Lowercase (a-z)
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 border-zinc-300 focus:ring-0"
            />
            Numbers (0-9)
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 border-zinc-300 focus:ring-0"
            />
            Symbols (!@#$)
          </label>
        </div>
      </div>
    </div>
  );
}
