import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  GetSlugPageDataQueryResponse,
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
