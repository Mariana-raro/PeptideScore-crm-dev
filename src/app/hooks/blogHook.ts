import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { blogSchema } from '../scheme/blog.scheme'

export const blogBeforeChange: BeforeChangeHook = async ({ data }) => {
  const validated = await blogSchema.parseAsync(data)

  if (!validated.slug && validated.title) {
    validated.slug = validated.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  const wordCount = validated.content?.split(/\s+/).filter(Boolean).length || 0
  validated.readTime = `${Math.max(1, Math.round(wordCount / 200))} min read`

  if (validated.status === 'published' && !validated.publishedAt) {
    validated.publishedAt = new Date().toISOString()
  }

  return validated
}
