import { groq } from 'next-sanity';
import { Locale } from '~/config';

export const getSlugPageDataQuery = groq`
*[_type == "page" && slug.current == $slug ][0]{
    title,
    content,
    "slug":slug.current
}
`;

export type GetSlugPageDataQueryResponse = {
  title: string;
  content: string;
  slug: string;
};

export const getAllSlugPagePathsQuery = groq`
*[_type == "page" && defined(slug.current) && !seoNoIndex]{
  "slug":string::split(slug.current,"/")[1],
  "locale":language
}
`;

export type GetAllSlugPagePathsQueryResponse = {
  slug: string;
  locale: Locale;
}[];

