import { sanityFetch } from '~/lib/sanity';
import {
  GetMainPageDataQueryResponse,
  getMainPageDataQuery,
} from './main-page-query';

export const getMainPageData = async () => {
  const mainPage = await sanityFetch<GetMainPageDataQueryResponse>({
    query: getMainPageDataQuery,
  });
  return mainPage;
};
