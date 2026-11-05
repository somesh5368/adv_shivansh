import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Scale, BookOpen, Clock, MapPin, CheckCircle } from 'lucide-react';
import { PracticeAreaCard } from '@/components/public/PracticeAreaCard';
import { ArticleCard } from '@/components/public/ArticleCard';
import { publicApi } from '@/lib/api';
import { AdvocateProfile, PracticeArea, Article } from '@/types';

export const revalidate = 60; // Incremental static revalidation

export default async function HomePage() {
  // Fetch initial data from backend API with fallback safety
  let profile: AdvocateProfile | null = null;
  let practiceAreas: PracticeArea[] = [];
  let articles: Article[] = [];

  try {
    const [profileRes, practiceRes, articlesRes] = await Promise.all([
      publicApi.getProfile().catch(() => null),
      publicApi.getPracticeAreas().catch(() => []),
      publicApi.getArticles().catch(() => []),
    ]);
    profile = profileRes;
    practiceAreas = practiceRes || [];
    articles = articlesRes || [];
  } catch (e) {
    // Graceful fallback to static presentation
  }

  return (
    <div className="space-y-16 md:space-y-24 pb-16 sm:pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-navy text-white py-16 sm:py-24 md:py-32 px-4 sm:px-8 overflow-hidden border-b-2 border-gold">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#C5A35A_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-navy-800 border border-gold/40 text-gold text-xs uppercase tracking-widest">
            <Scale size={14} />
            <span>Advocate • Civil Court, Gorakhpur</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Understanding the Law.
            <br />
            <span className="text-gold italic font-normal">Navigating Your Legal Matters.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-ivory/80 leading-relaxed font-normal">
            Advocate Shivansh Kumar Pandey delivers diligent counsel, statutory clarity, and steadfast advocacy across civil litigation, matrimonial disputes, taxation compliance, and commercial registrations.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-gold text-navy-900 font-semibold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-subtle border border-gold-dark"
            >
              Chamber Consultation
            </Link>
            <Link
              href="/practice-areas"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white border border-ivory/30 hover:border-gold hover:text-gold text-xs uppercase tracking-wider transition-all"
            >
              Areas of Practice
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ADVOCATE INTRODUCTION & ETHICAL STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 bg-white border border-ivory-dark p-5 sm:p-8 shadow-card relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-gold" />
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                Professional Overview
              </span>
              <h2 className="font-serif text-3xl font-bold text-navy">
                Shivansh Kumar Pandey
              </h2>
              <p className="text-xs text-gold uppercase tracking-wider font-medium">
                Civil, Family & Taxation Law Expert
              </p>
              <div className="text-xs text-charcoal/80 space-y-3 leading-relaxed border-t border-ivory-dark pt-4">
                <p>
                  Practicing before the Civil Court, Gorakhpur, Advocate Shivansh Kumar Pandey approaches legal advocacy through meticulous statutory analysis, evidentiary rigor, and adherence to professional ethics.
                </p>
                <p>
                  Legal disputes require strategic foresight and transparent communication. Our practice emphasizes procedural precision under the Code of Civil Procedure, personal family statutes, and direct and indirect taxation frameworks.
                </p>
              </div>

              <div className="pt-4 border-t border-ivory-dark space-y-2 text-xs text-charcoal/70">
                <div className="flex items-center space-x-2">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Enrolled with the Bar Council of Uttar Pradesh</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Chambers at Civil Court Campus, Gorakhpur</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle size={14} className="text-gold" />
                  <span>Strict Confidentiality & Fiduciary Standard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
              Core Practice Tenets
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-navy leading-tight">
              A Disciplined Approach to Judicial Advocacy and Regulatory Advisory
            </h3>
            <p className="text-sm text-charcoal/80 leading-relaxed">
              We operate under the principle that effective legal representation is built on exhaustive research, objective evaluation of merits, and clear advice. Whether resolving contested property rights, structuring commercial compliances, or advising on matrimonial remedies, our focus remains on lawful and lasting resolutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white border border-ivory-dark p-5">
                <ShieldCheck className="text-gold mb-2" size={24} />
                <h4 className="font-serif text-base font-bold text-navy mb-1">
                  Integrity & Ethics
                </h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Every brief is managed strictly within the professional standards codified by the Bar Council of India.
                </p>
              </div>
              <div className="bg-white border border-ivory-dark p-5">
                <BookOpen className="text-gold mb-2" size={24} />
                <h4 className="font-serif text-base font-bold text-navy mb-1">
                  Statutory Precision
                </h4>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Meticulous drafting and structured citations backed by authoritative judicial precedents.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors"
              >
                <span>Read Full Professional Biography</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRACTICE AREAS OVERVIEW (7 CORE DISCIPLINES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Comprehensive Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
            Disciplines of Practice
          </h2>
          <p className="text-xs text-charcoal/75 leading-relaxed">
            Legal advisory and courtroom representation provided across seven core categories for individuals, families, and commercial entities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area) => (
            <PracticeAreaCard key={area.id} practiceArea={area} />
          ))}
        </div>

        <div className="text-center pt-10">
          <Link
            href="/practice-areas"
            className="inline-flex items-center px-6 py-3 border border-navy text-xs uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-all"
          >
            <span>View All Practice Details & Services</span>
            <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* 4. LEGAL RESOURCES & EXPLAINERS */}
      <section className="bg-white border-y border-ivory-dark py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-2">
                Knowledge & Literacy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy">
                Legal Resources & Explainers
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy hover:text-gold transition-colors"
            >
              <span>Explore All Articles</span>
              <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. OFFICE LOCATION & CHAMBER DETAILS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-navy text-white p-8 sm:p-12 border-l-4 border-gold grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-3 lg:col-span-2">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold">
              Chambers & Consultations
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Civil Court Campus, Gorakhpur
            </h3>
            <p className="text-xs text-ivory/80 leading-relaxed max-w-xl">
              Chamber consultations are conducted by prior appointment to ensure adequate attention and thorough review of briefs. To request a consultation, please contact our administrative desk.
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-xs text-ivory/70">
              <span className="flex items-center space-x-1.5">
                <Clock size={14} className="text-gold" />
                <span>Mon – Sat: 10:00 AM – 5:00 PM</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <MapPin size={14} className="text-gold" />
                <span>Gorakhpur, Uttar Pradesh</span>
              </span>
            </div>
          </div>
          <div className="lg:text-right">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-navy-900 font-semibold text-xs uppercase tracking-wider hover:bg-gold-light transition-all"
            >
              Consultation Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
