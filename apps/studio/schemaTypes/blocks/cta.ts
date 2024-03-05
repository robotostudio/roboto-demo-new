import { defineField, defineType } from 'sanity';
import { blockPreview } from '../../utils/helper';
import { PhoneForwarded } from 'lucide-react';

export const cta = defineType({
  name: 'cta',
  type: 'object',
  icon: PhoneForwarded,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
  ],
  preview: blockPreview('cta'),
});
