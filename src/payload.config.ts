// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { CMSUsers } from './collections/CMSUsers'
import { Content } from './collections/Content'
import { Products } from './collections/Products'
import { Vendors } from './collections/Vendor'
import { BlogPosts } from './collections/Blog'
import { Media } from './collections/Media'
import { Category } from './collections/Category'
import { Comments } from './collections/Comments'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: CMSUsers.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      collections: ['blog-posts', 'vendors'],
      url: ({ data, collectionConfig, locale }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'

        if (collectionConfig?.slug === 'blog-posts') {
          return `${baseUrl}/preview/blog/${data.slug}${locale ? `?locale=${locale.code}` : ''}`
        }

        if (collectionConfig?.slug === 'vendors') {
          return `${baseUrl}/preview/vendor/${data.vendorName}${locale ? `?locale=${locale.code}` : ''}`
        }

        // Fallback to home
        return `${baseUrl}${locale ? `?locale=${locale.code}` : ''}`
      },
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [CMSUsers, Users, Content, Products, Vendors, BlogPosts, Media, Category, Comments],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: [process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000', 'http://localhost:4000'],
  csrf: [process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000', 'http://localhost:4000'],
  // serverURL: 'http://localhost:4000',
  serverURL: 'http://208.109.37.255:4000',
})
