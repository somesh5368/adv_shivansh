import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ProfileRepository } from '../repositories/profileRepository.js';
import { AuditService } from '../services/auditService.js';
import { EmailService } from '../services/emailService.js';
import { env } from '../config/env.js';

export class AdminProfileController {
  static async getProfile(_req: AuthenticatedRequest, res: Response) {
    const profile = await ProfileRepository.getProfile();
    return ApiResponse.success(res, profile);
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    const updated = await ProfileRepository.updateProfile(req.body);

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UPDATE_ADVOCATE_PROFILE',
      resourceType: 'advocate_profile',
      resourceId: updated.id,
      details: { updatedFields: Object.keys(req.body) },
    });

    // Notify administrator
    await EmailService.sendContentUpdateNotice(updated.email || env.BREVO_SENDER_EMAIL, {
      contentType: 'Advocate Profile',
      title: updated.full_name,
      action: 'updated',
    });

    return ApiResponse.success(res, updated, 'Profile updated successfully');
  }
}

