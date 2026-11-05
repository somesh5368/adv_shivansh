'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils';
import { PlusCircle, Edit2, Trash2, Eye, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  const loadArticles = () => {
    adminApi
      .getArticles(token)
      .then((data) => setArticles(data || []))
      .catch((err) => setMessage({ text: err.message, type: 'error' }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleTogglePublish = async (article: Article) => {
    try {
      if (article.status === 'published') {
        await adminApi.unpublishArticle(token, article.id);
        setMessage({ text: `Article '${article.title}' saved to drafts.`, type: 'success' });
      } else {
        await adminApi.publishArticle(token, article.id);
        setMessage({ text: `Article '${article.title}' published publicly.`, type: 'success' });
      }
      loadArticles();
    } catch (err: any) {
      setMessage({ text: err.message || 'Publish toggle failed', type: 'error' });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete article: "${title}"?`)) return;
    try {
      await adminApi.deleteArticle(token, id);
      setMessage({ text: 'Article deleted successfully.', type: 'success' });
      loadArticles();
    } catch (err: any) {
      setMessage({ text: err.message || 'Delete failed', type: 'error' });
    }
  };

  const filtered = articles.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.status === filterStatus;
  });

  return (
    <div>
      <AdminHeader
        title="Legal Resources & Articles"
        description="Author and curate educational explainers, statutory commentary, and legal updates."
        actions={
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center px-4 py-2 bg-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-navy-800 transition-colors"
          >
            <PlusCircle size={14} className="mr-1.5 text-gold" />
            <span>New Article</span>
          </Link>
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

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 border-b border-ivory-dark pb-4">
          {['all', 'published', 'draft'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors border ${
                filterStatus === st
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-charcoal/70 border-ivory-dark hover:border-gold'
              }`}
            >
              {st} ({st === 'all' ? articles.length : articles.filter((a) => a.status === st).length})
            </button>
          ))}
        </div>

        {/* Articles Table with Responsive Touch Scroll */}
        <div className="bg-white border border-ivory-dark shadow-subtle overflow-x-auto">
          <table className="min-w-[640px] w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-light border-b border-ivory-dark text-charcoal/70 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-6">Article Title</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory-dark">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal/50">
                    Loading articles...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal/50">
                    No articles found matching filter.
                  </td>
                </tr>
              ) : (
                filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-ivory/50 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className="font-serif font-bold text-navy hover:text-gold text-sm block line-clamp-1"
                      >
                        {art.title}
                      </Link>
                      <span className="text-[11px] text-charcoal/50 line-clamp-1 font-mono">
                        /resources/{art.slug}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-navy">{art.category}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                          art.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-ivory text-charcoal/60 border border-ivory-dark'
                        }`}
                      >
                        {art.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-charcoal/60">
                      {formatDate(art.published_at || art.created_at)}
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {art.status === 'published' && (
                        <Link
                          href={`/resources/${art.slug}`}
                          target="_blank"
                          className="inline-flex p-1.5 text-charcoal/60 hover:text-navy hover:bg-ivory transition-colors"
                          title="View Live Page"
                        >
                          <Eye size={14} />
                        </Link>
                      )}
                      <button
                        onClick={() => handleTogglePublish(art)}
                        className="p-1.5 text-navy hover:text-gold hover:bg-ivory transition-colors"
                        title={art.status === 'published' ? 'Unpublish to Draft' : 'Publish Article'}
                      >
                        {art.status === 'published' ? (
                          <ArrowDownRight size={14} />
                        ) : (
                          <ArrowUpRight size={14} className="text-emerald-600" />
                        )}
                      </button>
                      <Link
                        href={`/admin/articles/${art.id}/edit`}
                        className="inline-flex p-1.5 text-navy hover:text-gold hover:bg-ivory transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(art.id, art.title)}
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete Article"
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
    </div>
  );
}
