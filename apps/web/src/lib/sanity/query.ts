import { Locale } from '~/config';
import { PageBuilder, BlogIndex, Blog } from '~/schema';
import { SanityButtons, NavLinkExt, NavbarLinks, SanityImage } from '~/types';

export const localeMatch = `select(($locale == 'en-GB' || $locale == '' ) => 
  (!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;

export const refExtend = (
  name: string,
  isArray = false,
  ext: Array<string> = [],
) => `
  defined(${name})=>{
    ${name}${isArray ? '[]->' : '->'}{
      ...,
      ${ext.join(',')}
    }
  }
  `;

export const extent = (
  name: string,
  isArray = false,
  ext: Array<string> = [],
  spread = true,
) =>
  `defined(${name})=>{${name}${isArray ? '[]' : ''}{${
    spread ? '...,' : ''
  } ${ext.join(',')}}}`;

export const selectConditions = (
  key: string,
  inputs: string[],
  fallback?: unknown,
) => {
  const ifCondition = [
    ...inputs.map((input) => `defined(${input})=>${input}`),
    JSON.stringify(fallback),
  ].join(',');
  return `"${key}": select(${ifCondition})`;
};

export const coalesceConditions = (key: string, inputs: string[]) => {
  return `"${key}": coalesce(${inputs.join(',')})`;
};

export const internal = `internal->slug.current`;

export const extractLink = `"href": select(
  type== "internal"=>internal->slug.current,
  type== "external"=>external,
  "#"
  )`;

export const button = extent(
  'url',
  false,
  ['openInNewTab', extractLink],
  false,
);

export const extractIcon = extent('icon', false, ['svg'], false);

export const buttons = extent('buttons', true, [button, extractIcon]);

export const customLink = extent(
  'customLink',
  false,
  [extractLink, 'openInNewTab'],
  false,
);

export const markDefs = extent('markDefs', true, [customLink]);

export const richText = extent('richText', true, [markDefs]);

export const link = extent('link', false, [button], false);

export const dropDownLink = extent('columns', true, [button, extractIcon]);

export const links = extent('links', true, [button, dropDownLink]);

export const form = refExtend('form', false, []);

export const pageBuilder = extent('pageBuilder', true, [
  buttons,
  richText,
  form,
]);

export const getSlugPageDataQuery = `
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

export const getAllSlugPagePathsQuery = `
*[_type == "page" && defined(slug.current) && !seoNoIndex]{
  "slug":string::split(slug.current,"/")[1],
  "locale":language
}
`;

export type GetAllSlugPagePathsQueryResponse = {
  slug: string;
  locale: Locale;
}[];

export const getMainPageDataQuery = `
*[_type == "mainPage" && ${localeMatch}][0]{
  ${['title', 'description', pageBuilder].join(',')}
}
`;

export type GetMainPageDataQueryResponse = {
  title: string;
  description: string;
  pageBuilder: PageBuilder;
};

export const getAllMainPageTranslationsQuery = `
*[_type == "mainPage"].language
`;

export type GetAllMainPageTranslationsQueryResponse = string[];

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

export const getBlogPageDataQuery = `
*[_type == "blog" && slug.current == $slug && ${localeMatch}][0]{
    ...,
    ${[richText].join(',')}
}
`;

export type GetBlogPageDataQueryResponse = Blog;

export const getAllBlogIndexTranslationsQuery = `
*[_type == "blogIndex"].language
`;

export type GetAllBlogIndexTranslationsQueryResponse = string[];

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

export const getNavbarDataQuery = `
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
