import { notFound } from 'next/navigation';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import { getSlugPageData } from '~/components/pages/slug-page/slug-page-loader';
import { PageParams } from '~/types';

export default async function Page({ params }: PageParams<{ slug: string }>) {
  const { locale, slug } = params ?? {};
  const [data, err] = await getSlugPageData(slug);
  console.log('🚀 ~ Page ~ data, err:', data, err);

  if (err || !data) {
    console.log('not found');
    return notFound();
  }
  return <SlugPage data={data} />;
}
