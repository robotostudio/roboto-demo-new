import { groq } from 'next-sanity';

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
