import { CollectionConfig } from 'payload'

export const CMSUsers: CollectionConfig = {
  slug: 'crmusers',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'viewer', 'vendor'],
      defaultValue: 'viewer',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
