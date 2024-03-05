import { groq } from 'next-sanity';
import { localeMatch } from '~/lib/sanity/fragment';

export const getMainPageDataQuery = groq`
*[_type == "mainPage" && ${localeMatch}][0]{
  title,
  description,
}
`;

export type GetMainPageDataQueryResponse = {
  title: string;
  description: string;
};


export const getAllMainPageTranslationsQuery = groq`
*[_type == "mainPage"].language
`;

export type GetAllMainPageTranslationsQueryResponse = string[];