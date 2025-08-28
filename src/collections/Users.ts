import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'provider',
      type: 'select',
      options: [
        { label: 'Local', value: 'local' },
        { label: 'Google', value: 'google' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'TikTok', value: 'tiktok' },
      ],
      defaultValue: 'local',
      required: true,
    },
    {
      name: 'socialId',
      type: 'text',
      required: false,
    },
    // {
    //   name: 'avatar',
    //   type: 'upload',
    //   relationTo: 'media', // asegúrate de tener la colección 'media' configurada para subir imágenes
    //   required: false,
    // },
    {
      name: 'tokenVersion',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
