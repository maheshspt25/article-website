import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-300 border-t border-slate-800 text-sm mt-20 relative">
      {/* Top Gradient Divider Line */}
      <div className="h-[3px] bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 text-white font-black flex items-center justify-center text-lg shadow-md shadow-blue-500/20 border border-blue-400/20">
                IM
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Info<span className="text-blue-400">Mitra</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-medium">
              InfoMitra is India&apos;s leading digital knowledge &amp; web utility portal committed to publishing practical tech comparisons, how-to guides, financial tax calculators, and client-side web tools.
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-1 font-medium">
              <p className="flex items-center gap-1.5"><span className="text-sky-400">✔</span> Editorial &amp; Information Desk</p>
              <p className="flex items-center gap-1.5"><span className="text-sky-400">✔</span> 100% Free Client-Side Utility Tools</p>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h3 className="text-sky-400 font-bold text-xs mb-3 tracking-widest uppercase">Categories</h3>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/technology" className="hover:text-white transition-colors">Technology &amp; Mobile</Link></li>
              <li><Link href="/finance" className="hover:text-white transition-colors">Finance &amp; Tax Guides</Link></li>
              <li><Link href="/how-to" className="hover:text-white transition-colors">How-To Solutions</Link></li>
              <li><Link href="/health" className="hover:text-white transition-colors">Health &amp; Fitness</Link></li>
              <li><Link href="/travel" className="hover:text-white transition-colors">Travel &amp; Local Guides</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Web Utility Tools</Link></li>
            </ul>
          </div>

          {/* Col 3: Popular Tools */}
          <div>
            <h3 className="text-amber-400 font-bold text-xs mb-3 tracking-widest uppercase">Utility Tools</h3>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/tools/age-calculator" className="hover:text-white transition-colors">Age Calculator</Link></li>
              <li><Link href="/tools/emi-calculator" className="hover:text-white transition-colors">EMI Calculator</Link></li>
              <li><Link href="/tools/percentage-calculator" className="hover:text-white transition-colors">Percentage Calculator</Link></li>
              <li><Link href="/tools/sip-calculator" className="hover:text-white transition-colors">SIP Calculator</Link></li>
              <li><Link href="/tools/gst-calculator" className="hover:text-white transition-colors">GST Calculator</Link></li>
              <li><Link href="/tools/image-compressor" className="hover:text-white transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-white transition-colors">QR Generator</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div>
            <h3 className="text-blue-400 font-bold text-xs mb-3 tracking-widest uppercase">Trust &amp; Legal</h3>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link></li>
              <li><Link href="/admin" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">Admin Panel (CMS)</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4 font-medium">
          <p>© {currentYear} InfoMitra Information Portal. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl text-[11px] text-slate-400">
            Disclaimer: InfoMitra provides educational and technical guidance. All trademarked names remain property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
