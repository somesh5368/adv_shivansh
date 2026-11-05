import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Statutory Disclaimer & Compliance | Advocate Shivansh Kumar Pandey',
  description:
    'Bar Council of India compliance statement, professional conduct declarations, and terms of website access.',
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 space-y-16">
      <section className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="border-b border-ivory-dark pb-8 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Regulatory Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy">
            Bar Council of India Disclaimer
          </h1>
          <p className="text-xs text-charcoal/70 uppercase tracking-wider">
            Rule 36, Section IV, Chapter II, Part VI of the Bar Council of India Rules
          </p>
        </div>

        <div className="mt-10 bg-white border border-ivory-dark p-8 sm:p-10 shadow-subtle space-y-8 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          <div className="flex items-start space-x-4 bg-ivory-light border-l-4 border-gold p-4">
            <ShieldAlert size={24} className="text-gold shrink-0 mt-0.5" />
            <p className="font-medium text-navy">
              Under the rules framed by the Bar Council of India, advocates are strictly prohibited from soliciting work, advertising their practice, or promoting claims of expertise through public media.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-serif text-xl font-bold text-navy">
              Terms of Access and Voluntary Acknowledgement
            </h2>
            <p>
              By accessing this website (<code className="text-navy font-mono text-xs">advshivpandey.in</code> or related domains), the visitor voluntarily confirms and acknowledges the following:
            </p>
            <ul className="space-y-3 pl-2">
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  The user has sought information relating to Advocate Shivansh Kumar Pandey voluntarily for personal informational and educational purposes.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  There has been no advertisement, personal communication, solicitation, invitation, or inducement of any sort whatsoever from Advocate Shivansh Kumar Pandey or any member of his chambers to solicit work through this website.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  The information provided on this website does not constitute legal opinion, formal advice, or the creation of an advocate-client relationship.
                </span>
              </li>
              <li className="flex items-start space-x-2.5">
                <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                <span>
                  Any transmission, receipt, or use of this site and its contents does not create an advocate-client relationship. A formal engagement requires direct consultation and execution of a vakalatnama.
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-ivory-dark pt-6 space-y-3">
            <h3 className="font-serif text-lg font-bold text-navy">
              Limitation of Liability
            </h3>
            <p>
              Advocate Shivansh Kumar Pandey is not liable for any consequence of any action taken by the user relying on material or information provided on this website. For any specific legal issue or dispute, the user should seek independent legal counsel from a qualified advocate admitted to practice in the appropriate judicial forum.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-ivory-dark">
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-navy hover:text-gold transition-colors inline-flex items-center"
            >
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-wider font-semibold text-gold hover:underline inline-flex items-center"
            >
              <span>Office Inquiries</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

