'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { publicApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ShieldAlert, CheckCircle2, Send, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const searchParams = useSearchParams();
  const advocateParam = searchParams.get('advocate');
  const areaParam = searchParams.get('area');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    practiceArea: 'Civil Litigation',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (areaParam) {
      setFormData((prev) => ({
        ...prev,
        practiceArea: areaParam,
        subject: `[${areaParam}] Consultation Request`,
      }));
    } else if (advocateParam) {
      setFormData((prev) => ({
        ...prev,
        subject: `Consultation with ${advocateParam}`,
      }));
    }
  }, [advocateParam, areaParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const subjectLine = formData.subject.trim() || `[${formData.practiceArea}] General Consultation Request`;
      await publicApi.submitEnquiry({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: subjectLine,
        message: formData.message.trim(),
      });

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        practiceArea: 'Civil Litigation',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try reaching us directly by phone or email.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border-2 border-brass/60 p-8 sm:p-10 text-center space-y-4 rounded-xs shadow-card">
        <CheckCircle2 size={44} className="text-brass mx-auto" />
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood">
          Communication Transmitted
        </h3>
        <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed max-w-md mx-auto">
          Thank you. Your consultation request has been received by <strong>Justice Alliance Associates & Law Firm</strong>. Our partner advocates will review your brief and contact you to schedule your appointment.
        </p>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSuccess(false)}
            className="border-brass text-oxblood hover:bg-oxblood hover:text-brass"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white border border-bone-dark p-6 sm:p-9 shadow-card rounded-xs"
    >
      <div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-oxblood mb-1">
          Chamber Communication
        </h3>
        <p className="text-xs text-charcoal/70">
          Request a consultation with our partner advocates or transmit a non-confidential practice enquiry.
        </p>
      </div>

      <div className="bg-bone-light border-l-3 border-brass p-4 flex items-start space-x-3 text-[11px] text-charcoal/85 rounded-xs">
        <ShieldAlert size={18} className="text-brass shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          <strong>Confidentiality Notice:</strong> Please do not submit privileged case documents or sensitive evidence through this general web form. A formal advocate-client relationship is created upon formal consultation and vakalatnama execution.
        </span>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-red-50 border-l-3 border-red-600 text-red-800 text-xs flex items-center space-x-2 rounded-xs">
          <AlertCircle size={16} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
            Practice Discipline *
          </label>
          <select
            value={formData.practiceArea}
            onChange={(e) => setFormData({ ...formData, practiceArea: e.target.value })}
            className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
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
          Subject / Matter Reference
        </label>
        <input
          type="text"
          placeholder="e.g. Civil Property Title Dispute / Bail Petition"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full text-xs px-3.5 py-2.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs"
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-charcoal mb-1">
          General Nature of Legal Enquiry *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Briefly state the general nature of your dispute or advisory query (avoid sensitive personal secrets)..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full text-xs p-3.5 bg-bone-light border border-bone-dark text-charcoal focus:bg-white focus:border-brass focus:ring-1 focus:ring-brass outline-none rounded-xs leading-relaxed"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 bg-oxblood hover:bg-wine text-brass text-xs font-bold uppercase tracking-wider transition-all border border-brass shadow-md rounded-xs flex items-center justify-center space-x-2 disabled:opacity-60"
        >
          <Send size={13} className="text-brass" />
          <span>{loading ? 'Transmitting Enquiry...' : 'Transmit Communication'}</span>
        </button>
      </div>
    </form>
  );
}
