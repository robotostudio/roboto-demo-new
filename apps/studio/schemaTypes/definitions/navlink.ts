import { defineArrayMember, defineField, defineType } from 'sanity';
import { iconField } from '../../utils/common';
import { blockPreview } from '../../utils/helper';

export const navLinkColumn = defineType({
  name: 'navLinkColumn',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    iconField,
    defineField({
      name: 'description',
      type: 'string',
      title: 'Descriptions',
    }),
    defineField({
      name: 'url',
      type: 'customUrl',
    }),
  ],
  preview: blockPreview('navLinkColumn'),
});

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
    defineField({
      name: 'url',
      type: 'customUrl',
      hidden: ({ parent }) => !!parent.dropdown,
    }),
    defineField({
      name: 'columns',
      type: 'array',
      hidden: ({ parent }) => !parent.dropdown,
      of: [defineArrayMember({ type: 'navLinkColumn' })],
    }),
  ],
  preview: blockPreview('navLink'),
});
