import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Calendar, Scale, ShieldCheck, ArrowRight } from 'lucide-react';
import { Advocate } from '@/lib/advocatesData';

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  const isPrimary = advocate.isPrimary;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xs transition-all duration-300 ${
        isPrimary
          ? 'bg-gradient-to-b from-white via-white to-bone-light border-2 border-brass shadow-card-hover -translate-y-2'
          : 'bg-white border border-bone-dark hover:border-brass/70 shadow-subtle hover:shadow-card-hover hover:-translate-y-1'
      }`}
    >
      {/* Visual Ribbon / Badge for Anchor Advocate */}
      {isPrimary && (
        <div className="bg-oxblood text-brass px-4 py-1.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-editorial font-bold border-b border-brass/40">
          <span className="flex items-center space-x-1.5">
            <Scale size={13} className="text-brass" />
            <span>Chamber Anchor &bull; Lead Practice</span>
          </span>
          <span className="text-[10px] text-bone/80">Senior Counsel</span>
        </div>
      )}

      <div className="p-7 sm:p-8 space-y-6">
        {/* Photo Avatar / Initials Circle */}
        <div className="flex items-center space-x-4">
          <div
            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shrink-0 transition-transform ${
              isPrimary
                ? 'bg-oxblood text-brass border-2 border-brass ring-4 ring-brass/20'
                : 'bg-charcoal text-bone border-2 border-brass/50'
            }`}
          >
            {advocate.initials}
          </div>

          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">
              {advocate.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-oxblood mt-1">
              {advocate.specialization}
            </p>
            <p className="text-[11px] text-charcoal/60 font-mono mt-0.5">
              {advocate.court}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-[13px] text-charcoal/80 leading-relaxed min-h-[4rem]">
          {advocate.bio}
        </p>

        {/* Disciplines Chips */}
        <div className="space-y-2 pt-2 border-t border-bone-dark/70">
          <span className="text-[10px] font-mono tracking-editorial uppercase text-charcoal/50 block font-semibold">
            Key Disciplines
          </span>
          <div className="flex flex-wrap gap-1.5">
            {advocate.disciplines.map((item) => (
              <span
                key={item}
                className="text-[11px] px-2.5 py-1 bg-bone border border-bone-dark text-charcoal/85 rounded-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="space-y-2 pt-3 border-t border-bone-dark/70 text-xs">
          {advocate.phone && (
            <div className="flex items-center space-x-2.5">
              <Phone size={14} className="text-brass shrink-0" />
              <a
                href={`tel:${advocate.phone.replace(/\s+/g, '')}`}
                className="font-mono text-charcoal hover:text-oxblood font-bold transition-colors"
              >
                {advocate.phone}
              </a>
            </div>
          )}
          <div className="flex items-center space-x-2.5">
            <Mail size={14} className="text-brass shrink-0" />
            <a
              href={`mailto:${advocate.email}`}
              className="text-charcoal/80 hover:text-oxblood font-mono text-[11px] truncate transition-colors"
            >
              {advocate.email}
            </a>
          </div>
        </div>
      </div>

      {/* Footer CTA: Book Appointment */}
      <div className="p-5 sm:p-6 bg-bone-light/80 border-t border-bone-dark flex items-center justify-between">
        <Link
          href={`/contact?advocate=${encodeURIComponent(advocate.name)}`}
          className={`w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-center rounded-xs transition-all flex items-center justify-center space-x-2 ${
            isPrimary
              ? 'bg-oxblood hover:bg-wine text-brass border border-brass shadow-md'
              : 'bg-brass hover:bg-brass-light text-charcoal border border-brass'
          }`}
        >
          <Calendar size={13} />
          <span>Book Appointment</span>
        </Link>
      </div>
    </div>
  );
}
