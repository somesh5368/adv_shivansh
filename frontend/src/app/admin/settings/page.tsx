'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminSettingsPage() {
  const [disclaimerText, setDisclaimerText] = useState('');
  const [generalContact, setGeneralContact] = useState({
    phone: '',
    email: '',
    location: '',
    office_address: '',
    timings: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  useEffect(() => {
    adminApi
      .getSettings(token)
      .then((settings) => {
        const disc = settings.find((s) => s.setting_key === 'bar_council_disclaimer');
        if (disc && disc.setting_value?.statutory_text) {
          setDisclaimerText(disc.setting_value.statutory_text);
        }

        const contact = settings.find((s) => s.setting_key === 'general_contact');
        if (contact && contact.setting_value) {
          setGeneralContact({
            phone: contact.setting_value.phone || '',
            email: contact.setting_value.email || '',
            location: contact.setting_value.location || '',
            office_address: contact.setting_value.office_address || '',
            timings: contact.setting_value.timings || '',
          });
        }
      })
      .catch((err) => setMessage({ text: err.message, type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await Promise.all([
        adminApi.upsertSetting(
          token,
          'bar_council_disclaimer',
          { statutory_text: disclaimerText },
          true
        ),
        adminApi.upsertSetting(token, 'general_contact', generalContact, true),
      ]);
      setMessage({ text: 'Site settings persisted successfully.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Saving failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-xs text-charcoal/60">Loading settings...</div>;
  }

  return (
    <div>
      <AdminHeader
        title="Site Settings & Legal Disclaimers"
        description="Configure public notices, statutory Bar Council declarations, and office communication defaults."
      />

      <div className="p-4 sm:p-8 max-w-4xl">
        {message && (
          <div
            className={`mb-6 p-4 border text-xs flex items-center space-x-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="bg-white border border-ivory-dark p-5 sm:p-8 shadow-subtle space-y-8">
          {/* Statutory Bar Council Text */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              Statutory Bar Council Disclaimer Text
            </h3>
            <Textarea
              label="Mandatory Disclaimer *"
              rows={5}
              required
              value={disclaimerText}
              onChange={(e) => setDisclaimerText(e.target.value)}
            />
            <p className="text-[11px] text-charcoal/60">
              This statutory declaration is displayed on the website footer and dedicated disclaimer page to ensure strict compliance with Bar Council of India advertising restrictions.
            </p>
          </div>

          {/* Contact settings */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              General Contact Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Public Phone"
                value={generalContact.phone}
                onChange={(e) => setGeneralContact({ ...generalContact, phone: e.target.value })}
              />
              <Input
                label="Public Email"
                value={generalContact.email}
                onChange={(e) => setGeneralContact({ ...generalContact, email: e.target.value })}
              />
            </div>
            <Input
              label="Location Descriptor"
              value={generalContact.location}
              onChange={(e) => setGeneralContact({ ...generalContact, location: e.target.value })}
            />
            <Input
              label="Office Timings"
              value={generalContact.timings}
              onChange={(e) => setGeneralContact({ ...generalContact, timings: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t border-ivory-dark flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={saving}>
              <Save size={16} className="mr-2 text-gold" />
              <span>Save Settings</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
