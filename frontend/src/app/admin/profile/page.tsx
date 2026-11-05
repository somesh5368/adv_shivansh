'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { AdvocateProfile } from '@/types';
import { CheckCircle2, AlertCircle, Save, Upload } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Partial<AdvocateProfile>>({
    full_name: '',
    designation: '',
    tagline: '',
    biography: '',
    qualifications: '',
    enrolment_number: '',
    enrolment_council: '',
    email: '',
    phone: '',
    office_address: '',
    office_timings: '',
    image_path: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';
    adminApi
      .getProfile(token)
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch((err) => setMessage({ text: err.message, type: 'error' }))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';
    try {
      const updated = await adminApi.updateProfile(token, profile);
      setProfile(updated);
      setMessage({ text: 'Advocate profile updated successfully. Public portal updated.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to update profile.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';
    try {
      const res = await adminApi.uploadMedia(token, file, 'profile-images');
      setProfile({ ...profile, image_path: res.publicUrl });
      setMessage({ text: 'Profile photograph uploaded successfully. Remember to save changes.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Failed to upload photograph.', type: 'error' });
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-charcoal/60">
        Loading profile data...
      </div>
    );
  }

  return (
    <div>
      <AdminHeader
        title="Advocate Profile Management"
        description="Edit verified credentials, professional biography, Bar Council enrolment details, and contact coordinates."
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
          {/* Identity Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              Identity & Practice Designation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                required
                value={profile.full_name || ''}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              />
              <Input
                label="Designation *"
                required
                value={profile.designation || ''}
                onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
              />
            </div>
            <Input
              label="Professional Tagline *"
              required
              value={profile.tagline || ''}
              onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            />
          </div>

          {/* Bar Credentials Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              Bar Council Affiliation & Qualifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Bar Council *"
                value={profile.enrolment_council || ''}
                onChange={(e) => setProfile({ ...profile, enrolment_council: e.target.value })}
              />
              <Input
                label="Bar Enrolment Number"
                value={profile.enrolment_number || ''}
                onChange={(e) => setProfile({ ...profile, enrolment_number: e.target.value })}
                placeholder="[Pending Client Verification]"
              />
            </div>
            <Input
              label="Qualifications *"
              value={profile.qualifications || ''}
              onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
              placeholder="e.g. LL.B., B.Com."
            />
          </div>

          {/* Biography Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              Professional Biography
            </h3>
            <Textarea
              label="Biography Statement *"
              rows={5}
              required
              value={profile.biography || ''}
              onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              Verified Office Coordinates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Official Email *"
                type="email"
                required
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
              <Input
                label="Telephone / Mobile *"
                required
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <Input
              label="Chambers Address *"
              required
              value={profile.office_address || ''}
              onChange={(e) => setProfile({ ...profile, office_address: e.target.value })}
            />
            <Input
              label="Chamber Timings"
              value={profile.office_timings || ''}
              onChange={(e) => setProfile({ ...profile, office_timings: e.target.value })}
            />
          </div>

          {/* Profile Photograph */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
              Profile Photograph
            </h3>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-ivory border border-ivory-dark flex items-center justify-center overflow-hidden">
                {profile.image_path ? (
                  <img src={profile.image_path} alt="Advocate" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-charcoal/50 uppercase">No Photo</span>
                )}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-navy text-xs uppercase tracking-wider font-semibold text-navy hover:bg-navy hover:text-white transition-colors">
                  <Upload size={14} className="mr-1.5" />
                  <span>Upload Photograph</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <p className="text-[11px] text-charcoal/60 mt-1">
                  Accepts JPEG, PNG, WebP up to 5MB. Uploads directly to Supabase Storage.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-dark flex justify-end">
            <Button type="submit" variant="primary" size="md" isLoading={saving}>
              <Save size={16} className="mr-2 text-gold" />
              <span>Save & Publish Changes</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
