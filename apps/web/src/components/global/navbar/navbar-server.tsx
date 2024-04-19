import { FC } from 'react';
import { getBootstrapData } from '~/lib/posthog';
import { getNavbarData } from './navbar-api';
import { NavbarClient } from './navbar.client';

export const Navbar: FC = async () => {
  // console.log('🚀 ~ constNavbar:FC= ~ flag:', flag);
  const [data, error] = await getNavbarData();
  if (error || !data) {
    return <div>Error</div>;
  }
  return <NavbarClient data={data} />;
};
