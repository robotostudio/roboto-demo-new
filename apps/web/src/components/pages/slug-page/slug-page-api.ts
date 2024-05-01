'use server';
import { draftMode } from 'next/headers';
import { LOCALIZED_SANITY_TAGS, Locale, SANITY_TAGS } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import {
  getAllSlugPagePathsQuery,
  getPageLinkedFeatureFlagVariantQuery,
  getPageLinkedFeatureFlagsQuery,
  getSlugPageDataQuery,
} from '~/lib/sanity/query';
import { sanityServerFetch } from '~/lib/sanity/sanity-server-fetch';
import {
  GetAllSlugPagePathsQueryResult,
  GetPageLinkedFeatureFlagsQueryResult,
  GetSlugPageDataQueryResult,
} from '~/sanity.types';

export const getSlugPageData = async (slug: string, locale: Locale) => {
  const { isEnabled } = draftMode();

  const localizedSlug = getLocalizedSlug(slug, locale);
  const tags = [LOCALIZED_SANITY_TAGS.slugPage(locale), slug, localizedSlug];
  return await handleErrors(
    sanityServerFetch<GetSlugPageDataQueryResult>({
      query: getSlugPageDataQuery,
      params: { slug: localizedSlug, locale },
      tags,
      preview: isEnabled,
    }),
  );
};

export const getAllSlugPagePaths = async () => {
  const [data, err] = await handleErrors(
    sanityServerFetch<GetAllSlugPagePathsQueryResult>({
      query: getAllSlugPagePathsQuery,
      tags: [SANITY_TAGS.slugPage],
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

export const getPageLinkedFeatureFlags = async (id: string) => {
  return await handleErrors(
    sanityServerFetch<GetPageLinkedFeatureFlagsQueryResult>({
      query: getPageLinkedFeatureFlagsQuery,
      params: { id },
    }),
  );
};

export const getPageLinkedFeatureFlagVariant = async (
  id: string,
  key: string,
) => {
  return await handleErrors(
    sanityServerFetch<{ slug: string; language: Locale } | null>({
      query: getPageLinkedFeatureFlagVariantQuery,
      params: { id, key },
    }),
  );
};

