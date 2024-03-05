import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainPageComponent } from '~/components/pages/main-page';
import { getMainPageData } from '~/components/pages/main-page/main-page-loader';
import { getMetaData } from '~/lib/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  const [data, err] = await getMainPageData();
  if (!data || err) return {};
  return getMetaData(data);
};

export default async function Page() {
  const [data, err] = await getMainPageData();
  if (!data || err) return notFound();
  return <MainPageComponent data={data} />;
}
