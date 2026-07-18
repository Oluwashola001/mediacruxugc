import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'portfolioVideo',
  title: 'Portfolio Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Skincare', value: 'skincare' },
          { title: 'Tech', value: 'tech' },
          { title: 'Fitness', value: 'fitness' },
          { title: 'Lifestyle', value: 'lifestyle' },
        ],
      },
    }),
    defineField({
      name: 'cloudinaryUrl',
      title: 'Cloudinary Video URL',
      type: 'url',
      description: 'Paste the Cloudinary URL here. We will auto-optimize it on the frontend.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
     defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Used to sort videos (lower numbers appear first).',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
    }
  }
})