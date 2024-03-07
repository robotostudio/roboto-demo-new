import { notFound } from 'next/navigation';
import { BlogIndexPage } from '~/components/pages/blog-page';
import {
  getAllBlogIndexTranslations,
  getBlogIndexData,
} from '~/components/pages/blog-page/blog-page-api';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllBlogIndexTranslations();
  if (err || !Array.isArray(slugs)) return [];
  return slugs.map((locale) => ({ locale }));
};

export default async function BlogPage({ params }: PageParams) {
  const [data, err] = await getBlogIndexData(params.locale);
  if (!data || err) return notFound();
  return <BlogIndexPage data={data} />;
}
