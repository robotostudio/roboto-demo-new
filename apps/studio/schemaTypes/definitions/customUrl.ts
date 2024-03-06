import { defineField, defineType } from 'sanity';
import { createRadioListLayout } from '../../utils/helper';

export const customUrl = defineType({
  name: 'customUrl',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: createRadioListLayout(['internal', 'external']),
      initialValue: () => 'external',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      description: 'If checked, the link will open in a new tab.',
      initialValue: () => false,
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === 'external' && !value) return "Url can't be empty";
          return true;
        }),
        Rule.uri({
          scheme: ['http', 'https', 'tel', 'mailto'],
          allowRelative: true,
        }),
      ],
    }),
    defineField({
      name: 'href',
      type: 'string',
      initialValue: () => '#',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      hidden: ({ parent }) => parent?.type !== 'internal',
      to: [{ type: 'page' }],
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === 'internal' && !value?._ref)
            return "internal can't be empty";
          return true;
        }),
      ],
    }),
  ],
});
