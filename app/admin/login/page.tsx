'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();
      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid passcode');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 space-y-6 shadow-xl">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-extrabold text-white text-2xl mx-auto shadow-md shadow-blue-500/20">
            IM
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <ShieldCheck className="w-6 h-6 text-blue-600" /> Admin Portal Login
            </h1>
            <p className="text-xs text-slate-500 font-semibold">
              InfoMitra Content Management System (CMS) Security Gate
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase text-slate-700">Admin Security Passcode</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="Enter your admin passcode"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 font-medium"
              />
            </div>
            {/* <p className="text-[11px] text-slate-500 font-medium">Protected by <code className="text-blue-700 font-mono font-bold">ADMIN_SECRET</code> in environment configuration.</p> */}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 border border-blue-500/30"
          >
            {loading ? 'Authenticating...' : 'Access Admin Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
          Protected by InfoMitra Security Enforcement Engine
        </div>
      </div>
    </div>
  );
}
