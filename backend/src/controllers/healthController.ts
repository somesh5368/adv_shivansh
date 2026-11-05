import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse.js';
import { env } from '../config/env.js';

export class HealthController {
  static getHealth(_req: Request, res: Response) {
    return ApiResponse.success(res, {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
      services: {
        database: env.SUPABASE_URL.includes('placeholder-project') ? 'mock-mode' : 'configured',
        email: env.BREVO_API_KEY.includes('placeholder-brevo') ? 'simulated' : 'configured',
      },
    }, 'Service is operational');
  }
}

