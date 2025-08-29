import { Field } from 'payload'

export const commonFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      description: 'Unique identifier for the URL (e.g., "about", "homepage")',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    maxLength: 200,
  },
  {
    name: 'metaDescription',
    type: 'textarea',
    maxLength: 300,
    admin: {
      description: 'SEO meta description',
    },
  },
  {
    name: 'status',
    type: 'select',
    options: ['draft', 'published', 'archived'],
    defaultValue: 'published',
  },
  {
    name: 'views',
    type: 'number',
    defaultValue: 0,
    min: 0,
  },
]
