import { defineField } from 'sanity';
import { CONST } from './constant';

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

export const pageBuilderField = defineField({
  name: 'pageBuilder',
  group: CONST.MAIN_CONTENT,
  type: 'pageBuilder',
});


export const buttonsField = defineField({
  name: 'buttons',
  type: 'array',
  of: [{ type: 'button' }],
});

export const richTextField = defineField({
  name: 'richText',
  type: 'richText',
});