import { groq } from 'next-sanity';

export const localeMatch = groq`select(($locale == 'en-GB' || $locale == '' ) => 
  (!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;
