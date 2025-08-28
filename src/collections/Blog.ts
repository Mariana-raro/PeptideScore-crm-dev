// src/collections/BlogPosts.ts
import { blogBeforeChange } from '@/app/hooks/blogHook'
import { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 200 },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 500 },
    { name: 'content', type: 'textarea', required: true },

    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    { name: 'author', type: 'text', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'category',
      required: true,
    },

    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'Enter a tag',
          },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'published',
    },
    { name: 'publishedAt', type: 'date' },
    { name: 'readTime', type: 'text', admin: { readOnly: true } },
  ],
  hooks: {
    beforeChange: [blogBeforeChange],
  },
}
