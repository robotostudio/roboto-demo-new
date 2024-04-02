import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { getFooterDataQuery } from '~/lib/sanity/query';
import { GetFooterDataQueryResult } from '~/sanity.types';

export const getFooterData = async () => {
  return await handleErrors(
    sanityFetch<GetFooterDataQueryResult>({ query: getFooterDataQuery }),
  );
};
