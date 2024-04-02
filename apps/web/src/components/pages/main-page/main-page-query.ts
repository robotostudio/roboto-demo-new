import { groq } from 'next-sanity';
import { localeMatch, pageBuilder } from '~/lib/sanity/fragment';
import { PageBuilder } from '~/schema';

export const getMainPageDataQuery = groq`
*[_type == "mainPage" && ${localeMatch}][0]{
  ${['title', 'description', pageBuilder].join(',')}
}
`;

export type GetMainPageDataQueryResponse = {
  title: string;
  description: string;
  pageBuilder: PageBuilder;
};


export const getAllMainPageTranslationsQuery = groq`
*[_type == "mainPage"].language
`;

export type GetAllMainPageTranslationsQueryResponse = string[];