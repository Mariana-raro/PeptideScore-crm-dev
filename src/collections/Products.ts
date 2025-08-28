import { productBeforeChange } from '@/app/hooks/productsHooks'
import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 200 },
    { name: 'rating', type: 'number', min: 0, max: 5, defaultValue: 0 },
    { name: 'avg', type: 'number', min: 0, defaultValue: 0 },
    { name: 'min', type: 'number', min: 0, defaultValue: 0 },
    { name: 'max', type: 'number', min: 0, defaultValue: 0 },
    { name: 'oldest', type: 'date' },
    { name: 'latest', type: 'date' },
    { name: 'count', type: 'number', min: 0, defaultValue: 0 },
  ],
  hooks: {
    beforeChange: [productBeforeChange],
  },
}
