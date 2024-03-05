import { notFound } from 'next/navigation';
import { SlugPage } from '~/components/pages/slug-page/slug-page-component';
import {
  getAllSlugPagePaths,
  getSlugPageData,
} from '~/components/pages/slug-page/slug-page-loader';
import { PageParams } from '~/types';

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllSlugPagePaths();
  console.log('🚀 ~ generateStaticParams ~ slugs, err:', slugs, err);
  if (err || !slugs) return [];
  return slugs.map((slug) => ({ slug: slug?.slug, locale: slug?.locale }));
};

export default async function Page({ params }: PageParams<{ slug: string }>) {
  const { locale, slug } = params ?? {};
  const [data, err] = await getSlugPageData(slug);
  console.log('🚀 ~ Page ~ data, err:', data, err, locale);

  if (err || !data) {
    return notFound();
  }
  return <SlugPage data={data} />;
}
