import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { logger } from '../utils/logger.js';
import { isDev } from '../config/env.js';

export function errorHandler(
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  let statusCode = 500;
  let message = 'An unexpected error occurred';
  let details: any = undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else {
    logger.error(
      {
        err: err.message,
        stack: err.stack,
        url: req.originalUrl,
        method: req.method,
      },
      'Unhandled Server Exception'
    );
  }

  // Never leak stack traces or internal secrets to client
  res.status(statusCode).json({
    success: false,
    message,
    ...(details && { errors: details }),
    ...(isDev && !(err instanceof ApiError) && { stack: err.stack }),
  });
}

