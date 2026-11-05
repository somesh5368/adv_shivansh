import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { StorageService, StorageBucket } from '../services/storageService.js';
import { AuditService } from '../services/auditService.js';
import { getParam } from '../utils/params.js';

export class AdminMediaController {
  static async upload(req: AuthenticatedRequest, res: Response) {
    const file = req.file;
    const bucket = (req.body.bucket as StorageBucket) || 'site-assets';

    if (!file) {
      throw ApiError.badRequest('No image file provided in form field "image"');
    }

    if (!['profile-images', 'site-assets', 'article-images'].includes(bucket)) {
      throw ApiError.badRequest('Invalid bucket specified');
    }

    const uploaded = await StorageService.uploadImage(
      bucket,
      file.buffer,
      file.originalname,
      file.mimetype
    );

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UPLOAD_MEDIA',
      resourceType: 'storage',
      resourceId: uploaded.path,
      details: { bucket, fileName: file.originalname, size: file.size },
    });

    return ApiResponse.created(res, uploaded, 'Image uploaded successfully');
  }

  static async listFiles(req: AuthenticatedRequest, res: Response) {
    const bucket = (req.query.bucket as StorageBucket) || 'site-assets';

    if (!['profile-images', 'site-assets', 'article-images'].includes(bucket)) {
      throw ApiError.badRequest('Invalid bucket specified');
    }

    const files = await StorageService.listFiles(bucket);
    return ApiResponse.success(res, files);
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const bucket = getParam(req.params.bucket) as StorageBucket;
    const path = getParam(req.params.path);

    if (!['profile-images', 'site-assets', 'article-images'].includes(bucket)) {
      throw ApiError.badRequest('Invalid bucket specified');
    }

    const success = await StorageService.deleteImage(bucket, path);
    if (!success) {
      throw ApiError.internal('Failed to delete image');
    }

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'DELETE_MEDIA',
      resourceType: 'storage',
      resourceId: path,
      details: { bucket },
    });

    return ApiResponse.success(res, null, 'Media deleted successfully');
  }
}
