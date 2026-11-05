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
  BookOpen,
  Award,
  Briefcase,
} from 'lucide-react';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';
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
    <div className="space-y-24 sm:space-y-32 pb-24 transition-colors duration-200">
      {/* ------------------------------------------------------------------ */}
      {/* 1. HERO SECTION: SLEEK, PRESTIGIOUS, HIGH-CONTRAST & ANIMATED      */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-bone-dark dark:border-[#222c3d] bg-bone-light dark:bg-[#0c1018] text-charcoal dark:text-bone transition-colors duration-200">
        {/* Classical Courthouse Architectural Background with Dual Mode Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=85"
            alt="Courthouse pillars and classical legal architecture"
            className="w-full h-full object-cover object-center opacity-10 dark:opacity-20 filter contrast-125"
          />
          {/* Luminous light gradient in light mode; deep obsidian gradient in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-b from-bone-light/95 via-bone/90 to-bone-light/95 dark:from-[#0b0f17]/95 dark:via-[#0c1018]/90 dark:to-[#0b0f17]/95 transition-colors duration-200" />
          <div className="absolute inset-0 pillar-lines-bg pointer-events-none opacity-30 dark:opacity-20" />
        </div>

        {/* Hero Content Container - Sleek, Uncluttered, Staggered Animations */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-20 sm:py-28 md:py-36 text-center space-y-7">
          {/* Floating Emblem & Judicial Seal Badge */}
          <div className="animate-fade-in-up flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-[#151e2c] border-2 border-brass/60 flex items-center justify-center shadow-md animate-float">
              <ScalesEmblem size={28} className="text-brass" glow />
            </div>

            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white dark:bg-[#151e2c] border border-brass/50 rounded-full shadow-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-oxblood dark:text-brass">
                Civil Court Campus, Gorakhpur &bull; Uttar Pradesh
              </span>
            </div>
          </div>

          {/* Majestic Roman Master Headline */}
          <div className="space-y-2 animate-fade-in-up animation-delay-100">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-oxblood dark:text-white leading-[1.08]">
              JUSTICE ALLIANCE
              <span className="block font-serif text-2xl sm:text-4xl md:text-5xl text-brass font-bold tracking-normal mt-1.5">
                Associates &amp; Law Firm
              </span>
            </h1>
          </div>

          {/* Concise, Authoritative Legal Motto */}
          <p className="text-sm sm:text-base md:text-lg text-charcoal/85 dark:text-bone/85 font-normal leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Principled statutory rigor, exhaustive evidentiary preparation, and steadfast courtroom advocacy across Civil, Criminal, Cyber, Family, and Taxation litigation.
          </p>

          {/* Dual Action Console */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto animate-fade-in-up animation-delay-300">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-oxblood hover:bg-wine text-brass font-bold text-xs uppercase tracking-wider transition-all duration-300 border-2 border-brass shadow-md hover:shadow-brass rounded-xs flex items-center justify-center space-x-2 text-center group hover:-translate-y-0.5"
            >
              <Calendar size={15} className="text-brass group-hover:scale-110 transition-transform" />
              <span>Schedule Chamber Consultation</span>
            </Link>

            <Link
              href="#practice-areas"
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-[#151e2c] hover:bg-bone dark:hover:bg-[#1b2638] text-charcoal dark:text-white border border-brass/60 hover:border-brass text-xs uppercase tracking-wider font-bold transition-all duration-300 rounded-xs shadow-subtle flex items-center justify-center space-x-2 text-center hover:-translate-y-0.5"
            >
              <span>Explore Practice Areas</span>
              <ArrowRight size={15} className="text-brass" />
            </Link>
          </div>

          {/* Direct Chamber Coordinates Bar */}
          <div className="pt-4 border-t border-bone-dark/80 dark:border-[#222c3d] flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-charcoal/80 dark:text-bone/80 animate-fade-in-up animation-delay-400">
            <div className="flex items-center space-x-2">
              <Phone size={14} className="text-brass shrink-0" />
              <span className="text-charcoal/60 dark:text-bone/60">Chamber Direct Line:</span>
              <a href="tel:+919198106052" className="text-oxblood dark:text-brass hover:underline font-bold text-sm tracking-wide">
                +91 9198106052
              </a>
            </div>
            <div className="hidden sm:inline-block text-brass">&bull;</div>
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-brass shrink-0" />
              <a href="mailto:justicealliencelaw@gmail.com" className="text-charcoal/85 dark:text-bone/85 hover:text-oxblood dark:hover:text-brass font-medium">
                justicealliencelaw@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. INSTITUTIONAL AUTHORITY STRIP (FACTUAL TRUST PILLARS)           */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-14 sm:-mt-16 relative z-20">
        <div className="bg-white dark:bg-[#121824] border-2 border-brass/50 dark:border-brass/40 shadow-card grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-bone-dark dark:divide-[#222c3d] rounded-xs overflow-hidden transition-colors duration-200">
          {/* Pillar 1 */}
          <div className="p-6 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
              <Users size={20} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood dark:text-white leading-none">
                3 Advocates
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 dark:text-bone/70 mt-1 font-semibold">
                Partner Council
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
              <Scale size={20} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood dark:text-white leading-none">
                5 Disciplines
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 dark:text-bone/70 mt-1 font-semibold">
                Integrated Practice
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
              <Lock size={20} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood dark:text-white leading-none">
                Strict Privacy
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 dark:text-bone/70 mt-1 font-semibold">
                Fiduciary Privilege
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 sm:p-7 flex items-center space-x-4">
            <div className="w-11 h-11 bg-oxblood text-brass rounded-xs flex items-center justify-center shrink-0 border border-brass/40 shadow-sm">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-oxblood dark:text-white leading-none">
                Direct Access
              </p>
              <p className="text-[11px] uppercase tracking-wider text-charcoal/70 dark:text-bone/70 mt-1 font-semibold">
                Partner Supervision
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. ABOUT THE CHAMBERS (EDITORIAL ARCHITECTURAL SPREAD)              */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Practice Ethos & Editorial Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 dark:bg-brass/10 border border-brass/40 text-oxblood dark:text-brass text-xs font-semibold uppercase tracking-wider rounded-xs">
              <Scale size={12} className="text-brass" />
              <span>Chambers Profile &amp; Ethos</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-oxblood dark:text-white leading-tight">
              Judicial Rigor, Statutory Clarity &amp; Resolute Advocacy
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal/80 dark:text-bone/80 leading-relaxed font-normal">
              <p>
                <strong>Justice Alliance Associates &amp; Law Firm</strong> is a premier multi-disciplinary legal chamber headquartered at the Civil Court Campus, Gorakhpur. Formed by experienced advocates, our practice provides rigorous courtroom representation and authoritative statutory counsel.
              </p>
              <p>
                We believe that successful dispute resolution demands thorough evidentiary vetting, meticulous pleading preparation under the Code of Civil Procedure and Criminal Procedure Code, and unwavering oral advocacy before judicial benches.
              </p>
              <p>
                Every matter entrusted to our chambers is supervised directly by partner advocates, guaranteeing client confidentiality under the Advocates Act and immediate strategic insight.
              </p>
            </div>

            {/* Checkpoints */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal/85 dark:text-bone/85">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-brass shrink-0" />
                <span className="font-medium">Direct Partner Attention on Every Brief</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-brass shrink-0" />
                <span className="font-medium">Exhaustive Documentary &amp; Precedent Scrutiny</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-brass shrink-0" />
                <span className="font-medium">Complete Attorney-Client Fiduciary Privilege</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-brass shrink-0" />
                <span className="font-medium">Order 21 CPC Decree Enforcement Support</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass hover:underline space-x-1"
              >
                <span>Read Full Chambers Profile &amp; Credentials</span>
                <ArrowRight size={14} className="ml-1" />
              </Link>
            </div>
          </div>

          {/* Right Column: Framed Architectural Showcase Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-3 bg-white dark:bg-[#121824] border-2 border-brass/60 dark:border-brass/40 rounded-xs shadow-card">
              <div className="relative rounded-xs overflow-hidden h-96 sm:h-[420px] bg-charcoal">
                <img
                  src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=900&q=80"
                  alt="Justice Alliance Law Firm Chambers"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />

                <div className="absolute bottom-5 inset-x-5 p-4 bg-white/95 dark:bg-[#0c1018]/95 backdrop-blur-md border border-brass/50 rounded-xs flex items-center space-x-3.5 shadow-md">
                  <div className="w-10 h-10 rounded-xs bg-oxblood border border-brass/50 flex items-center justify-center shrink-0">
                    <ScalesEmblem size={22} className="text-brass" />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-bold text-oxblood dark:text-brass block leading-tight">
                      Justice Alliance Chambers
                    </span>
                    <span className="text-[10px] text-charcoal/70 dark:text-bone/70 uppercase tracking-wider block font-semibold">
                      Civil Court Campus &bull; Gorakhpur, UP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. PRACTICE AREAS SECTION (5 CLEAN, RICH LEGAL DOSSIER CARDS)      */}
      {/* ------------------------------------------------------------------ */}
      <section id="practice-areas" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 dark:bg-brass/10 border border-brass/40 text-oxblood dark:text-brass text-xs font-semibold uppercase tracking-wider rounded-xs">
            <Briefcase size={12} className="text-brass" />
            <span>Practice Areas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood dark:text-white">
            Core Practice Disciplines
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/75 dark:text-bone/75 leading-relaxed">
            Statutory advisory and comprehensive courtroom representation across five core judicial divisions.
          </p>
        </div>

        {/* 5 Distinct Practice Area Dossier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FIRM_PRACTICE_AREAS.map((area) => (
            <div
              key={area.id}
              className="group relative bg-white dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] hover:border-brass dark:hover:border-brass transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover rounded-xs overflow-hidden flex flex-col justify-between"
            >
              {/* Photo Banner */}
              {area.image_path && (
                <div className="relative w-full h-48 overflow-hidden bg-charcoal">
                  <img
                    src={area.image_path}
                    alt={area.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center space-x-2 bg-charcoal/90 backdrop-blur-md px-3 py-1.5 border border-brass/50 rounded-xs">
                    <Scale size={14} className="text-brass" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brass">
                      Legal Division
                    </span>
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood dark:text-white group-hover:text-wine dark:group-hover:text-brass transition-colors mb-3 leading-snug">
                    <Link href={`/practice-areas/${area.slug}`}>{area.title}</Link>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-charcoal/75 dark:text-bone/75 leading-relaxed mb-5 line-clamp-3">
                    {area.short_description}
                  </p>

                  {/* Key Services Preview */}
                  {area.services && area.services.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-bone-dark dark:border-[#222c3d] mb-6">
                      {area.services.slice(0, 3).map((srv) => (
                        <div key={srv.id} className="text-[11px] text-charcoal/80 dark:text-bone/80 flex items-center space-x-2">
                          <CheckCircle2 size={12} className="text-brass shrink-0" />
                          <span className="truncate">{srv.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-bone-dark dark:border-[#222c3d] flex items-center justify-between">
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass group-hover:underline"
                  >
                    <span>View Division Details</span>
                    <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/contact?area=${encodeURIComponent(area.title)}`}
                    className="text-[11px] font-semibold text-charcoal/60 dark:text-bone/60 hover:text-oxblood dark:hover:text-brass"
                  >
                    Consult &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <Link
            href="/practice-areas"
            className="inline-flex items-center px-8 py-4 border-2 border-oxblood dark:border-brass text-xs uppercase tracking-wider font-bold text-oxblood dark:text-brass hover:bg-oxblood hover:text-brass dark:hover:bg-brass dark:hover:text-charcoal-dark transition-all rounded-xs shadow-sm"
          >
            <span>View All Practice Details &amp; Proceedings</span>
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. OUR ADVOCATES SECTION (SYMMETRICAL PARTNER CARDS)                */}
      {/* ------------------------------------------------------------------ */}
      <section id="advocates" className="bg-bone-dark/20 dark:bg-[#0a0e16] py-20 border-y border-bone-dark dark:border-[#222c3d] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 dark:bg-brass/10 border border-brass/40 text-oxblood dark:text-brass text-xs font-semibold uppercase tracking-wider rounded-xs">
              <Users size={12} className="text-brass" />
              <span>Chamber Partners</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood dark:text-white">
              Our Practicing Advocates
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 dark:text-bone/75 leading-relaxed">
              Advocates practicing before the Civil Court Campus, Gorakhpur and appellate judicial forums, working in partnership to protect client rights with equal dedication.
            </p>
          </div>

          {/* 3 Symmetrical Advocate Cards (Strictly Equal Stature) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {FIRM_ADVOCATES.map((adv) => (
              <AdvocateCard key={adv.id} advocate={adv} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. PROCEDURAL METHODOLOGY: HOW WE WORK (4-STEP FRAMEWORK)          */}
      {/* ------------------------------------------------------------------ */}
      <section id="how-we-work" className="max-w-7xl mx-auto px-4 sm:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 dark:bg-brass/10 border border-brass/40 text-oxblood dark:text-brass text-xs font-semibold uppercase tracking-wider rounded-xs">
            <Sparkles size={12} className="text-brass" />
            <span>Procedural Methodology</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood dark:text-white">
            How We Work
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/80 dark:text-bone/80 leading-relaxed max-w-2xl mx-auto">
            Our systematic 4-step framework guarantees that every brief is addressed with evidentiary precision and judicial preparedness.
          </p>
        </div>

        {/* 4 Process Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 01 */}
          <div className="bg-white dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-7 rounded-xs space-y-4 hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-brass">01</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-oxblood/10 text-oxblood dark:text-brass rounded-xs border border-brass/30">
                  Initial Brief
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white">
                Confidential Consultation
              </h3>
              <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                Structured chamber or digital conference under strict advocate-client confidentiality to examine core dispute facts and immediate risks.
              </p>
            </div>
            <div className="pt-3 border-t border-bone-dark dark:border-[#222c3d]">
              <span className="text-[11px] font-bold text-oxblood dark:text-brass">Factual Assessment</span>
            </div>
          </div>

          {/* Step 02 */}
          <div className="bg-white dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-7 rounded-xs space-y-4 hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-brass">02</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-oxblood/10 text-oxblood dark:text-brass rounded-xs border border-brass/30">
                  Analysis
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white">
                Case Evaluation
              </h3>
              <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                Thorough scrutiny of evidentiary records, revenue maps, statutory enactments, and relevant High Court / Supreme Court precedents.
              </p>
            </div>
            <div className="pt-3 border-t border-bone-dark dark:border-[#222c3d]">
              <span className="text-[11px] font-bold text-oxblood dark:text-brass">Statutory Research</span>
            </div>
          </div>

          {/* Step 03 */}
          <div className="bg-white dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-7 rounded-xs space-y-4 hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-brass">03</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-oxblood/10 text-oxblood dark:text-brass rounded-xs border border-brass/30">
                  Advocacy
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white">
                Representation
              </h3>
              <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                Pleading drafting with procedural fidelity, disciplined cross-examination, and unwavering oral advocacy in courtroom hearings.
              </p>
            </div>
            <div className="pt-3 border-t border-bone-dark dark:border-[#222c3d]">
              <span className="text-[11px] font-bold text-oxblood dark:text-brass">Courtroom Pleadings</span>
            </div>
          </div>

          {/* Step 04 */}
          <div className="bg-white dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-7 rounded-xs space-y-4 hover:border-brass/70 transition-all shadow-subtle flex flex-col justify-between group hover:-translate-y-1">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-extrabold text-brass">04</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-oxblood/10 text-oxblood dark:text-brass rounded-xs border border-brass/30">
                  Execution
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white">
                Resolution and Support
              </h3>
              <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                Expedited decree enforcement, execution petitions under Order 21 CPC, post-judgment compliance, and transparent advisory.
              </p>
            </div>
            <div className="pt-3 border-t border-bone-dark dark:border-[#222c3d]">
              <span className="text-[11px] font-bold text-oxblood dark:text-brass">Decree Enforcement</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. LEGAL RESOURCES & EXPLAINERS                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white dark:bg-[#0c1018] border-y border-bone-dark dark:border-[#222c3d] py-20 px-4 sm:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 dark:bg-brass/10 border border-brass/40 text-oxblood dark:text-brass text-xs font-semibold uppercase tracking-wider rounded-xs mb-2">
                <BookOpen size={12} className="text-brass" />
                <span>Knowledge &amp; Literacy</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxblood dark:text-white">
                Legal Resources &amp; Explainers
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass hover:text-wine dark:hover:text-brass-light transition-colors"
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
              <div className="bg-bone-light dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
                <span className="text-[10px] text-brass uppercase font-bold tracking-wider">
                  Civil Litigation
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white leading-snug">
                  Property Partition &amp; Rights Under Uttar Pradesh Revenue Code
                </h3>
                <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                  Key procedural requirements for filing partition suits, demarcating ancestral land, and challenging fraudulent registry documents.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/civil-litigation"
                    className="text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass hover:underline inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>

              {/* Educational Article 2 */}
              <div className="bg-bone-light dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
                <span className="text-[10px] text-brass uppercase font-bold tracking-wider">
                  Cyber Crime
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white leading-snug">
                  Frozen Bank Accounts &amp; UPI Fraud: Immediate Legal Remedies
                </h3>
                <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                  Steps to take when a bank account is frozen due to cyber crime nodal complaints, and how to petition magistrate courts for de-freezing.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/cyber-law"
                    className="text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass hover:underline inline-flex items-center"
                  >
                    <span>Read Practice Overview</span>
                    <ArrowRight size={12} className="ml-1 text-brass" />
                  </Link>
                </div>
              </div>

              {/* Educational Article 3 */}
              <div className="bg-bone-light dark:bg-[#121824] border border-bone-dark dark:border-[#222c3d] p-6 rounded-xs space-y-3 shadow-subtle hover:border-brass/70 transition-colors">
                <span className="text-[10px] text-brass uppercase font-bold tracking-wider">
                  Criminal Defense
                </span>
                <h3 className="font-serif text-lg font-bold text-oxblood dark:text-white leading-snug">
                  Anticipatory Bail Jurisprudence &amp; Fundamental Liberties
                </h3>
                <p className="text-xs text-charcoal/75 dark:text-bone/75 leading-relaxed">
                  Understanding judicial discretion, conditions for grant of transit/anticipatory bail, and Section 482 quashing procedures.
                </p>
                <div className="pt-2">
                  <Link
                    href="/practice-areas/criminal-law"
                    className="text-xs font-bold uppercase tracking-wider text-oxblood dark:text-brass hover:underline inline-flex items-center"
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

      {/* ------------------------------------------------------------------ */}
      {/* 8. CHAMBERS & CONSULTATION CTA BANNER                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-oxblood dark:bg-[#4a0a16] text-white p-8 sm:p-12 border-l-4 border-brass grid grid-cols-1 lg:grid-cols-3 gap-8 items-center rounded-xs shadow-card">
          <div className="space-y-3 lg:col-span-2">
            <span className="text-xs uppercase tracking-wider text-brass font-bold">
              Chambers &amp; Consultations
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Civil Court Campus, Gorakhpur
            </h3>
            <p className="text-xs sm:text-sm text-bone/90 leading-relaxed max-w-xl">
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
