import { contentBeforeChange } from '@/app/hooks/contentHooks'
import { CollectionConfig } from 'payload'

export const Content: CollectionConfig = {
  slug: 'content',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['science', 'history', 'technology', 'ai', 'books'],
    },
    { name: 'title', type: 'text', required: true, maxLength: 200 },
    { name: 'description', type: 'textarea', required: true, maxLength: 500 },
    { name: 'body', type: 'textarea', required: true },
    { name: 'imageURL', type: 'text' },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'archived'],
      defaultValue: 'published',
    },
    { name: 'views', type: 'number', defaultValue: 0, min: 0 },
  ],
  hooks: {
    beforeChange: [contentBeforeChange],
  },
}
