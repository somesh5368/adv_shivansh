import { Router } from 'express';
import multer from 'multer';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';

import { AdminProfileController } from '../controllers/adminProfileController.js';
import { AdminPracticeAreaController } from '../controllers/adminPracticeAreaController.js';
import { AdminServiceController } from '../controllers/adminServiceController.js';
import { AdminArticleController } from '../controllers/adminArticleController.js';
import { AdminMediaController } from '../controllers/adminMediaController.js';
import { AdminSettingController } from '../controllers/adminSettingController.js';
import { AdminNotificationController } from '../controllers/adminNotificationController.js';

import { updateProfileSchema } from '../validators/profileValidator.js';
import { createPracticeAreaSchema, updatePracticeAreaSchema } from '../validators/practiceAreaValidator.js';
import { createServiceSchema, updateServiceSchema } from '../validators/serviceValidator.js';
import { createArticleSchema, updateArticleSchema } from '../validators/articleValidator.js';
import { testNotificationSchema } from '../validators/authValidator.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

const router = Router();

// Strict security: ALL admin endpoints require verified session & admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// Profile
router.get('/profile', AdminProfileController.getProfile);
router.put('/profile', validateRequest(updateProfileSchema), AdminProfileController.updateProfile);

// Practice Areas
router.get('/practice-areas', AdminPracticeAreaController.listAll);
router.get('/practice-areas/:id', AdminPracticeAreaController.getById);
router.post('/practice-areas', validateRequest(createPracticeAreaSchema), AdminPracticeAreaController.create);
router.put('/practice-areas/:id', validateRequest(updatePracticeAreaSchema), AdminPracticeAreaController.update);
router.delete('/practice-areas/:id', AdminPracticeAreaController.delete);

// Services
router.get('/services', AdminServiceController.listAll);
router.post('/services', validateRequest(createServiceSchema), AdminServiceController.create);
router.put('/services/:id', validateRequest(updateServiceSchema), AdminServiceController.update);
router.delete('/services/:id', AdminServiceController.delete);

// Articles
router.get('/articles', AdminArticleController.listAll);
router.get('/articles/:id', AdminArticleController.getById);
router.post('/articles', validateRequest(createArticleSchema), AdminArticleController.create);
router.put('/articles/:id', validateRequest(updateArticleSchema), AdminArticleController.update);
router.post('/articles/:id/publish', AdminArticleController.publish);
router.post('/articles/:id/unpublish', AdminArticleController.unpublish);
router.delete('/articles/:id', AdminArticleController.delete);

// Media
router.get('/media', AdminMediaController.listFiles);
router.post('/media/upload', upload.single('image'), AdminMediaController.upload);
router.delete('/media/:bucket/:path', AdminMediaController.delete);

// Settings & Security
router.get('/settings', AdminSettingController.listAll);
router.post('/settings', AdminSettingController.upsert);
router.get('/audit-logs', AdminNotificationController.listAuditLogs);
router.get('/enquiries', AdminNotificationController.listEnquiries);
router.patch('/enquiries/:id/status', AdminNotificationController.updateEnquiryStatus);
router.post(
  '/notifications/test',
  validateRequest(testNotificationSchema),
  AdminNotificationController.testNotification
);

export default router;

