import React from 'react';
import type { Metadata } from 'next';
import { PracticeAreaCard } from '@/components/public/PracticeAreaCard';
import { FIRM_PRACTICE_AREAS } from '@/lib/practiceAreasData';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Areas of Practice | Justice Alliance Associates & Law Firm',
  description:
    'Comprehensive legal representation across Criminal Law, Cyber Crime & IT Law, Family & Matrimonial Matters, Civil Litigation, and Direct/Indirect Taxation in Gorakhpur, UP.',
};

export default function PracticeAreasPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-bone-dark pb-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-mono uppercase tracking-editorial rounded-xs">
            <Scale size={12} className="text-brass" />
            <span>Integrated Disciplines</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-oxblood">
            Areas of Practice
          </h1>

          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed font-normal">
            Justice Alliance Associates & Law Firm delivers disciplined courtroom advocacy and statutory advisory across five core legal divisions. Each discipline is spearheaded by dedicated partner advocates with exhaustive knowledge of procedural rules and evidentiary standards.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid: 5 Core Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIRM_PRACTICE_AREAS.map((area) => (
            <PracticeAreaCard key={area.id} practiceArea={area} />
          ))}
        </div>
      </section>
    </div>
  );
}
