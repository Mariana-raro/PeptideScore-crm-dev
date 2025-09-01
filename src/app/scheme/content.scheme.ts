import { z } from 'zod'

const columnSchema = z.object({
  width: z.enum(['full', '1/2', '1/3', '1/4', '2/3', '3/4']),
  content: z.any(), // RichText content
  image: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().url().optional(),
})

const sectionSchema = z.object({
  sectionType: z.enum([
    'hero',
    'mission',
    'values',
    'approach',
    'team',
    'backers',
    'cta',
    'custom',
  ]),
  backgroundColor: z.string().optional(),
  layout: z.enum(['full', 'two-columns', 'three-columns', 'grid']),
  columns: z.array(columnSchema).optional(),
})

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  image: z.string().optional(),
  linkedin: z.string().url().optional(),
})

const valueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

const backersSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  leader: z.string().optional(),
  leaderProfile: z.string().url().optional(),
})

const ctaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  buttonText: z.string().min(1),
  buttonLink: z.string().url(),
})

export const contentSchema = z.object({
  pageType: z.enum(['homepage', 'about', 'methodology', 'free-sample-test', 'general']),
  slug: z.string().min(1),
  title: z.string().min(1).max(200),
  metaDescription: z.string().max(300).optional(),
  sections: z.array(sectionSchema).optional(),
  missionStatement: z.string().max(1000).optional(),
  values: z.array(valueSchema).optional(),
  approach: z
    .object({
      root: z.object({
        type: z.literal('root'),
        children: z.array(z.any()),
      }),
    })
    .optional(),
  teamMembers: z.array(teamMemberSchema).optional(),
  backers: backersSchema.optional(),
  ctaSection: ctaSchema.optional(),
  imageURL: z.string().optional(),
  author: z.string().min(1),
  status: z.enum(['draft', 'published', 'archived']),
  views: z.number().min(0),
})
