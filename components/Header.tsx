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
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-xl text-stone-900 border-b border-stone-200/90 shadow-xs">
      {/* Top Warm Amber Stripe */}
      <div className="h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-700 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:opacity-95 transition-opacity border border-amber-400/30">
              IM
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                Info<span className="text-amber-600">Mitra</span>
              </span>
              <span className="block text-[10px] text-stone-500 font-bold tracking-wider uppercase">
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                      : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Search Trigger & Mobile Menu Toggle */}
          <div className="flex items-center space-x-1.5">
            <Link
              href="/search"
              aria-label="Search articles and guides"
              className="p-2 text-stone-600 hover:text-amber-700 hover:bg-stone-100 rounded-md transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-sm">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg text-xs font-semibold ${
                    isActive ? 'bg-amber-50 text-amber-900 border border-amber-200/80' : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-600" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-stone-200 pt-4 mt-3 flex flex-wrap gap-4 text-xs text-stone-600 justify-center font-medium">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-700">About</Link>
            <Link href="/editorial-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-700">Editorial Policy</Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-700">Privacy Policy</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-700">Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
}
