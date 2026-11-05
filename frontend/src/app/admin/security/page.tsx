'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { adminApi } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { AuditLog, Enquiry } from '@/types';
import {
  ShieldCheck,
  Mail,
  Send,
  Activity,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  KeyRound,
  UserCheck,
  UserX,
  Lock,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface AdminAccountItem {
  id: string;
  user_id: string;
  display_name: string;
  role: string;
  email: string;
  isPrimary: boolean;
  isTemporary: boolean;
  created_at: string;
}

export default function AdminSecurityPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [admins, setAdmins] = useState<AdminAccountItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Email test form
  const [testEmail, setTestEmail] = useState('advshiv43@gmail.com');
  const [testSubject, setTestSubject] = useState('Chamber Portal System Verification');
  const [testMessage, setTestMessage] = useState('This is a test notification dispatched through Brevo transactional email services.');
  const [sendingTest, setSendingTest] = useState(false);
  const [revokingEmail, setRevokingEmail] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('advocate_admin_token') || 'mock-admin-token' : 'mock-admin-token';

  const loadData = () => {
    Promise.all([
      adminApi.getAuditLogs(token).catch(() => []),
      adminApi.getEnquiries(token).catch(() => []),
      adminApi.listAdmins(token).catch(() => []),
    ])
      .then(([logs, enqs, admList]) => {
        setAuditLogs(logs || []);
        setEnquiries(enqs || []);
        setAdmins(admList || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (newPassword.length < 8) {
      setFeedback({ text: 'Password must contain at least 8 characters.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    setUpdatingPassword(true);
    try {
      await adminApi.changePassword(token, newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setFeedback({ text: 'Administrator password has been successfully updated.', type: 'success' });
      loadData();
    } catch (err: any) {
      setFeedback({ text: err.message || 'Failed to update administrator password', type: 'error' });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleRevokeAdmin = async (email: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently revoke and delete access for ${email}?\n\nOnce deleted, this temporary developer account will no longer be able to log in or request OTPs.`
    );
    if (!confirmed) return;

    setRevokingEmail(email);
    setFeedback(null);

    try {
      await adminApi.revokeAdmin(token, email);
      setFeedback({
        text: `Temporary developer account '${email}' has been permanently revoked and removed.`,
        type: 'success',
      });
      loadData();
    } catch (err: any) {
      setFeedback({ text: err.message || 'Failed to revoke administrator', type: 'error' });
    } finally {
      setRevokingEmail(null);
    }
  };

  const handleTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendingTest(true);
    setFeedback(null);

    try {
      await adminApi.testNotification(token, {
        recipientEmail: testEmail,
        subject: testSubject,
        message: testMessage,
      });
      setFeedback({ text: `Test notification sent successfully to ${testEmail}. Check your inbox or server log.`, type: 'success' });
    } catch (err: any) {
      setFeedback({ text: err.message || 'Dispatch failed', type: 'error' });
    } finally {
      setSendingTest(false);
    }
  };

  const handleUpdateEnquiry = async (id: string, status: string) => {
    try {
      await adminApi.updateEnquiryStatus(token, id, status);
      loadData();
    } catch {}
  };

  return (
    <div>
      <AdminHeader
        title="Security, Access Control & Chamber Governance"
        description="Manage administrator credentials, change passwords, revoke development access, and monitor audit trails."
      />

      <div className="p-4 sm:p-8 space-y-6 sm:space-y-10 max-w-6xl">
        {feedback && (
          <div
            className={`p-4 border text-xs flex items-center space-x-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-red-700'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-red-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Section 1: Administrator Accounts & Revocation */}
        <div className="bg-white border border-bone-dark p-5 sm:p-8 shadow-card rounded-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-bone-dark pb-3">
            <UserCheck className="text-brass" size={20} />
            <div>
              <h3 className="font-serif text-lg font-bold text-oxblood">
                Chamber Administrator Accounts
              </h3>
              <p className="text-[11px] text-charcoal/60">
                Authorized accounts with privileged access to manage practice areas, articles, and client inquiries.
              </p>
            </div>
          </div>

          <div className="divide-y divide-bone-dark border border-bone-dark rounded-xs">
            {admins.map((adm) => (
              <div key={adm.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-oxblood text-sm">{adm.display_name}</span>
                    {adm.isPrimary ? (
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-oxblood text-brass border border-brass/30 rounded-xs">
                        Primary Chamber Owner
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-xs">
                        Administrative Account
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-charcoal/70">
                    Email: <span className="text-oxblood font-semibold">{adm.email}</span> &bull; Role: <span className="uppercase font-bold">{adm.role}</span>
                  </div>
                  <div className="text-[11px] text-charcoal/50">
                    Created: {formatDate(adm.created_at)}
                  </div>
                </div>

                <div>
                  {adm.isPrimary ? (
                    <span className="text-xs text-charcoal/50 italic px-3 py-1.5 border border-bone-dark bg-bone-light block text-center rounded-xs">
                      Protected (Permanent)
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      isLoading={revokingEmail === adm.email}
                      onClick={() => handleRevokeAdmin(adm.email)}
                      className="text-xs text-red-700 border-red-300 hover:bg-red-50 hover:border-red-400 w-full sm:w-auto"
                    >
                      <UserX size={14} className="mr-1.5 text-red-600" />
                      <span>Revoke & Remove Access</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Change Administrator Password */}
        <div className="bg-white border border-bone-dark p-5 sm:p-8 shadow-card rounded-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-bone-dark pb-3">
            <Lock className="text-brass" size={20} />
            <div>
              <h3 className="font-serif text-lg font-bold text-oxblood">
                Change Administrator Password
              </h3>
              <p className="text-[11px] text-charcoal/60">
                Update the authentication password for your active session account in Supabase Auth.
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
            <Input
              label="New Administrator Password *"
              type="password"
              placeholder="Minimum 8 characters"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirm New Password *"
              type="password"
              placeholder="Re-enter new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={updatingPassword}
            >
              <KeyRound size={14} className="mr-1.5 text-brass" />
              <span>Update Password</span>
            </Button>
          </form>
        </div>

        {/* Section 3: Brevo Transactional Email Test */}
        <div className="bg-white border border-bone-dark p-5 sm:p-8 shadow-card rounded-xs space-y-6">
          <div className="flex items-center space-x-3 border-b border-bone-dark pb-3">
            <Mail className="text-brass" size={20} />
            <h3 className="font-serif text-lg font-bold text-oxblood">
              Brevo Transactional Email Pipeline Tester
            </h3>
          </div>

          <p className="text-xs text-charcoal/70 leading-relaxed">
            Dispatch an immediate branded transactional notification from the backend to verify that your Brevo API key and custom SMTP connection are operational.
          </p>

          <form onSubmit={handleTestEmail} className="space-y-4 max-w-2xl">
            <Input
              label="Recipient Email Address *"
              type="email"
              required
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <Input
              label="Notification Subject *"
              required
              value={testSubject}
              onChange={(e) => setTestSubject(e.target.value)}
            />
            <Textarea
              label="Notification Body *"
              rows={3}
              required
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
            />
            <Button type="submit" variant="primary" size="sm" isLoading={sendingTest}>
              <Send size={14} className="mr-1.5 text-brass" />
              <span>Send Transactional Test</span>
            </Button>
          </form>
        </div>

        {/* Section 4: General Enquiries Inbox */}
        <div className="bg-white border border-bone-dark p-5 sm:p-8 shadow-card rounded-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-bone-dark pb-3">
            <MessageSquare className="text-brass" size={20} />
            <h3 className="font-serif text-lg font-bold text-oxblood">
              Public Practice Inquiries ({enquiries.length})
            </h3>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-charcoal/60 py-4">No enquiries received yet.</p>
          ) : (
            <div className="divide-y divide-bone-dark">
              {enquiries.map((enq) => (
                <div key={enq.id} className="py-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-oxblood text-sm">{enq.full_name}</span>
                    <span className="text-[11px] text-charcoal/50">{formatDate(enq.created_at)}</span>
                  </div>
                  <div className="text-charcoal/70 space-x-4">
                    <span>Email: <a href={`mailto:${enq.email}`} className="text-oxblood underline">{enq.email}</a></span>
                    <span>Phone: <a href={`tel:${enq.phone}`} className="text-oxblood">{enq.phone}</a></span>
                  </div>
                  <p className="font-medium text-oxblood">Subject: {enq.subject}</p>
                  <p className="bg-bone-light p-3 border border-bone-dark text-charcoal/80 leading-relaxed rounded-xs">
                    {enq.message}
                  </p>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[11px] text-charcoal/60">Mark as:</span>
                    {(['unread', 'reviewed', 'archived'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateEnquiry(enq.id, st)}
                        className={`px-2.5 py-1 text-[10px] uppercase font-bold border rounded-xs transition-colors ${
                          enq.status === st
                            ? 'bg-oxblood text-brass border-oxblood'
                            : 'bg-white text-charcoal/60 border-bone-dark hover:border-oxblood'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 5: Privileged Audit Logs */}
        <div className="bg-white border border-bone-dark p-5 sm:p-8 shadow-card rounded-xs space-y-4">
          <div className="flex items-center space-x-3 border-b border-bone-dark pb-3">
            <Activity className="text-brass" size={20} />
            <h3 className="font-serif text-lg font-bold text-oxblood">
              Immutable Privileged Audit Trail
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-bone-light border-b border-bone-dark text-charcoal/70 uppercase font-bold tracking-wider text-[11px]">
                  <th className="py-2.5 px-4">Action</th>
                  <th className="py-2.5 px-4">Resource</th>
                  <th className="py-2.5 px-4">Actor ID</th>
                  <th className="py-2.5 px-4 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bone-dark">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-bone/40 transition-colors">
                    <td className="py-3 px-4 text-oxblood font-semibold">{log.action}</td>
                    <td className="py-3 px-4 text-charcoal/80">{log.resource_type}</td>
                    <td className="py-3 px-4 text-charcoal/60 truncate max-w-[150px]">{log.actor_user_id || 'system'}</td>
                    <td className="py-3 px-4 text-right text-charcoal/60">{new Date(log.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
