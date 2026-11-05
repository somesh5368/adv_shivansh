import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldAlert, Laptop, Users, Building, Landmark, Scale } from 'lucide-react';
import { PracticeArea } from '@/types';

interface PracticeAreaCardProps {
  practiceArea: PracticeArea;
}

const iconMap: Record<string, React.ReactNode> = {
  'criminal-law': <ShieldAlert size={26} className="text-brass group-hover:text-brass-light transition-colors" />,
  'cyber-law': <Laptop size={26} className="text-brass group-hover:text-brass-light transition-colors" />,
  'family-law': <Users size={26} className="text-brass group-hover:text-brass-light transition-colors" />,
  'civil-litigation': <Building size={26} className="text-brass group-hover:text-brass-light transition-colors" />,
  'taxation-gst': <Landmark size={26} className="text-brass group-hover:text-brass-light transition-colors" />,
};

export function PracticeAreaCard({ practiceArea }: PracticeAreaCardProps) {
  const icon = iconMap[practiceArea.slug] || (
    <Scale size={26} className="text-brass group-hover:text-brass-light transition-colors" />
  );

  return (
    <div className="group relative bg-white border border-bone-dark hover:border-brass/80 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover rounded-xs overflow-hidden">
      {/* Top accent line on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-oxblood group-hover:via-brass group-hover:to-wine transition-colors duration-300" />

      <div>
        {/* Icon & Category Tag */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xs bg-charcoal/5 border border-brass/30 flex items-center justify-center group-hover:bg-oxblood group-hover:border-brass transition-colors duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-mono tracking-editorial uppercase text-charcoal/50 group-hover:text-oxblood transition-colors font-semibold">
            Discipline
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3 leading-snug">
          <Link href={`/practice-areas/${practiceArea.slug}`}>
            {practiceArea.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-[13px] text-charcoal/75 leading-relaxed mb-5 line-clamp-3">
          {practiceArea.short_description}
        </p>

        {/* Services summary preview */}
        {practiceArea.services && practiceArea.services.length > 0 && (
          <ul className="mb-6 space-y-1.5 border-t border-bone-dark/60 pt-3">
            {practiceArea.services.slice(0, 3).map((srv) => (
              <li key={srv.id} className="text-[11px] text-charcoal/70 flex items-center">
                <span className="w-1.5 h-1.5 bg-brass rounded-full mr-2 shrink-0 group-hover:scale-125 transition-transform" />
                <span className="truncate">{srv.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Card Action Link */}
      <div className="pt-4 border-t border-bone-dark flex items-center justify-between">
        <Link
          href={`/practice-areas/${practiceArea.slug}`}
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-charcoal group-hover:text-oxblood transition-colors"
        >
          <span>View Practice Detail</span>
          <ArrowRight
            size={14}
            className="ml-1.5 text-brass group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
