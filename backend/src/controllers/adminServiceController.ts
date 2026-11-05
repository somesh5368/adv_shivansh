import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { ServiceRepository } from '../repositories/serviceRepository.js';
import { AuditService } from '../services/auditService.js';
import { getParam } from '../utils/params.js';

export class AdminServiceController {
  static async listAll(req: AuthenticatedRequest, res: Response) {
    const areaId = req.query.practice_area_id as string | undefined;
    const services = areaId
      ? await ServiceRepository.getByPracticeArea(areaId, false)
      : await ServiceRepository.getAll(false);
    return ApiResponse.success(res, services);
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    const service = await ServiceRepository.create(req.body);

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'CREATE_SERVICE',
      resourceType: 'service',
      resourceId: service.id,
      details: { title: service.title, practice_area_id: service.practice_area_id },
    });

    return ApiResponse.created(res, service, 'Service created successfully');
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const updated = await ServiceRepository.update(id, req.body);
    if (!updated) throw ApiError.notFound('Service not found');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UPDATE_SERVICE',
      resourceType: 'service',
      resourceId: id,
    });

    return ApiResponse.success(res, updated, 'Service updated successfully');
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const success = await ServiceRepository.delete(id);
    if (!success) throw ApiError.badRequest('Failed to delete service');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'DELETE_SERVICE',
      resourceType: 'service',
      resourceId: id,
    });

    return ApiResponse.success(res, null, 'Service deleted successfully');
  }
}
