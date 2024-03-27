import { Locale } from '~/config';
import { getLocalizedSlug, handleErrors } from '~/lib/helper';
import { sanityFetch } from '~/lib/sanity';
import {
  coalesceConditions,
  localeMatch,
  richText,
} from '~/lib/sanity/fragment';
import { Blog, BlogIndex } from '~/schema';
import { SanityImage } from '~/types';

export const getBlogIndexData = async (locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetBlogIndexDataQuery>({
      query: getBlogIndexDataQuery,
      params: { locale },
    }),
  );
};

export const getBlogIndexDataQuery = `
{
    "seo":*[_type == "blogIndex" && ${localeMatch}][0]{
        ...,
    },
    "blogs":*[_type == "blog" && ${localeMatch}]{
        ${[
          `"_id":_id`,
          coalesceConditions('title', ['cardTitle', 'title']),
          coalesceConditions('description', ['cardDescription', 'description']),
          coalesceConditions('image', ['cardImage', 'image']),
          `"slug":slug.current`,
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

export const getBlogPageData = async (slug: string, locale: Locale) => {
  return await handleErrors(
    sanityFetch<GetBlogPageDataQueryResponse>({
      query: getBlogPageDataQuery,
      params: { slug: getLocalizedSlug(slug, locale, 'blog'), locale },
    }),
  );
};

export const getBlogPageDataQuery = `
*[_type == "blog" && slug.current == $slug && ${localeMatch}][0]{
    ...,
    ${[richText].join(',')}
}
`;

export type GetBlogPageDataQueryResponse = Blog;

export const getAllBlogIndexTranslations = async () => {
  return await handleErrors(
    sanityFetch<GetAllBlogIndexTranslationsQueryResponse>({
      query: getAllBlogIndexTranslationsQuery,
    }),
  );
};

export const getAllBlogIndexTranslationsQuery = `
*[_type == "blogIndex"].language
`;

export type GetAllBlogIndexTranslationsQueryResponse = string[];

export const getAllBlogsPaths = async () => {
  return await handleErrors(
    sanityFetch<GetAllBlogsPathsQuery>({ query: getAllBlogsPathsQuery }),
  );
};

export const getAllBlogsPathsQuery = `
*[_type == "blog" && defined(slug.current) && !seoNoIndex]{
  "slug":slug.current,
  "locale":language
}
`;

export type GetAllBlogsPathsQuery = {
  slug: string;
  locale: Locale;
}[];

export const cleanBlogSlug = (str: string) => {
  const arr = str.split('/');
  return arr[arr.length - 1];
};
