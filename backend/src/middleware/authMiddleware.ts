import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/index.js';
import { supabaseAdmin } from '../config/supabase.js';
import { ApiError } from '../utils/apiError.js';
import { logger } from '../utils/logger.js';
import { env, isDev, isTest } from '../config/env.js';

export async function authMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(ApiError.unauthorized('Authentication token missing or invalid format. Please log in.'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return next(ApiError.unauthorized('Authentication token missing.'));
    }

    // Automated Test Suite ONLY: isolated mock token for vitest
    if (process.env.VITEST === 'true' && token === 'mock-admin-token') {
      req.user = {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'advshiv43@gmail.com',
        role: 'authenticated',
      };
      return next();
    }

    // If Supabase URL is placeholder and not in test/mock mode
    if (env.SUPABASE_URL.includes('placeholder-project')) {
      logger.warn('Supabase URL is placeholder. Treating request with dev mock token if provided.');
      if (token === 'dev-token') {
        req.user = {
          id: '00000000-0000-0000-0000-000000000001',
          email: 'advshiv43@gmail.com',
          role: 'authenticated',
        };
        return next();
      }
      return next(ApiError.unauthorized('Authentication service configuration pending. Please configure Supabase keys.'));
    }

    // Verify token with Supabase Auth
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      logger.warn({ error }, 'Failed to verify Supabase Auth user token');
      return next(ApiError.unauthorized('Session has expired or is invalid. Please log in again.'));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      app_metadata: user.app_metadata,
      user_metadata: user.user_metadata,
    };

    next();
  } catch (err) {
    logger.error({ err }, 'Unexpected error in authMiddleware');
    next(ApiError.internal('Authentication processing failed'));
  }
}

