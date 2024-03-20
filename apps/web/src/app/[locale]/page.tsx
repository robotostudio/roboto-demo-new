import { Metadata } from 'next';
import LiveQuery from 'next-sanity/preview/live-query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { MainPageComponent } from '~/components/pages/main-page';
import { MainPageComponentClient } from '~/components/pages/main-page/main-page-client';
import {
  getAllMainPageTranslations,
  getMainPageData,
} from '~/components/pages/main-page/main-page-loader';
import { getMainPageDataQuery } from '~/components/pages/main-page/main-page-query';
import { getMetaData } from '~/lib/seo';
import { PageParams } from '~/types';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const [slugs, err] = await getAllMainPageTranslations();
  if (err || !slugs) return [];
  return slugs.map((locale) => ({ locale }));
};

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

  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <LiveQuery
        enabled
        initialData={data}
        query={getMainPageDataQuery}
        params={{ locale: params.locale }}
        as={MainPageComponentClient}
      >
        <MainPageComponent data={data} />
      </LiveQuery>
    );
  }

  return <MainPageComponent data={data} />;
}
