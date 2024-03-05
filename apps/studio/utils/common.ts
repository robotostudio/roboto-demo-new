import { defineField } from 'sanity';

export const languageField = defineField({
  initialValue: () => 'en-GB',
  name: 'language',
  type: 'string',
  //   readOnly: true,
  //   hidden: true,
});

export const iconField = defineField({
  name: 'icon',
  title: 'Icon',
  options: {
    storeSvg: true,
  },
  type: 'iconPicker',
});
