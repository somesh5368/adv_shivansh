import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, Award, Building, BookCheck, MapPin, Mail, Phone, Clock, ShieldCheck } from 'lucide-react';
import { FIRM_ADVOCATES } from '@/lib/advocatesData';
import { AdvocateCard } from '@/components/public/AdvocateCard';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';

export const metadata: Metadata = {
  title: 'About the Firm | Justice Alliance Associates & Law Firm',
  description:
    'Firm profile, partner advocate credentials, and practice philosophy of Justice Alliance Associates & Law Firm at the Civil Court Campus, Gorakhpur, UP.',
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 space-y-20">
      {/* Title & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-bone-dark pb-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-mono uppercase tracking-editorial rounded-xs">
            <Scale size={12} className="text-brass" />
            <span>Firm Profile & Background</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-oxblood">
            Justice Alliance Associates & Law Firm
          </h1>

          <p className="text-xs sm:text-sm uppercase tracking-wider text-brass font-bold font-mono">
            Civil, Criminal, Cyber, Family & Taxation Law Practice &bull; Gorakhpur, Uttar Pradesh
          </p>

          <p className="text-xs sm:text-base text-charcoal/80 leading-relaxed font-normal pt-2">
            Formed as a dedicated partnership of legal practitioners, Justice Alliance Associates & Law Firm provides principled legal counsel and steadfast courtroom representation across Uttar Pradesh trial courts and appellate jurisdictions.
          </p>
        </div>
      </section>

      {/* Main Profile Grid: Philosophy & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography & Philosophy */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood mb-4">
                Judicial Rigor, Statutory Clarity & Client Dedication
              </h2>
              <div className="text-xs sm:text-sm text-charcoal/85 space-y-4 leading-relaxed">
                <p>
                  Justice Alliance Associates operates under the core belief that effective judicial advocacy is built upon painstaking evidentiary scrutiny, deep statutory comprehension, and an unwavering commitment to client confidentiality under the Advocates Act.
                </p>
                <p>
                  Whether litigating contested property boundaries, defending against criminal charges, managing emergency bail applications, resolving delicate matrimonial disputes, or navigating intricate GST and income tax assessments, our partner advocates approach each brief collaboratively. By combining multidisciplinary perspectives, we build strong legal defenses and sustainable remedies.
                </p>
                <p>
                  Our chambers at the Civil Court Campus, Gorakhpur serve individuals, families, commercial proprietors, and corporate entities who demand direct partner attention without procedural ambiguity.
                </p>
              </div>
            </div>

            {/* Practice Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-bone-dark">
              <div className="border border-bone-dark bg-white p-6 rounded-xs shadow-subtle space-y-2">
                <BookCheck className="text-brass mb-2" size={26} />
                <h3 className="font-serif text-lg font-bold text-oxblood">
                  Statutory Precision
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Rigorous statutory research, comprehensive factual assessment, and methodical pleading preparation for judicial scrutiny.
                </p>
              </div>

              <div className="border border-bone-dark bg-white p-6 rounded-xs shadow-subtle space-y-2">
                <ShieldCheck className="text-brass mb-2" size={26} />
                <h3 className="font-serif text-lg font-bold text-oxblood">
                  Fiduciary Integrity
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Unwavering dedication to client confidentiality, ethical transparency, and statutory compliance under the Bar Council of India.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Firm Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-bone-dark p-7 shadow-subtle space-y-5 rounded-xs">
              <div className="border-b border-bone-dark pb-3">
                <h3 className="font-serif text-xl font-bold text-oxblood">
                  Chambers Coordinates
                </h3>
                <p className="text-[11px] text-charcoal/60 mt-0.5 font-mono">
                  Civil Court, Gorakhpur
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Statutory Affiliation
                  </span>
                  <span className="font-semibold text-oxblood">
                    Bar Council of Uttar Pradesh
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Chambers Location
                  </span>
                  <span className="text-charcoal/80 block">
                    Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Official Email
                  </span>
                  <a
                    href="mailto:justicealliencelaw@gmail.com"
                    className="font-mono text-oxblood hover:underline block"
                  >
                    justicealliencelaw@gmail.com
                  </a>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Consultation Hours
                  </span>
                  <span className="text-charcoal/80 block font-mono">
                    Mon – Sat: 10:00 AM – 5:00 PM (By Appointment)
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-bone-dark">
                <Link
                  href="/contact"
                  className="block text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-brass text-charcoal hover:bg-brass-light transition-all rounded-xs"
                >
                  Schedule Chamber Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Advocates Directory Section */}
      <section className="bg-bone-light/60 py-20 border-y border-bone-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
              Chamber Partners
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-oxblood">
              Our Practicing Advocates
            </h2>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Every matter entrusted to our firm is supervised directly by a partner advocate with specialized domain experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {FIRM_ADVOCATES.map((adv) => (
              <AdvocateCard key={adv.id} advocate={adv} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
