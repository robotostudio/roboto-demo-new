import { Metadata } from 'next';
import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  getAllSlugPagePaths,
  getSlugPageData,
} from '~/components/pages/slug-page/slug-page-api';
import { SlugPageClient } from '~/components/pages/slug-page/slug-page-client';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import { Locale } from '~/config';
import { getVariants } from '~/lib/ab-testing';
import { getLocalizedSlug } from '~/lib/helper';
import { getSlugPageDataQuery } from '~/lib/sanity/query';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const slugs = await getAllSlugPagePaths();

  const pages = slugs.map((slug) => ({
    slug: slug?.slug,
    locale: slug?.locale,
  }));

  return pages;
};
export const generateMetadata = async ({
  params,
}: PageParams<{ slug: string }>): Promise<Metadata> => {
  const [data, err] = await getSlugPageData(params.slug, params.locale);
  if (!data || err) return {};
  return getMetaData(data);
};

const getPageVariantData = async (slug: string, locale: Locale) => {
  const [data, err] = await getSlugPageData(slug, locale);
  if (err || !data?._id) {
    return notFound();
  }

  // const { _id, slug: page } = data;
  // if (page && _id) {
  //   await getVariants({
  //     _id,
  //     slug: page,
  //   });
  // }
  return [data, null];
};

export default async function Page({ params }: PageParams<{ slug: string }>) {
  const { locale, slug } = params ?? {};

  const [data, err] = await getPageVariantData(slug, locale);

  if (err || !data?._id) {
    return notFound();
  }

  const { isEnabled } = draftMode();

  if (isEnabled) {
    return (
      <LiveQuery
        enabled
        initialData={data}
        query={getSlugPageDataQuery}
        params={{ slug: getLocalizedSlug(slug, locale), locale }}
        as={SlugPageClient}
      >
        <SlugPage data={data} />
      </LiveQuery>
    );
  }
  return <SlugPage data={data} />;
}
