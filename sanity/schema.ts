import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemaTypes/blockContent'
import projects from './schemaTypes/projects'
import skills from './schemaTypes/skills'
import experience from './schemaTypes/experience'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects, blockContent, skills, experience],
}
