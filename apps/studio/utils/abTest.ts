import { abTestFields as _abTestFields } from 'sanity-plugin-roboto-ab-test';

export const abTestDocumentTypes = ['page'];

export const abTestFields = (group?: string) =>
  _abTestFields(abTestDocumentTypes, group);
