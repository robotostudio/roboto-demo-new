import { groq } from 'next-sanity';
import { Locale } from '~/config';
import { PageBuilder, BlogIndex, Blog } from '~/schema';
import { SanityButtons, NavLinkExt, NavbarLinks, SanityImage } from '~/types';

export const localeMatch = `select(($locale == 'en-GB' || $locale == '' ) => 
  (!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;

// const refExtend = (name: string, isArray = false, ext: Array<string> = []) =>
//   `defined(${name})=>{${name}${isArray ? '[]->' : '->'}{...,${ext.join(',')}}}`;

// const extent = (
//   name: string,
//   isArray = false,
//   ext: Array<string> = [],
//   spread = true,
// ) =>
//   `defined(${name})=>{${name}${isArray ? '[]' : ''}{${
//     spread ? '...,' : ''
//   } ${ext.join(',')}}}`;

// const selectConditions = (
//   key: string,
//   inputs: string[],
//   fallback?: unknown,
// ) => {
//   const ifCondition = [
//     ...inputs.map((input) => `defined(${input})=>${input}`),
//     JSON.stringify(fallback),
//   ].join(',');
//   return `"${key}": select(${ifCondition})`;
// };

// const coalesceConditions = (key: string, inputs: string[]) => {
//   return `"${key}": coalesce(${inputs.join(',')})` as const;
// };

// const internal = `internal->slug.current`;

// const extractLink = `"href": select(
//   type== "internal"=>internal->slug.current,
//   type== "external"=>external,
//   "#"
//   )`;

// const button = extent('url', false, ['openInNewTab', extractLink], false);

// const extractIcon = extent('icon', false, ['svg'], false);

// const buttons = extent('buttons', true, [button, extractIcon]);

// const customLink = extent(
//   'customLink',
//   false,
//   [extractLink, 'openInNewTab'],
//   false,
// );

// const markDefs = extent('markDefs', true, [customLink]);

// const richText = extent('richText', true, [markDefs]);

// const link = extent('link', false, [button], false);

// const dropDownLink = extent('columns', true, [button, extractIcon]);

// const links = extent('links', true, [button, dropDownLink]);

// const form = refExtend('form', false, []);

// const pageBuilder = extent('pageBuilder', true, [buttons, richText, form]);

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

export type GetMainPageDataQueryResponse = {
  title: string;
  description: string;
  pageBuilder: PageBuilder;
};

export const getAllMainPageTranslationsQuery = groq`
*[_type == "mainPage"].language
`;

export type GetAllMainPageTranslationsQueryResponse = string[];

const cardProjection = `
"title":coalesce(cardTitle,title),
"description":coalesce(cardDescription,description),
"image":coalesce(cardImage,image)
`;

export const getBlogIndexDataQuery = groq`
{
    "seo":*[_type == "blogIndex" && ${localeMatch}][0]{
        ...,
    },
    "blogs":*[_type == "blog" && ${localeMatch}]{
      _id,
      ${cardProjection},
      "slug":slug.current
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

export type GetBlogPageDataQueryResponse = Blog;

export const getAllBlogIndexTranslationsQuery = groq`
*[_type == "blogIndex"].language
`;

export type GetAllBlogIndexTranslationsQueryResponse = string[];

export const getAllBlogsPathsQuery = groq`
*[_type == "blog" && defined(slug.current) && !seoNoIndex]{
  "slug":slug.current,
  "locale":language
}
`;

export type GetAllBlogsPathsQuery = {
  slug: string;
  locale: Locale;
}[];

export type FooterData = {
  _id: string;
  title: string;
  buttons: SanityButtons;
  links: NavLinkExt[];
  logo: any;
};

export type NavbarData = {
  _id: string;
  title: string;
  buttons: SanityButtons;
  links: NavbarLinks;
  logo: any;
};

const _url = `defined(url)=>{
  url{
    openInNewTab,
    "href": select(type == "internal"=>internal->slug.current, type == "external" => external,"#"),
  }
}`;

const _customLink = `defined(customLink)=>{
  customLink{
    openInNewTab,
    "href": select(type == "internal"=>internal->slug.current, type == "external" => external,"#"),
  }
}`;

const _markDefs = ` defined(markDefs)=>{
  markDefs[]{
    ${_customLink}   
  }
}`;

const _icon = `defined(icon)=>{
  icon{
    svg
  }
}`;
const _columns = `defined(columns)=>{
  columns[]{
    ...,
    ${_icon},
    ${_url}
  }
}`;

const _links = `defined(links)=>{
  links[]{
    ...,
    ${_url},
    ${_columns}
  }
}`;

const _buttons = `defined(buttons)=>{
  buttons[]{
    ...,
    ${_url},
    ${_icon}
  }
}`;

const _richText = `defined(richText)=>{
  richText[]{
    ...,
    ${_markDefs}
   
  }
}`;

const _form = `defined(form)=>{
  form->{
    ...,
  }
}`;

const _pageBuilder = `defined(pageBuilder)=>{
  pageBuilder[]{
    ...,
    ${_buttons},
    ${_richText},
    ${_form}

  }

}`;
export const getFooterDataQuery = groq`
*[_type == "footer"][0]{
    _id,
    title,
    ${_links},
    "logo":*[_type == "logo"][0].image.asset->url
}
`;

export const getNavbarDataQuery = groq`
*[_type == "navbar"][0]{
    _id,
    title,
    ${_links},
    ${_buttons},
    "logo":*[_type == "logo"][0].image.asset->url
  }
  `;

export const getBlogPageDataQuery = groq`
*[_type == "blog" && slug.current == $slug && ${localeMatch}][0]{
    ...,
    ${_richText}
  }
  `;

export const getMainPageDataQuery = groq`
*[_type == "mainPage" && ${localeMatch}][0]{
  title,
  description,
  ${_pageBuilder}
}
`;

export const getSlugPageDataQuery = groq`
*[_type == "page" && slug.current == $slug ][0]{
    title,
    content,
    "slug":slug.current,
    ${_pageBuilder}
    
}
`;
