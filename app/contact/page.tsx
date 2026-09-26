import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { constructMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata = constructMetadata({
  title: 'Contact Us - InfoMitra Editorial Desk',
  description: 'Get in touch with InfoMitra editorial desk for corrections, listing inquiries, and feedback.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs items={[{ name: 'Contact Us', url: '/contact' }]} />

      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-2 text-center">
        <h1 className="text-2xl sm:text-4xl font-extrabold">Contact InfoMitra Desk</h1>
        <p className="text-xs sm:text-sm text-slate-300">
          Have corrections, feedback, or editorial inquiries? Our team responds within 24 business hours.
        </p>
      </div>

      <div className="mx-auto">
        {/* Client-side form component */}
        <ContactForm />
      </div>
    </div>
  );
}
