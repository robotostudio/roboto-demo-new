import { MainPageComponent } from '~/components/pages/main-page';
import { getMainPageData } from '~/components/pages/main-page/main-page-loader';

export default async function Page() {
  const data = await getMainPageData();
  return <MainPageComponent data={data} />;
}
