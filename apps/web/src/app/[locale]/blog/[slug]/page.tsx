import { notFound } from 'next/navigation';
import { BlogSlugPage } from '~/components/pages/blog-page';
import {
  cleanBlogSlug,
  getAllBlogsPaths,
  getBlogPageData,
} from '~/components/pages/blog-page/blog-page-api';
import { Locale } from '~/config';
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
  console.log('🚀 ~ generateStaticParams ~ slugs:', paths);
  return paths;
};

export default async function SlugPage({
  params,
}: PageParams<{ slug: string }>) {
  const [data, err] = await getBlogPageData(params.slug, params.locale);
  if (!data || err) return notFound();
  return <BlogSlugPage data={data} />;
}
