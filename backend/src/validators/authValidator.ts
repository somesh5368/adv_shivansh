import { z } from 'zod';

export const verifySessionSchema = z.object({
  body: z.object({
    accessToken: z.string().min(1, 'Access token is required'),
  }),
});

export const testNotificationSchema = z.object({
  body: z.object({
    recipientEmail: z.string().email('Valid recipient email is required'),
    subject: z.string().min(3).max(150),
    message: z.string().min(5).max(1000),
  }),
});

export const sendOtpSchema = z.object({
  body: z.object({
    email: z.string().email('Valid administrator email is required'),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    newPassword: z.string().min(8, 'Password must contain at least 8 characters'),
  }),
});

export const revokeAdminSchema = z.object({
  body: z.object({
    email: z.string().email('Valid administrator email to revoke is required'),
  }),
});

