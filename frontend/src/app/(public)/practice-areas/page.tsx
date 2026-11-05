import React from 'react';
import type { Metadata } from 'next';
import { publicApi } from '@/lib/api';
import { PracticeAreaCard } from '@/components/public/PracticeAreaCard';

export const metadata: Metadata = {
  title: 'Areas of Practice | Advocate Shivansh Kumar Pandey',
  description:
    'Comprehensive legal services across Civil Litigation, Family Law, Taxation & GST, Business Registration, Labour Welfare, Trademark/IPR, and Government Schemes in Gorakhpur, UP.',
};

export default async function PracticeAreasPage() {
  const practiceAreas = await publicApi.getPracticeAreas().catch(() => []);

  return (
    <div className="py-16 space-y-16">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-ivory-dark pb-10 space-y-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Legal Disciplines
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Areas of Practice
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Advocate Shivansh Kumar Pandey provides structured legal counsel and judicial advocacy across civil disputes, matrimonial matters, statutory taxation, and regulatory compliance. Each practice discipline is governed by comprehensive procedural knowledge and client dedication.
          </p>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <PracticeAreaCard key={area.id} practiceArea={area} />
          ))}
        </div>
      </section>
    </div>
  );
}
