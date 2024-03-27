import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { FooterData, getFooterDataQuery } from '~/lib/sanity/query';

export const getFooterData = async () => {
  return await handleErrors(
    sanityFetch<FooterData>({ query: getFooterDataQuery }),
  );
};
