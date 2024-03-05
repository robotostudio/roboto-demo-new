import { FieldGroupDefinition } from 'sanity';

export const CONST = {
  SEO: 'seo',
  MAIN_CONTENT: 'main-content',
  CARD: 'card',
  RELATED: 'related',
  OG: 'og',
} as const;

export const GROUPS: FieldGroupDefinition[] = [
  { name: CONST.MAIN_CONTENT, default: true },
  { name: CONST.SEO },
  { name: CONST.OG },
  { name: CONST.CARD },
  { name: CONST.RELATED },
];
