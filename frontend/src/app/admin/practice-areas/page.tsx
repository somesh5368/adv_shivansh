'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { PracticeArea } from '@/types';
import { PlusCircle, Edit2, Trash2, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminPracticeAreasPage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Partial<PracticeArea> | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  const loadAreas = () => {
    adminApi
      .getPracticeAreas(token)
      .then((data) => setPracticeAreas(data || []))
      .catch((err) => setMessage({ text: err.message, type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAreas();
  }, []);

  const handleOpenCreate = () => {
    setEditingArea({
      title: '',
      slug: '',
      short_description: '',
      full_description: '',
      display_order: practiceAreas.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (area: PracticeArea) => {
    setEditingArea(area);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArea) return;
    setSaving(true);
    setMessage(null);

    try {
      if (editingArea.id) {
        await adminApi.updatePracticeArea(token, editingArea.id, editingArea);
        setMessage({ text: 'Practice area updated successfully.', type: 'success' });
      } else {
        await adminApi.createPracticeArea(token, editingArea);
        setMessage({ text: 'Practice area created successfully.', type: 'success' });
      }
      setIsModalOpen(false);
      loadAreas();
    } catch (err: any) {
      setMessage({ text: err.message || 'Operation failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this practice area? All associated sub-services will be affected.')) return;
    try {
      await adminApi.deletePracticeArea(token, id);
      setMessage({ text: 'Practice area removed.', type: 'success' });
      loadAreas();
    } catch (err: any) {
      setMessage({ text: err.message || 'Delete failed', type: 'error' });
    }
  };

  return (
    <div>
      <AdminHeader
        title="Practice Areas Management"
        description="Organize statutory legal disciplines, summaries, procedural overviews, and display ordering."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <PlusCircle size={14} className="mr-1.5 text-gold" />
            <span>Add Practice Area</span>
          </Button>
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

        <div className="bg-white border border-ivory-dark shadow-subtle overflow-x-auto">
          <table className="min-w-[600px] w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-light border-b border-ivory-dark text-charcoal/70 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Order</th>
                <th className="py-3.5 px-6">Discipline Title</th>
                <th className="py-3.5 px-6">Slug</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal/50">
                    Loading practice disciplines...
                  </td>
                </tr>
              ) : practiceAreas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal/50">
                    No practice areas created yet.
                  </td>
                </tr>
              ) : (
                practiceAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-charcoal/70">{area.display_order}</td>
                    <td className="py-4 px-6 font-serif font-bold text-navy text-sm">{area.title}</td>
                    <td className="py-4 px-6 font-mono text-charcoal/60">{area.slug}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          area.is_published
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-ivory text-charcoal/60 border border-ivory-dark'
                        }`}
                      >
                        {area.is_published ? 'Published' : 'Hidden'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/practice-areas/${area.slug}`}
                        target="_blank"
                        className="inline-flex p-1.5 text-charcoal/60 hover:text-navy hover:bg-ivory transition-colors"
                        title="Preview Public Page"
                      >
                        <Eye size={14} />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(area)}
                        className="p-1.5 text-navy hover:text-gold hover:bg-ivory transition-colors"
                        title="Edit Area"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(area.id)}
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete Area"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && editingArea && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingArea.id ? 'Edit Practice Area' : 'New Practice Area'}
          maxWidth="lg"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Title *"
              required
              value={editingArea.title || ''}
              onChange={(e) => {
                const title = e.target.value;
                const slug = editingArea.id
                  ? editingArea.slug
                  : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                setEditingArea({ ...editingArea, title, slug });
              }}
            />

            <Input
              label="Slug (URL Path) *"
              required
              value={editingArea.slug || ''}
              onChange={(e) => setEditingArea({ ...editingArea, slug: e.target.value })}
            />

            <Textarea
              label="Short Description *"
              rows={2}
              required
              value={editingArea.short_description || ''}
              onChange={(e) => setEditingArea({ ...editingArea, short_description: e.target.value })}
            />

            <Textarea
              label="Full Procedural Description *"
              rows={5}
              required
              value={editingArea.full_description || ''}
              onChange={(e) => setEditingArea({ ...editingArea, full_description: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Display Order"
                type="number"
                value={editingArea.display_order ?? 0}
                onChange={(e) => setEditingArea({ ...editingArea, display_order: parseInt(e.target.value, 10) || 0 })}
              />
              <div className="flex flex-col justify-end pb-2">
                <label className="flex items-center space-x-2 text-xs font-semibold text-navy cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingArea.is_published ?? true}
                    onChange={(e) => setEditingArea({ ...editingArea, is_published: e.target.checked })}
                    className="w-4 h-4 text-gold border-ivory-dark focus:ring-gold"
                  />
                  <span>Published on Website</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-ivory-dark flex justify-end space-x-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={saving}>
                Save Practice Area
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
