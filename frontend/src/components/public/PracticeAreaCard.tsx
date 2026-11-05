import React from 'react';
import Link from 'next/link';
import { ArrowRight, Scale, Users, FileText, Building2, Briefcase, Award, Landmark } from 'lucide-react';
import { PracticeArea } from '@/types';

interface PracticeAreaCardProps {
  practiceArea: PracticeArea;
}

const iconMap: Record<string, React.ReactNode> = {
  'civil-litigation': <Scale size={24} className="text-gold" />,
  'family-law': <Users size={24} className="text-gold" />,
  'taxation-gst': <FileText size={24} className="text-gold" />,
  'business-registration': <Building2 size={24} className="text-gold" />,
  'esi-labour-welfare': <Briefcase size={24} className="text-gold" />,
  'trademark-ipr': <Award size={24} className="text-gold" />,
  'government-schemes': <Landmark size={24} className="text-gold" />,
};

export function PracticeAreaCard({ practiceArea }: PracticeAreaCardProps) {
  const icon = iconMap[practiceArea.slug] || <Scale size={24} className="text-gold" />;

  return (
    <div className="group bg-white border border-ivory-dark p-7 flex flex-col justify-between hover:border-gold/60 transition-all duration-300 shadow-subtle hover:shadow-card-hover relative">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-gold transition-colors duration-300" />
      <div>
        <div className="w-12 h-12 bg-ivory flex items-center justify-center mb-5 border border-ivory-dark">
          {icon}
        </div>
        <h3 className="font-serif text-xl font-bold text-navy group-hover:text-gold transition-colors mb-3">
          {practiceArea.title}
        </h3>
        <p className="text-xs text-charcoal/75 leading-relaxed mb-5 line-clamp-3">
          {practiceArea.short_description}
        </p>

        {practiceArea.services && practiceArea.services.length > 0 && (
          <ul className="mb-6 space-y-1.5 border-t border-ivory-dark pt-3">
            {practiceArea.services.slice(0, 3).map((srv) => (
              <li key={srv.id} className="text-[11px] text-charcoal/70 flex items-center">
                <span className="w-1.5 h-1.5 bg-gold rounded-full mr-2 shrink-0" />
                <span className="truncate">{srv.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-ivory-dark flex items-center justify-between">
        <Link
          href={`/practice-areas/${practiceArea.slug}`}
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy group-hover:text-gold transition-colors"
        >
          <span>Examine Practice</span>
          <ArrowRight size={14} className="ml-1.5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
