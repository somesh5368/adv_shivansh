import { Response } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { ArticleRepository } from '../repositories/articleRepository.js';
import { sanitizeRichText } from '../utils/sanitize.js';
import { AuditService } from '../services/auditService.js';
import { EmailService } from '../services/emailService.js';
import { getParam } from '../utils/params.js';
import { env } from '../config/env.js';

export class AdminArticleController {
  static async listAll(_req: AuthenticatedRequest, res: Response) {
    const articles = await ArticleRepository.getAll(false);
    return ApiResponse.success(res, articles);
  }

  static async getById(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const article = await ArticleRepository.getById(id);
    if (!article) throw ApiError.notFound('Article not found');
    return ApiResponse.success(res, article);
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    const payload = { ...req.body };
    if (payload.content) {
      payload.content = sanitizeRichText(payload.content);
    }

    const article = await ArticleRepository.create(payload);

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'CREATE_ARTICLE',
      resourceType: 'article',
      resourceId: article.id,
      details: { title: article.title, status: article.status },
    });

    return ApiResponse.created(res, article, 'Article created successfully');
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const payload = { ...req.body };
    if (payload.content) {
      payload.content = sanitizeRichText(payload.content);
    }

    const updated = await ArticleRepository.update(id, payload);
    if (!updated) throw ApiError.notFound('Article not found');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UPDATE_ARTICLE',
      resourceType: 'article',
      resourceId: id,
    });

    return ApiResponse.success(res, updated, 'Article updated successfully');
  }

  static async publish(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const updated = await ArticleRepository.setStatus(id, 'published');
    if (!updated) throw ApiError.notFound('Article not found');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'PUBLISH_ARTICLE',
      resourceType: 'article',
      resourceId: id,
      details: { title: updated.title },
    });

    // Notify via email
    await EmailService.sendContentUpdateNotice(env.BREVO_SENDER_EMAIL, {
      contentType: 'Legal Resource Article',
      title: updated.title,
      action: 'published',
    });

    return ApiResponse.success(res, updated, 'Article published successfully');
  }

  static async unpublish(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const updated = await ArticleRepository.setStatus(id, 'draft');
    if (!updated) throw ApiError.notFound('Article not found');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'UNPUBLISH_ARTICLE',
      resourceType: 'article',
      resourceId: id,
      details: { title: updated.title },
    });

    return ApiResponse.success(res, updated, 'Article unpublished (saved as draft)');
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const id = getParam(req.params.id);
    const success = await ArticleRepository.delete(id);
    if (!success) throw ApiError.badRequest('Failed to delete article');

    await AuditService.log({
      actorUserId: req.user?.id,
      action: 'DELETE_ARTICLE',
      resourceType: 'article',
      resourceId: id,
    });

    return ApiResponse.success(res, null, 'Article deleted successfully');
  }
}
