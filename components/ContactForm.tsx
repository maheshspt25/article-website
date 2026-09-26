'use client';

import React, { useState } from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await submitContactForm(formData);

      if (!result.success) {
        throw new Error(result.message);
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
      <h2 className="text-lg font-bold text-slate-900 border-b pb-3">Send Editorial Feedback</h2>
      
      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          <div>
            <h3 className="font-bold text-slate-900 text-base">Message Sent Successfully!</h3>
            <p className="text-sm text-slate-600 mt-1">Thank you for reaching out. Our editorial team will get back to you shortly.</p>
          </div>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-4 text-sky-600 font-semibold text-sm hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {status === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block font-bold text-slate-700 mb-1">Your Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              placeholder="e.g. Rahul Sharma" 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50" 
              required 
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="rahul@example.com" 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50" 
              required 
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block font-bold text-slate-700 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject"
              name="subject"
              placeholder="Editorial Feedback / Correction" 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50" 
              required 
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-bold text-slate-700 mb-1">Message</label>
            <textarea 
              id="message"
              name="message"
              rows={4} 
              placeholder="Describe your query or feedback..." 
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none disabled:opacity-50 disabled:bg-slate-50" 
              required
              disabled={status === 'loading'}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
