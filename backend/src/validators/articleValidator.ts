import { z } from 'zod';

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),
    slug: z.string().min(3).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens'),
    excerpt: z.string().min(10).max(500),
    content: z.string().min(20),
    cover_image_path: z.string().nullable().optional(),
    category: z.string().min(2).max(100),
    status: z.enum(['draft', 'published']).default('draft'),
    meta_title: z.string().max(150).nullable().optional(),
    meta_description: z.string().max(300).nullable().optional(),
  }),
});

export const updateArticleSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid article ID'),
  }),
  body: z.object({
    title: z.string().min(3).max(200).optional(),
    slug: z.string().min(3).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    excerpt: z.string().min(10).max(500).optional(),
    content: z.string().min(20).optional(),
    cover_image_path: z.string().nullable().optional(),
    category: z.string().min(2).max(100).optional(),
    status: z.enum(['draft', 'published']).optional(),
    meta_title: z.string().max(150).nullable().optional(),
    meta_description: z.string().max(300).nullable().optional(),
  }),
});

