'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Scale, MessageCircle, Check } from 'lucide-react';

export function MobileCallBar() {
  const [copied, setCopied] = useState(false);

  const handlePhoneClick = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('+919198106052').catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <aside
      aria-label="Quick Chamber Contact Actions"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-navy-950/98 backdrop-blur-lg border-t-2 border-gold/50 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      {/* 1. Direct Phone Call Button */}
      <a
        href="tel:+919198106052"
        onClick={handlePhoneClick}
        className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-navy border border-gold/40 text-gold text-[11px] font-bold uppercase tracking-wider rounded-xs active:bg-navy-800 transition-colors shadow-sm"
      >
        {copied ? (
          <>
            <Check size={14} className="text-emerald-400 shrink-0" />
            <span className="truncate text-emerald-400">Dialing...</span>
          </>
        ) : (
          <>
            <Phone size={14} className="text-gold shrink-0 animate-pulse" />
            <span className="truncate">Call Chamber</span>
          </>
        )}
      </a>

      {/* 2. Direct WhatsApp Button */}
      <a
        href="https://wa.me/919198106052?text=Hello%20Advocate%20Shivansh%20Pandey%2C%20I%20would%20like%20to%20consult%20regarding%20a%20legal%20matter."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center py-2.5 px-3 bg-emerald-700 active:bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-xs shadow-sm transition-colors"
      >
        <MessageCircle size={15} className="shrink-0" />
      </a>

      {/* 3. Chamber Consultation Form Link */}
      <Link
        href="/contact"
        className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-2 bg-gold text-navy-900 text-[11px] font-bold uppercase tracking-wider rounded-xs shadow-md active:bg-gold-light transition-colors"
      >
        <Scale size={14} className="shrink-0" />
        <span className="truncate">Consultation</span>
      </Link>
    </aside>
  );
}
