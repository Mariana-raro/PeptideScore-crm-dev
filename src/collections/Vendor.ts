import { validateVendorClaimHook, validateVendorHook } from '@/app/hooks/vendorHooks'
import type { CollectionConfig } from 'payload'

export const Vendors: CollectionConfig = {
  slug: 'vendors',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Vendor name',
      },
    },
    {
      name: 'vendorName',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Vendor name',
        disabled: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 1000,
      admin: {
        description: 'Vendor description',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 10,
      defaultValue: 0,
      admin: {
        description: 'Rating from 0 to 10',
      },
    },
    {
      name: 'count',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Count cannot be negative',
      },
    },
    {
      name: 'avg',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Average value cannot be negative',
      },
    },
    {
      name: 'min',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Minimum value cannot be negative',
      },
    },
    {
      name: 'max',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Maximum value cannot be negative',
      },
    },
    {
      name: 'from',
      type: 'date',
      required: true,
      admin: {
        description: 'Starting date',
      },
    },
    {
      name: 'to',
      type: 'date',
      required: false,
      admin: {
        description: 'Latest update date',
        // disabled: true,
      },
    },
    // Validate role of an user, prevent manipulation of this status
    {
      name: 'status',
      type: 'select',
      defaultValue: 'unclaimed',
      options: [
        { label: 'Unclaimed', value: 'unclaimed' },
        { label: 'Pending Verification', value: 'pending' },
        { label: 'Claimed', value: 'claimed' },
        { label: 'Rejected', value: 'rejected' },
      ],
    },
    {
      name: 'claimedBy',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'claimedAt',
      type: 'date',
    },
    {
      name: 'vendorDomain',
      type: 'text',
      required: true,
    },
  ],

  hooks: {
    beforeChange: [validateVendorHook, validateVendorClaimHook],
  },
  timestamps: true,
}
