// src/schemes/blog.schema.ts
import { z } from 'zod'

export const blogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title cannot exceed 200 characters'),
  slug: z.string().min(1, 'Slug is required').max(200, 'Slug cannot exceed 200 characters'),
  image: z.string().min(1, 'Image is required'),
  excerpt: z
    .string()
    .min(1, 'Excerpt is required')
    .max(500, 'Excerpt cannot exceed 500 characters'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z
    .array(
      z.object({
        tag: z.string().min(1, 'Tag is required'),
      }),
    )
    .optional(),

  status: z.enum(['draft', 'published']).default('published'),
  publishedAt: z.string().optional(),
  readTime: z.string().optional(),
})
