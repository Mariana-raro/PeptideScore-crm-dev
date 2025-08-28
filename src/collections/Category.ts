import { categoryBeforeChange } from '@/app/hooks/categoryHook'
import { CollectionConfig } from 'payload'

export const Category: CollectionConfig = {
  slug: 'category',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 200 },
    { name: 'description', type: 'text', required: false, maxLength: 900 },
  ],
  hooks: {
    beforeChange: [categoryBeforeChange],
  },
}
