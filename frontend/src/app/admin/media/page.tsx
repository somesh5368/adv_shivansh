'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Upload, Trash2, Copy, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function AdminMediaPage() {
  const [activeBucket, setActiveBucket] = useState<'site-assets' | 'profile-images' | 'article-images'>('site-assets');
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  const loadFiles = () => {
    setLoading(true);
    adminApi
      .getMediaFiles(token, activeBucket)
      .then((data) => setFiles(data || []))
      .catch((err) => setMessage({ text: err.message, type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFiles();
  }, [activeBucket]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      await adminApi.uploadMedia(token, file, activeBucket);
      setMessage({ text: `File "${file.name}" uploaded successfully to ${activeBucket}.`, type: 'success' });
      loadFiles();
    } catch (err: any) {
      setMessage({ text: err.message || 'Upload failed', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Permanently delete "${fileName}" from ${activeBucket}?`)) return;

    try {
      await adminApi.deleteMedia(token, activeBucket, fileName);
      setMessage({ text: `Deleted "${fileName}".`, type: 'success' });
      loadFiles();
    } catch (err: any) {
      setMessage({ text: err.message || 'Delete failed', type: 'error' });
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedPath(url);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  return (
    <div>
      <AdminHeader
        title="Supabase Storage Media Manager"
        description="Direct repository asset management for profile photographs, website banners, and article attachments."
        actions={
          <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-navy-800 transition-colors">
            <Upload size={14} className="mr-1.5 text-gold" />
            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        }
      />

      <div className="p-4 sm:p-8 space-y-6">
        {message && (
          <div
            className={`p-4 border text-xs flex items-center space-x-2 ${
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

        {/* Bucket Navigation Tabs */}
        <div className="flex border-b border-ivory-dark space-x-2">
          {(['site-assets', 'profile-images', 'article-images'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setActiveBucket(b)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                activeBucket === b
                  ? 'border-gold text-navy font-bold'
                  : 'border-transparent text-charcoal/60 hover:text-navy'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        {loading ? (
          <div className="p-12 text-center text-xs text-charcoal/50">
            Scanning storage bucket...
          </div>
        ) : files.length === 0 ? (
          <div className="bg-white border border-ivory-dark p-12 text-center space-y-3">
            <ImageIcon size={36} className="text-charcoal/30 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-navy">
              No files in {activeBucket}
            </h3>
            <p className="text-xs text-charcoal/60">
              Upload images directly to this bucket using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file) => (
              <div
                key={file.name || file.id}
                className="bg-white border border-ivory-dark shadow-subtle flex flex-col justify-between overflow-hidden group hover:border-gold/60 transition-colors"
              >
                <div className="h-40 bg-ivory flex items-center justify-center overflow-hidden border-b border-ivory-dark">
                  <img
                    src={file.publicUrl || `/assets/images/${file.name}`}
                    alt={file.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as any).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="1"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                    }}
                  />
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs font-semibold text-navy truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-[10px] text-charcoal/60 font-mono">
                    Size: {file.metadata?.size ? `${(file.metadata.size / 1024).toFixed(1)} KB` : 'N/A'}
                  </p>

                  <div className="pt-2 flex items-center justify-between border-t border-ivory-dark text-xs">
                    <button
                      onClick={() => handleCopy(file.publicUrl || file.name)}
                      className="inline-flex items-center text-[11px] text-navy hover:text-gold transition-colors font-medium"
                      title="Copy Public URL"
                    >
                      <Copy size={12} className="mr-1" />
                      <span>{copiedPath === (file.publicUrl || file.name) ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    <button
                      onClick={() => handleDelete(file.name)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Delete Image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
