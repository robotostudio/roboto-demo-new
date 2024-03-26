import { Metadata } from 'next';
import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { SlugPageClient } from '~/components/pages/slug-page/slug-page-client';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import {
  getAllSlugPagePaths,
  getSlugPageData,
} from '~/components/pages/slug-page/slug-page-loader';
import { getSlugPageDataQuery } from '~/components/pages/slug-page/slug-page-query';
import { getLocalizedSlug } from '~/lib/helper';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllSlugPagePaths();
  console.log('🚀 ~ generateStaticParams ~ slugs:', slugs);
  if (err || !slugs) return [];
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

export default async function Page({ params }: PageParams<{ slug: string }>) {
  const { locale, slug } = params ?? {};
  const [data, err] = await getSlugPageData(slug, locale);

  if (err || !data) {
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
