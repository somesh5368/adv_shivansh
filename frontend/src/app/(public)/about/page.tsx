import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, Award, Building, BookCheck, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { publicApi } from '@/lib/api';

export const metadata: Metadata = {
  title: 'About Advocate Shivansh Kumar Pandey | Profile & Background',
  description:
    'Professional profile, practice philosophy, and Bar Council credentials of Advocate Shivansh Kumar Pandey, practicing at the Civil Court, Gorakhpur, UP.',
};

export default async function AboutPage() {
  const profile = await publicApi.getProfile().catch(() => null);

  return (
    <div className="py-16 space-y-20">
      {/* Title & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-ivory-dark pb-10 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Advocate Profile
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Advocate Shivansh Kumar Pandey
          </h1>
          <p className="text-sm text-gold font-medium uppercase tracking-wider">
            {profile?.tagline || 'Civil, Family & Taxation Law Expert'}
          </p>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Biography & Philosophy */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-4">
                Professional Background & Advocacy
              </h2>
              <div className="text-xs sm:text-sm text-charcoal/80 space-y-4 leading-relaxed">
                <p>
                  Advocate Shivansh Kumar Pandey has established a disciplined legal practice centered at the Civil Court, Gorakhpur, Uttar Pradesh. Committed to the constitutional mandate of justice and statutory accuracy, Adv. Pandey represents individual and commercial litigants across a diverse spectrum of legal matters.
                </p>
                <p>
                  Our legal philosophy is rooted in the belief that effective legal counsel begins with listening and exhaustive preparation. By thoroughly investigating evidentiary documents and analyzing statutory provisions under the Code of Civil Procedure, personal family statutes, and tax enactments, we formulate grounded strategies for our clients.
                </p>
                <p>
                  In addition to dispute litigation, our practice provides proactive advisory to small businesses, startups, and enterprises regarding statutory registrations, intellectual property safeguarding, and labour welfare compliances.
                </p>
              </div>
            </div>

            {/* Practice Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-ivory-dark">
              <div className="border border-ivory-dark bg-white p-6">
                <BookCheck className="text-gold mb-3" size={24} />
                <h3 className="font-serif text-lg font-bold text-navy mb-1.5">
                  Legal Diligence
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Rigorous statutory research, comprehensive factual assessment, and methodical pleading preparation for judicial scrutiny.
                </p>
              </div>
              <div className="border border-ivory-dark bg-white p-6">
                <Scale className="text-gold mb-3" size={24} />
                <h3 className="font-serif text-lg font-bold text-navy mb-1.5">
                  Professional Fiduciary
                </h3>
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  Unwavering dedication to client confidentiality, ethical transparency, and statutory compliance under the Advocates Act.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Credentials Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-ivory-dark p-7 shadow-subtle space-y-6">
              <div className="border-b border-ivory-dark pb-4">
                <h3 className="font-serif text-xl font-bold text-navy">
                  Credentials & Affiliations
                </h3>
                <p className="text-[11px] text-charcoal/60 mt-1">
                  Official verification details
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Statutory Bar Affiliation
                  </span>
                  <span className="font-medium text-navy">
                    {profile?.enrolment_council || 'Bar Council of Uttar Pradesh'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Enrolment Number
                  </span>
                  <span className="font-mono text-xs text-charcoal/90 bg-ivory px-2 py-1 inline-block border border-ivory-dark">
                    {profile?.enrolment_number || '[Pending Verification Confirmation]'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Qualifications
                  </span>
                  <span className="font-medium text-navy">
                    {profile?.qualifications || '[Degree / Qualifications Pending Verification]'}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal/60 block mb-0.5">
                    Primary Forum
                  </span>
                  <span className="font-medium text-navy">
                    Civil Court, Gorakhpur, Uttar Pradesh
                  </span>
                </div>
              </div>
            </div>

            {/* Office Card */}
            <div className="bg-navy text-white p-7 space-y-4 border-l-4 border-gold">
              <h4 className="font-serif text-lg font-bold text-white">
                Chambers Location
              </h4>
              <div className="space-y-3 text-xs text-ivory/80">
                <div className="flex items-start space-x-2.5">
                  <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                  <span>{profile?.office_address || 'Civil Court Campus, Gorakhpur, Uttar Pradesh, India'}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone size={16} className="text-gold shrink-0" />
                  <a href={`tel:${profile?.phone || '+919198106052'}`} className="hover:text-gold transition-colors">
                    {profile?.phone || '+91 9198106052'}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail size={16} className="text-gold shrink-0" />
                  <a href={`mailto:${profile?.email || 'advshiv43@gmail.com'}`} className="hover:text-gold transition-colors">
                    {profile?.email || 'advshiv43@gmail.com'}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="block text-center py-2.5 text-xs font-semibold uppercase tracking-wider bg-gold text-navy-900 hover:bg-gold-light transition-all"
                >
                  Schedule Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
