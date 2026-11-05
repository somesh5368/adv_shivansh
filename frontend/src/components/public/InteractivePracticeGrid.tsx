'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PracticeArea } from '@/types';
import { ArrowRight, Scale, ShieldAlert, Laptop, Users, Building, Landmark, CheckCircle2 } from 'lucide-react';

interface InteractivePracticeGridProps {
  practiceAreas: PracticeArea[];
}

const iconMap: Record<string, React.ReactNode> = {
  'criminal-law': <ShieldAlert size={22} className="text-brass" />,
  'cyber-law': <Laptop size={22} className="text-brass" />,
  'family-law': <Users size={22} className="text-brass" />,
  'civil-litigation': <Building size={22} className="text-brass" />,
  'taxation-gst': <Landmark size={22} className="text-brass" />,
};

export function InteractivePracticeGrid({ practiceAreas }: InteractivePracticeGridProps) {
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'All Disciplines' },
    { id: 'civil-litigation', label: 'Civil Litigation' },
    { id: 'criminal-law', label: 'Criminal Law' },
    { id: 'cyber-law', label: 'Cyber Crime' },
    { id: 'family-law', label: 'Family & Divorce' },
    { id: 'taxation-gst', label: 'Taxation & GST' },
  ];

  const filteredAreas =
    activeTab === 'all'
      ? practiceAreas
      : practiceAreas.filter((a) => a.slug === activeTab);

  return (
    <div className="space-y-10">
      {/* Interactive Tabs Row */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-xs border ${
                isActive
                  ? 'bg-oxblood text-brass border-brass shadow-md scale-105'
                  : 'bg-white text-charcoal/70 border-bone-dark hover:border-brass/70 hover:text-oxblood'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Practice Area Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAreas.map((area) => {
          const icon = iconMap[area.slug] || <Scale size={22} className="text-brass" />;

          return (
            <div
              key={area.id}
              className="group relative bg-white border border-bone-dark hover:border-brass transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover rounded-xs overflow-hidden flex flex-col justify-between"
            >
              {/* Image Banner */}
              {area.image_path && (
                <div className="relative w-full h-48 overflow-hidden bg-charcoal">
                  <img
                    src={area.image_path}
                    alt={area.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center space-x-2 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 border border-brass/50 rounded-xs">
                    {icon}
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-brass">
                      Legal Practice
                    </span>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3 leading-snug">
                    <Link href={`/practice-areas/${area.slug}`}>{area.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-charcoal/75 leading-relaxed mb-5 line-clamp-3">
                    {area.short_description}
                  </p>

                  {/* Key Services Preview */}
                  {area.services && area.services.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-bone-dark mb-6">
                      {area.services.slice(0, 3).map((srv) => (
                        <div key={srv.id} className="text-[11px] text-charcoal/80 flex items-center space-x-2">
                          <CheckCircle2 size={12} className="text-brass shrink-0" />
                          <span className="truncate">{srv.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-bone-dark flex items-center justify-between">
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-oxblood group-hover:text-wine transition-colors"
                  >
                    <span>Examine Practice</span>
                    <ArrowRight
                      size={14}
                      className="ml-1.5 text-brass group-hover:translate-x-1.5 transition-transform"
                    />
                  </Link>

                  <Link
                    href={`/contact?area=${encodeURIComponent(area.title)}`}
                    className="text-[11px] font-semibold text-charcoal/60 hover:text-brass transition-colors underline"
                  >
                    Consult Partner
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
