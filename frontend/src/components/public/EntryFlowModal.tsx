'use client';

import React, { useState, useEffect } from 'react';
import { ScalesEmblem } from './ScalesEmblem';
import { publicApi } from '@/lib/api';
import { ShieldAlert, Send, CheckCircle2, AlertCircle, X, ArrowRight } from 'lucide-react';

export function EntryFlowModal() {
  const [step, setStep] = useState<'loading' | 'disclaimer' | 'enquiry' | 'closed'>('loading');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    practiceArea: 'Civil Litigation',
    message: '',
  });

  useEffect(() => {
    try {
      const agreed = sessionStorage.getItem('justice_alliance_disclaimer_agreed');
      if (agreed === 'true') {
        setStep('closed');
      } else {
        setStep('disclaimer');
      }
    } catch {
      // In case sessionStorage is blocked (strict incognito / private mode)
      setStep('disclaimer');
    }
  }, []);

  const handleAgreeDisclaimer = () => {
    try {
      sessionStorage.setItem('justice_alliance_disclaimer_agreed', 'true');
    } catch {
      // safe fallback
    }
    setStep('enquiry');
  };

  const handleSkipEnquiry = () => {
    setStep('closed');
  };

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (formData.fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (formData.phone.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (formData.message.trim().length < 10) {
      setErrorMsg('Please provide a brief description (at least 10 characters).');
      return;
    }

    setSubmitting(true);
    try {
      await publicApi.submitEnquiry({
        full_name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: `[${formData.practiceArea}] Initial Web Consultation Request`,
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setTimeout(() => {
        setStep('closed');
      }, 2200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit enquiry at this time. You may proceed to view the website.');
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 'loading' || step === 'closed') {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-charcoal-dark/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      {/* ------------------------------------------------------------- */}
      {/* STEP 1: MANDATORY BCI STATUTORY DISCLAIMER                    */}
      {/* ------------------------------------------------------------- */}
      {step === 'disclaimer' && (
        <div className="w-full max-w-2xl bg-white border-2 border-brass/40 shadow-modal overflow-hidden animate-fade-in my-auto">
          {/* Header */}
          <div className="bg-oxblood text-bone p-5 sm:p-6 flex items-center space-x-4 border-b border-brass/30">
            <div className="p-2.5 bg-oxblood-dark border border-brass/40 rounded-xs shrink-0">
              <ScalesEmblem size={32} glow />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-editorial text-brass uppercase block">
                Statutory Compliance
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white leading-tight">
                Bar Council of India Disclaimer
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 space-y-4 text-xs sm:text-[13px] leading-relaxed text-charcoal/85 max-h-[60vh] overflow-y-auto">
            <div className="bg-bone-light p-3.5 border-l-3 border-brass text-charcoal font-medium text-xs leading-normal">
              Under the rules formulated by the Bar Council of India (Part VI, Chapter II, Rule 36), advocates and legal practitioners are strictly prohibited from soliciting work, advertising, or canvassing in any form, public or private.
            </div>

            <p>
              By accessing and clicking <strong>&quot;I AGREE & ENTER&quot;</strong>, the visitor expressly confirms, acknowledges, and undertakes the following:
            </p>

            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start space-x-2">
                <span className="text-brass font-bold">&bull;</span>
                <span>
                  The user seeks information relating to <strong>Justice Alliance Associates & Law Firm</strong> and its practicing advocates entirely of their own volition, voluntarily, and without any solicitation, advertisement, or inducement.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brass font-bold">&bull;</span>
                <span>
                  The material published on this website is intended solely for general informational and educational purposes. It does not constitute formal legal counsel, statutory opinion, or solicitation.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brass font-bold">&bull;</span>
                <span>
                  Neither receipt nor transmission of information via this website establishes an advocate-client relationship. Visitors facing specific legal disputes must seek independent legal counsel.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brass font-bold">&bull;</span>
                <span>
                  The firm disclaims any liability for consequences arising from actions taken or omitted based on contents herein.
                </span>
              </li>
            </ul>
          </div>

          {/* Footer Actions */}
          <div className="bg-bone p-4 sm:p-5 border-t border-bone-dark flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-charcoal/60 font-mono text-center sm:text-left">
              Session compliance token retained
            </span>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAgreeDisclaimer}
                className="w-full sm:w-auto px-6 py-2.5 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md flex items-center justify-center space-x-2"
              >
                <span>I Agree & Proceed</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 2: IMMEDIATE ENQUIRE NOW MODAL                           */}
      {/* ------------------------------------------------------------- */}
      {step === 'enquiry' && (
        <div className="w-full max-w-xl bg-white border-2 border-brass/50 shadow-modal overflow-hidden animate-fade-in my-auto relative">
          {/* Close / Skip button */}
          <button
            onClick={handleSkipEnquiry}
            className="absolute top-4 right-4 text-bone/80 hover:text-white p-1 rounded-full z-10 transition-colors"
            aria-label="Skip and view website"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="bg-oxblood text-bone p-5 sm:p-6 border-b border-brass/30">
            <div className="flex items-center space-x-3">
              <ScalesEmblem size={26} className="text-brass" />
              <div>
                <span className="text-[10px] font-mono tracking-editorial text-brass uppercase block">
                  Justice Alliance Associates
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
                  Schedule Confidential Consultation
                </h2>
              </div>
            </div>
            <p className="text-xs text-bone/75 mt-2 leading-relaxed">
              Connect with our partner advocates across Civil, Criminal, Cyber, Family, and Taxation litigation.
            </p>
          </div>

          {/* Form or Success View */}
          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-bone-light">
              <CheckCircle2 size={44} className="text-brass mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-oxblood">
                Enquiry Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed">
                Thank you. Your request has been transmitted directly to <strong>Justice Alliance Associates & Law Firm</strong>. Our partner advocates will review your brief and contact you shortly.
              </p>
              <button
                type="button"
                onClick={handleSkipEnquiry}
                className="mt-2 px-5 py-2 bg-oxblood text-brass text-xs font-bold uppercase tracking-wider border border-brass"
              >
                Enter Website Now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitEnquiry} className="p-5 sm:p-7 space-y-4 bg-white">
              {errorMsg && (
                <div className="p-3 bg-red-50 border-l-3 border-red-600 text-red-800 text-xs flex items-center space-x-2">
                  <AlertCircle size={16} className="shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                    Practice Discipline *
                  </label>
                  <select
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                    className="w-full text-xs px-3 py-2 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none"
                  >
                    <option value="Civil Litigation">Civil Litigation</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Cyber Crime & IT Law">Cyber Crime & IT Law</option>
                    <option value="Family & Matrimonial Law">Family & Matrimonial Law</option>
                    <option value="Taxation & GST">Taxation & GST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
                  Brief Nature of Enquiry *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summarize the nature of your legal dispute (avoid sharing confidential case secrets)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-bone-dark">
                <button
                  type="button"
                  onClick={handleSkipEnquiry}
                  className="w-full sm:w-auto text-xs text-charcoal/60 hover:text-oxblood underline uppercase tracking-wider font-semibold py-2"
                >
                  Skip, View Website
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md flex items-center justify-center space-x-2 disabled:opacity-60"
                >
                  <Send size={13} className="text-brass" />
                  <span>{submitting ? 'Transmitting...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

