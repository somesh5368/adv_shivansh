import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { PracticeAreaRepository } from '../repositories/practiceAreaRepository.js';
import { AuditService } from '../services/auditService.js';
import { getParam } from '../utils/params.js';

export class AdminPracticeAreaController {
  static async listAll(_req: AuthenticatedRequest, res: Response) {
    const areas = await PracticeAreaRepository.getAll(false);
    return ApiResponse.success(res, areas);
  }

  static async getById(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const area = await PracticeAreaRepository.getById(id);
    if (!area) throw ApiError.notFound('Practice area not found');
    return ApiResponse.success(res, area);
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    const area = await PracticeAreaRepository.create(req.body);

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'CREATE_PRACTICE_AREA',
      resourceType: 'practice_area',
      resourceId: area.id,
      details: { title: area.title, slug: area.slug },
    });

    return ApiResponse.created(res, area, 'Practice area created successfully');
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const updated = await PracticeAreaRepository.update(id, req.body);
    if (!updated) throw ApiError.notFound('Practice area not found');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UPDATE_PRACTICE_AREA',
      resourceType: 'practice_area',
      resourceId: id,
    });

    return ApiResponse.success(res, updated, 'Practice area updated successfully');
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const success = await PracticeAreaRepository.delete(id);
    if (!success) throw ApiError.badRequest('Failed to delete practice area');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'DELETE_PRACTICE_AREA',
      resourceType: 'practice_area',
      resourceId: id,
    });

    return ApiResponse.success(res, null, 'Practice area deleted successfully');
  }
}
