import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { NavbarData, getNavbarDataQuery } from '~/lib/sanity/query';

export const getNavbarData = async () => {
  return await handleErrors(
    sanityFetch<NavbarData>({ query: getNavbarDataQuery }),
  );
};

