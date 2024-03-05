import { defineField, defineType } from 'sanity';

export const mainPage = defineType({
  name: 'mainPage',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
  ],
});
