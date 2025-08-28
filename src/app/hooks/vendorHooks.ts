import { z } from 'zod'

import { vendorSchema } from '../scheme/vendor.scheme'
import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { ValidationError } from 'payload'

const getDomain = (str?: string) =>
  str
    ?.toLowerCase()
    .replace(/^www\./, '')
    .split('@')
    .pop() || ''

export const validateVendorHook: BeforeChangeHook = async ({ data }) => {
  try {
    const result = await vendorSchema.parseAsync({ ...data })
    return { ...result, vendorName: result.name }
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

export const validateVendorClaimHook: BeforeChangeHook = async ({ data, req }) => {
  if (!data.claimedBy || !data.vendorDomain) return data

  const userEmail = req.user?.email
  if (!userEmail) {
    throw new Error('No user authenticated')
  }

  const emailDomain = getDomain(userEmail)
  const vendorDomain = getDomain(data.vendorDomain)

  if (emailDomain === vendorDomain) {
    return {
      ...data,
      status: 'claimed',
      claimedAt: new Date().toISOString(),
    }
  } else {
    return {
      ...data,
      status: 'pending',
    }
  }
}
