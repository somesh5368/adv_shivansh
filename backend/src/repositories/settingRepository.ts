import { supabaseAdmin, supabasePublic } from '../config/supabase.js';
import { env } from '../config/env.js';
import { SiteSetting } from '../types/index.js';
import { INITIAL_SETTINGS } from './dataStore.js';
import { logger } from '../utils/logger.js';

let memSettings = [...INITIAL_SETTINGS];

export class SettingRepository {
  static async getAll(publicOnly = true): Promise<SiteSetting[]> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return publicOnly ? memSettings.filter((s) => s.is_public) : memSettings;
    }

    try {
      let query = (publicOnly ? supabasePublic : supabaseAdmin).from('site_settings').select('*');
      if (publicOnly) query = query.eq('is_public', true);
      const { data, error } = await query;
      if (error || !data || data.length === 0) {
        return publicOnly ? memSettings.filter((s) => s.is_public) : memSettings;
      }
      return data as SiteSetting[];
    } catch (err) {
      logger.error({ err }, 'Error querying site_settings');
      return memSettings;
    }
  }

  static async getByKey(key: string, publicOnly = true): Promise<SiteSetting | null> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return (
        memSettings.find((s) => s.setting_key === key && (!publicOnly || s.is_public)) ||
        null
      );
    }

    try {
      let query = (publicOnly ? supabasePublic : supabaseAdmin)
        .from('site_settings')
        .select('*')
        .eq('setting_key', key);
      if (publicOnly) query = query.eq('is_public', true);
      const { data, error } = await query.single();
      if (error || !data) return null;
      return data as SiteSetting;
    } catch {
      return null;
    }
  }

  static async upsert(key: string, value: Record<string, any>, isPublic = false): Promise<SiteSetting> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      const idx = memSettings.findIndex((s) => s.setting_key === key);
      if (idx >= 0) {
        memSettings[idx] = {
          ...memSettings[idx],
          setting_value: value,
          is_public: isPublic,
          updated_at: new Date().toISOString(),
        };
        return memSettings[idx];
      } else {
        const newRecord: SiteSetting = {
          id: `set-${Date.now()}`,
          setting_key: key,
          setting_value: value,
          is_public: isPublic,
          updated_at: new Date().toISOString(),
        };
        memSettings.push(newRecord);
        return newRecord;
      }
    }

    const { data, error } = await (supabaseAdmin.from('site_settings') as any)
      .upsert(
        {
          setting_key: key,
          setting_value: value,
          is_public: isPublic,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'setting_key' }
      )
      .select()
      .single();

    if (error || !data) throw error;
    return data as SiteSetting;
  }
}
