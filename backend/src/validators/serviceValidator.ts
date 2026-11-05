import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    practice_area_id: z.string().uuid('Invalid practice area ID'),
    title: z.string().min(2).max(100),
    slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
    description: z.string().min(10).max(1000),
    display_order: z.number().int().min(0).default(0),
    is_published: z.boolean().default(true),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid service ID'),
  }),
  body: z.object({
    practice_area_id: z.string().uuid().optional(),
    title: z.string().min(2).max(100).optional(),
    slug: z.string().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    description: z.string().min(10).max(1000).optional(),
    display_order: z.number().int().min(0).optional(),
    is_published: z.boolean().optional(),
  }),
});

