'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import {
  FileText,
  Scale,
  UserCheck,
  Activity,
  ArrowRight,
  PlusCircle,
  Upload,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    publishedArticles: 0,
    draftArticles: 0,
    practiceAreas: 0,
    servicesCount: 0,
    profileCompleted: true,
  });

  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';

    Promise.all([
      adminApi.getArticles(token).catch(() => []),
      adminApi.getPracticeAreas(token).catch(() => []),
      adminApi.getServices(token).catch(() => []),
      adminApi.getAuditLogs(token).catch(() => []),
      adminApi.getProfile(token).catch(() => null),
    ])
      .then(([articles, areas, services, logs, profile]) => {
        const published = articles.filter((a) => a.status === 'published').length;
        const drafts = articles.filter((a) => a.status === 'draft').length;

        setStats({
          publishedArticles: published,
          draftArticles: drafts,
          practiceAreas: areas.length,
          servicesCount: services.length,
          profileCompleted: Boolean(profile?.full_name && profile?.email),
        });

        setRecentArticles(articles.slice(0, 5));
        setRecentLogs(logs.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminHeader
        title="Dashboard Overview"
        description="Factual summary of legal portal content, practice disciplines, and administrative logs."
        actions={
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center px-4 py-2 bg-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-navy-800 transition-colors"
          >
            <PlusCircle size={14} className="mr-1.5 text-gold" />
            <span>Create Article</span>
          </Link>
        }
      />

      <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-ivory-dark p-6 shadow-subtle border-l-4 border-navy">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Published Articles</span>
              <FileText size={18} className="text-gold" />
            </div>
            <div className="text-3xl font-serif font-bold text-navy">
              {loading ? '—' : stats.publishedArticles}
            </div>
            <span className="text-[11px] text-charcoal/60 mt-1 block">Live on public portal</span>
          </div>

          <div className="bg-white border border-ivory-dark p-6 shadow-subtle border-l-4 border-gold">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Draft Articles</span>
              <FileText size={18} className="text-navy" />
            </div>
            <div className="text-3xl font-serif font-bold text-navy">
              {loading ? '—' : stats.draftArticles}
            </div>
            <span className="text-[11px] text-charcoal/60 mt-1 block">Unpublished drafts</span>
          </div>

          <div className="bg-white border border-ivory-dark p-6 shadow-subtle border-l-4 border-navy">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Practice Disciplines</span>
              <Scale size={18} className="text-gold" />
            </div>
            <div className="text-3xl font-serif font-bold text-navy">
              {loading ? '—' : stats.practiceAreas}
            </div>
            <span className="text-[11px] text-charcoal/60 mt-1 block">
              {stats.servicesCount} sub-services linked
            </span>
          </div>

          <div className="bg-white border border-ivory-dark p-6 shadow-subtle border-l-4 border-emerald-600">
            <div className="flex items-center justify-between text-charcoal/60 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Profile Status</span>
              <UserCheck size={18} className="text-emerald-600" />
            </div>
            <div className="text-xl font-serif font-bold text-emerald-800">
              Active & Verified
            </div>
            <span className="text-[11px] text-charcoal/60 mt-1 block">Gorakhpur Civil Court</span>
          </div>
        </div>

        {/* Recent Content and System Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-7 bg-white border border-ivory-dark p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-ivory-dark pb-3">
              <h3 className="font-serif text-lg font-bold text-navy">
                Recent Legal Explainers
              </h3>
              <Link
                href="/admin/articles"
                className="text-xs uppercase tracking-wider font-semibold text-navy hover:text-gold transition-colors inline-flex items-center"
              >
                <span>Manage All</span>
                <ArrowRight size={12} className="ml-1" />
              </Link>
            </div>

            <div className="divide-y divide-ivory-dark">
              {recentArticles.map((article) => (
                <div key={article.id} className="py-3 flex items-center justify-between">
                  <div className="pr-4">
                    <span className="text-xs font-semibold text-navy hover:text-gold block transition-colors">
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        {article.title}
                      </Link>
                    </span>
                    <span className="text-[11px] text-charcoal/50">
                      {article.category} • {formatDate(article.created_at)}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 ${
                      article.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-ivory text-charcoal/60 border border-ivory-dark'
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Privileged Audit Logs */}
          <div className="lg:col-span-5 bg-white border border-ivory-dark p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-ivory-dark pb-3">
              <h3 className="font-serif text-lg font-bold text-navy flex items-center space-x-2">
                <Activity size={16} className="text-gold" />
                <span>System Audit Activity</span>
              </h3>
              <Link
                href="/admin/security"
                className="text-xs uppercase tracking-wider font-semibold text-navy hover:text-gold transition-colors inline-flex items-center"
              >
                <span>Full Logs</span>
              </Link>
            </div>

            <div className="divide-y divide-ivory-dark text-xs">
              {recentLogs.map((log) => (
                <div key={log.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-navy font-semibold text-[11px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-charcoal/50">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal/60 font-mono">
                    Resource: {log.resource_type} {log.resource_id ? `(${log.resource_id.slice(0, 8)}...)` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
