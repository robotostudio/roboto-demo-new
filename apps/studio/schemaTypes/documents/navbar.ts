import { defineArrayMember, defineField, defineType } from 'sanity';

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: () => 'Navbar',
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [defineArrayMember({ type: 'navLink' })],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
