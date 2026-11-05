'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScalesEmblem } from './ScalesEmblem';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Phone, Mail, ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Practice Areas', href: '/practice-areas' },
    { label: 'Our Advocates', href: '/#advocates' },
    { label: 'How We Work', href: '/#how-we-work' },
    { label: 'Blog', href: '/resources' },
    { label: 'Contact', href: '/contact' },
  ];

  // Prevent background scroll when mobile drawer is open
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
      <header className="sticky top-0 z-40 w-full bg-charcoal text-bone border-b border-brass/30 shadow-subtle transition-all">
        {/* Top Strip (Desk/Tab) */}
        <div className="hidden lg:block bg-charcoal-dark text-bone/70 text-[11px] py-1.5 px-8 border-b border-charcoal-light">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                <span>Civil, Criminal, Cyber, Family & Taxation Law Practice</span>
              </span>
              <span className="text-charcoal-muted">&bull;</span>
              <a
                href="mailto:justicealliencelaw@gmail.com"
                className="hover:text-brass transition-colors font-medium text-bone/90"
              >
                justicealliencelaw@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-4 text-[11px] uppercase tracking-wider font-semibold">
              <Link href="/about" className="hover:text-brass transition-colors">
                About the Firm
              </Link>
              <span className="text-charcoal-muted">|</span>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new Event('open-entry-modal'));
                  }
                }}
                className="hover:text-brass transition-colors uppercase cursor-pointer text-[11px] font-semibold"
                title="Open BCI Compliance & Enquiry Flow"
              >
                BCI Notice &amp; Enquiry
              </button>
              <span className="text-charcoal-muted">|</span>
              <Link href="/admin/login" className="hover:text-brass transition-colors text-brass/90">
                Chamber Portal &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo & Firm Name */}
          <Link href="/" className="group flex items-center space-x-3.5">
            <div className="w-11 h-11 bg-oxblood border border-brass/50 rounded-xs flex items-center justify-center shrink-0 shadow-sm group-hover:border-brass transition-colors">
              <ScalesEmblem size={24} className="text-brass" glow />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-white group-hover:text-brass transition-colors leading-tight">
                JUSTICE ALLIANCE
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-editorial text-brass font-medium">
                Associates & Law Firm
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href) && !link.href.includes('#');

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-xs uppercase tracking-wider font-medium transition-all relative py-1.5',
                    isActive
                      ? 'text-brass font-bold'
                      : 'text-bone/80 hover:text-white'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brass" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Theme Toggle + Gold CTA Button */}
          <div className="hidden lg:flex items-center space-x-3.5">
            <ThemeToggle showLabel />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-charcoal-dark bg-brass hover:bg-brass-light border border-brass transition-all rounded-xs shadow-brass"
            >
              <Calendar size={13} className="text-charcoal-dark" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 lg:hidden">
            <ThemeToggle />
            <Link
              href="/contact"
              className="px-3 py-1.5 bg-brass text-charcoal-dark text-[11px] font-bold uppercase tracking-wider rounded-xs"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-bone hover:text-brass transition-colors focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-charcoal-dark/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full max-w-xs sm:max-w-sm bg-charcoal text-bone h-full shadow-modal border-l border-brass/40 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top */}
            <div>
              <div className="p-5 border-b border-charcoal-light flex items-center justify-between bg-charcoal-dark">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-oxblood border border-brass/50 rounded-xs flex items-center justify-center">
                    <ScalesEmblem size={18} className="text-brass" />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold tracking-wide text-white block">
                      JUSTICE ALLIANCE
                    </span>
                    <span className="text-[9px] text-brass uppercase tracking-widest block font-bold">
                      Associates & Law Firm
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <ThemeToggle showLabel />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full border border-charcoal-light text-bone/70 hover:text-brass hover:border-brass flex items-center justify-center transition-colors"
                    aria-label="Close navigation"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-3.5 text-xs font-semibold uppercase tracking-wider text-bone/85 hover:text-brass hover:bg-charcoal-light transition-colors border-b border-charcoal-light/60 rounded-xs"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={13} className="text-brass" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom */}
            <div className="p-5 border-t border-charcoal-light space-y-3 bg-charcoal-dark">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-brass text-charcoal-dark text-xs font-bold uppercase tracking-wider text-center block rounded-xs shadow-md"
              >
                Book Appointment
              </Link>

              <div className="text-[11px] text-bone/60 space-y-1 pt-1 font-medium">
                <p>Email: justicealliencelaw@gmail.com</p>
                <p>Civil Court Campus, Gorakhpur, UP</p>
              </div>

              <div className="pt-2 border-t border-charcoal-light flex items-center justify-between text-[10px] text-bone/50">
                <Link
                  href="/disclaimer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-brass"
                >
                  BCI Disclaimer
                </Link>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-brass hover:underline"
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
