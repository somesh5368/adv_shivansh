// ==============================================================================
// Database & Domain Types for Advocate Legal Suite (Backend)
// ==============================================================================

import { Request } from 'express';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface AdvocateProfile {
  id: string;
  full_name: string;
  designation: string;
  tagline: string;
  biography: string;
  qualifications: string;
  enrolment_number: string | null;
  enrolment_council: string | null;
  image_path: string | null;
  email: string;
  phone: string;
  office_address: string;
  office_timings: string | null;
  created_at: string;
  updated_at: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  image_path: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  services?: Service[];
}

export interface Service {
  id: string;
  practice_area_id: string;
  title: string;
  slug: string;
  description: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type ArticleStatus = 'draft' | 'published';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_path: string | null;
  category: string;
  status: ArticleStatus;
  meta_title: string | null;
  meta_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: Record<string, any>;
  is_public: boolean;
  updated_at: string;
}

export type AdminRole = 'super_admin' | 'admin' | 'editor';

export interface AdminProfile {
  id: string;
  user_id: string;
  display_name: string;
  role: AdminRole;
  created_at: string;
  updated_at: string;
}

export type EnquiryStatus = 'unread' | 'reviewed' | 'archived';

export interface Enquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_user_id: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, any> | null;
  created_at: string;
}

export interface AuthenticatedUser {
  id: string;
  email?: string;
  role?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  adminProfile?: AdminProfile;
}
