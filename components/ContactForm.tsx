'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle raw HTML error responses (e.g., 404/500 pages) gracefully
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Failed to send message');
        }
      } else {
        const text = await response.text();
        throw new Error(`Server returned HTML error (${response.status}): ${text.substring(0, 60)}...`);
      }

      setStatus('success');
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 h-full flex flex-col justify-center items-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-2" />
        <h3 className="font-bold text-slate-900 text-xl">Message Sent!</h3>
        <p className="text-sm text-slate-600 text-center max-w-sm">
          Thank you for reaching out. Our editorial team will get back to you shortly.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
      <h2 className="text-lg font-bold text-slate-900 border-b pb-3">Send Editorial Feedback</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {status === 'error' && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <XCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm">{errorMessage}</span>
          </div>
        )}

        <div>
          <label htmlFor="name" className="block font-bold text-slate-700 mb-1 text-sm">Your Full Name</label>
          <input 
            type="text" 
            id="name"
            name="name"
            placeholder="e.g. Rahul Sharma" 
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50 text-sm" 
            required 
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-bold text-slate-700 mb-1 text-sm">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            placeholder="rahul@example.com" 
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50 text-sm" 
            required 
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label htmlFor="subject" className="block font-bold text-slate-700 mb-1 text-sm">Subject</label>
          <input 
            type="text" 
            id="subject"
            name="subject"
            placeholder="Editorial Feedback / Correction" 
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50 text-sm" 
            required 
            disabled={status === 'loading'}
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-bold text-slate-700 mb-1 text-sm">Message</label>
          <textarea 
            id="message"
            name="message"
            rows={4} 
            placeholder="Describe your query or feedback..." 
            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50 text-sm" 
            required
            disabled={status === 'loading'}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Message...
            </>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </form>
    </div>
  );
}
