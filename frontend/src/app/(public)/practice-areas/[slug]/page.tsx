import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { ArrowLeft, CheckCircle2, Phone, Mail, Calendar } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const area = await publicApi.getPracticeAreaBySlug(params.slug).catch(() => null);
  if (!area) return { title: 'Practice Area Not Found' };

  return {
    title: `${area.title} | Advocate Shivansh Kumar Pandey`,
    description: area.short_description,
  };
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const [area, allAreas] = await Promise.all([
    publicApi.getPracticeAreaBySlug(params.slug).catch(() => null),
    publicApi.getPracticeAreas().catch(() => []),
  ]);

  if (!area) {
    notFound();
  }

  const otherAreas = allAreas.filter((a) => a.slug !== area.slug);

  return (
    <div className="py-16 space-y-16">
      {/* Breadcrumb & Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <Link
          href="/practice-areas"
          className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-charcoal/70 hover:text-navy transition-colors mb-6"
        >
          <ArrowLeft size={14} className="mr-1.5" />
          <span>Back to All Practice Areas</span>
        </Link>

        <div className="border-b border-ivory-dark pb-8 space-y-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Practice Area
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
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
            <div className="bg-white border border-ivory-dark p-8 shadow-subtle space-y-4">
              <h2 className="font-serif text-2xl font-bold text-navy border-b border-ivory-dark pb-3">
                Legal Scope & Procedural Approach
              </h2>
              <div className="text-xs sm:text-sm text-charcoal/85 leading-relaxed space-y-4">
                <p>{area.full_description}</p>
                <p>
                  Every legal proceeding in this domain is evaluated in accordance with substantive statutory laws and procedural mandates. Our chambers prioritize early factual investigation, thorough documentary verification, and well-reasoned advocacy.
                </p>
              </div>
            </div>

            {/* Sub-Services Breakdown */}
            {area.services && area.services.length > 0 && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold block mb-1">
                    Specific Legal Services
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-navy">
                    Matters Handled Under {area.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {area.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white border border-ivory-dark p-6 shadow-subtle hover:border-gold/60 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <CheckCircle2 size={18} className="text-gold shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-serif text-base font-bold text-navy mb-1.5">
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
            <div className="bg-navy text-white p-7 border-l-4 border-gold space-y-4">
              <h4 className="font-serif text-xl font-bold text-white">
                Chamber Consultation
              </h4>
              <p className="text-xs text-ivory/80 leading-relaxed">
                To schedule an appointment or seek guidance regarding matters related to {area.title}, contact our chambers.
              </p>
              <div className="space-y-2 text-xs text-ivory/80 pt-2 border-t border-navy-800">
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-gold" />
                  <a href="tel:+919198106052" className="hover:text-gold transition-colors">
                    +91 9198106052
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-gold" />
                  <a href="mailto:advshiv43@gmail.com" className="hover:text-gold transition-colors">
                    advshiv43@gmail.com
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

            {/* Other Practice Areas Directory */}
            <div className="bg-white border border-ivory-dark p-6 space-y-4 shadow-subtle">
              <h4 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
                Other Practice Disciplines
              </h4>
              <ul className="space-y-2 text-xs">
                {otherAreas.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/practice-areas/${item.slug}`}
                      className="text-charcoal/80 hover:text-navy hover:underline block py-1"
                    >
                      {item.title}
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
