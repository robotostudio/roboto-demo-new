import { defineField, defineType } from 'sanity';
import { capitalize, createRadioListLayout } from '../../utils/helper';
import { iconField } from '../../utils/common';

export const button = defineType({
  name: 'button',
  title: 'Button',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      initialValue: () => 'default',
      options: createRadioListLayout(['default', 'outline', 'link']),
    }),
    iconField,
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'customUrl',
    }),
  ],
  preview: {
    select: {
      title: 'buttonText',
      variant: 'variant',
    },
    prepare: ({ title, variant }) => {
      return {
        title,
        subtitle: `${capitalize(variant ?? 'default')} button`,
      };
    },
  },
});
