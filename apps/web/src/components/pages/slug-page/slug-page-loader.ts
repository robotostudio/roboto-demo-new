import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  GetAllSlugPagePathsQueryResponse,
  GetSlugPageDataQueryResponse,
  getAllSlugPagePathsQuery,
  getSlugPageDataQuery,
} from './slug-page-query';

export const getSlugPageData = async (slug: string) => {
  return await handleErrors(
    sanityFetch<GetSlugPageDataQueryResponse>({
      query: getSlugPageDataQuery,
      params: { slug: `/${slug}` },
    }),
  );
};

export const getAllSlugPagePaths = async () => {
  return await handleErrors(
    sanityFetch<GetAllSlugPagePathsQueryResponse>({
      query: getAllSlugPagePathsQuery,
    }),
  );
};

