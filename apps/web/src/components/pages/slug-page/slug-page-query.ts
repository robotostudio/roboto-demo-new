import { groq } from 'next-sanity';
import { Locale } from '~/config';
import { pageBuilder } from '~/lib/sanity/fragment';
import { PageBuilder } from '~/schema';

export const getSlugPageDataQuery = groq`
*[_type == "page" && slug.current == $slug ][0]{
    title,
    content,
    "slug":slug.current,
    ${[pageBuilder].join(',')}
}
`;

export type GetSlugPageDataQueryResponse = {
  title: string;
  slug: string;
  pageBuilder: PageBuilder;
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

