import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { BlogSlugPage } from '~/components/pages/blog-page';
import {
  cleanBlogSlug,
  getAllBlogsPaths,
  getBlogPageData,
  getBlogPageDataQuery,
} from '~/components/pages/blog-page/blog-page-api';
import { BlogSlugPageClient } from '~/components/pages/blog-page/blog-page-client';
import { Locale } from '~/config';
import { getLocalizedSlug } from '~/lib/helper';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllBlogsPaths();
  if (err || !Array.isArray(slugs)) return [];
  const paths: { slug: string; locale: Locale }[] = [];
  slugs.forEach((page) => {
    const slug = page?.slug ? cleanBlogSlug(page.slug) : undefined;
    if (slug && page?.locale) {
      paths.push({ slug, locale: page.locale });
    }
  });
  return paths;
};

export default async function SlugPage({
  params,
}: PageParams<{ slug: string }>) {
  const [data, err] = await getBlogPageData(params.slug, params.locale);
  if (!data || err) return notFound();

  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <LiveQuery
        enabled
        initialData={data}
        query={getBlogPageDataQuery}
        params={{
          slug: getLocalizedSlug(params.slug, params.locale, 'blog'),
          locale: params.locale,
        }}
        as={BlogSlugPageClient}
      >
        <BlogSlugPage data={data} />
      </LiveQuery>
    );
  }
  return <BlogSlugPage data={data} />;
}
