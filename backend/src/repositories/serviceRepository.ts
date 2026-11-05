import { supabaseAdmin, supabasePublic } from '../config/supabase.js';
import { env } from '../config/env.js';
import { Service } from '../types/index.js';
import { INITIAL_SERVICES } from './dataStore.js';
import { logger } from '../utils/logger.js';

let memServices = [...INITIAL_SERVICES];

export class ServiceRepository {
  static async getAll(publishedOnly = true): Promise<Service[]> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const services = publishedOnly
        ? memServices.filter((s) => s.is_published)
        : memServices;
      return services.sort((a, b) => a.display_order - b.display_order);
    }

    try {
      let query = (publishedOnly ? supabasePublic : supabaseAdmin).from('services').select('*');
      if (publishedOnly) query = query.eq('is_published', true);
      const { data, error } = await query.order('display_order', { ascending: true });
      if (error || !data || data.length === 0) {
        return publishedOnly ? memServices.filter((s) => s.is_published) : memServices;
      }
      return data as Service[];
    } catch (err) {
      logger.error({ err }, 'Error querying services');
      return memServices;
    }
  }

  static async getByPracticeArea(practiceAreaId: string, publishedOnly = true): Promise<Service[]> {
    const all = await this.getAll(publishedOnly);
    return all.filter((s) => s.practice_area_id === practiceAreaId);
  }

  static async getById(id: string): Promise<Service | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return memServices.find((s) => s.id === id) || null;
    }
    const { data } = await supabaseAdmin.from('services').select('*').eq('id', id).single();
    return (data as Service) || null;
  }

  static async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Promise<Service> {
    const newRecord: Service = {
      ...service,
      id: `s-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memServices.push(newRecord);
      return newRecord;
    }

    try {
      const { data, error } = await (supabaseAdmin.from('services') as any)
        .insert(service)
        .select()
        .single();
      if (error || !data) throw error;
      return data as Service;
    } catch {
      memServices.push(newRecord);
      return newRecord;
    }
  }

  static async update(id: string, updates: Partial<Service>): Promise<Service | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const idx = memServices.findIndex((s) => s.id === id);
      if (idx === -1) return null;
      memServices[idx] = {
        ...memServices[idx],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      return memServices[idx];
    }

    const { data, error } = await (supabaseAdmin.from('services') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) return null;
    return data as Service;
  }

  static async delete(id: string): Promise<boolean> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memServices = memServices.filter((s) => s.id !== id);
      return true;
    }
    const { error } = await supabaseAdmin.from('services').delete().eq('id', id);
    return !error;
  }
}
