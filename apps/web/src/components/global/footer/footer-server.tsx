import { FC } from 'react';
import { getFooterData } from './footer-api';
import { FooterClient } from './footer-client';
import { getBootstrapData } from '~/lib/posthog';

export const Footer: FC = async () => {
  const bootStrapData = await getBootstrapData();
  const flag = bootStrapData.featureFlags['slug-page-redirect'];
  if (flag === 'without-footer') {
    return <footer></footer>;
  }
  const [data, error] = await getFooterData();
  if (error || !data) {
    return <div>Error</div>;
  }
  return <FooterClient data={data} />;
};
