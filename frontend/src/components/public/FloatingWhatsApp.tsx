'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const whatsappUrl =
    'https://wa.me/918935090610?text=Hello%20Justice%20Alliance%20Associates%2C%20I%20would%20like%20to%20consult%20with%20an%20advocate%20regarding%20a%20legal%20matter.';

  return (
    <aside
      aria-label="Direct WhatsApp Consultation"
      className="fixed bottom-5 right-5 z-40 flex items-center group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Justice Alliance Associates"
        className="flex items-center space-x-2.5 px-3.5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-2xl border-2 border-brass transition-all transform hover:scale-105 active:scale-95"
      >
        <MessageCircle size={18} className="shrink-0" />
        <span className="hidden sm:inline font-sans text-[11px] tracking-wide">
          WhatsApp Consultation
        </span>
      </a>
    </aside>
  );
}
