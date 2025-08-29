import { z } from 'zod'

export const productSchema = z.object({
  index: z.number().min(0, 'Index must be positive').optional(),
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(200, 'Product name cannot exceed 200 characters'),
  rating: z
    .number()
    .min(0, 'Rating cannot be negative')
    .max(5, 'Rating cannot exceed 5')
    .default(0),
  avg: z.number().min(0, 'Average cannot be negative').default(0),
  min: z.number().min(0, 'Minimum value cannot be negative').default(0),
  max: z.number().min(0, 'Maximum value cannot be negative').default(0),
  oldest: z.string(),
  latest: z.string().optional(),
  count: z.number().min(0, 'Count cannot be negative').default(0),
})
