import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = constructMetadata({
  title: 'Contact Us - InfoMitra Editorial Desk',
  description: 'Get in touch with InfoMitra editorial desk for corrections, listing inquiries, and feedback.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact' }]} />

      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-2">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Contact InfoMitra Desk</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Have corrections, feedback, or editorial inquiries? Our team responds within 24 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
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

        {/* Client-side form component */}
        <ContactForm />
      </div>
    </div>
  );
}
