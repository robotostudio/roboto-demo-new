import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  GetAllSlugPagePathsQueryResponse,
  GetSlugPageDataQueryResponse,
  getAllSlugPagePathsQuery,
  getSlugPageDataQuery,
} from './slug-page-query';
import { Locale } from '~/config';

export const getSlugPageData = async (slug: string, locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetSlugPageDataQueryResponse>({
      query: getSlugPageDataQuery,
      params: { slug: getLocalizedSlug(slug, locale), locale },
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
