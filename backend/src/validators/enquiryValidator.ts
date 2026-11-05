import { z } from 'zod';

export const createEnquirySchema = z.object({
  body: z.object({
    full_name: z.string().min(2).max(100),
    email: z.string().email('Please provide a valid email address'),
    phone: z.string().min(8).max(20),
    subject: z.string().min(3).max(150),
    message: z.string().min(10).max(2000),
  }),
});

