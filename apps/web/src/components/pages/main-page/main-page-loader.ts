import { sanityFetch } from '~/lib/sanity';
import {
  GetMainPageDataQueryResponse,
  getMainPageDataQuery,
} from './main-page-query';
import { handleErrors } from '~/lib/helper';

export const getMainPageData = async () => {
  return await handleErrors(
    sanityFetch<GetMainPageDataQueryResponse>({
      query: getMainPageDataQuery,
    }),
  );
};
