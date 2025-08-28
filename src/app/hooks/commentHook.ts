// src/app/hooks/commentHooks.ts
import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { commentSchema } from '../scheme/comment.scheme'

export const commentBeforeChange: BeforeChangeHook = async ({ data, req }) => {
  commentSchema.parse(data)

  const userExists = await req.payload.find({
    collection: 'users',
    where: {
      id: { equals: data.user },
    },
  })

  if (!userExists.docs.length) {
    throw new Error('User not registered')
  }

  const vendorExists = await req.payload.find({
    collection: 'vendors',
    where: { id: { equals: data.vendor } },
  })

  if (!vendorExists.docs.length) {
    throw new Error('Invalid Vendor')
  }

  return data
}
