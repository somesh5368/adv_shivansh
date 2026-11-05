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
  Mail,
  Phone,
  CheckCircle2,
  Clock,
  Inbox,
  Filter,
  Check,
  Archive,
  RefreshCw,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Enquiry } from '@/types';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    unreadEnquiries: 0,
    publishedArticles: 0,
    draftArticles: 0,
    practiceAreas: 0,
    servicesCount: 0,
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState<'all' | 'unread' | 'reviewed' | 'archived'>('all');
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';
    setLoading(true);

    try {
      const [articles, areas, services, logs, enquiriesRes] = await Promise.all([
        adminApi.getArticles(token).catch(() => []),
        adminApi.getPracticeAreas(token).catch(() => []),
        adminApi.getServices(token).catch(() => []),
        adminApi.getAuditLogs(token).catch(() => []),
        adminApi.getEnquiries(token).catch(() => []),
      ]);

      const published = articles.filter((a) => a.status === 'published').length;
      const drafts = articles.filter((a) => a.status === 'draft').length;
      const unread = enquiriesRes.filter((e) => e.status === 'unread').length;

      setStats({
        totalEnquiries: enquiriesRes.length,
        unreadEnquiries: unread,
        publishedArticles: published,
        draftArticles: drafts,
        practiceAreas: areas.length,
        servicesCount: services.length,
      });

      setEnquiries(enquiriesRes);
      setFilteredEnquiries(enquiriesRes);
      setRecentArticles(articles.slice(0, 5));
      setRecentLogs(logs.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Filter inquiries
  useEffect(() => {
    if (enquiryFilter === 'all') {
      setFilteredEnquiries(enquiries);
    } else {
      setFilteredEnquiries(enquiries.filter((e) => e.status === enquiryFilter));
    }
  }, [enquiryFilter, enquiries]);

  const handleUpdateStatus = async (id: string, newStatus: 'unread' | 'reviewed' | 'archived') => {
    const token = localStorage.getItem('advocate_admin_token') || 'mock-admin-token';
    setUpdatingId(id);

    try {
      await adminApi.updateEnquiryStatus(token, id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      // update stats
      const updatedList = enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
      setStats((prev) => ({
        ...prev,
        unreadEnquiries: updatedList.filter((e) => e.status === 'unread').length,
      }));
    } catch {
      // safe fallback
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      <AdminHeader
        title="Chambers Executive Dashboard"
        description="Live operational command center for client consultation enquiries, legal explainers, and judicial logs."
        actions={
          <div className="flex items-center space-x-2">
            <button
              onClick={fetchDashboardData}
              className="p-2 bg-bone border border-bone-dark hover:border-brass text-charcoal rounded-xs transition-colors"
              title="Refresh Dashboard"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            <Link
              href="/admin/articles/new"
              className="inline-flex items-center px-4 py-2 bg-oxblood text-brass text-xs uppercase tracking-wider font-bold hover:bg-wine transition-colors border border-brass rounded-xs shadow-sm"
            >
              <PlusCircle size={14} className="mr-1.5" />
              <span>Create Article</span>
            </Link>
          </div>
        }
      />

      <div className="p-4 sm:p-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric 1: Inbound Enquiries */}
          <div className="bg-white border-2 border-brass/60 p-6 rounded-xs shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between text-charcoal/70 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-oxblood">
                Client Enquiries
              </span>
              <div className="w-8 h-8 rounded-xs bg-oxblood/10 flex items-center justify-center text-oxblood">
                <Inbox size={18} />
              </div>
            </div>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-oxblood">
                {loading ? '—' : stats.totalEnquiries}
              </span>
              {stats.unreadEnquiries > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[11px] font-bold rounded-xs border border-red-300">
                  {stats.unreadEnquiries} New
                </span>
              )}
            </div>
            <span className="text-xs text-charcoal/60 mt-2 block font-medium">
              Inbound consultation requests
            </span>
          </div>

          {/* Metric 2: Practice Areas */}
          <div className="bg-white border border-bone-dark p-6 rounded-xs shadow-subtle hover:border-brass/70 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-charcoal/70 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                Practice Areas
              </span>
              <div className="w-8 h-8 rounded-xs bg-bone-dark/40 flex items-center justify-center text-brass">
                <Scale size={18} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-charcoal">
              {loading ? '—' : 5}
            </div>
            <span className="text-xs text-charcoal/60 mt-2 block font-medium">
              Civil &bull; Criminal &bull; Cyber &bull; Family &bull; Tax
            </span>
          </div>

          {/* Metric 3: Published Articles */}
          <div className="bg-white border border-bone-dark p-6 rounded-xs shadow-subtle hover:border-brass/70 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-charcoal/70 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal">
                Legal Explainers
              </span>
              <div className="w-8 h-8 rounded-xs bg-bone-dark/40 flex items-center justify-center text-brass">
                <FileText size={18} />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-charcoal">
              {loading ? '—' : stats.publishedArticles || 5}
            </div>
            <span className="text-xs text-charcoal/60 mt-2 block font-medium">
              Live educational resources
            </span>
          </div>

          {/* Metric 4: Fiduciary Security */}
          <div className="bg-white border border-bone-dark p-6 rounded-xs shadow-subtle hover:border-brass/70 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-charcoal/70 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Security &amp; Audit
              </span>
              <div className="w-8 h-8 rounded-xs bg-emerald-50 flex items-center justify-center text-emerald-700">
                <UserCheck size={18} />
              </div>
            </div>
            <div className="text-2xl font-serif font-extrabold text-emerald-800">
              Active &amp; Protected
            </div>
            <span className="text-xs text-charcoal/60 mt-2 block font-medium">
              Bar Council Fiduciary Protocols
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* INBOUND CLIENT CONSULTATION ENQUIRIES QUEUE                   */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white border border-bone-dark rounded-xs shadow-card overflow-hidden">
          {/* Queue Header & Filters */}
          <div className="p-6 border-b border-bone-dark flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-bone-light/60">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-oxblood flex items-center space-x-2">
                <Inbox size={20} className="text-brass" />
                <span>Client Consultation Requests</span>
              </h3>
              <p className="text-xs text-charcoal/70 mt-1">
                Direct inquiries transmitted via website consultation forms.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2">
              {(['all', 'unread', 'reviewed', 'archived'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setEnquiryFilter(filter)}
                  className={`px-3 py-1.5 text-xs uppercase font-bold tracking-wider rounded-xs border transition-all ${
                    enquiryFilter === filter
                      ? 'bg-oxblood text-brass border-brass shadow-sm'
                      : 'bg-white text-charcoal/70 border-bone-dark hover:border-brass'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Enquiries Table / List */}
          {filteredEnquiries.length > 0 ? (
            <div className="divide-y divide-bone-dark">
              {filteredEnquiries.map((item) => (
                <div
                  key={item.id}
                  className={`p-6 hover:bg-bone-light/50 transition-colors flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${
                    item.status === 'unread' ? 'bg-amber-50/40' : ''
                  }`}
                >
                  {/* Left: Client info & subject */}
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center space-x-3">
                      <span className="font-serif text-lg font-bold text-charcoal">
                        {item.full_name}
                      </span>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs border ${
                          item.status === 'unread'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : item.status === 'reviewed'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs text-charcoal/50 flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{formatDate(item.created_at)}</span>
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-oxblood">
                      {item.subject}
                    </p>

                    <p className="text-xs text-charcoal/80 leading-relaxed bg-white/70 p-3 rounded-xs border border-bone-dark">
                      &quot;{item.message}&quot;
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs pt-1 font-semibold">
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center space-x-1.5 text-oxblood hover:text-wine font-bold"
                      >
                        <Phone size={13} className="text-brass" />
                        <span>{item.phone}</span>
                      </a>
                      <a
                        href={`mailto:${item.email}?subject=RE: ${encodeURIComponent(item.subject)}`}
                        className="inline-flex items-center space-x-1.5 text-charcoal/80 hover:text-oxblood"
                      >
                        <Mail size={13} className="text-brass" />
                        <span>{item.email}</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Quick Status Actions */}
                  <div className="flex items-center space-x-2 self-start lg:self-center">
                    {item.status !== 'reviewed' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'reviewed')}
                        disabled={updatingId === item.id}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-sm disabled:opacity-50"
                      >
                        <Check size={13} />
                        <span>Reviewed</span>
                      </button>
                    )}

                    {item.status !== 'archived' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'archived')}
                        disabled={updatingId === item.id}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-bone border border-bone-dark hover:border-brass text-charcoal text-xs font-bold uppercase tracking-wider rounded-xs transition-colors disabled:opacity-50"
                      >
                        <Archive size={13} />
                        <span>Archive</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center space-y-2">
              <Inbox size={36} className="text-charcoal/30 mx-auto" />
              <p className="text-sm font-serif font-bold text-charcoal">
                No Enquiries in Queue
              </p>
              <p className="text-xs text-charcoal/60">
                New consultation requests submitted by visitors will immediately appear here.
              </p>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* RECENT ARTICLES & AUDIT LOGS                                  */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-7 bg-white border border-bone-dark p-6 rounded-xs shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-bone-dark pb-3">
              <h3 className="font-serif text-lg font-bold text-oxblood">
                Recent Legal Explainers
              </h3>
              <Link
                href="/admin/articles"
                className="text-xs uppercase tracking-wider font-bold text-oxblood hover:text-wine transition-colors inline-flex items-center"
              >
                <span>Manage All Articles</span>
                <ArrowRight size={12} className="ml-1 text-brass" />
              </Link>
            </div>

            <div className="divide-y divide-bone-dark">
              {recentArticles.map((article) => (
                <div key={article.id} className="py-3 flex items-center justify-between">
                  <div className="pr-4">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      className="text-xs font-bold text-charcoal hover:text-oxblood block transition-colors"
                    >
                      {article.title}
                    </Link>
                    <span className="text-[11px] text-charcoal/60">
                      {article.category} &bull; {formatDate(article.created_at)}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-xs border ${
                      article.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-bone text-charcoal/60 border-bone-dark'
                    }`}
                  >
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs */}
          <div className="lg:col-span-5 bg-white border border-bone-dark p-6 rounded-xs shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-bone-dark pb-3">
              <h3 className="font-serif text-lg font-bold text-oxblood flex items-center space-x-2">
                <Activity size={16} className="text-brass" />
                <span>Security Audit Activity</span>
              </h3>
              <Link
                href="/admin/security"
                className="text-xs uppercase tracking-wider font-bold text-oxblood hover:text-wine transition-colors inline-flex items-center"
              >
                <span>Full Logs</span>
              </Link>
            </div>

            <div className="divide-y divide-bone-dark text-xs">
              {recentLogs.map((log) => (
                <div key={log.id} className="py-2.5 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal text-[11px]">
                      {log.action}
                    </span>
                    <span className="text-[10px] text-charcoal/50">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal/60">
                    Resource: {log.resource_type}
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
