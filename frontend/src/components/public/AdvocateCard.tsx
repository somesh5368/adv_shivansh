import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Calendar, Scale, MapPin } from 'lucide-react';
import { Advocate } from '@/lib/advocatesData';

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  return (
    <div className="group relative bg-white dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] hover:border-brass dark:hover:border-brass/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover rounded-xs">
      {/* Top brass accent line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-oxblood via-brass to-wine opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-6">
        {/* Avatar and Identity */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-oxblood text-brass border-2 border-brass/50 flex items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            {advocate.initials}
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal dark:text-white leading-tight group-hover:text-oxblood dark:group-hover:text-brass transition-colors">
              {advocate.name}
            </h3>
            <p className="text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass mt-1">
              {advocate.specialization}
            </p>
            <p className="text-[11px] text-charcoal/65 dark:text-bone/65 mt-0.5 flex items-center space-x-1 font-medium">
              <MapPin size={10} className="text-brass shrink-0" />
              <span className="truncate">{advocate.court}</span>
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-[13px] text-charcoal/75 dark:text-bone/75 leading-relaxed min-h-[4.5rem]">
          {advocate.bio}
        </p>

        {/* Key Disciplines Chips */}
        <div className="space-y-2 pt-2 border-t border-bone-dark dark:border-[#222c3d]">
          <span className="text-[10px] uppercase text-charcoal/60 dark:text-bone/60 block font-bold tracking-wider">
            Key Disciplines
          </span>
          <div className="flex flex-wrap gap-1.5">
            {advocate.disciplines.map((item) => (
              <span
                key={item}
                className="text-[11px] px-2.5 py-1 bg-bone-light dark:bg-[#0c1018] border border-bone-dark dark:border-[#222c3d] text-charcoal/85 dark:text-bone/85 rounded-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="space-y-2.5 pt-3 border-t border-bone-dark dark:border-[#222c3d] text-xs">
          <div className="flex items-center space-x-2.5">
            <Phone size={14} className="text-brass shrink-0" />
            <a
              href={`tel:${advocate.phone.replace(/\s+/g, '')}`}
              className="text-charcoal dark:text-white hover:text-oxblood dark:hover:text-brass font-bold tracking-wide transition-colors"
            >
              {advocate.phone}
            </a>
          </div>
          <div className="flex items-center space-x-2.5">
            <Mail size={14} className="text-brass shrink-0" />
            <a
              href={`mailto:${advocate.email}`}
              className="text-charcoal/75 dark:text-bone/75 hover:text-oxblood dark:hover:text-brass truncate font-medium transition-colors"
            >
              {advocate.email}
            </a>
          </div>
        </div>
      </div>

      {/* Footer CTA: Book Appointment */}
      <div className="mt-6 pt-4 border-t border-bone-dark dark:border-[#222c3d]">
        <Link
          href={`/contact?advocate=${encodeURIComponent(advocate.name)}`}
          className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-center rounded-xs transition-all flex items-center justify-center space-x-2 bg-oxblood hover:bg-wine text-brass border border-brass shadow-sm group-hover:shadow-brass"
        >
          <Calendar size={13} className="text-brass" />
          <span>Book Appointment</span>
        </Link>
      </div>
    </div>
  );
}
