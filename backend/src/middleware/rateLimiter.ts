import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/apiError.js';

// General rate limiter for standard public endpoints (100 requests per 15 minutes)
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(ApiError.tooManyRequests('Too many requests from this IP, please try again in 15 minutes.'));
  },
});

// Stricter rate limiter for sensitive actions like contact enquiries and auth verification
export const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(ApiError.tooManyRequests('Too many attempts. For security reasons, please wait 15 minutes before retrying.'));
  },
});

