import { notFound } from 'next/navigation';
import { BlogIndexPage } from '~/components/pages/blog-page';
import { getBlogIndexData } from '~/components/pages/blog-page/blog-page-api';
import { PageParams } from '~/types';

export default async function BlogPage({ params }: PageParams) {
  const [data, err] = await getBlogIndexData(params.locale);
  console.log('🚀 ~ Page getBlogIndexData ~ data, err:', data, err);
  if (!data || err) return notFound();
  return <BlogIndexPage data={data} />;
}
