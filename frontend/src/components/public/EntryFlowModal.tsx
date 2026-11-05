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
    // Show BCI Statutory Disclaimer & Consultation flow on website open
    const timer = setTimeout(() => {
      setStep('disclaimer');
    }, 400);

    const handleOpenModal = () => setStep('disclaimer');
    window.addEventListener('open-entry-modal', handleOpenModal);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('open-entry-modal', handleOpenModal);
    };
  }, []);

  const handleAgreeDisclaimer = () => {
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
    if (formData.message.trim().length < 8) {
      setErrorMsg('Please provide a brief description of your matter.');
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
      }, 2400);
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
      className="fixed inset-0 z-50 bg-charcoal-dark/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
    >
      {/* ------------------------------------------------------------- */}
      {/* STEP 1: MANDATORY BCI STATUTORY DISCLAIMER                    */}
      {/* ------------------------------------------------------------- */}
      {step === 'disclaimer' && (
        <div className="w-full max-w-2xl bg-white dark:bg-[#121824] border-2 border-brass/50 shadow-modal overflow-hidden animate-fade-in-up my-auto rounded-xs">
          {/* Header */}
          <div className="bg-oxblood dark:bg-[#4a0a16] text-white p-5 sm:p-6 flex items-center space-x-4 border-b border-brass/30">
            <div className="p-2.5 bg-oxblood-dark border border-brass/40 rounded-xs shrink-0">
              <ScalesEmblem size={30} className="text-brass" glow />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-brass font-bold block">
                Statutory Compliance
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white leading-tight">
                Bar Council of India Disclaimer
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-8 space-y-4 text-xs sm:text-[13px] leading-relaxed text-charcoal/85 dark:text-bone/85 max-h-[60vh] overflow-y-auto">
            <div className="bg-bone-light dark:bg-[#0c1018] p-3.5 border-l-4 border-brass text-charcoal dark:text-bone font-medium text-xs leading-normal rounded-xs">
              Under the rules formulated by the Bar Council of India (Part VI, Chapter II, Rule 36), advocates and legal practitioners are strictly prohibited from soliciting work, advertising, or canvassing in any form, public or private.
            </div>

            <p>
              By accessing and clicking <strong>&quot;I Agree &amp; Proceed&quot;</strong>, the visitor expressly confirms, acknowledges, and undertakes the following:
            </p>

            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start space-x-2">
                <span className="text-brass font-bold">&bull;</span>
                <span>
                  The user seeks information relating to <strong>Justice Alliance Associates &amp; Law Firm</strong> and its practicing advocates entirely of their own volition, voluntarily, and without any solicitation, advertisement, or inducement.
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-brass font-bold">&bull;</span>
                <span>
                  The material published on this website is intended solely for general informational and educational purposes. It does not constitute formal legal counsel, statutory opinion, or advocate-client engagement.
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
          <div className="bg-bone dark:bg-[#0c1018] p-4 sm:p-5 border-t border-bone-dark dark:border-[#222c3d] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-charcoal/60 dark:text-bone/60 text-center sm:text-left font-medium">
              Statutory compliance undertaking
            </span>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleAgreeDisclaimer}
                className="w-full sm:w-auto px-6 py-2.5 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md flex items-center justify-center space-x-2 rounded-xs"
              >
                <span>I Agree &amp; Proceed</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 2: IMMEDIATE ENQUIRY MODAL                               */}
      {/* ------------------------------------------------------------- */}
      {step === 'enquiry' && (
        <div className="w-full max-w-xl bg-white dark:bg-[#121824] border-2 border-brass/50 shadow-modal overflow-hidden animate-fade-in-up my-auto relative rounded-xs">
          {/* Close / Skip button */}
          <button
            onClick={handleSkipEnquiry}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full z-10 transition-colors"
            aria-label="Skip and view website"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="bg-oxblood dark:bg-[#4a0a16] text-white p-5 sm:p-6 border-b border-brass/30">
            <div className="flex items-center space-x-3">
              <ScalesEmblem size={26} className="text-brass" />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-brass font-bold block">
                  Justice Alliance Associates
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white">
                  Schedule Confidential Consultation
                </h2>
              </div>
            </div>
            <p className="text-xs text-bone/80 mt-2 leading-relaxed">
              Connect directly with our partner advocates across Civil, Criminal, Cyber, Family, and Taxation litigation.
            </p>
          </div>

          {/* Form or Success View */}
          {submitted ? (
            <div className="p-8 text-center space-y-4 bg-bone-light dark:bg-[#0c1018]">
              <CheckCircle2 size={44} className="text-brass mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-oxblood dark:text-white">
                Enquiry Dispatched
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 dark:text-bone/80 max-w-md mx-auto leading-relaxed">
                Thank you. Your request has been transmitted directly to <strong>Justice Alliance Associates &amp; Law Firm</strong>. Our partner advocates will review your brief and contact you shortly.
              </p>
              <button
                type="button"
                onClick={handleSkipEnquiry}
                className="mt-2 px-6 py-2.5 bg-oxblood text-brass text-xs font-bold uppercase tracking-wider border border-brass rounded-xs"
              >
                Enter Website Now
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitEnquiry} className="p-5 sm:p-7 space-y-4 bg-white dark:bg-[#121824]">
              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-950/40 border-l-3 border-red-600 text-red-800 dark:text-red-300 text-xs flex items-center space-x-2 rounded-xs">
                  <AlertCircle size={16} className="shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal dark:text-brass mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-bone-light dark:bg-[#0c1018] border border-bone-dark dark:border-[#222c3d] text-charcoal dark:text-bone focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal dark:text-brass mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-bone-light dark:bg-[#0c1018] border border-bone-dark dark:border-[#222c3d] text-charcoal dark:text-bone focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal dark:text-brass mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-bone-light dark:bg-[#0c1018] border border-bone-dark dark:border-[#222c3d] text-charcoal dark:text-bone focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal dark:text-brass mb-1">
                    Practice Discipline *
                  </label>
                  <select
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
                    className="w-full text-xs px-3 py-2.5 bg-bone-light dark:bg-[#0c1018] border border-bone-dark dark:border-[#222c3d] text-charcoal dark:text-bone focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                  >
                    <option value="Civil Litigation">Civil Litigation</option>
                    <option value="Criminal Law">Criminal Law</option>
                    <option value="Cyber Crime & IT Law">Cyber Crime &amp; IT Law</option>
                    <option value="Family & Matrimonial Law">Family &amp; Matrimonial Law</option>
                    <option value="Taxation & GST">Taxation &amp; GST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal dark:text-brass mb-1">
                  Brief Nature of Dispute / Enquiry *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summarize the nature of your dispute or legal requirement..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs p-3 bg-bone-light dark:bg-[#0c1018] border border-bone-dark dark:border-[#222c3d] text-charcoal dark:text-bone focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-bone-dark dark:border-[#222c3d]">
                <button
                  type="button"
                  onClick={handleSkipEnquiry}
                  className="w-full sm:w-auto text-xs text-charcoal/60 dark:text-bone/60 hover:text-oxblood dark:hover:text-brass underline uppercase tracking-wider font-semibold py-2"
                >
                  Skip &bull; View Website
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md flex items-center justify-center space-x-2 disabled:opacity-60 rounded-xs"
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
