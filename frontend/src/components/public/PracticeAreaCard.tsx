import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldAlert, Laptop, Users, Building, Landmark, Scale } from 'lucide-react';
import { PracticeArea } from '@/types';

interface PracticeAreaCardProps {
  practiceArea: PracticeArea;
}

const iconMap: Record<string, React.ReactNode> = {
  'criminal-law': <ShieldAlert size={20} className="text-brass" />,
  'cyber-law': <Laptop size={20} className="text-brass" />,
  'family-law': <Users size={20} className="text-brass" />,
  'civil-litigation': <Building size={20} className="text-brass" />,
  'taxation-gst': <Landmark size={20} className="text-brass" />,
};

export function PracticeAreaCard({ practiceArea }: PracticeAreaCardProps) {
  const icon = iconMap[practiceArea.slug] || <Scale size={20} className="text-brass" />;

  return (
    <div className="group relative bg-white border border-bone-dark hover:border-brass/80 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover rounded-xs overflow-hidden">
      {/* Top accent line on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-oxblood via-brass to-wine z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Image Banner Header */}
      {practiceArea.image_path ? (
        <div className="relative w-full h-44 overflow-hidden bg-charcoal">
          <img
            src={practiceArea.image_path}
            alt={practiceArea.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          {/* Subtle warm gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/85 via-charcoal/30 to-transparent" />

          {/* Floating Icon Pill */}
          <div className="absolute bottom-3 left-4 flex items-center space-x-2 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 border border-brass/50 rounded-xs">
            {icon}
            <span className="text-[10px] font-mono tracking-editorial uppercase text-brass font-bold">
              Practice Discipline
            </span>
          </div>
        </div>
      ) : (
        <div className="p-6 pb-0 flex items-center justify-between">
          <div className="w-12 h-12 rounded-xs bg-charcoal/5 border border-brass/30 flex items-center justify-center group-hover:bg-oxblood group-hover:border-brass transition-colors duration-300">
            {icon}
          </div>
          <span className="text-[10px] font-mono tracking-editorial uppercase text-charcoal/50 group-hover:text-oxblood transition-colors font-semibold">
            Discipline
          </span>
        </div>
      )}

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-2.5 leading-snug">
            <Link href={`/practice-areas/${practiceArea.slug}`}>
              {practiceArea.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-[13px] text-charcoal/75 leading-relaxed mb-4 line-clamp-3">
            {practiceArea.short_description}
          </p>

          {/* Services summary preview */}
          {practiceArea.services && practiceArea.services.length > 0 && (
            <ul className="mb-4 space-y-1.5 border-t border-bone-dark/60 pt-3">
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
        <div className="pt-4 border-t border-bone-dark flex items-center justify-between mt-auto">
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
    </div>
  );
}
