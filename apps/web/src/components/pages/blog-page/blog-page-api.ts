import { Locale } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  GetAllBlogIndexTranslationsQueryResponse,
  GetAllBlogsPathsQuery,
  GetBlogIndexDataQuery,
  GetBlogPageDataQueryResponse,
  getAllBlogIndexTranslationsQuery,
  getAllBlogsPathsQuery,
  getBlogIndexDataQuery,
  getBlogPageDataQuery,
} from '~/lib/sanity/query';

export const cleanBlogSlug = (str: string) => {
  const arr = str.split('/');
  return arr[arr.length - 1];
};

export const getAllBlogsPaths = async () => {
  return await handleErrors(
    sanityFetch<GetAllBlogsPathsQuery>({ query: getAllBlogsPathsQuery }),
  );
};

export const getAllBlogIndexTranslations = async () => {
  return await handleErrors(
    sanityFetch<GetAllBlogIndexTranslationsQueryResponse>({
      query: getAllBlogIndexTranslationsQuery,
    }),
  );
};

export const getBlogPageData = async (slug: string, locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetBlogPageDataQueryResponse>({
      query: getBlogPageDataQuery,
      params: { slug: getLocalizedSlug(slug, locale, 'blog'), locale },
    }),
  );
};

export const getBlogIndexData = async (locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetBlogIndexDataQuery>({
      query: getBlogIndexDataQuery,
      params: { locale },
    }),
  );
};