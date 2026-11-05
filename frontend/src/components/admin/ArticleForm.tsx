'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Article } from '@/types';
import {
  Save,
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  Eye,
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  Quote,
} from 'lucide-react';

interface ArticleFormProps {
  initialData?: Article;
}

export function ArticleForm({ initialData }: ArticleFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<Article>>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || 'Civil Litigation',
    status: initialData?.status || 'draft',
    meta_title: initialData?.meta_title || '',
    meta_description: initialData?.meta_description || '',
    cover_image_path: initialData?.cover_image_path || '',
  });

  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  const categories = [
    'Civil Litigation',
    'Family Law',
    'Taxation & GST',
    'Business Registration',
    'ESI & Labour Welfare',
    'Trademark & Intellectual Property',
    'Government-Sponsored Schemes',
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = initialData
      ? formData.slug
      : title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, title, slug, meta_title: title });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await adminApi.uploadMedia(token, file, 'article-images');
      setFormData({ ...formData, cover_image_path: res.publicUrl });
      setMessage({ text: 'Cover image uploaded successfully.', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err.message || 'Image upload failed', type: 'error' });
    }
  };

  const insertTag = (openTag: string, closeTag: string) => {
    const textarea = document.getElementById('article-content') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = formData.content || '';
    const selected = current.substring(start, end) || 'Text';

    const updated = current.substring(0, start) + openTag + selected + closeTag + current.substring(end);
    setFormData({ ...formData, content: updated });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (initialData?.id) {
        await adminApi.updateArticle(token, initialData.id, formData);
        setMessage({ text: 'Article updated successfully.', type: 'success' });
      } else {
        await adminApi.createArticle(token, formData);
        setMessage({ text: 'Article created successfully.', type: 'success' });
        router.push('/admin/articles');
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Saving failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
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

      {/* Main Metadata */}
      <div className="bg-white border border-ivory-dark p-8 shadow-subtle space-y-6">
        <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
          Article Identification & Category
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Article Title *"
              required
              value={formData.title || ''}
              onChange={handleTitleChange}
              placeholder="e.g. Statutory Rights of Commercial Lessees under UP Rent Control"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5">
              Category *
            </label>
            <select
              value={formData.category || 'Civil Litigation'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ivory-dark text-charcoal focus:ring-navy focus:border-navy"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="URL Slug *"
            required
            value={formData.slug || ''}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5">
              Publication Status *
            </label>
            <select
              value={formData.status || 'draft'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-ivory-dark text-charcoal focus:ring-navy focus:border-navy font-medium"
            >
              <option value="draft">Draft (Private)</option>
              <option value="published">Published (Public Website)</option>
            </select>
          </div>
        </div>

        <Textarea
          label="Short Excerpt (Lead Summary) *"
          required
          rows={3}
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief 2-3 sentence explainer summary..."
        />
      </div>

      {/* Rich Editor Section */}
      <div className="bg-white border border-ivory-dark p-8 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-ivory-dark pb-3">
          <h3 className="font-serif text-lg font-bold text-navy">
            Article Content (Sanitized Rich Text)
          </h3>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center px-3 py-1 text-xs border border-ivory-dark bg-ivory text-navy hover:border-gold transition-colors font-medium"
            >
              <Eye size={12} className="mr-1" />
              <span>{previewMode ? 'Edit Source' : 'Preview Layout'}</span>
            </button>
          </div>
        </div>

        {!previewMode ? (
          <div>
            {/* Toolbar */}
            <div className="bg-ivory-light border border-ivory-dark p-2 flex flex-wrap gap-2 text-xs text-charcoal/80 mb-2">
              <button
                type="button"
                onClick={() => insertTag('<h2>', '</h2>')}
                className="px-2 py-1 bg-white border border-ivory-dark hover:bg-ivory"
                title="Heading 2"
              >
                <Heading2 size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<h3>', '</h3>')}
                className="px-2 py-1 bg-white border border-ivory-dark hover:bg-ivory"
                title="Heading 3"
              >
                <Heading3 size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<strong>', '</strong>')}
                className="px-2 py-1 bg-white border border-ivory-dark hover:bg-ivory font-bold"
                title="Bold"
              >
                <Bold size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<em>', '</em>')}
                className="px-2 py-1 bg-white border border-ivory-dark hover:bg-ivory italic"
                title="Italic"
              >
                <Italic size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
                className="px-2 py-1 bg-white border border-ivory-dark hover:bg-ivory"
                title="Bullet List"
              >
                <List size={14} />
              </button>
              <button
                type="button"
                onClick={() => insertTag('<blockquote>', '</blockquote>')}
                className="px-2 py-1 bg-white border border-ivory-dark hover:bg-ivory"
                title="Blockquote"
              >
                <Quote size={14} />
              </button>
            </div>

            <textarea
              id="article-content"
              rows={16}
              required
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 text-sm font-mono bg-white border border-ivory-dark text-charcoal focus:ring-navy focus:border-navy"
              placeholder="<h2>Introduction</h2><p>Write legal explainer content here...</p>"
            />
          </div>
        ) : (
          <div className="bg-ivory-light border border-ivory-dark p-6 min-h-[300px]">
            <div
              className="prose prose-navy max-w-none text-xs sm:text-sm text-charcoal/85 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content entered.</p>' }}
            />
          </div>
        )}
      </div>

      {/* SEO Metadata */}
      <div className="bg-white border border-ivory-dark p-8 shadow-subtle space-y-4">
        <h3 className="font-serif text-lg font-bold text-navy border-b border-ivory-dark pb-2">
          Search Engine Optimization (SEO Metadata)
        </h3>
        <Input
          label="Meta Title (Max 60 chars)"
          value={formData.meta_title || ''}
          onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
        />
        <Textarea
          label="Meta Description (Max 160 chars)"
          rows={2}
          value={formData.meta_description || ''}
          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-ivory-dark pt-6">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.push('/admin/articles')}
        >
          <ArrowLeft size={14} className="mr-1.5" />
          <span>Back to Articles</span>
        </Button>

        <Button type="submit" variant="primary" size="md" isLoading={saving}>
          <Save size={16} className="mr-2 text-gold" />
          <span>Save Article</span>
        </Button>
      </div>
    </form>
  );
}
