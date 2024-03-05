import { sanityFetch } from '~/lib/sanity';
import {
  GetMainPageDataQueryResponse,
  getMainPageDataQuery,
} from './main-page-query';
import { handleErrors } from '~/lib/helper';
import { Locale } from '~/config';

export const getMainPageData = async (locale: Locale) => {
  console.log('🚀 ~ getMainPageData ~ locale:', locale);
  return await handleErrors(
    sanityFetch<GetMainPageDataQueryResponse>({
      query: getMainPageDataQuery,
      params: { locale },
    }),
  );
};
