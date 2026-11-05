import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ShieldAlert } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const practiceLinks = [
    { label: 'Civil Litigation', href: '/practice-areas/civil-litigation' },
    { label: 'Family & Matrimonial Law', href: '/practice-areas/family-law' },
    { label: 'Taxation & GST Advisory', href: '/practice-areas/taxation-gst' },
    { label: 'Business & Company Registration', href: '/practice-areas/business-registration' },
    { label: 'ESI & Labour Welfare Compliance', href: '/practice-areas/esi-labour-welfare' },
    { label: 'Trademark & Intellectual Property', href: '/practice-areas/trademark-ipr' },
    { label: 'Government-Sponsored Schemes', href: '/practice-areas/government-schemes' },
  ];

  return (
    <footer className="bg-navy text-ivory border-t-2 border-gold mt-auto">
      {/* Statutory Bar Council Banner */}
      <div className="bg-navy-900 border-b border-navy-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-start space-x-4">
          <ShieldAlert className="text-gold shrink-0 mt-0.5" size={20} />
          <div className="text-xs text-ivory/70 leading-relaxed">
            <span className="font-semibold text-ivory uppercase tracking-wider block mb-1">
              Bar Council of India Compliance Notice:
            </span>
            As per the rules framed by the Bar Council of India under the Advocates Act, 1961, advocates are prohibited from soliciting work or advertising in any manner. This website is hosted solely for providing educational and informational resources at the voluntary request of the user. Nothing on this website should be construed as legal advice or creating an advocate-client relationship.
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Advocate Info */}
        <div className="space-y-4">
          <div>
            <h4 className="font-serif text-xl font-bold tracking-wider text-white">
              SHIVANSH KUMAR PANDEY
            </h4>
            <p className="text-xs font-sans uppercase tracking-widest text-gold mt-1 font-medium">
              Advocate
            </p>
          </div>
          <p className="text-xs text-ivory/75 leading-relaxed">
            Dedicated legal practice serving clients across civil disputes, matrimonial matters, statutory taxation, business incorporations, and regulatory compliances at the Civil Court, Gorakhpur.
          </p>
          <div className="pt-2 text-xs text-gold">
            <span>Bar Council of Uttar Pradesh</span>
          </div>
        </div>

        {/* Column 2: Areas of Practice */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-widest text-gold mb-4 border-b border-navy-800 pb-2">
            Practice Areas
          </h5>
          <ul className="space-y-2 text-xs text-ivory/80">
            {practiceLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-gold transition-colors block py-0.5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Navigation & Resources */}
        <div>
          <h5 className="text-xs font-semibold uppercase tracking-widest text-gold mb-4 border-b border-navy-800 pb-2">
            Practice & Resources
          </h5>
          <ul className="space-y-2 text-xs text-ivory/80">
            <li>
              <Link href="/about" className="hover:text-gold transition-colors block py-0.5">
                Advocate Profile & Credentials
              </Link>
            </li>
            <li>
              <Link href="/practice-areas" className="hover:text-gold transition-colors block py-0.5">
                Overview of Legal Disciplines
              </Link>
            </li>
            <li>
              <Link href="/resources" className="hover:text-gold transition-colors block py-0.5">
                Legal Explainers & Articles
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold transition-colors block py-0.5">
                Office Directions & Consultation
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-gold transition-colors block py-0.5">
                Legal Disclaimer & Privacy
              </Link>
            </li>
            <li>
              <Link href="/admin/login" className="hover:text-gold transition-colors block py-0.5 text-ivory/60 font-mono">
                Admin Secure Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Chambers & Verification */}
        <div className="space-y-3">
          <h5 className="text-xs font-semibold uppercase tracking-widest text-gold mb-4 border-b border-navy-800 pb-2">
            Office & Contact
          </h5>
          <div className="space-y-3 text-xs text-ivory/80">
            <div className="flex items-start space-x-2.5">
              <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
              <span>
                Chamber [Verification Pending], Civil Court Campus, Gorakhpur, Uttar Pradesh – 273001, India
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <Phone size={16} className="text-gold shrink-0" />
              <a href="tel:+919198106052" className="hover:text-gold transition-colors">
                +91 9198106052
              </a>
            </div>
            <div className="flex items-center space-x-2.5">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:advshiv43@gmail.com" className="hover:text-gold transition-colors">
                advshiv43@gmail.com
              </a>
            </div>
          </div>
          <div className="pt-2 text-[11px] text-ivory/60">
            Office Hours: Mon – Sat: 10:00 AM – 5:00 PM (By Appointment Only)
          </div>
        </div>
      </div>

      {/* Copyright Sub-footer */}
      <div className="border-t border-navy-800 py-6 px-4 sm:px-8 text-center text-xs text-ivory/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {currentYear} Shivansh Kumar Pandey, Advocate. All rights reserved.
          </p>
          <div className="flex space-x-6 text-[11px]">
            <Link href="/disclaimer" className="hover:text-gold transition-colors">
              Disclaimer
            </Link>
            <Link href="/contact" className="hover:text-gold transition-colors">
              Chambers
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

