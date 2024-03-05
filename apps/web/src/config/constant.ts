export const ogImageDimensions = {
  width: 1200,
  height: 630,
};

export const locales = ['en-GB', 'en-US', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];
