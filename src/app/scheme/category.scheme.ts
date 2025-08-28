import { z } from 'zod'

export const categoryScheme = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z
    .string()
    .max(900, 'The description only accepts 900 characters or less')
    .optional(),
})
