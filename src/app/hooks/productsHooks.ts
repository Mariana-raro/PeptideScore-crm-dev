import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { productSchema } from '../scheme/product.scheme'
import { ValidationError } from 'payload'
import { z } from 'zod'

export const productBeforeChange: BeforeChangeHook = async ({ data }) => {
  try {
    const formatDate = (date?: string | Date) => {
      if (!date) return undefined
      const d = new Date(date)
      return d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    }

    const normalizedData = {
      ...data,
      oldest: formatDate(data.oldest),
      latest: formatDate(new Date()),
    }

    const result = await productSchema.parseAsync(normalizedData)

    if (result.min > result.max) {
      throw new Error('Minimum value cannot be greater than maximum value')
    }

    return result
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message,
      }))
      throw new ValidationError({ errors })
    }
    throw error
  }
}
