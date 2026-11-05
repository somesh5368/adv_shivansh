import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    full_name: z.string().min(2).max(100),
    designation: z.string().min(2).max(100),
    tagline: z.string().min(3).max(200),
    biography: z.string().min(10).max(5000),
    qualifications: z.string().min(2).max(500),
    enrolment_number: z.string().nullable().optional(),
    enrolment_council: z.string().nullable().optional(),
    image_path: z.string().nullable().optional(),
    email: z.string().email(),
    phone: z.string().min(8).max(20),
    office_address: z.string().min(5).max(300),
    office_timings: z.string().nullable().optional(),
  }),
});

