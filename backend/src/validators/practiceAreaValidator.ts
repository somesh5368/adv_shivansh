import { z } from 'zod';

export const createPracticeAreaSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(100),
    slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
    short_description: z.string().min(10).max(300),
    full_description: z.string().min(20).max(5000),
    image_path: z.string().nullable().optional(),
    display_order: z.number().int().min(0).default(0),
    is_published: z.boolean().default(true),
  }),
});

export const updatePracticeAreaSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid practice area ID'),
  }),
  body: z.object({
    title: z.string().min(2).max(100).optional(),
    slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    short_description: z.string().min(10).max(300).optional(),
    full_description: z.string().min(20).max(5000).optional(),
    image_path: z.string().nullable().optional(),
    display_order: z.number().int().min(0).optional(),
    is_published: z.boolean().optional(),
  }),
});

