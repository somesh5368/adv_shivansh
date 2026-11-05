import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  FileCheck,
  Users,
  Clock,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Lock,
} from 'lucide-react';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';
import { PracticeAreaCard } from '@/components/public/PracticeAreaCard';
import { AdvocateCard } from '@/components/public/AdvocateCard';
import { FIRM_PRACTICE_AREAS } from '@/lib/practiceAreasData';
import { FIRM_ADVOCATES } from '@/lib/advocatesData';
import { publicApi } from '@/lib/api';
import { ArticleCard } from '@/components/public/ArticleCard';
import { Article } from '@/types';

export const revalidate = 60;

export default async function HomePage() {
  let backendArticles: Article[] = [];
  try {
    backendArticles = await publicApi.getArticles().catch(() => []);
  } catch {
    backendArticles = [];
  }

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                               */}
      {/* ------------------------------------------------------------- */}
      <section className="relative bg-charcoal text-bone pt-16 sm:pt-24 md:pt-32 pb-20 sm:pb-28 px-4 sm:px-8 border-b-2 border-brass/50 overflow-hidden pillar-lines-bg">
        {/* Subtle radial glow centered behind the emblem */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brass/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 animate-fade-in">
          {/* Scales Emblem with soft gold glow */}
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-oxblood/80 border border-brass/50 shadow-brass inline-flex items-center justify-center">
              <ScalesEmblem size={68} glow className="text-brass" />
            </div>
          </div>

          {/* Firm Identification Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-oxblood/60 border border-brass/40 text-brass text-xs font-mono uppercase tracking-editorial rounded-xs">
            <Scale size={13} className="text-brass" />
            <span>Advocates &bull; Civil Court, Gorakhpur</span>
          </div>

          {/* Huge Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.12]">
            Justice Alliance Associates
            <span className="block text-brass italic font-normal text-3xl sm:text-5xl md:text-6xl mt-2">
              & Law Firm
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-bone/80 font-normal leading-relaxed">
            Statutory rigor, steadfast courtroom advocacy, and principled legal counsel across Civil, Criminal, Cyber, Family, and Taxation litigation.
          </p>

          {/* Two Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-brass hover:bg-brass-light text-charcoal-dark font-bold text-xs uppercase tracking-wider transition-all shadow-brass border border-brass rounded-xs flex items-center justify-center space-x-2"
            >
              <Calendar size={14} />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="#practice-areas"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-bone border border-brass/40 hover:border-brass hover:text-brass text-xs uppercase tracking-wider transition-all rounded-xs flex items-center justify-center space-x-2"
            >
              <span>View Practice Areas</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. TRUST STRIP UNDER HERO (NO FAKE STATS / STRICT FACTS)      */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-white border-2 border-brass/50 shadow-card grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-bone-dark rounded-xs overflow-hidden">
          {/* Point 1 */}
          <div className="p-5 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40">
              <Users size={22} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood leading-none">
                3 Advocates
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-mono">
                Partner Legal Council
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="p-5 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40">
              <Scale size={22} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood leading-none">
                5 Practice Areas
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-mono">
                Integrated Jurisdictions
              </p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="p-5 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40">
              <Lock size={22} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood leading-none">
                Strict Privacy
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-mono">
                Statutory Privilege
              </p>
            </div>
          </div>

          {/* Point 4 */}
          <div className="p-5 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood leading-none">
                Direct Access
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-mono">
                Partner Representation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. PRACTICE AREAS SECTION                                     */}
      {/* ------------------------------------------------------------- */}
      <section id="practice-areas" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
            Practice Disciplines
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
            Core Practice Areas
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Statutory advisory and comprehensive courtroom representation across five core judicial jurisdictions.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {FIRM_PRACTICE_AREAS.map((area) => (
            <PracticeAreaCard key={area.id} practiceArea={area} />
          ))}
        </div>

        <div className="text-center pt-10">
          <Link
            href="/practice-areas"
            className="inline-flex items-center px-6 py-3 border border-oxblood text-xs uppercase tracking-wider font-bold text-oxblood hover:bg-oxblood hover:text-brass transition-all rounded-xs"
          >
            <span>View All Practice Details & Services</span>
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. OUR ADVOCATES SECTION (EXACT ORDER + SHIVANSH HIGHLIGHTED) */}
      {/* ------------------------------------------------------------- */}
      <section id="advocates" className="bg-bone-light/60 py-20 border-y border-bone-dark scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
              Legal Practitioners
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
              Our Advocates
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Experienced advocates practicing before the Civil Court Campus, Gorakhpur and appellate judicial forums, working in partnership to protect client rights.
            </p>
          </div>

          {/* 3 Advocate Cards in exact order */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {FIRM_ADVOCATES.map((adv) => (
              <AdvocateCard key={adv.id} advocate={adv} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. HOW WE WORK (4 METICULOUS STEPS)                           */}
      {/* ------------------------------------------------------------- */}
      <section id="how-we-work" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
            Procedural Methodology
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
            How We Work
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Our systematic 4-step framework guarantees that every brief is addressed with evidentiary precision and judicial preparedness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-bone-dark p-6 sm:p-7 relative rounded-xs hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-brass">01</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/50">
                  Initial Brief
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2.5">
                Confidential Consultation
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Structured chamber or digital conference under strict advocate-client confidentiality to examine core dispute facts and immediate risks.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-bone-dark text-[11px] text-charcoal/60 font-mono">
              Factual Assessment
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-bone-dark p-6 sm:p-7 relative rounded-xs hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-brass">02</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/50">
                  Analysis
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2.5">
                Case Evaluation
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Thorough scrutiny of evidentiary records, revenue maps, statutory enactments, and relevant High Court / Supreme Court precedents.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-bone-dark text-[11px] text-charcoal/60 font-mono">
              Statutory Research
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-bone-dark p-6 sm:p-7 relative rounded-xs hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-brass">03</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/50">
                  Advocacy
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2.5">
                Representation
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Pleading drafting with procedural fidelity, disciplined cross-examination, and unwavering oral advocacy in courtroom hearings.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-bone-dark text-[11px] text-charcoal/60 font-mono">
              Courtroom Pleadings
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-bone-dark p-6 sm:p-7 relative rounded-xs hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-bold text-brass">04</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/50">
                  Execution
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-oxblood mb-2.5">
                Resolution and Support
              </h3>
              <p className="text-xs text-charcoal/75 leading-relaxed">
                Expedited decree enforcement, execution petitions under Order 21 CPC, post-judgment compliance, and transparent advisory.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-bone-dark text-[11px] text-charcoal/60 font-mono">
              Decree Enforcement
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. LEGAL ARTICLES / BLOG SECTION                              */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white border-y border-bone-dark py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block mb-2">
                Knowledge & Literacy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxblood">
                Legal Resources & Explainers
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-charcoal hover:text-oxblood transition-colors"
            >
              <span>Explore All Articles</span>
              <ArrowRight size={14} className="ml-1.5 text-brass" />
            </Link>
          </div>

          {backendArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {backendArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fallback Educational Article 1 */}
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3">
                <span className="text-[10px] font-mono text-brass uppercase font-bold tracking-wider">
                  Civil Litigation
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood leading-snug">
                  Property Partition & Rights Under Uttar Pradesh Revenue Code
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Key procedural requirements for filing partition suits, demarcating ancestral land, and challenging fraudulent registry documents.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/civil-litigation"
                    className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-oxblood inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>

              {/* Fallback Educational Article 2 */}
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3">
                <span className="text-[10px] font-mono text-brass uppercase font-bold tracking-wider">
                  Cyber Crime
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood leading-snug">
                  Frozen Bank Accounts & UPI Fraud: Immediate Legal Remedies
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Steps to take when a bank account is frozen due to cyber crime nodal complaints, and how to petition magistrate courts for de-freezing.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/cyber-law"
                    className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-oxblood inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>

              {/* Fallback Educational Article 3 */}
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3">
                <span className="text-[10px] font-mono text-brass uppercase font-bold tracking-wider">
                  Criminal Defense
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood leading-snug">
                  Anticipatory Bail Jurisprudence & Fundamental Liberties
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Understanding judicial discretion, conditions for grant of transit/anticipatory bail, and Section 482 quashing procedures.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/criminal-law"
                    className="text-xs font-bold uppercase tracking-wider text-charcoal hover:text-oxblood inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. CHAMBERS & CONSULTATION CTA BANNER                         */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-oxblood text-bone p-8 sm:p-12 border-l-4 border-brass grid grid-cols-1 lg:grid-cols-3 gap-8 items-center rounded-xs shadow-modal">
          <div className="space-y-3 lg:col-span-2">
            <span className="text-xs uppercase font-mono tracking-editorial text-brass font-bold">
              Chambers & Consultations
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Civil Court Campus, Gorakhpur
            </h3>
            <p className="text-xs sm:text-sm text-bone/80 leading-relaxed max-w-xl">
              Chamber consultations are arranged by prior appointment to ensure thorough review of dispute documents and court fixtures. Transmit an enquiry or reach out directly to our partner advocates.
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-xs text-bone/70 font-mono">
              <span className="flex items-center space-x-1.5">
                <Clock size={14} className="text-brass" />
                <span>Mon – Sat: 10:00 AM – 5:00 PM</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Mail size={14} className="text-brass" />
                <span>justicealliencelaw@gmail.com</span>
              </span>
            </div>
          </div>
          <div className="lg:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brass text-charcoal-dark font-bold text-xs uppercase tracking-wider hover:bg-brass-light transition-all rounded-xs shadow-brass"
            >
              Book Chamber Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
