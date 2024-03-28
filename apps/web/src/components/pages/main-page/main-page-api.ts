import { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  getAllMainPageTranslationsQuery,
  getMainPageDataQuery,
} from '~/lib/sanity/query';
import {
  GetAllMainPageTranslationsQueryResult,
  GetMainPageDataQueryResult,
} from '~/sanity.types';

export const getMainPageData = async (locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetMainPageDataQueryResult>({
      query: getMainPageDataQuery,
      params: { locale },
    }),
  );
};

export const getAllMainPageTranslations = async () => {
  return await handleErrors(
    sanityFetch<GetAllMainPageTranslationsQueryResult>({
      query: getAllMainPageTranslationsQuery,
    }),
  );
};
