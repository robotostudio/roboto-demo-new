import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { getNavbarDataQuery } from '~/lib/sanity/query';
import { GetNavbarDataQueryResult } from '~/sanity.types';

export const getNavbarData = async () => {
  return await handleErrors(
    sanityFetch<GetNavbarDataQueryResult>({ query: getNavbarDataQuery }),
  );
};

