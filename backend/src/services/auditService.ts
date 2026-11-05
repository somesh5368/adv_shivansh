import { supabaseAdmin } from '../config/supabase.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export class AuditService {
  static async log(params: {
    actorUserId?: string | null;
    action: string;
    resourceType: string;
    resourceId?: string | null;
    details?: Record<string, any>;
  }): Promise<void> {
    try {
      if (env.SUPABASE_URL.includes('placeholder-project')) {
        logger.info({ audit: params }, '[AuditLog-Dev] Privileged action recorded');
        return;
      }

      const { error } = await (supabaseAdmin.from('audit_logs') as any).insert({
        actor_user_id: params.actorUserId || null,
        action: params.action,
        resource_type: params.resourceType,
        resource_id: params.resourceId || null,
        details: params.details || {},
      });

      if (error) {
        logger.error({ error, params }, 'Failed to write audit log to database');
      }
    } catch (err) {
      // Audit log failures must not crash the caller
      logger.error({ err, params }, 'Unexpected exception writing audit log');
    }
  }
}
