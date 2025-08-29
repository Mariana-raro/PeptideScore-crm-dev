import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { productSchema } from '../scheme/product.scheme'
import { ValidationError } from 'payload'
import { z } from 'zod'

export const productBeforeChange: BeforeChangeHook = async ({ data, req }) => {
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

    if (!data.index) {
      const result = await req.payload.find({
        collection: 'products',
        sort: '-index',
        limit: 1,
      })

      const lastIndex = result.docs?.[0]?.index || 0
      data.index = lastIndex + 1
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
