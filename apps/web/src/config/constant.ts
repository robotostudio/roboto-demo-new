export const ogImageDimensions = {
  width: 1200,
  height: 630,
};

export const locales = ['en-GB', 'fr', 'de'] as const;

export const DEFAULT_LOCALE = 'en-GB';
export type Locale = (typeof locales)[number];
