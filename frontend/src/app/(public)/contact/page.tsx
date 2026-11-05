import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Scale, ExternalLink, Loader2 } from 'lucide-react';
import { FIRM_ADVOCATES } from '@/lib/advocatesData';

export const metadata: Metadata = {
  title: 'Chambers & Contact | Justice Alliance Associates & Law Firm',
  description:
    'Chamber location, partner advocate direct lines, and consultation appointment booking for Justice Alliance Associates & Law Firm at Civil Court Campus, Gorakhpur.',
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-bone-dark pb-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-oxblood/10 border border-brass/40 text-oxblood text-xs font-semibold uppercase tracking-wider rounded-xs">
            <Scale size={12} className="text-brass" />
            <span>Chambers Directory</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-oxblood">
            Chambers & Consultations
          </h1>

          <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed">
            In-person chamber consultations are conducted at the Civil Court Campus, Gorakhpur by prior appointment. You may transmit a communication using the consultation form or contact our partner advocates directly.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Partner Contacts */}
          <div className="lg:col-span-5 space-y-8">
            {/* Main Chambers Box */}
            <div className="bg-oxblood text-bone p-7 sm:p-8 border-l-4 border-brass shadow-modal rounded-xs space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-brass block mb-1 font-bold">
                  Chambers Address
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Civil Court Campus, Gorakhpur
                </h3>
                <p className="text-xs text-bone/80 leading-relaxed">
                  Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001, India
                </p>
              </div>

              <div className="border-t border-brass/25 pt-5 space-y-4 text-xs text-bone/85">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-brass shrink-0" />
                  <div>
                    <span className="text-[10px] text-bone/60 block uppercase">Firm Official Email</span>
                    <a href="mailto:justicealliencelaw@gmail.com" className="hover:text-brass transition-colors font-bold">
                      justicealliencelaw@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock size={16} className="text-brass shrink-0" />
                  <div>
                    <span className="text-[10px] text-bone/60 block uppercase">Chamber Hours</span>
                    <span>Mon – Sat: 10:00 AM – 5:00 PM (By Appointment)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Partner Advocates Directory (Exact Required Order) */}
            <div className="bg-white border border-bone-dark p-6 sm:p-7 shadow-subtle rounded-xs space-y-4">
              <div className="border-b border-bone-dark pb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brass block">
                  Direct Partner Access
                </span>
                <h4 className="font-serif text-xl font-bold text-oxblood">
                  Partner Advocates
                </h4>
              </div>

              <div className="space-y-4 divide-y divide-bone-dark">
                {FIRM_ADVOCATES.map((adv) => (
                  <div key={adv.id} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-base font-bold text-charcoal">
                        {adv.name}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 bg-oxblood/10 text-oxblood uppercase font-bold rounded-xs border border-brass/30">
                        Partner
                      </span>
                    </div>
                    <p className="text-xs text-oxblood font-semibold">
                      {adv.specialization}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs text-charcoal/70 pt-1 font-medium">
                      {adv.phone && (
                        <a
                          href={`tel:${adv.phone.replace(/\s+/g, '')}`}
                          className="hover:text-oxblood font-bold flex items-center space-x-1"
                        >
                          <Phone size={12} className="text-brass" />
                          <span>{adv.phone}</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${adv.email}`}
                        className="hover:text-oxblood flex items-center space-x-1 truncate"
                      >
                        <Mail size={12} className="text-brass" />
                        <span>{adv.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div className="bg-white border border-bone-dark overflow-hidden rounded-xs shadow-subtle">
              <div className="p-4 bg-bone-light border-b border-bone-dark flex items-center justify-between">
                <span className="text-xs font-serif font-bold text-oxblood flex items-center space-x-1.5">
                  <MapPin size={14} className="text-brass" />
                  <span>Civil Court Campus, Gorakhpur Location</span>
                </span>
                <a
                  href="https://maps.google.com/?q=Civil+Court+Gorakhpur+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold uppercase tracking-wider text-brass hover:underline flex items-center space-x-1"
                >
                  <span>Open Maps</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <div className="relative w-full h-64 bg-bone">
                <iframe
                  title="Chambers Location Map - Civil Court Campus Gorakhpur"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.915830985202!2d83.37123937554869!3d26.757041476740033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991443419996d9d%3A0x86fbfb41a29f8f4a!2sCivil%20Court%20Gorakhpur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Communication Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 text-center bg-white border border-bone-dark text-xs text-charcoal/70 flex items-center justify-center space-x-2 rounded-xs">
                  <Loader2 size={16} className="animate-spin text-brass" />
                  <span>Loading Chamber Consultation Form...</span>
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
