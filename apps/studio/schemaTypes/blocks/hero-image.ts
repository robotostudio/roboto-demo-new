import {defineField, defineType, defineArrayMember} from 'sanity'
import {ImageIcon} from 'lucide-react'

export default defineType({
  name: 'heroImage',
  title: 'Hero Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'The smaller text that sits above the title to provide context',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the block',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'A smaller text that provides additional context to the title',
      type: 'string',
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      description: 'Add buttons here, the website will handle the styling',
      type: 'array',
      of: [defineArrayMember({type: 'button'})],
    }),
    defineField({
      name: 'trustedBy',
      title: 'Trusted By',
      description: 'Logos of companies that trust the service',
      type: 'array',
      of: [defineArrayMember({
        type: 'image',
        fields: [
          defineField({
            name: 'alt',
            type: 'string',
            description: "Remember to use alt text for people to be able to read what is happening in the image if they are using a screen reader, it's also important for SEO",
            title: 'Alt Text',
          }),
        ],
      })],
    }),
  ],
})

