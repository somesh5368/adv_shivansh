import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import apiRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ApiError } from './utils/apiError.js';

export function createApp(): Application {
  const app = express();

  // 1. Security Headers
  const defaultAllowedOrigins = [
    'https://adv-shivansh.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  const configuredOrigins = env.FRONTEND_ORIGIN
    ? env.FRONTEND_ORIGIN.split(',').map((o) => o.trim().replace(/\/$/, ''))
    : [];

  const allowedOrigins = new Set([
    ...defaultAllowedOrigins,
    ...configuredOrigins,
  ]);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'https:'],
          connectSrc: ["'self'", ...allowedOrigins, env.SUPABASE_URL],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );

  // 2. Strict CORS Configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. server-to-server or test tools)
        if (!origin) {
          return callback(null, true);
        }

        const normalizedOrigin = origin.replace(/\/$/, '');
        if (
          allowedOrigins.has(normalizedOrigin) ||
          (normalizedOrigin.endsWith('.vercel.app') && normalizedOrigin.includes('shivansh'))
        ) {
          return callback(null, true);
        }

        logger.warn({ origin: normalizedOrigin }, 'CORS blocked unauthorized origin request');
        return callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // 3. Request Parsers
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true, limit: '5mb' }));

  // 4. Request Logging
  app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.debug({ method: req.method, url: req.url, ip: req.ip }, 'Incoming HTTP Request');
    next();
  });

  // 5. Mount API Routes
  app.use('/api', apiRouter);

  // 6. 404 Route Handler
  app.use((req: Request, _res: Response, next: NextFunction) => {
    next(ApiError.notFound(`Cannot ${req.method} ${req.originalUrl}`));
  });

  // 7. Centralized Error Handler
  app.use(errorHandler);

  return app;
}

