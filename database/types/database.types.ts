// ==============================================================================
// Database & Domain Types for Advocate Legal Suite
// ==============================================================================

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

export interface Database {
  public: {
    Tables: {
      advocate_profile: {
        Row: AdvocateProfile;
        Insert: Omit<AdvocateProfile, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<AdvocateProfile, 'id' | 'created_at'>>;
      };
      practice_areas: {
        Row: PracticeArea;
        Insert: Omit<PracticeArea, 'id' | 'created_at' | 'updated_at' | 'services'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<PracticeArea, 'id' | 'created_at' | 'services'>>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Service, 'id' | 'created_at'>>;
      };
      articles: {
        Row: Article;
        Insert: Omit<Article, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Article, 'id' | 'created_at'>>;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: Omit<SiteSetting, 'id' | 'updated_at'> & {
          id?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<SiteSetting, 'id'>>;
      };
      admin_profiles: {
        Row: AdminProfile;
        Insert: Omit<AdminProfile, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<AdminProfile, 'id' | 'created_at'>>;
      };
      enquiries: {
        Row: Enquiry;
        Insert: Omit<Enquiry, 'id' | 'status' | 'created_at'> & {
          id?: string;
          status?: EnquiryStatus;
          created_at?: string;
        };
        Update: Partial<Omit<Enquiry, 'id' | 'created_at'>>;
      };
      audit_logs: {
        Row: AuditLog;
        Insert: Omit<AuditLog, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: never;
      };
    };
  };
}

