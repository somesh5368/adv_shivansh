'use client';

import React, { useState } from 'react';
import { publicApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      await publicApi.submitEnquiry({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit enquiry. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-ivory border border-gold/40 p-8 text-center space-y-4">
        <CheckCircle2 size={40} className="text-gold mx-auto" />
        <h3 className="font-serif text-2xl font-bold text-navy">
          Communication Received
        </h3>
        <p className="text-xs text-charcoal/80 leading-relaxed max-w-md mx-auto">
          Thank you for reaching out to the chambers of Advocate Shivansh Kumar Pandey. Our administrative office will review your enquiry and contact you for scheduling an appointment.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSuccess(false)}
          className="mt-2"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-ivory-dark p-5 sm:p-8 shadow-subtle">
      <div>
        <h3 className="font-serif text-2xl font-bold text-navy mb-1">
          Chamber Communication
        </h3>
        <p className="text-xs text-charcoal/70">
          Request an appointment or submit a non-confidential practice enquiry.
        </p>
      </div>

      <div className="bg-ivory-light border-l-2 border-gold p-3.5 flex items-start space-x-2.5 text-[11px] text-charcoal/80">
        <ShieldAlert size={16} className="text-gold shrink-0 mt-0.5" />
        <span>
          <strong>Confidentiality Notice:</strong> Please do not submit confidential evidentiary materials or privileged case documents through this general web form. A formal advocate-client relationship is created only upon formal consultation and vakalatnama execution.
        </span>
      </div>

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          required
          placeholder="e.g. Anand Srivastava"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
        <Input
          label="Phone Number *"
          type="tel"
          required
          placeholder="e.g. +91 9876543210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email Address *"
          type="email"
          required
          placeholder="e.g. anand@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          label="Subject / Practice Area *"
          required
          placeholder="e.g. Civil Property Title Query"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>

      <Textarea
        label="General Nature of Legal Enquiry *"
        required
        rows={4}
        placeholder="Briefly state the general nature of your enquiry (avoid sensitive personal secrets)..."
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={loading}
          className="w-full sm:w-auto"
        >
          Transmit Communication
        </Button>
      </div>
    </form>
  );
}
