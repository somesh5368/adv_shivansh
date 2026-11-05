import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScalesEmblem } from '@/components/public/ScalesEmblem';

export const metadata: Metadata = {
  title: 'Statutory Disclaimer & BCI Compliance | Justice Alliance Associates & Law Firm',
  description:
    'Bar Council of India statutory compliance statement, professional conduct declarations, and voluntary terms of website access for Justice Alliance Associates & Law Firm.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="border-b border-bone-dark pb-8 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-mono uppercase tracking-editorial rounded-xs">
            <Scale size={12} className="text-brass" />
            <span>Regulatory Compliance</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-oxblood">
            Bar Council of India Disclaimer
          </h1>

          <p className="text-xs text-charcoal/70 uppercase tracking-wider font-mono">
            Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules
          </p>
        </div>

        <div className="mt-10 bg-white border border-bone-dark p-8 sm:p-10 shadow-card rounded-xs space-y-8 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          <div className="flex items-start space-x-4 bg-bone-light border-l-4 border-brass p-4 rounded-xs">
            <ShieldAlert size={24} className="text-brass shrink-0 mt-0.5" />
            <p className="font-medium text-oxblood leading-relaxed">
              Under the rules framed by the Bar Council of India, advocates and legal firms are strictly prohibited from soliciting work, advertising their practice, or promoting claims of expertise through public digital media.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-oxblood">
              Terms of Access and Voluntary Undertaking
            </h2>
            <p>
              By accessing this website, the visitor expressly confirms, acknowledges, and undertakes the following conditions:
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-brass shrink-0 mt-0.5" />
                <span>
                  The user has sought information relating to <strong>Justice Alliance Associates & Law Firm</strong> and its partner advocates voluntarily for personal informational and educational reference.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-brass shrink-0 mt-0.5" />
                <span>
                  There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from the firm or its members to solicit briefs through this website.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-brass shrink-0 mt-0.5" />
                <span>
                  The information provided on this website does not constitute formal legal opinion, actionable advice, or the creation of an advocate-client relationship.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-brass shrink-0 mt-0.5" />
                <span>
                  Transmission or receipt of information through this site does not create an advocate-client relationship. Formal legal engagement requires direct chamber consultation and the formal execution of a vakalatnama.
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-bone-dark pt-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-oxblood">
              Limitation of Liability
            </h3>
            <p>
              Justice Alliance Associates & Law Firm is not liable for any consequence of any action taken by the user relying on material or information provided on this website. For any specific dispute or legal proceeding, the user must seek independent counsel from an advocate admitted to practice in the appropriate judicial forum.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-bone-dark">
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-bold text-charcoal hover:text-oxblood transition-colors inline-flex items-center"
            >
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-wider font-bold text-brass hover:underline inline-flex items-center"
            >
              <span>Chamber Consultation &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
