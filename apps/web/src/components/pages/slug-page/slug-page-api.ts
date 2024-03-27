import { Locale } from '~/config';
import { handleErrors, getLocalizedSlug } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  GetSlugPageDataQueryResponse,
  getSlugPageDataQuery,
  GetAllSlugPagePathsQueryResponse,
  getAllSlugPagePathsQuery,
} from '~/lib/sanity/query';

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
