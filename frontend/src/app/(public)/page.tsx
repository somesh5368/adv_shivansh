import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  FileSearch,
  Users,
  Clock,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Lock,
  MessageSquareQuote,
  Gavel,
  Award,
  Sparkles,
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
      {/* 1. HERO SECTION (LUMINOUS, ARCHITECTURAL, NOT TOO DARK)       */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b-2 border-brass/50 bg-charcoal text-bone">
        {/* Real Architectural Legal Background Image with Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1800&q=80"
            alt="Courthouse pillars and classical legal architecture"
            className="w-full h-full object-cover object-center opacity-25 filter brightness-90 contrast-110"
          />
          {/* Subtle gradient overlay to provide warm contrast without pitch darkness */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-oxblood/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brass/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline, Trust Signals & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-7 animate-fade-in">
              {/* Pre-header badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-oxblood/80 border border-brass/50 text-brass text-xs font-mono uppercase tracking-editorial rounded-xs shadow-sm">
                <Scale size={13} className="text-brass shrink-0" />
                <span>Civil Court Campus, Gorakhpur &bull; UP</span>
              </div>

              {/* Huge Serif Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  JUSTICE ALLIANCE
                  <span className="block text-brass italic font-normal text-3xl sm:text-5xl lg:text-6xl mt-1.5">
                    Associates & Law Firm
                  </span>
                </h1>
              </div>

              {/* Refined Value Proposition */}
              <p className="text-sm sm:text-base md:text-lg text-bone/85 font-normal leading-relaxed max-w-2xl">
                Principled counsel, statutory rigor, and steadfast courtroom advocacy across Civil, Criminal, Cyber, Family, and Taxation litigation. Direct partner access for every brief.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 bg-brass hover:bg-brass-light text-charcoal font-bold text-xs uppercase tracking-wider transition-all shadow-brass border border-brass rounded-xs flex items-center justify-center space-x-2 text-center"
                >
                  <Calendar size={14} className="text-charcoal" />
                  <span>Book Chamber Appointment</span>
                </Link>

                <Link
                  href="#practice-areas"
                  className="px-8 py-3.5 bg-oxblood/60 hover:bg-oxblood text-bone border border-brass/50 hover:border-brass text-xs uppercase tracking-wider font-bold transition-all rounded-xs flex items-center justify-center space-x-2 text-center"
                >
                  <span>Explore Practice Areas</span>
                  <ArrowRight size={14} className="text-brass" />
                </Link>
              </div>

              {/* Quick Partner Access Bar */}
              <div className="pt-4 border-t border-brass/25 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-bone/75 font-mono">
                <div className="flex items-center space-x-2">
                  <Phone size={13} className="text-brass" />
                  <span>Direct Line:</span>
                  <a href="tel:+919198106052" className="text-white hover:text-brass font-bold">
                    +91 9198106052
                  </a>
                </div>
                <div className="hidden sm:inline-block text-brass/40">&bull;</div>
                <div className="flex items-center space-x-2">
                  <Mail size={13} className="text-brass" />
                  <a href="mailto:justicealliencelaw@gmail.com" className="hover:text-brass text-white">
                    justicealliencelaw@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Card with Proper Legal Imagery (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Framed Legal Image Card */}
                <div className="relative rounded-xs overflow-hidden border-2 border-brass/60 shadow-modal bg-charcoal-dark">
                  <img
                    src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80"
                    alt="Scales of Justice on mahogany desk in law chambers"
                    className="w-full h-80 sm:h-96 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal/40 to-transparent" />

                  {/* Card Bottom Emblem Banner */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-charcoal-dark/95 backdrop-blur-md border-t border-brass/40 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xs bg-oxblood border border-brass/50 flex items-center justify-center shrink-0 shadow-sm">
                      <ScalesEmblem size={26} className="text-brass" glow />
                    </div>
                    <div>
                      <span className="font-serif text-lg font-bold text-white block leading-tight">
                        Justice Alliance Chambers
                      </span>
                      <span className="text-[10px] font-mono text-brass uppercase tracking-wider block">
                        Gorakhpur Judicial District &bull; UP
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Trust Badge 1 (Top Right) */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-brass p-3.5 rounded-xs shadow-card flex items-center space-x-3 text-charcoal">
                  <div className="w-9 h-9 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-oxblood">3 Partner Advocates</p>
                    <p className="text-[10px] text-charcoal/70 font-mono">Direct Partner Access</p>
                  </div>
                </div>

                {/* Floating Trust Badge 2 (Bottom Left) */}
                <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md border border-brass p-3.5 rounded-xs shadow-card flex items-center space-x-3 text-charcoal">
                  <div className="w-9 h-9 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0">
                    <Scale size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-oxblood">5 Core Disciplines</p>
                    <p className="text-[10px] text-charcoal/70 font-mono">Civil &bull; Criminal &bull; Cyber &bull; Family &bull; Tax</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. TRUST STRIP UNDER HERO (FACTUAL & BALANCED)                */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 sm:-mt-14 relative z-20">
        <div className="bg-white border-2 border-brass/50 shadow-card grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-bone-dark rounded-xs overflow-hidden">
          {/* Point 1 */}
          <div className="p-5 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
              <Users size={22} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood leading-none">
                3 Advocates
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-mono">
                Partner Council
              </p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="p-5 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
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
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
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
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
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

        {/* 5 Cards Grid with Visual Imagery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIRM_PRACTICE_AREAS.map((area) => (
            <PracticeAreaCard key={area.id} practiceArea={area} />
          ))}
        </div>

        <div className="text-center pt-10">
          <Link
            href="/practice-areas"
            className="inline-flex items-center px-7 py-3.5 border-2 border-oxblood text-xs uppercase tracking-wider font-bold text-oxblood hover:bg-oxblood hover:text-brass transition-all rounded-xs shadow-sm"
          >
            <span>View All Practice Details & Services</span>
            <ArrowRight size={14} className="ml-2 text-brass" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. OUR ADVOCATES SECTION ("MAKE ALL LAWYER SAME")             */}
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
              Advocates practicing before the Civil Court Campus, Gorakhpur and appellate judicial forums, working in partnership to protect client rights with equal dedication.
            </p>
          </div>

          {/* 3 Advocate Cards in exact order with identical symmetric styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {FIRM_ADVOCATES.map((adv) => (
              <AdvocateCard key={adv.id} advocate={adv} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. PROCEDURAL METHODOLOGY: HOW WE WORK (ANIMATED & DESIGNED)  */}
      {/* ------------------------------------------------------------- */}
      <section id="how-we-work" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-mono uppercase tracking-editorial rounded-xs">
            <Sparkles size={12} className="text-brass" />
            <span>Procedural Methodology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
            How We Work
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed max-w-2xl mx-auto">
            Our systematic 4-step framework guarantees that every brief is addressed with evidentiary precision and judicial preparedness.
          </p>
        </div>

        {/* Connected Stepper Timeline Container */}
        <div className="relative">
          {/* Desktop Horizontal Progress Line connecting all 4 steps */}
          <div
            className="hidden lg:block absolute top-16 inset-x-12 h-1 bg-gradient-to-r from-brass via-oxblood to-brass z-0 opacity-40"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
            {/* Step 01: Initial Brief */}
            <div className="group relative bg-white border border-bone-dark hover:border-brass/90 p-7 rounded-xs shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-brass transition-colors duration-300" />
              
              <div>
                {/* Step Top Bar: Number + Node + Category */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-oxblood text-brass border-2 border-brass/60 flex items-center justify-center font-mono text-base font-bold shadow-md group-hover:scale-110 transition-transform">
                    01
                  </div>
                  <span className="px-2.5 py-1 bg-bone-light border border-bone-dark text-[10px] font-mono uppercase tracking-widest text-charcoal/70 rounded-xs font-bold">
                    Initial Brief
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xs bg-charcoal/5 flex items-center justify-center text-brass mb-4 group-hover:bg-oxblood transition-colors">
                  <MessageSquareQuote size={20} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3">
                  Confidential Consultation
                </h3>

                <p className="text-xs text-charcoal/75 leading-relaxed mb-6">
                  Structured chamber or digital conference under strict advocate-client confidentiality to examine core dispute facts and immediate risks.
                </p>
              </div>

              <div className="pt-3 border-t border-bone-dark flex items-center justify-between text-[11px] font-mono text-oxblood font-bold">
                <span>Factual Assessment</span>
                <CheckCircle2 size={14} className="text-brass" />
              </div>
            </div>

            {/* Step 02: Analysis */}
            <div className="group relative bg-white border border-bone-dark hover:border-brass/90 p-7 rounded-xs shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-brass transition-colors duration-300" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-oxblood text-brass border-2 border-brass/60 flex items-center justify-center font-mono text-base font-bold shadow-md group-hover:scale-110 transition-transform">
                    02
                  </div>
                  <span className="px-2.5 py-1 bg-bone-light border border-bone-dark text-[10px] font-mono uppercase tracking-widest text-charcoal/70 rounded-xs font-bold">
                    Analysis
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xs bg-charcoal/5 flex items-center justify-center text-brass mb-4 group-hover:bg-oxblood transition-colors">
                  <FileSearch size={20} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3">
                  Case Evaluation
                </h3>

                <p className="text-xs text-charcoal/75 leading-relaxed mb-6">
                  Thorough scrutiny of evidentiary records, revenue maps, statutory enactments, and relevant High Court / Supreme Court precedents.
                </p>
              </div>

              <div className="pt-3 border-t border-bone-dark flex items-center justify-between text-[11px] font-mono text-oxblood font-bold">
                <span>Statutory Research</span>
                <CheckCircle2 size={14} className="text-brass" />
              </div>
            </div>

            {/* Step 03: Advocacy */}
            <div className="group relative bg-white border border-bone-dark hover:border-brass/90 p-7 rounded-xs shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-brass transition-colors duration-300" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-oxblood text-brass border-2 border-brass/60 flex items-center justify-center font-mono text-base font-bold shadow-md group-hover:scale-110 transition-transform">
                    03
                  </div>
                  <span className="px-2.5 py-1 bg-bone-light border border-bone-dark text-[10px] font-mono uppercase tracking-widest text-charcoal/70 rounded-xs font-bold">
                    Advocacy
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xs bg-charcoal/5 flex items-center justify-center text-brass mb-4 group-hover:bg-oxblood transition-colors">
                  <Gavel size={20} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3">
                  Representation
                </h3>

                <p className="text-xs text-charcoal/75 leading-relaxed mb-6">
                  Pleading drafting with procedural fidelity, disciplined cross-examination, and unwavering oral advocacy in courtroom hearings.
                </p>
              </div>

              <div className="pt-3 border-t border-bone-dark flex items-center justify-between text-[11px] font-mono text-oxblood font-bold">
                <span>Courtroom Pleadings</span>
                <CheckCircle2 size={14} className="text-brass" />
              </div>
            </div>

            {/* Step 04: Execution */}
            <div className="group relative bg-white border border-bone-dark hover:border-brass/90 p-7 rounded-xs shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-brass transition-colors duration-300" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-full bg-oxblood text-brass border-2 border-brass/60 flex items-center justify-center font-mono text-base font-bold shadow-md group-hover:scale-110 transition-transform">
                    04
                  </div>
                  <span className="px-2.5 py-1 bg-bone-light border border-bone-dark text-[10px] font-mono uppercase tracking-widest text-charcoal/70 rounded-xs font-bold">
                    Execution
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xs bg-charcoal/5 flex items-center justify-center text-brass mb-4 group-hover:bg-oxblood transition-colors">
                  <Award size={20} />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood group-hover:text-wine transition-colors mb-3">
                  Resolution and Support
                </h3>

                <p className="text-xs text-charcoal/75 leading-relaxed mb-6">
                  Expedited decree enforcement, execution petitions under Order 21 CPC, post-judgment compliance, and transparent advisory.
                </p>
              </div>

              <div className="pt-3 border-t border-bone-dark flex items-center justify-between text-[11px] font-mono text-oxblood font-bold">
                <span>Decree Enforcement</span>
                <CheckCircle2 size={14} className="text-brass" />
              </div>
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
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
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
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
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
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
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
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brass text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-brass-light transition-all rounded-xs shadow-brass"
            >
              Book Chamber Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
