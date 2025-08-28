import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { categoryScheme } from '../scheme/category.scheme'

export const categoryBeforeChange: BeforeChangeHook = async ({ data }) => {
  const result = await categoryScheme.parseAsync({
    ...data,
    name: data.name?.toUpperCase(),
  })
  return result
}
