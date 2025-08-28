import { z } from 'zod'
export const commentSchema = z.object({
  user: z.string().nonempty('User is required'),
  vendor: z.string().nonempty('Vendor is required'),
  rating: z.number().min(1).max(5),
  comment: z.string().nonempty('No empty comments'),
})
