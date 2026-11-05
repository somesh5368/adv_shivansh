import React from 'react';
import type { Metadata } from 'next';
import { publicApi } from '@/lib/api';
import { ContactForm } from '@/components/public/ContactForm';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chambers & Contact | Advocate Shivansh Kumar Pandey',
  description:
    'Chamber location, appointment consultation details, and verified contact information for Advocate Shivansh Kumar Pandey at Civil Court, Gorakhpur.',
};

export default async function ContactPage() {
  const profile = await publicApi.getProfile().catch(() => null);

  return (
    <div className="py-16 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="border-b border-ivory-dark pb-10 space-y-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Chamber Contact
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-navy">
            Chambers & Consultations
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            In-person chamber consultations are conducted at the Civil Court Campus, Gorakhpur by appointment. Please review our consultation guidelines or transmit a communication to our administrative office.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy text-white p-8 border-l-4 border-gold shadow-subtle space-y-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold block mb-1">
                  Chambers Address
                </span>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Civil Court Campus, Gorakhpur
                </h3>
                <p className="text-xs text-ivory/80 leading-relaxed">
                  {profile?.office_address || 'Chamber No. [Pending Client Verification], Civil Court Campus, Gorakhpur, Uttar Pradesh - 273001, India'}
                </p>
              </div>

              <div className="border-t border-navy-800 pt-5 space-y-4 text-xs text-ivory/80">
                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-gold shrink-0" />
                  <div>
                    <span className="text-[11px] text-ivory/60 block">Direct Telephone</span>
                    <a href={`tel:${profile?.phone || '+919198106052'}`} className="hover:text-gold font-medium">
                      {profile?.phone || '+91 9198106052'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-gold shrink-0" />
                  <div>
                    <span className="text-[11px] text-ivory/60 block">Official Email</span>
                    <a href={`mailto:${profile?.email || 'advshiv43@gmail.com'}`} className="hover:text-gold font-medium">
                      {profile?.email || 'advshiv43@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock size={16} className="text-gold shrink-0" />
                  <div>
                    <span className="text-[11px] text-ivory/60 block">Chambers Timings</span>
                    <span>{profile?.office_timings || 'Mon – Sat: 10:00 AM – 5:00 PM (By Appointment)'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Consultation Protocols */}
            <div className="bg-white border border-ivory-dark p-7 space-y-4 shadow-subtle">
              <h4 className="font-serif text-lg font-bold text-navy flex items-center space-x-2">
                <ShieldCheck className="text-gold" size={20} />
                <span>Consultation Guidelines</span>
              </h4>
              <ul className="text-xs text-charcoal/75 space-y-2.5 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-1.5 mt-1.5 shrink-0" />
                  <span>Prior appointment booking is mandatory to ensure adequate review time for ongoing court fixtures.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-1.5 mt-1.5 shrink-0" />
                  <span>Please bring photocopies of relevant dispute notices, court summons, or conveyance deeds.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full mr-1.5 mt-1.5 shrink-0" />
                  <span>Legal advice is provided strictly across Civil, Family, Taxation, Corporate, and Labour law jurisdictions.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Communication Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
