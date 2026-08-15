'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, Cpu, Wallet, HelpCircle, HeartPulse, Wrench } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Technology', href: '/technology', icon: Cpu },
    { name: 'Finance', href: '/finance', icon: Wallet },
    { name: 'How-To', href: '/how-to', icon: HelpCircle },
    { name: 'Health', href: '/health', icon: HeartPulse },
    { name: 'Tools', href: '/tools', icon: Wrench },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl text-slate-900 border-b border-slate-200/80 shadow-sm">
      {/* Top Gradient Stripe */}
      <div className="h-[3px] bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 w-full"></div>

      {/* Top Banner Notice */}
      {/* <div className="bg-slate-100/90 text-slate-700 text-xs py-1.5 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="truncate font-medium">
            <span className="bg-blue-600 text-white font-extrabold px-1.5 py-0.5 rounded text-[10px] mr-2 uppercase tracking-wide shadow-xs">
              VERIFIED
            </span>
            InfoMitra — India&apos;s Premium Digital Knowledge &amp; Web Utility Portal
          </p>
          <div className="hidden md:flex gap-4 text-[11px] text-slate-600 font-medium">
            <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/editorial-policy" className="hover:text-blue-600 transition-colors">Editorial Policy</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform border border-blue-400/20">
              IM
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Info<span className="text-blue-600">Mitra</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-bold tracking-wider uppercase">
                Digital Knowledge Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2">
            <Link
              href="/search"
              aria-label="Search articles and guides"
              className="p-2.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-blue-50 text-blue-700 border border-blue-200/80' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-200 pt-4 mt-3 flex flex-wrap gap-4 text-xs text-slate-600 justify-center font-medium">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">About</Link>
            <Link href="/editorial-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Editorial Policy</Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600">Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
}
