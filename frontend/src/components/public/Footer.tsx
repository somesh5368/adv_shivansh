import React from 'react';
import Link from 'next/link';
import { ScalesEmblem } from './ScalesEmblem';
import { Phone, Mail, MapPin, Scale, ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark text-bone border-t-2 border-brass/50">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Firm Overview & Emblem (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-oxblood border border-brass/60 rounded-xs flex items-center justify-center shrink-0 shadow-brass">
                <ScalesEmblem size={26} className="text-brass" glow />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white leading-tight">
                  JUSTICE ALLIANCE
                </span>
                <span className="text-[10px] font-sans uppercase tracking-editorial text-brass font-semibold">
                  Associates & Law Firm
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-bone/75 leading-relaxed pr-2">
              A distinguished legal chamber committed to judicial integrity, statutory excellence, and resolute advocacy across Civil, Criminal, Cyber, Family, and Taxation litigation.
            </p>

            <div className="pt-2 text-xs text-bone/60 space-y-1.5 font-mono">
              <div className="flex items-center space-x-2">
                <Mail size={13} className="text-brass shrink-0" />
                <a href="mailto:justicealliencelaw@gmail.com" className="hover:text-brass transition-colors">
                  justicealliencelaw@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={13} className="text-brass shrink-0 mt-0.5" />
                <span>Civil Court Campus, Gorakhpur, Uttar Pradesh</span>
              </div>
            </div>
          </div>

          {/* Column 2: Partner Advocates Directory (Exact Required Order) (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
              Our Advocates
            </span>
            <div className="space-y-4 text-xs">
              {/* 1. Adv. Shivansh */}
              <div className="border-l-2 border-brass pl-3 space-y-0.5">
                <p className="font-serif text-sm font-bold text-white">
                  Adv. Shivansh
                </p>
                <p className="text-[11px] text-brass font-medium">
                  Civil & Taxation Law
                </p>
                <p className="text-[11px] text-bone/60">
                  Senior Counsel &bull; Chamber Anchor
                </p>
              </div>

              {/* 2. Adv. Rahul Maurya */}
              <div className="border-l-2 border-charcoal-light pl-3 space-y-0.5">
                <p className="font-serif text-sm font-bold text-white">
                  Adv. Rahul Maurya
                </p>
                <p className="text-[11px] text-brass font-medium">
                  Cyber & Criminal Law
                </p>
                <a href="tel:+918935090610" className="text-[11px] text-bone/70 hover:text-brass font-mono block">
                  +91 89350 90610
                </a>
              </div>

              {/* 3. Adv. Ratnakar Yadav */}
              <div className="border-l-2 border-charcoal-light pl-3 space-y-0.5">
                <p className="font-serif text-sm font-bold text-white">
                  Adv. Ratnakar Yadav
                </p>
                <p className="text-[11px] text-brass font-medium">
                  Criminal & Family Law
                </p>
                <a href="tel:+919517452736" className="text-[11px] text-bone/70 hover:text-brass font-mono block">
                  +91 95174 52736
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: 5 Practice Disciplines (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
              Practice Disciplines
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/practice-areas/criminal-law" className="text-bone/80 hover:text-brass transition-colors">
                  Criminal Defense & Bail
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/cyber-law" className="text-bone/80 hover:text-brass transition-colors">
                  Cyber Crime & IT Compliance
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/family-law" className="text-bone/80 hover:text-brass transition-colors">
                  Family & Matrimonial Law
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/civil-litigation" className="text-bone/80 hover:text-brass transition-colors">
                  Civil Litigation & Property Title
                </Link>
              </li>
              <li>
                <Link href="/practice-areas/taxation-gst" className="text-bone/80 hover:text-brass transition-colors">
                  Taxation, ITR & GST Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Navigation & Chamber (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-editorial text-brass block">
              Quick Links
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-bone/80 hover:text-brass transition-colors">
                  About Firm
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-bone/80 hover:text-brass transition-colors">
                  Legal Explainers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-bone/80 hover:text-brass transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-bone/80 hover:text-brass transition-colors">
                  BCI Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-brass hover:underline font-mono">
                  Admin Chamber
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bar Council of India Statutory Compliance Banner */}
      <div className="bg-charcoal border-t border-charcoal-light py-6 px-4 sm:px-8 text-center text-bone/65 text-[11px] leading-relaxed">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-semibold text-brass">
            Statutory Bar Council of India Regulatory Notice
          </p>
          <p>
            As per the rules of the Bar Council of India, advocates are strictly prohibited from soliciting work or advertising their practice in any manner. This website is created solely for voluntary informational and academic reference. Accessing this site does not constitute an advocate-client relationship.
          </p>
        </div>
      </div>

      {/* Sub-Footer Copyright */}
      <div className="bg-charcoal-dark border-t border-charcoal-light/70 py-4 px-4 sm:px-8 text-center text-[11px] text-bone/50 font-mono">
        <p>
          &copy; {currentYear} Justice Alliance Associates & Law Firm. All statutory rights reserved.
        </p>
      </div>
    </footer>
  );
}
