import { z } from 'zod'

const dateStringSchema = z
  .string()
  .transform((str) => str.split('T')[0])
  .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: 'Invalid date format, expected YYYY-MM-DD',
  })
  .optional()

export const vendorSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(200)
      .transform((s) => s.trim()),
    description: z
      .string()
      .max(1000)
      .transform((s) => s.trim())
      .optional(),
    rating: z.number().min(0).max(10).default(0),
    count: z.number().min(0).default(0),
    avg: z.number().min(0).default(0),
    min: z.number().min(0).default(0),
    max: z.number().min(0).default(0),
    from: dateStringSchema,
    to: dateStringSchema.optional(),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) return true
      return new Date(data.from) <= new Date(data.to)
    },
    { message: 'The "from" date cannot be later than the "to" date', path: ['from'] },
  )
