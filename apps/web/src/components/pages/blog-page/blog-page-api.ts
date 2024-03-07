import { groq } from 'next-sanity';
import { Locale } from '~/config';
import { handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import { coalesceConditions, localeMatch } from '~/lib/sanity/fragment';
import { BlogIndex } from '~/schema';
import { SanityImage } from '~/types';

export const getBlogIndexData = async (locale: Locale) => {
  return await handleErrors(
    sanityFetch({
      query: getBlogIndexDataQuery,
      params: { locale },
    }),
  );
};

export const getBlogIndexDataQuery = groq`
{
    "seo":*[_type == "blogIndex" && ${localeMatch}][0]{
        ...,
    },
    "blogs":*[_type == "blog" && ${localeMatch}]{
        ${[
          groq`"_id":_id`,
          coalesceConditions('title', ['cardTitle', 'title']),
          coalesceConditions('description', ['cardDescription', 'description']),
          coalesceConditions('image', [
            'cardImage',
            'image',
            groq`*[_type=="logo"][0].image`,
          ]),
          groq`"slug":slug.current`,
        ].join(',')}
    }
}
`;

export type IndexPageBlog = {
  title: string;
  image: SanityImage;
  description: string;
  slug: string;
  _id: string;
};

export type GetBlogIndexDataQuery = {
  seo: BlogIndex;
  blogs: IndexPageBlog[];
};
