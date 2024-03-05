import { defineField, defineType } from 'sanity';
import { blockPreview } from '../../utils/helper';
import { ImagePlus } from 'lucide-react';

export const hero = defineType({
  name: 'hero',
  type: 'object',
  icon: ImagePlus,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'string' }),
  ],
  preview: blockPreview('hero', { title: 'title' }),
});
