import { contentBeforeChange } from '@/app/hooks/contentHooks'
import { CollectionConfig } from 'payload'

import { commonFields } from './commonFields'
import { aboutFields } from './aboutFields'

export const Content: CollectionConfig = {
  slug: 'content',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'pageType',
      type: 'select',
      required: true,
      options: [
        { label: 'Homepage', value: 'homepage' },
        { label: 'About', value: 'about' },
        { label: 'Methodology', value: 'methodology' },
        { label: 'Free Sample Test', value: 'free-sample-test' },
        { label: 'General Content', value: 'general' },
      ],
      defaultValue: 'general',
    },

    // Campos comunes
    ...commonFields,

    // Campos específicos de "about"
    ...aboutFields,
  ],
  hooks: {
    beforeChange: [contentBeforeChange],
  },
}
