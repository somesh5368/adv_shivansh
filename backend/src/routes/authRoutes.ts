import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {
  verifySessionSchema,
  sendOtpSchema,
  changePasswordSchema,
  revokeAdminSchema,
} from '../validators/authValidator.js';
import { strictLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post(
  '/verify-session',
  strictLimiter,
  validateRequest(verifySessionSchema),
  AuthController.verifySession
);

router.post(
  '/send-otp',
  strictLimiter,
  validateRequest(sendOtpSchema),
  AuthController.sendOtp
);

router.get('/me', authMiddleware, AuthController.getMe);
router.post('/logout', authMiddleware, AuthController.logout);

router.post(
  '/change-password',
  authMiddleware,
  validateRequest(changePasswordSchema),
  AuthController.changePassword
);

router.get('/admins', authMiddleware, AuthController.listAdmins);

router.post(
  '/revoke-admin',
  authMiddleware,
  validateRequest(revokeAdminSchema),
  AuthController.revokeAdmin
);

export default router;

