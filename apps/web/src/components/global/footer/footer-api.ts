import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { links } from '~/lib/sanity/fragment';
import { NavLinkExt, SanityButtons } from '~/types';

export const getFooterData = async () => {
  return await handleErrors(
    sanityFetch<FooterData>({ query: getFooterDataQuery }),
  );
};

export const getFooterDataQuery = `
*[_type == "footer"][0]{
    _id,
    title,
    ${[links].join(',')},
    "logo":*[_type == "logo"][0].image.asset->url
}
`;

export type FooterData = {
  _id: string;
  title: string;
  buttons: SanityButtons;
  links: NavLinkExt[];
  logo: any;
};
