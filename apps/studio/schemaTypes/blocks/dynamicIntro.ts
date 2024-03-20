import { defineField } from 'sanity';
import { blockPreview } from '../../utils/helper';
import { buttonsField, richTextField } from '../../utils/common';
import { Zap } from 'lucide-react';

export const dynamicIntro = defineField({
  name: 'dynamicIntro',
  type: 'object',
  icon: Zap,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'paramKey',
      type: 'string',
      description:
        'The `paramKey` is the URL search parameter. For example, if the URL is `https://example.com?paramKey=value`, then `paramKey` is `value`.',

      validation: (r) => r.required(),
    }),
    defineField({
      name: 'fallback',
      description:
        'This value will be used if the `paramKey` is not present in the URL',
      type: 'string',
    }),
    richTextField,
    buttonsField,
  ],
  preview: blockPreview('dynamicIntro'),
});
