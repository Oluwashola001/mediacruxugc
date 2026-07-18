import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'MediaCrux UGC',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('MediaCrux Content')
          .items([
            S.listItem()
              .title('Website Content')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Website Content')
              ),
          ]),
    }),
  ],
  schema: {
    types: schema.types,
  },
})
