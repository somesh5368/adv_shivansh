import { supabaseAdmin, supabasePublic } from '../config/supabase.js';
import { env } from '../config/env.js';
import { PracticeArea } from '../types/index.js';
import { INITIAL_PRACTICE_AREAS, INITIAL_SERVICES } from './dataStore.js';
import { logger } from '../utils/logger.js';

let memPracticeAreas = [...INITIAL_PRACTICE_AREAS];

export class PracticeAreaRepository {
  static async getAll(publishedOnly = true): Promise<PracticeArea[]> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const areas = publishedOnly
        ? memPracticeAreas.filter((a) => a.is_published)
        : memPracticeAreas;
      return areas.sort((a, b) => a.display_order - b.display_order);
    }

    try {
      let query = (publishedOnly ? supabasePublic : supabaseAdmin)
        .from('practice_areas')
        .select('*, services(*)');

      if (publishedOnly) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query.order('display_order', { ascending: true });

      if (error || !data || data.length === 0) {
        return publishedOnly
          ? memPracticeAreas.filter((a) => a.is_published)
          : memPracticeAreas;
      }

      return data as PracticeArea[];
    } catch (err) {
      logger.error({ err }, 'Error querying practice_areas');
      return memPracticeAreas;
    }
  }

  static async getBySlug(slug: string, publishedOnly = true): Promise<PracticeArea | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const area = memPracticeAreas.find(
        (a) => a.slug === slug && (!publishedOnly || a.is_published)
      );
      if (!area) return null;
      const services = INITIAL_SERVICES.filter(
        (s) => s.practice_area_id === area.id && (!publishedOnly || s.is_published)
      );
      return { ...area, services };
    }

    try {
      let query = (publishedOnly ? supabasePublic : supabaseAdmin)
        .from('practice_areas')
        .select('*, services(*)')
        .eq('slug', slug);

      if (publishedOnly) {
        query = query.eq('is_published', true);
      }

      const { data, error } = await query.single();
      if (error || !data) {
        const area = memPracticeAreas.find(
          (a) => a.slug === slug && (!publishedOnly || a.is_published)
        );
        if (!area) return null;
        const services = INITIAL_SERVICES.filter(
          (s) => s.practice_area_id === area.id && (!publishedOnly || s.is_published)
        );
        return { ...area, services };
      }
      return data as PracticeArea;
    } catch (err) {
      logger.error({ err }, 'Error fetching practice area by slug');
      const area = memPracticeAreas.find(
        (a) => a.slug === slug && (!publishedOnly || a.is_published)
      );
      if (!area) return null;
      const services = INITIAL_SERVICES.filter(
        (s) => s.practice_area_id === area.id && (!publishedOnly || s.is_published)
      );
      return { ...area, services };
    }
  }

  static async getById(id: string): Promise<PracticeArea | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return memPracticeAreas.find((a) => a.id === id) || null;
    }

    const { data } = await supabaseAdmin
      .from('practice_areas')
      .select('*, services(*)')
      .eq('id', id)
      .single();

    return (data as PracticeArea) || null;
  }

  static async create(practiceArea: Omit<PracticeArea, 'id' | 'created_at' | 'updated_at'>): Promise<PracticeArea> {
    const newRecord: PracticeArea = {
      ...practiceArea,
      id: `b0000000-0000-0000-0000-${Date.now().toString().slice(-12)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memPracticeAreas.push(newRecord);
      return newRecord;
    }

    try {
      const { data, error } = await (supabaseAdmin.from('practice_areas') as any)
        .insert(practiceArea)
        .select()
        .single();

      if (error || !data) throw error;
      return data as PracticeArea;
    } catch (err) {
      memPracticeAreas.push(newRecord);
      return newRecord;
    }
  }

  static async update(id: string, updates: Partial<PracticeArea>): Promise<PracticeArea | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const index = memPracticeAreas.findIndex((a) => a.id === id);
      if (index === -1) return null;
      memPracticeAreas[index] = {
        ...memPracticeAreas[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      return memPracticeAreas[index];
    }

    const { data, error } = await (supabaseAdmin.from('practice_areas') as any)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !data) return null;
    return data as PracticeArea;
  }

  static async delete(id: string): Promise<boolean> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memPracticeAreas = memPracticeAreas.filter((a) => a.id !== id);
      return true;
    }

    const { error } = await supabaseAdmin.from('practice_areas').delete().eq('id', id);
    return !error;
  }
}
