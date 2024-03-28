import { Locale } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  getAllSlugPagePathsQuery,
  getSlugPageDataQuery,
} from '~/lib/sanity/query';
import {
  GetAllSlugPagePathsQueryResult,
  GetSlugPageDataQueryResult,
} from '~/sanity.types';

export const getSlugPageData = async (slug: string, locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetSlugPageDataQueryResult>({
      query: getSlugPageDataQuery,
      params: { slug: getLocalizedSlug(slug, locale), locale },
    }),
  );
};

export const getAllSlugPagePaths = async () => {
  const [data, err] = await handleErrors(
    sanityFetch<GetAllSlugPagePathsQueryResult>({
      query: getAllSlugPagePathsQuery,
    }),
  );
  if (!data || err) {
    return [];
  }
  const paths: { slug: string; locale: Locale }[] = [];
  data.forEach((page) => {
    if (page?.slug && page?.locale) {
      const slugFragments = page.slug.split('/').filter(Boolean);
      if (slugFragments.length > 1) {
        const [, slug] = slugFragments;
        paths.push({
          locale: page.locale as Locale,
          slug,
        });
      } else {
        const [slug] = slugFragments;
        paths.push({
          locale: page.locale as Locale,
          slug,
        });
      }
    }
  });
  return paths;
};
