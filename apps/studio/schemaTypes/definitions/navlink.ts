import { defineField, defineType } from 'sanity';
import { blockPreview } from '../../utils/helper';

export const navLink = defineType({
  name: 'navLink',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'dropdown',
      type: 'boolean',
      title: 'Dropdown ?',
      initialValue: () => false,
    }),
  ],
  preview: blockPreview('navLink'),
});
