import { z } from 'zod'

export const contentSchema = z.object({
  category: z.enum(['science', 'history', 'technology', 'ai', 'books']),
  title: z.string().min(1, 'Title is required').max(200, 'Title cannot exceed 200 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(500, 'Description cannot exceed 500 characters'),
  body: z.string().min(1, 'Body content is required'),
  imageURL: z
    .string()
    .trim()
    .url({ message: 'Please provide a valid image URL' })
    .optional()
    .or(z.literal('')),
  author: z.string().min(1, 'Author is required'),
  status: z.enum(['draft', 'published', 'archived']).default('published'),
  views: z.number().min(0).default(0),
})
