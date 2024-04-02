import { groq } from 'next-sanity';
import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { buttons, links } from '~/lib/sanity/fragment';
import { NavbarLinks, SanityButtons } from '~/types';

export const getNavbarData = async () => {
  return await handleErrors(
    sanityFetch<NavbarData>({ query: getNavbarDataQuery }),
  );
};

export const getNavbarDataQuery = groq`
*[_type == "navbar"][0]{
    _id,
    title,
    ${[buttons, links].join(',')},
    "logo":*[_type == "logo"][0].image.asset->url
}
`;

export type NavbarData = {
  _id: string;
  title: string;
  buttons: SanityButtons;
  links: NavbarLinks;
  logo: any;
};
