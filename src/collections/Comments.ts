// src/collections/Comments.ts
import { CollectionConfig } from 'payload'
import { commentBeforeChange } from '@/app/hooks/commentHook'

export const Comments: CollectionConfig = {
  slug: 'comments',
  admin: {
    useAsTitle: 'comment',
    defaultColumns: ['user', 'vendor', 'rating', 'comment'],
  },
  access: {
    read: () => true,
    create: async ({ req: { user } }) => {
      return !!user
    },
    update: async ({ req: { user } }) => {
      return !!user && user.role === 'admin'
    },
    delete: async ({ req: { user } }) => {
      return !!user && user.role === 'admin'
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { description: 'User comment' },
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'vendors',
      required: true,
      admin: { description: 'Vendor being commented on' },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: { description: 'Rating from 1 to 5' },
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      admin: { description: 'Comment text' },
    },
  ],
  hooks: {
    beforeChange: [commentBeforeChange],
  },
  timestamps: true,
}
