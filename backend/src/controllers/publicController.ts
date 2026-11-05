import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { ProfileRepository } from '../repositories/profileRepository.js';
import { PracticeAreaRepository } from '../repositories/practiceAreaRepository.js';
import { ServiceRepository } from '../repositories/serviceRepository.js';
import { ArticleRepository } from '../repositories/articleRepository.js';
import { SettingRepository } from '../repositories/settingRepository.js';
import { EnquiryRepository } from '../repositories/enquiryRepository.js';
import { EmailService } from '../services/emailService.js';
import { getParam } from '../utils/params.js';
import { env } from '../config/env.js';

export class PublicController {
  static async getProfile(_req: Request, res: Response) {
    const profile = await ProfileRepository.getProfile();
    return ApiResponse.success(res, profile);
  }

  static async getPracticeAreas(_req: Request, res: Response) {
    const areas = await PracticeAreaRepository.getAll(true);
    return ApiResponse.success(res, areas);
  }

  static async getPracticeAreaBySlug(req: Request, res: Response) {
    const slug = getParam(req.params.slug);
    const area = await PracticeAreaRepository.getBySlug(slug, true);
    if (!area) throw ApiError.notFound(`Practice area with slug '${slug}' not found`);
    return ApiResponse.success(res, area);
  }

  static async getServices(_req: Request, res: Response) {
    const services = await ServiceRepository.getAll(true);
    return ApiResponse.success(res, services);
  }

  static async getArticles(req: Request, res: Response) {
    const category = req.query.category as string | undefined;
    let articles = await ArticleRepository.getAll(true);
    if (category) {
      articles = articles.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }
    return ApiResponse.success(res, articles);
  }

  static async getArticleBySlug(req: Request, res: Response) {
    const slug = getParam(req.params.slug);
    const article = await ArticleRepository.getBySlug(slug, true);
    if (!article) throw ApiError.notFound(`Article with slug '${slug}' not found`);
    return ApiResponse.success(res, article);
  }

  static async getSettings(_req: Request, res: Response) {
    const settings = await SettingRepository.getAll(true);
    return ApiResponse.success(res, settings);
  }

  static async submitEnquiry(req: Request, res: Response) {
    const { full_name, email, phone, subject, message } = req.body;

    const enquiry = await EnquiryRepository.create({
      full_name,
      email,
      phone,
      subject,
      message,
    });

    // Notify advocate via Brevo transactional email
    const profile = await ProfileRepository.getProfile();
    await EmailService.sendEnquiryNotification(profile.email || env.BREVO_SENDER_EMAIL, {
      fullName: full_name,
      email,
      phone,
      subject,
      message,
    });

    return ApiResponse.created(
      res,
      { id: enquiry.id, message: 'Your message has been received. Our office will respond shortly.' },
      'Enquiry submitted successfully'
    );
  }
}
