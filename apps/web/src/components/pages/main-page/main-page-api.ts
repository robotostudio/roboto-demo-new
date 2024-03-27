import { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { localeMatch, pageBuilder } from '~/lib/sanity/fragment';
import { PageBuilder } from '~/schema';

export const getMainPageDataQuery = `
*[_type == "mainPage" && ${localeMatch}][0]{
  ${['title', 'description', pageBuilder].join(',')}
}
`;

export type GetMainPageDataQueryResponse = {
  title: string;
  description: string;
  pageBuilder: PageBuilder;
};

export const getAllMainPageTranslationsQuery = `
*[_type == "mainPage"].language
`;

export type GetAllMainPageTranslationsQueryResponse = string[];

export const getMainPageData = async (locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetMainPageDataQueryResponse>({
      query: getMainPageDataQuery,
      params: { locale },
    }),
  );
};

export const getAllMainPageTranslations = async () => {
  return await handleErrors(
    sanityFetch<GetAllMainPageTranslationsQueryResponse>({
      query: getAllMainPageTranslationsQuery,
    }),
  );
};
