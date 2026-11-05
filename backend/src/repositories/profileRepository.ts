import { supabaseAdmin, supabasePublic } from '../config/supabase.js';
import { env } from '../config/env.js';
import { AdvocateProfile } from '../types/index.js';
import { INITIAL_ADVOCATE_PROFILE } from './dataStore.js';
import { logger } from '../utils/logger.js';

let memProfile = { ...INITIAL_ADVOCATE_PROFILE };

export class ProfileRepository {
  static async getProfile(): Promise<AdvocateProfile> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return memProfile;
    }

    try {
      const { data, error } = await supabasePublic
        .from('advocate_profile')
        .select('*')
        .limit(1)
        .single();

      if (error || !data) {
        logger.warn({ error }, 'Could not fetch profile from Supabase, returning memory fallback');
        return memProfile;
      }
      return data as AdvocateProfile;
    } catch (err) {
      logger.error({ err }, 'Error querying advocate_profile');
      return memProfile;
    }
  }

  static async updateProfile(updates: Partial<AdvocateProfile>): Promise<AdvocateProfile> {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      memProfile = {
        ...memProfile,
        ...updates,
        updated_at: new Date().toISOString(),
      };
      return memProfile;
    }

    try {
      const current = await this.getProfile();
      const { data, error } = await (supabaseAdmin.from('advocate_profile') as any)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', current.id)
        .select()
        .single();

      if (error || !data) {
        throw new Error(`Failed to update profile: ${error?.message}`);
      }
      memProfile = data as AdvocateProfile;
      return data as AdvocateProfile;
    } catch (err: any) {
      logger.error({ err }, 'Profile update failed in Supabase');
      memProfile = { ...memProfile, ...updates, updated_at: new Date().toISOString() };
      return memProfile;
    }
  }
}
