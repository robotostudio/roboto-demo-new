import { groq } from 'next-sanity';
import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { button, buttons, links } from '~/lib/sanity/fragment';
console.log('🚀 ~ buttons:', JSON.stringify(links));

export const getNavbarData = async () => {
  return await handleErrors(
    sanityFetch<NavbarData>({ query: getNavbarDataQuery }),
  );
};

export const getNavbarDataQuery = groq`
*[_type == "navbar"][0]{
    _id,
    title,
 ${[buttons, links].join(',')}
}
`;

export type NavbarData = {
  _id: string;
  title: string;
  links: {
    _key: string;
    _type: string;
    href: string;
    label: string;
  }[];
  buttons: {
    _key: string;
    _type: string;
    href: string;
    label: string;
  }[];
};
