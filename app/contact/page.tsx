import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { Mail, MapPin, PhoneCall, MessageSquare } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Contact Us - InfoMitra Editorial Desk',
  description: 'Get in touch with InfoMitra editorial desk for corrections, listing inquiries, and feedback.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact' }]} />

      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Contact InfoMitra Desk</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Have corrections, feedback, or editorial inquiries? Our team responds within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b pb-3">Editorial Contact Information</h2>
          
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">Email Editorial Desk</strong>
                <p className="text-slate-600">editorial@infomitra.org</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold">Office Address</strong>
                <p className="text-slate-600">InfoMitra Media Labs, Chennai & Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b pb-3">Send Editorial Feedback</h2>
          <form className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
              <input type="text" placeholder="e.g. Rahul Sharma" className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input type="email" placeholder="rahul@example.com" className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject</label>
              <input type="text" placeholder="Editorial Feedback / Correction" className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Message</label>
              <textarea rows={4} placeholder="Describe your query or feedback..." className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none" required></textarea>
            </div>

            <button type="submit" className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition-colors">
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
