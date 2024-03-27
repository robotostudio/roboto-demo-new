import { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  GetAllMainPageTranslationsQueryResponse,
  GetMainPageDataQueryResponse,
  getAllMainPageTranslationsQuery,
  getMainPageDataQuery,
} from '~/lib/sanity/query';

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
