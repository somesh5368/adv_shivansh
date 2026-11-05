'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Modal } from '@/components/ui/Modal';
import { Service, PracticeArea } from '@/types';
import { PlusCircle, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterAreaId, setFilterAreaId] = useState<string>('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  const loadData = () => {
    Promise.all([
      adminApi.getServices(token, filterAreaId || undefined),
      adminApi.getPracticeAreas(token),
    ])
      .then(([srvs, areas]) => {
        setServices(srvs || []);
        setPracticeAreas(areas || []);
      })
      .catch((err) => setMessage({ text: err.message, type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [filterAreaId]);

  const handleOpenCreate = () => {
    setEditingService({
      practice_area_id: practiceAreas[0]?.id || '',
      title: '',
      slug: '',
      description: '',
      display_order: services.length + 1,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    setSaving(true);
    setMessage(null);

    try {
      if (editingService.id) {
        await adminApi.updateService(token, editingService.id, editingService);
        setMessage({ text: 'Service updated successfully.', type: 'success' });
      } else {
        await adminApi.createService(token, editingService);
        setMessage({ text: 'Service created successfully.', type: 'success' });
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || 'Operation failed', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await adminApi.deleteService(token, id);
      setMessage({ text: 'Service removed.', type: 'success' });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message || 'Delete failed', type: 'error' });
    }
  };

  return (
    <div>
      <AdminHeader
        title="Legal Services Directory"
        description="Manage granular practice services attached to primary legal disciplines."
        actions={
          <Button variant="primary" size="sm" onClick={handleOpenCreate}>
            <PlusCircle size={14} className="mr-1.5 text-gold" />
            <span>Add Service</span>
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

        {/* Filter Bar */}
        <div className="bg-white border border-ivory-dark p-4 flex items-center space-x-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
            Filter Discipline:
          </label>
          <select
            value={filterAreaId}
            onChange={(e) => setFilterAreaId(e.target.value)}
            className="text-xs bg-ivory-light border border-ivory-dark px-3 py-1.5 text-navy font-medium focus:ring-navy focus:border-navy"
          >
            <option value="">All Disciplines ({services.length})</option>
            {practiceAreas.map((pa) => (
              <option key={pa.id} value={pa.id}>
                {pa.title}
              </option>
            ))}
          </select>
        </div>

        {/* Services Table with Responsive Touch Scroll */}
        <div className="bg-white border border-ivory-dark shadow-subtle overflow-x-auto">
          <table className="min-w-[650px] w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-light border-b border-ivory-dark text-charcoal/70 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Discipline</th>
                <th className="py-3.5 px-6">Service Title</th>
                <th className="py-3.5 px-6">Description</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal/50">
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal/50">
                    No services found for this selection.
                  </td>
                </tr>
              ) : (
                services.map((srv) => {
                  const area = practiceAreas.find((a) => a.id === srv.practice_area_id);
                  return (
                    <tr key={srv.id} className="hover:bg-ivory/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-navy">
                        {area?.title || 'Unknown Discipline'}
                      </td>
                      <td className="py-4 px-6 font-serif font-bold text-navy text-sm">
                        {srv.title}
                      </td>
                      <td className="py-4 px-6 text-charcoal/70 max-w-md truncate">
                        {srv.description}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            srv.is_published
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-ivory text-charcoal/60 border border-ivory-dark'
                          }`}
                        >
                          {srv.is_published ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(srv)}
                          className="p-1.5 text-navy hover:text-gold hover:bg-ivory transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(srv.id)}
                          className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && editingService && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingService.id ? 'Edit Legal Service' : 'New Legal Service'}
          maxWidth="md"
        >
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1.5">
                Assign Practice Area *
              </label>
              <select
                required
                value={editingService.practice_area_id || ''}
                onChange={(e) => setEditingService({ ...editingService, practice_area_id: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-ivory-dark text-charcoal focus:ring-navy focus:border-navy"
              >
                {practiceAreas.map((pa) => (
                  <option key={pa.id} value={pa.id}>
                    {pa.title}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Service Title *"
              required
              value={editingService.title || ''}
              onChange={(e) => {
                const title = e.target.value;
                const slug = editingService.id
                  ? editingService.slug
                  : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                setEditingService({ ...editingService, title, slug });
              }}
            />

            <Input
              label="Service Slug *"
              required
              value={editingService.slug || ''}
              onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
            />

            <Textarea
              label="Service Description *"
              rows={3}
              required
              value={editingService.description || ''}
              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
            />

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="srv-pub"
                checked={editingService.is_published ?? true}
                onChange={(e) => setEditingService({ ...editingService, is_published: e.target.checked })}
                className="w-4 h-4 text-gold border-ivory-dark focus:ring-gold"
              />
              <label htmlFor="srv-pub" className="text-xs font-semibold text-navy cursor-pointer">
                Published & Visible
              </label>
            </div>

            <div className="pt-4 border-t border-ivory-dark flex justify-end space-x-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={saving}>
                Save Service
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
