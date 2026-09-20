import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-stone-700 border-t border-stone-200/90 text-sm mt-20 relative shadow-xs">
      {/* Top Warm Amber Accent Line */}
      <div className="h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info & Verification */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-700 text-white font-bold flex items-center justify-center text-base shadow-xs border border-amber-400/30">
                IM
              </div>
              <span className="text-xl font-extrabold tracking-tight text-stone-900">
                Info<span className="text-amber-600">Mitra</span>
              </span>
            </Link>
            <p className="text-stone-600 text-xs leading-relaxed max-w-sm font-medium">
              India&apos;s leading digital knowledge and web utility portal. Committed to verified tech guides, financial calculators, educational blueprints, and privacy-first client-side web tools.
            </p>
            <div className="pt-2 text-xs text-stone-700 space-y-1.5 font-medium">
              <p className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Verified Editorial &amp; Fact-Checking Desk</span>
              </p>
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>100% Client-Side Privacy-First Web Tools</span>
              </p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-stone-900 font-bold text-xs mb-3.5 tracking-wider uppercase">Knowledge Hubs</h3>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              <li><Link href="/technology" className="hover:text-amber-700 transition-colors">Technology &amp; Mobile</Link></li>
              <li><Link href="/finance" className="hover:text-amber-700 transition-colors">Finance &amp; Tax Guides</Link></li>
              <li><Link href="/how-to" className="hover:text-amber-700 transition-colors">How-To Solutions</Link></li>
              <li><Link href="/health" className="hover:text-amber-700 transition-colors">Health &amp; Wellness</Link></li>
              <li><Link href="/education" className="hover:text-amber-700 transition-colors">Education &amp; Exams</Link></li>
              <li><Link href="/jobs" className="hover:text-amber-700 transition-colors">Government &amp; Private Jobs</Link></li>
              <li><Link href="/travel" className="hover:text-amber-700 transition-colors">Travel &amp; Local Guides</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Calculators */}
          <div>
            <h3 className="text-stone-900 font-bold text-xs mb-3.5 tracking-wider uppercase">Calculators</h3>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              <li><Link href="/tools/age-calculator" className="hover:text-amber-700 transition-colors">Age Calculator</Link></li>
              <li><Link href="/tools/emi-calculator" className="hover:text-amber-700 transition-colors">EMI Calculator</Link></li>
              <li><Link href="/tools/percentage-calculator" className="hover:text-amber-700 transition-colors">Percentage Calculator</Link></li>
              <li><Link href="/tools/sip-calculator" className="hover:text-amber-700 transition-colors">SIP Calculator</Link></li>
              <li><Link href="/tools/gst-calculator" className="hover:text-amber-700 transition-colors">GST Calculator</Link></li>
              <li><Link href="/tools/salary-calculator" className="hover:text-amber-700 transition-colors">Salary &amp; Tax Calculator</Link></li>
              <li><Link href="/tools/split-bill-calculator" className="hover:text-amber-700 transition-colors">Split Bill Calculator</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div>
            <h3 className="text-stone-900 font-bold text-xs mb-3.5 tracking-wider uppercase">Trust &amp; Legal</h3>
            <ul className="space-y-2 text-xs text-stone-600 font-medium">
              <li><Link href="/about" className="hover:text-amber-700 transition-colors">About Us</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-amber-700 transition-colors">Editorial Policy</Link></li>
              <li><Link href="/contact" className="hover:text-amber-700 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-amber-700 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-700 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-amber-700 transition-colors">Disclaimer</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-amber-700 transition-colors">Sitemap</Link></li>
              <li><Link href="/admin" className="text-amber-700 hover:text-amber-800 font-bold transition-colors">Admin Portal (CMS)</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 gap-4 font-medium">
          <p>© {currentYear} InfoMitra Information Platform. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl text-[11px] text-stone-500">
            Disclaimer: InfoMitra publishes educational and informational content. Financial, legal, and academic decisions should be verified with respective official government notifications.
          </p>
        </div>
      </div>
    </footer>
  );
}
