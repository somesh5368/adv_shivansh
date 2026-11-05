import {
  AdvocateProfile,
  PracticeArea,
  Service,
  Article,
  SiteSetting,
  Enquiry,
  AuditLog,
} from '@/types';

const RAW_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

async function fetchJson<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store',
  });

  const data = await response.json().catch(() => ({
    success: false,
    message: `HTTP error ${response.status}`,
  }));

  if (!response.ok || !data.success) {
    const errorMsg = data.message || `API request failed with status ${response.status}`;
    const err = new Error(errorMsg);
    (err as any).status = response.status;
    (err as any).errors = data.errors;
    throw err;
  }

  return data.data;
}

// -----------------------------------------------------------------------------
// Public Endpoints
// -----------------------------------------------------------------------------
export const publicApi = {
  getProfile: () => fetchJson<AdvocateProfile>('/public/profile'),
  getPracticeAreas: () => fetchJson<PracticeArea[]>('/public/practice-areas'),
  getPracticeAreaBySlug: (slug: string) =>
    fetchJson<PracticeArea>(`/public/practice-areas/${slug}`),
  getServices: () => fetchJson<Service[]>('/public/services'),
  getArticles: (category?: string) =>
    fetchJson<Article[]>(
      `/public/articles${category ? `?category=${encodeURIComponent(category)}` : ''}`
    ),
  getArticleBySlug: (slug: string) =>
    fetchJson<Article>(`/public/articles/${slug}`),
  getSettings: () => fetchJson<SiteSetting[]>('/public/settings'),
  submitEnquiry: (payload: {
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) =>
    fetchJson<{ id: string; message: string }>('/public/enquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// -----------------------------------------------------------------------------
// Admin Endpoints (Require Bearer Token)
// -----------------------------------------------------------------------------
export const adminApi = {
  // Auth
  sendOtp: (email: string) =>
    fetchJson<{ success: boolean; message: string; devOtp?: string }>('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  verifySession: (accessToken: string) =>
    fetchJson<{ user: any; adminProfile: any }>('/auth/verify-session', {
      method: 'POST',
      body: JSON.stringify({ accessToken }),
    }),
  getMe: (token: string) => fetchJson<{ user: any; adminProfile: any }>('/auth/me', {}, token),
  logout: (token: string) =>
    fetchJson<void>('/auth/logout', { method: 'POST' }, token),
  changePassword: (token: string, newPassword: string) =>
    fetchJson<void>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
    }, token),
  listAdmins: (token: string) =>
    fetchJson<Array<{
      id: string;
      user_id: string;
      display_name: string;
      role: string;
      email: string;
      isPrimary: boolean;
      isTemporary: boolean;
      created_at: string;
    }>>('/auth/admins', {}, token),
  revokeAdmin: (token: string, email: string) =>
    fetchJson<void>('/auth/revoke-admin', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }, token),

  // Profile
  getProfile: (token: string) => fetchJson<AdvocateProfile>('/admin/profile', {}, token),
  updateProfile: (token: string, payload: Partial<AdvocateProfile>) =>
    fetchJson<AdvocateProfile>('/admin/profile', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token),

  // Practice Areas
  getPracticeAreas: (token: string) =>
    fetchJson<PracticeArea[]>('/admin/practice-areas', {}, token),
  getPracticeAreaById: (token: string, id: string) =>
    fetchJson<PracticeArea>(`/admin/practice-areas/${id}`, {}, token),
  createPracticeArea: (token: string, payload: Partial<PracticeArea>) =>
    fetchJson<PracticeArea>('/admin/practice-areas', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, token),
  updatePracticeArea: (token: string, id: string, payload: Partial<PracticeArea>) =>
    fetchJson<PracticeArea>(`/admin/practice-areas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token),
  deletePracticeArea: (token: string, id: string) =>
    fetchJson<void>(`/admin/practice-areas/${id}`, { method: 'DELETE' }, token),

  // Services
  getServices: (token: string, practiceAreaId?: string) =>
    fetchJson<Service[]>(
      `/admin/services${practiceAreaId ? `?practice_area_id=${practiceAreaId}` : ''}`,
      {},
      token
    ),
  createService: (token: string, payload: Partial<Service>) =>
    fetchJson<Service>('/admin/services', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, token),
  updateService: (token: string, id: string, payload: Partial<Service>) =>
    fetchJson<Service>(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token),
  deleteService: (token: string, id: string) =>
    fetchJson<void>(`/admin/services/${id}`, { method: 'DELETE' }, token),

  // Articles
  getArticles: (token: string) => fetchJson<Article[]>('/admin/articles', {}, token),
  getArticleById: (token: string, id: string) =>
    fetchJson<Article>(`/admin/articles/${id}`, {}, token),
  createArticle: (token: string, payload: Partial<Article>) =>
    fetchJson<Article>('/admin/articles', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, token),
  updateArticle: (token: string, id: string, payload: Partial<Article>) =>
    fetchJson<Article>(`/admin/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }, token),
  publishArticle: (token: string, id: string) =>
    fetchJson<Article>(`/admin/articles/${id}/publish`, { method: 'POST' }, token),
  unpublishArticle: (token: string, id: string) =>
    fetchJson<Article>(`/admin/articles/${id}/unpublish`, { method: 'POST' }, token),
  deleteArticle: (token: string, id: string) =>
    fetchJson<void>(`/admin/articles/${id}`, { method: 'DELETE' }, token),

  // Media
  getMediaFiles: (token: string, bucket = 'site-assets') =>
    fetchJson<any[]>(`/admin/media?bucket=${bucket}`, {}, token),
  uploadMedia: (token: string, file: File, bucket = 'site-assets') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('bucket', bucket);
    return fetchJson<{ path: string; publicUrl: string }>('/admin/media/upload', {
      method: 'POST',
      body: formData,
    }, token);
  },
  deleteMedia: (token: string, bucket: string, path: string) =>
    fetchJson<void>(`/admin/media/${bucket}/${encodeURIComponent(path)}`, { method: 'DELETE' }, token),

  // Settings & Inquiries
  getSettings: (token: string) => fetchJson<SiteSetting[]>('/admin/settings', {}, token),
  upsertSetting: (token: string, key: string, value: Record<string, any>, isPublic: boolean) =>
    fetchJson<SiteSetting>('/admin/settings', {
      method: 'POST',
      body: JSON.stringify({ setting_key: key, setting_value: value, is_public: isPublic }),
    }, token),
  getEnquiries: (token: string) => fetchJson<Enquiry[]>('/admin/enquiries', {}, token),
  updateEnquiryStatus: (token: string, id: string, status: string) =>
    fetchJson<Enquiry>(`/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }, token),
  getAuditLogs: (token: string) => fetchJson<AuditLog[]>('/admin/audit-logs', {}, token),
  testNotification: (token: string, payload: { recipientEmail: string; subject: string; message: string }) =>
    fetchJson<{ sent: boolean }>('/admin/notifications/test', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, token),
};
