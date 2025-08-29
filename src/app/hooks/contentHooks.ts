import { BeforeChangeHook } from 'node_modules/payload/dist/collections/config/types'
import { contentSchema } from '../scheme/content.scheme'

export const contentBeforeChange: BeforeChangeHook = async ({ data, req }) => {
  contentSchema.parse(data)

  // Verificar que el autor existe
  const authorExists = await req.payload.find({
    collection: 'users',
    where: {
      id: { equals: data.author },
    },
  })

  if (!authorExists.docs.length) {
    throw new Error('Author not registered')
  }

  // Para páginas about, validar campos específicos
  if (data.pageType === 'about') {
    if (!data.missionStatement) {
      throw new Error('Mission statement is required for about pages')
    }

    if (!data.teamMembers || data.teamMembers.length === 0) {
      throw new Error('At least one team member is required for about pages')
    }
  }

  return data
}
