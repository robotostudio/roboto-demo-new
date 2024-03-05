import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainPageComponent } from '~/components/pages/main-page';
import { getMainPageData } from '~/components/pages/main-page/main-page-loader';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const generateMetadata = async ({
  params,
}: PageParams): Promise<Metadata> => {
  const [data, err] = await getMainPageData(params.locale);
  if (!data || err) return {};
  return getMetaData(data);
};

export default async function Page({ params }: PageParams) {
  const [data, err] = await getMainPageData(params.locale);
  if (!data || err) return notFound();
  return <MainPageComponent data={data} />;
}