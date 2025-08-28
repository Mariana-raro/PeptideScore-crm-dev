import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { contentSchema } from '../scheme/content.scheme'

export const contentBeforeChange: BeforeChangeHook = async ({ data }) => {
  const result = await contentSchema.parseAsync({
    ...data,
    category: data.category?.toLowerCase(),
  })

  return result
}
