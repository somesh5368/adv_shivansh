'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, ArrowRight, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Practice Areas', href: '/practice-areas' },
    { label: 'Legal Resources', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-ivory-dark/80 transition-all">
        {/* Desktop Thin Legal Topstrip */}
        <div className="hidden lg:block bg-navy-900 text-ivory/80 text-[11px] py-1.5 px-8 border-b border-navy-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span>Civil Court Campus, Gorakhpur, Uttar Pradesh</span>
              <span className="text-navy-700">&bull;</span>
              <a
                href="tel:+919198106052"
                className="hover:text-gold transition-colors font-medium text-white/90"
              >
                +91 9198106052
              </a>
              <span className="text-navy-700">&bull;</span>
              <a
                href="mailto:advshiv43@gmail.com"
                className="hover:text-gold transition-colors"
              >
                advshiv43@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-4 text-[10px] uppercase tracking-wider text-ivory/60 font-mono">
              <Link href="/disclaimer" className="hover:text-gold transition-colors">
                Bar Council Disclaimer
              </Link>
              <span className="text-navy-700">|</span>
              <Link href="/admin/login" className="hover:text-gold transition-colors text-gold/90">
                Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Main Sleek Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Typographic Signature (Light, Prestigious & Editorial) */}
          <Link href="/" className="group flex flex-col justify-center">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-navy group-hover:text-gold transition-colors leading-tight">
              SHIVANSH KUMAR PANDEY
            </span>
            <span className="text-[9px] sm:text-[10px] font-sans uppercase tracking-widest text-gold font-medium mt-0.5">
              Advocate &bull; Civil Court, Gorakhpur
            </span>
          </Link>

          {/* Desktop Links (Clean & Slender) */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-xs uppercase tracking-wider font-medium transition-all relative py-1.5',
                    isActive
                      ? 'text-navy font-bold'
                      : 'text-charcoal/70 hover:text-navy'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+919198106052"
              className="text-xs font-semibold text-navy hover:text-gold flex items-center space-x-1.5 transition-colors font-mono"
            >
              <Phone size={13} className="text-gold" />
              <span>+91 9198106052</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy bg-gold/15 hover:bg-gold hover:text-navy-900 border border-gold/50 transition-all rounded-xs"
            >
              Consultation
            </Link>
          </div>

          {/* Mobile Clean Menu Button */}
          <div className="flex items-center space-x-1 lg:hidden">
            <a
              href="tel:+919198106052"
              aria-label="Call Chamber"
              className="p-2 text-navy hover:text-gold transition-colors"
            >
              <Phone size={18} className="text-gold" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-navy hover:text-gold transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* LIGHT, REFINED & IMPRESSIVE MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-xs sm:max-w-sm bg-navy-900 text-ivory h-full shadow-2xl border-l border-gold/30 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Drawer Header */}
            <div>
              <div className="p-5 border-b border-navy-800 flex items-center justify-between">
                <div>
                  <span className="font-serif text-base font-bold tracking-wider text-white block">
                    SHIVANSH KUMAR PANDEY
                  </span>
                  <span className="text-[9px] font-mono text-gold uppercase tracking-widest block mt-0.5">
                    Advocate &bull; Civil Court, Gorakhpur
                  </span>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-navy-700 text-ivory/70 hover:text-gold hover:border-gold/50 flex items-center justify-center transition-colors"
                  aria-label="Close navigation"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Clean Navigation Links (Spacious & Sophisticated) */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === '/'
                      ? pathname === '/'
                      : pathname?.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between py-3 px-3 text-sm uppercase tracking-wider transition-all rounded-xs',
                        isActive
                          ? 'text-gold font-bold bg-navy-800/80 border-l-2 border-gold pl-3'
                          : 'text-ivory/80 hover:text-white hover:bg-navy-800/40'
                      )}
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={13} className={isActive ? 'text-gold' : 'text-ivory/30'} />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Actions (Light, Crisp & Direct) */}
            <div className="p-5 border-t border-navy-800 space-y-3 bg-navy-950/60">
              {/* Direct Call Link */}
              <a
                href="tel:+919198106052"
                className="flex items-center justify-between p-3 bg-navy-800/80 border border-gold/30 hover:border-gold text-ivory transition-colors rounded-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <Phone size={15} className="text-gold" />
                  <span className="text-xs font-mono font-medium">+91 9198106052</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                  Call Now &rarr;
                </span>
              </a>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/919198106052?text=Hello%20Advocate%20Shivansh%20Pandey%2C%20I%20would%20like%20to%20consult%20regarding%20a%20legal%20matter."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 w-full py-2.5 bg-emerald-700/90 hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs"
              >
                <MessageCircle size={14} />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Consultation Button */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 bg-gold hover:bg-gold-light text-navy-900 text-xs font-bold uppercase tracking-wider transition-colors rounded-xs"
              >
                Schedule Consultation
              </Link>

              {/* Legal Footer Links */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-ivory/50 font-mono">
                <Link
                  href="/disclaimer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-gold transition-colors"
                >
                  Disclaimer
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gold/80 hover:text-gold transition-colors"
                >
                  Admin Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
