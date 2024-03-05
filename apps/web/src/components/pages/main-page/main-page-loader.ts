import { sanityFetch } from '~/lib/sanity';
import {
  GetAllMainPageTranslationsQueryResponse,
  GetMainPageDataQueryResponse,
  getAllMainPageTranslationsQuery,
  getMainPageDataQuery,
} from './main-page-query';
import { handleErrors } from '~/lib/helper';
import { Locale } from '~/config';

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