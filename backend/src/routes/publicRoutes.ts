import { Router } from 'express';
import { PublicController } from '../controllers/publicController.js';
import { generalLimiter, strictLimiter } from '../middleware/rateLimiter.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { createEnquirySchema } from '../validators/enquiryValidator.js';

const router = Router();

router.use(generalLimiter);

router.get('/profile', PublicController.getProfile);
router.get('/practice-areas', PublicController.getPracticeAreas);
router.get('/practice-areas/:slug', PublicController.getPracticeAreaBySlug);
router.get('/services', PublicController.getServices);
router.get('/articles', PublicController.getArticles);
router.get('/articles/:slug', PublicController.getArticleBySlug);
router.get('/settings', PublicController.getSettings);

// Enquiries endpoint with strict rate limiting to prevent spam
router.post(
  '/enquiries',
  strictLimiter,
  validateRequest(createEnquirySchema),
  PublicController.submitEnquiry
);

export default router;

