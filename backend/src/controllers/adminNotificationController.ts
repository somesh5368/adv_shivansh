import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { EmailService } from '../services/emailService.js';
import { EnquiryRepository } from '../repositories/enquiryRepository.js';
import { supabaseAdmin } from '../config/supabase.js';
import { getParam } from '../utils/params.js';
import { env } from '../config/env.js';

export class AdminNotificationController {
  static async testNotification(req: AuthenticatedRequest, res: Response) {
    const { recipientEmail, subject, message } = req.body;

    const sent = await EmailService.sendEmail({
      to: [{ email: recipientEmail }],
      subject: `[Test Notification] ${subject}`,
      htmlContent: `<p>${message}</p>`,
      textContent: message,
    });

    return ApiResponse.success(res, { sent }, 'Test notification dispatched');
  }

  static async listEnquiries(_req: AuthenticatedRequest, res: Response) {
    const enquiries = await EnquiryRepository.getAll();
    return ApiResponse.success(res, enquiries);
  }

  static async updateEnquiryStatus(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const { status } = req.body;
    const updated = await EnquiryRepository.updateStatus(id, status);
    return ApiResponse.success(res, updated, 'Enquiry status updated');
  }

  static async listAuditLogs(_req: AuthenticatedRequest, res: Response) {
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      return ApiResponse.success(res, [
        {
          id: 'log-1',
          actor_user_id: '00000000-0000-0000-0000-000000000001',
          action: 'SYSTEM_INITIALIZED',
          resource_type: 'system',
          resource_id: 'advocate-suite',
          created_at: new Date().toISOString(),
        },
      ]);
    }

    const { data } = await supabaseAdmin
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    return ApiResponse.success(res, data || []);
  }
}
