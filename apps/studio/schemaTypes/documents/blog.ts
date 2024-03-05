import { defineField, defineType } from 'sanity';

export const blog = defineType({
  name: 'blog',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
  ],
});
