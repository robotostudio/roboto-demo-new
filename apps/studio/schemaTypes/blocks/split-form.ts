import { defineField, defineType } from 'sanity';
import { FormInput } from 'lucide-react';
import { blockPreview } from '../../utils/helper';

export const splitForm = defineType({
  name: 'splitForm',
  type: 'object',
  icon: FormInput,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'string' }),
    defineField({ name: 'form', type: 'reference', to: [{ type: 'form' }] }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: blockPreview('splitForm'),
});
