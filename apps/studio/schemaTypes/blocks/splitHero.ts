import { defineField, defineType } from 'sanity';
import { Square } from 'lucide-react';
import { blockPreview } from '../../utils/helper';
import { buttonsField, richTextField } from '../../utils/common';

export const splitHero = defineType({
  name: 'splitHero',
  type: 'object',
  icon: Square,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description:
        'The smaller text that sits above the title to provide context',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The large text that is the primary focus of the block',
      type: 'string',
    }),
    richTextField,
    defineField({
      name: 'image',
      title: 'Image',
      description: 'An image associated with the split hero block',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          description:
            "Remember to use alt text for people to be able to read what is happening in the image if they are using a screen reader, it's also important for SEO",
          title: 'Alt Text',
        },
      ],
    }),
    buttonsField,
  ],
  preview: blockPreview('splitHero'),
});
