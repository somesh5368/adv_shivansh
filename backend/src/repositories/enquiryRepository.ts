import { supabaseAdmin, supabasePublic } from '../config/supabase.js';
import { env } from '../config/env.js';
import { Enquiry, EnquiryStatus } from '../types/index.js';
import { logger } from '../utils/logger.js';

const memEnquiries: Enquiry[] = [];

export class EnquiryRepository {
  static async create(enquiry: Omit<Enquiry, 'id' | 'status' | 'created_at'>): Promise<Enquiry> {
    const newRecord: Enquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'unread',
      created_at: new Date().toISOString(),
    };

    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memEnquiries.unshift(newRecord);
      return newRecord;
    }

    try {
      const { data, error } = await (supabasePublic.from('enquiries') as any)
        .insert({
          ...enquiry,
          status: 'unread',
        })
        .select()
        .single();

      if (error || !data) throw error;
      return data as Enquiry;
    } catch (err) {
      logger.error({ err }, 'Enquiry insert fallback to memory');
      memEnquiries.unshift(newRecord);
      return newRecord;
    }
  }

  static async getAll(): Promise<Enquiry[]> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return memEnquiries;
    }

    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return memEnquiries;
    return data as Enquiry[];
  }

  static async updateStatus(id: string, status: EnquiryStatus): Promise<Enquiry | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const item = memEnquiries.find((e) => e.id === id);
      if (item) item.status = status;
      return item || null;
    }

    const { data, error } = await (supabaseAdmin.from('enquiries') as any)
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) return null;
    return data as Enquiry;
  }
}
