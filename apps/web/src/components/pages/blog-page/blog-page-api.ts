import { Locale } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  getAllBlogIndexTranslationsQuery,
  getAllBlogsPathsQuery,
  getBlogIndexDataQuery,
  getBlogPageDataQuery,
} from '~/lib/sanity/query';
import {
  GetAllBlogIndexTranslationsQueryResult,
  GetAllBlogsPathsQueryResult,
  GetBlogIndexDataQueryResult,
  GetBlogPageDataQueryResult,
} from '~/sanity.types';

export const cleanBlogSlug = (str: string) => {
  const arr = str.split('/');
  return arr[arr.length - 1];
};

export const getAllBlogsPaths = async () => {
  return await handleErrors(
    sanityFetch<GetAllBlogsPathsQueryResult>({ query: getAllBlogsPathsQuery }),
  );
};

export const getAllBlogIndexTranslations = async () => {
  return await handleErrors(
    sanityFetch<GetAllBlogIndexTranslationsQueryResult>({
      query: getAllBlogIndexTranslationsQuery,
    }),
  );
};

export const getBlogPageData = async (slug: string, locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetBlogPageDataQueryResult>({
      query: getBlogPageDataQuery,
      params: { slug: getLocalizedSlug(slug, locale, 'blog'), locale },
    }),
  );
};

export const getBlogIndexData = async (locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetBlogIndexDataQueryResult>({
      query: getBlogIndexDataQuery,
      params: { locale },
    }),
  );
};