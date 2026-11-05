import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { SettingRepository } from '../repositories/settingRepository.js';
import { AuditService } from '../services/auditService.js';

export class AdminSettingController {
  static async listAll(_req: AuthenticatedRequest, res: Response) {
    const settings = await SettingRepository.getAll(false);
    return ApiResponse.success(res, settings);
  }

  static async upsert(req: AuthenticatedRequest, res: Response) {
    const { setting_key, setting_value, is_public } = req.body;
    const setting = await SettingRepository.upsert(setting_key, setting_value, !!is_public);

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UPDATE_SITE_SETTING',
      resourceType: 'site_settings',
      resourceId: setting_key,
    });

    return ApiResponse.success(res, setting, 'Setting saved successfully');
  }
}

