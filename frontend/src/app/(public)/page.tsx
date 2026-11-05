import React from 'react';
import Link from 'next/link';
import {
  Scale,
  ShieldCheck,
  Users,
  Clock,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Lock,
  Sparkles,
} from 'lucide-react';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';
import { AdvocateCard } from '@/components/public/AdvocateCard';
import { InteractivePracticeGrid } from '@/components/public/InteractivePracticeGrid';
import { InteractiveHowWeWork } from '@/components/public/InteractiveHowWeWork';
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
      {/* 1. HERO SECTION (LUMINOUS, PRESTIGIOUS, CLASSIC ARCHITECTURE) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-bone-dark bg-bone-light text-charcoal">
        {/* Sunlit Architectural Background with Crisp Light Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80"
            alt="Courthouse pillars and classical legal architecture"
            className="w-full h-full object-cover object-center opacity-15 filter contrast-125"
          />
          {/* Luminous light gradient overlay to guarantee crystal clarity */}
          <div className="absolute inset-0 bg-gradient-to-r from-bone-light via-bone/95 to-bone-light/90" />
          <div className="absolute inset-0 pillar-lines-bg pointer-events-none opacity-40" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typography, Value Proposition & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-7 animate-fade-in">
              {/* Prestigious Judicial Badge */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 bg-white border border-brass/60 rounded-xs shadow-subtle">
                <ScalesEmblem size={16} className="text-brass shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-oxblood">
                  Civil Court Campus, Gorakhpur &bull; Uttar Pradesh
                </span>
              </div>

              {/* Grand Classical Headline */}
              <div className="space-y-2">
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-oxblood leading-[1.08]">
                  JUSTICE ALLIANCE
                  <span className="block font-serif text-2xl sm:text-4xl lg:text-5xl text-charcoal font-bold tracking-tight mt-1.5">
                    Associates &amp; Law Firm
                  </span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-sm sm:text-base md:text-lg text-charcoal/80 font-normal leading-relaxed max-w-2xl">
                Principled counsel, statutory rigor, and steadfast judicial advocacy across Civil, Criminal, Cyber, Family, and Taxation litigation. Direct partner access for every brief.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-oxblood hover:bg-wine text-brass font-bold text-xs uppercase tracking-wider transition-all border border-brass shadow-md rounded-xs flex items-center justify-center space-x-2 text-center"
                >
                  <Calendar size={15} className="text-brass" />
                  <span>Book Chamber Consultation</span>
                </Link>

                <Link
                  href="#practice-areas"
                  className="px-8 py-4 bg-white hover:bg-bone text-charcoal border border-brass/60 hover:border-brass text-xs uppercase tracking-wider font-bold transition-all rounded-xs shadow-subtle flex items-center justify-center space-x-2 text-center"
                >
                  <span>Explore Practice Areas</span>
                  <ArrowRight size={15} className="text-brass" />
                </Link>
              </div>

              {/* Direct Partner Coordinates Bar */}
              <div className="pt-4 border-t border-bone-dark flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-charcoal/75">
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-brass" />
                  <span className="text-charcoal/60">Direct Line:</span>
                  <a href="tel:+919198106052" className="text-oxblood hover:text-wine font-bold">
                    +91 9198106052
                  </a>
                </div>
                <div className="hidden sm:inline-block text-brass">&bull;</div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-brass" />
                  <a href="mailto:justicealliencelaw@gmail.com" className="hover:text-oxblood font-medium">
                    justicealliencelaw@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Framed Showcase Card with Proper Legal Imagery (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Double Gold Hairline Border Container */}
                <div className="relative p-2.5 bg-white border-2 border-brass/60 rounded-xs shadow-card">
                  <div className="relative rounded-xs overflow-hidden h-80 sm:h-96 bg-charcoal">
                    <img
                      src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80"
                      alt="Scales of Justice on mahogany desk in law chambers"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

                    {/* Bottom Badge inside photo */}
                    <div className="absolute bottom-4 inset-x-4 p-4 bg-white/95 backdrop-blur-md border border-brass/50 rounded-xs flex items-center space-x-3.5 shadow-md">
                      <div className="w-10 h-10 rounded-xs bg-oxblood border border-brass/50 flex items-center justify-center shrink-0">
                        <ScalesEmblem size={22} className="text-brass" />
                      </div>
                      <div>
                        <span className="font-serif text-base font-bold text-oxblood block leading-tight">
                          Justice Alliance Chambers
                        </span>
                        <span className="text-[10px] text-charcoal/70 uppercase tracking-wider block font-semibold">
                          Civil Court Campus &bull; Gorakhpur, UP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Trust Badge (Top Right) */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-white border border-brass p-3.5 rounded-xs shadow-card flex items-center space-x-3 text-charcoal">
                  <div className="w-9 h-9 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-oxblood">3 Partner Advocates</p>
                    <p className="text-[10px] text-charcoal/70">Direct Partner Attention</p>
                  </div>
                </div>

                {/* Floating Trust Badge (Bottom Left) */}
                <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white border border-brass p-3.5 rounded-xs shadow-card flex items-center space-x-3 text-charcoal">
                  <div className="w-9 h-9 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0">
                    <Scale size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-oxblood">5 Practice Disciplines</p>
                    <p className="text-[10px] text-charcoal/70">Civil &bull; Criminal &bull; Cyber &bull; Family &bull; Tax</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. TRUST STRIP UNDER HERO (LUMINOUS & FACTUAL)                */}
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
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-semibold">
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
                5 Disciplines
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-semibold">
                Integrated Practice
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
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-semibold">
                Fiduciary Privilege
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
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 mt-1 font-semibold">
                Partner Supervision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. PRACTICE AREAS SECTION (INTERACTIVE TABS & FILTER)         */}
      {/* ------------------------------------------------------------- */}
      <section id="practice-areas" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-semibold uppercase tracking-wider rounded-xs">
            <Scale size={12} className="text-brass" />
            <span>Practice Disciplines</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
            Core Practice Areas
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            Statutory advisory and comprehensive courtroom representation across five core judicial jurisdictions.
          </p>
        </div>

        {/* Interactive Practice Grid Component */}
        <InteractivePracticeGrid practiceAreas={FIRM_PRACTICE_AREAS} />

        <div className="text-center pt-10">
          <Link
            href="/practice-areas"
            className="inline-flex items-center px-7 py-3.5 border-2 border-oxblood text-xs uppercase tracking-wider font-bold text-oxblood hover:bg-oxblood hover:text-brass transition-all rounded-xs shadow-sm"
          >
            <span>View All Practice Details &amp; Services</span>
            <ArrowRight size={14} className="ml-2 text-brass" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. OUR ADVOCATES SECTION ("MAKE ALL LAWYER SAME")             */}
      {/* ------------------------------------------------------------- */}
      <section id="advocates" className="bg-bone-dark/20 py-20 border-y border-bone-dark scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-semibold uppercase tracking-wider rounded-xs">
              <Users size={12} className="text-brass" />
              <span>Chamber Partners</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
              Our Practicing Advocates
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Advocates practicing before the Civil Court Campus, Gorakhpur and appellate judicial forums, working in partnership to protect client rights with equal dedication.
            </p>
          </div>

          {/* 3 Symmetrical Advocate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {FIRM_ADVOCATES.map((adv) => (
              <AdvocateCard key={adv.id} advocate={adv} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. PROCEDURAL METHODOLOGY: HOW WE WORK (INTERACTIVE STEPPER)  */}
      {/* ------------------------------------------------------------- */}
      <section id="how-we-work" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-semibold uppercase tracking-wider rounded-xs">
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

        {/* Interactive Animated Stepper */}
        <InteractiveHowWeWork />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. LEGAL ARTICLES / BLOG SECTION                              */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white border-y border-bone-dark py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-semibold uppercase tracking-wider rounded-xs mb-2">
                <span>Knowledge &amp; Literacy</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxblood">
                Legal Resources &amp; Explainers
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-oxblood hover:text-wine transition-colors"
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
              {/* Educational Article 1 */}
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
                <span className="text-[10px] text-brass uppercase font-bold tracking-wider">
                  Civil Litigation
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood leading-snug">
                  Property Partition &amp; Rights Under Uttar Pradesh Revenue Code
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Key procedural requirements for filing partition suits, demarcating ancestral land, and challenging fraudulent registry documents.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/civil-litigation"
                    className="text-xs font-bold uppercase tracking-wider text-oxblood hover:underline inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>

              {/* Educational Article 2 */}
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
                <span className="text-[10px] text-brass uppercase font-bold tracking-wider">
                  Cyber Crime
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood leading-snug">
                  Frozen Bank Accounts &amp; UPI Fraud: Immediate Legal Remedies
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Steps to take when a bank account is frozen due to cyber crime nodal complaints, and how to petition magistrate courts for de-freezing.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/cyber-law"
                    className="text-xs font-bold uppercase tracking-wider text-oxblood hover:underline inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>

              {/* Educational Article 3 */}
              <div className="bg-bone-light border border-bone-dark p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
                <span className="text-[10px] text-brass uppercase font-bold tracking-wider">
                  Criminal Defense
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood leading-snug">
                  Anticipatory Bail Jurisprudence &amp; Fundamental Liberties
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Understanding judicial discretion, conditions for grant of transit/anticipatory bail, and Section 482 quashing procedures.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/criminal-law"
                    className="text-xs font-bold uppercase tracking-wider text-oxblood hover:underline inline-flex items-center"
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
        <div className="bg-oxblood text-bone p-8 sm:p-12 border-l-4 border-brass grid grid-cols-1 lg:grid-cols-3 gap-8 items-center rounded-xs shadow-card">
          <div className="space-y-3 lg:col-span-2">
            <span className="text-xs uppercase tracking-wider text-brass font-bold">
              Chambers &amp; Consultations
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Civil Court Campus, Gorakhpur
            </h3>
            <p className="text-xs sm:text-sm text-bone/85 leading-relaxed max-w-xl">
              Chamber consultations are arranged by prior appointment to ensure thorough review of dispute documents and court fixtures. Transmit an enquiry or reach out directly to our partner advocates.
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-xs text-bone/80">
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
              className="inline-flex items-center justify-center px-8 py-4 bg-brass text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-brass-light transition-all rounded-xs shadow-brass"
            >
              Book Chamber Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
