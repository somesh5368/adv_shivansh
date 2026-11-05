import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPracticeAreaBySlug, FIRM_PRACTICE_AREAS } from '@/lib/practiceAreasData';
import { FIRM_ADVOCATES } from '@/lib/advocatesData';
import { ArrowLeft, CheckCircle2, Phone, Mail, Calendar, ShieldCheck, Scale } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return FIRM_PRACTICE_AREAS.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = getPracticeAreaBySlug(params.slug);
  if (!area) return { title: 'Practice Area Not Found | Justice Alliance Associates' };

  return {
    title: `${area.title} | Justice Alliance Associates & Law Firm`,
    description: area.short_description,
  };
}

export default function PracticeAreaDetailPage({ params }: Props) {
  const area = getPracticeAreaBySlug(params.slug);

  if (!area) {
    notFound();
  }

  const otherAreas = FIRM_PRACTICE_AREAS.filter((a) => a.slug !== area.slug);

  // Determine relevant advocate for this discipline
  const assignedAdvocate =
    area.slug === 'criminal-law'
      ? FIRM_ADVOCATES[1] // Adv. Rahul Maurya
      : area.slug === 'cyber-law'
      ? FIRM_ADVOCATES[1] // Adv. Rahul Maurya
      : area.slug === 'family-law'
      ? FIRM_ADVOCATES[2] // Adv. Ratnakar Yadav
      : FIRM_ADVOCATES[0]; // Adv. Shivansh (Civil & Taxation)

  return (
    <div className="py-16 sm:py-20 space-y-16">
      {/* Breadcrumb & Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <Link
          href="/practice-areas"
          className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-charcoal/70 hover:text-oxblood transition-colors mb-6"
        >
          <ArrowLeft size={14} className="mr-1.5 text-brass" />
          <span>Back to All Practice Areas</span>
        </Link>

        <div className="border-b border-bone-dark pb-8 space-y-4 max-w-4xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brass block">
            Practice Area
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-oxblood">
            {area.title}
          </h1>
          <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
            {area.short_description}
          </p>
        </div>
      </section>

      {/* Main Content & Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Description & Services */}
          <div className="lg:col-span-8 space-y-12">
            <div className="bg-white border border-bone-dark p-7 sm:p-9 shadow-subtle rounded-xs space-y-5">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood border-b border-bone-dark pb-3">
                Legal Scope & Procedural Approach
              </h2>
              <div className="text-xs sm:text-sm text-charcoal/85 leading-relaxed space-y-4">
                <p>{area.full_description}</p>
                <p>
                  Every proceeding in this discipline is governed by comprehensive factual inquiry, documentary substantiation, and thorough statutory analysis. Our chambers represent clients through early intervention, meticulous drafting of plaints or petitions, and steadfast trial advocacy.
                </p>
              </div>

              {/* Lead Practice Partner note */}
              <div className="pt-4 border-t border-bone-dark flex items-center justify-between text-xs">
                <span className="text-charcoal/60 font-semibold">Lead Discipline Partner:</span>
                <span className="font-bold text-oxblood">{assignedAdvocate.name} ({assignedAdvocate.specialization})</span>
              </div>
            </div>

            {/* Sub-Services Breakdown */}
            {area.services && area.services.length > 0 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brass block mb-1">
                    Specific Legal Services
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood">
                    Proceedings Handled Under {area.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {area.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-bone-dark p-6 shadow-subtle hover:border-brass/70 transition-all rounded-xs"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 size={18} className="text-brass shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-serif text-base sm:text-lg font-bold text-oxblood mb-1.5">
                            {service.title}
                          </h4>
                          <p className="text-xs text-charcoal/70 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Consultation Card */}
            <div className="bg-oxblood text-bone p-7 border-l-4 border-brass space-y-5 rounded-xs shadow-card">
              <div className="flex items-center space-x-2 text-brass">
                <Scale size={18} />
                <span className="text-[11px] uppercase tracking-wider font-bold">
                  Chamber Consultation
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Consult with Our Advocates
              </h4>
              <p className="text-xs text-bone/80 leading-relaxed">
                To schedule an appointment or seek counsel regarding {area.title}, contact our legal chambers.
              </p>

              <div className="space-y-2.5 text-xs text-bone/85 pt-2 border-t border-brass/20">
                {assignedAdvocate.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-brass" />
                    <a href={`tel:${assignedAdvocate.phone.replace(/\s+/g, '')}`} className="hover:text-brass transition-colors font-bold">
                      {assignedAdvocate.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-brass" />
                  <a href="mailto:justicealliencelaw@gmail.com" className="hover:text-brass transition-colors truncate">
                    justicealliencelaw@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/contact?area=${encodeURIComponent(area.title)}`}
                  className="block text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-brass text-charcoal hover:bg-brass-light transition-all rounded-xs"
                >
                  Schedule Appointment
                </Link>
              </div>
            </div>

            {/* Other Practice Areas Directory */}
            <div className="bg-white border border-bone-dark p-6 space-y-4 shadow-subtle rounded-xs">
              <h4 className="font-serif text-lg font-bold text-oxblood border-b border-bone-dark pb-2">
                Other Practice Disciplines
              </h4>
              <ul className="space-y-2 text-xs">
                {otherAreas.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/practice-areas/${item.slug}`}
                      className="text-charcoal/80 hover:text-oxblood hover:underline block py-1 font-medium"
                    >
                      &bull; {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
