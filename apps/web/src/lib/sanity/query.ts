import { groq } from 'next-sanity';
import { Locale } from '~/config';
import { Blog, BlogIndex, PageBuilder } from '~/sanity.types';
import { SanityImage } from '~/types';

export const localeMatch = `select(($locale == 'en-GB' || $locale == '' ) => 
  (!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;

export type GetSlugPageDataQueryResponse = {
  title: string;
  slug: string;
  pageBuilder: PageBuilder;
};

export const getAllSlugPagePathsQuery = groq`
*[_type == "page" && defined(slug.current) && !seoNoIndex]{
  "slug":slug.current,
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
    "blogs":*[_type == "blog" && !seoHideFromLists && ${localeMatch}]{
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
    ...,
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
    title,
    description,
    ${_icon},
    ${_url}
  }
}`;

const _links = `defined(links)=>{
  links[]{
    ...,
    title,
    _type,
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

const _abTestPageBuilder = `_type == "abTestPagebuilder"=>{
  ...,
  "variants":variants[]{
    ...,
    _type,
    ${_buttons},
    ${_richText},
    ${_form},
  }
}`;

const _pageBuilder = `defined(pageBuilder)=>{
  pageBuilder[]{
    ...,
    _type,
    ${_buttons},
    ${_richText},
    ${_form},
    ${_abTestPageBuilder}


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
  _id,
  _type,
  title,
  description,
  "slug":slug.current,
  ${_pageBuilder}
}
`;

export const getSlugPageDataQuery = groq`
*[_type == "page" && slug.current == $slug ][0]{
    _id,
    _type,
    title,
    content,
    "slug":slug.current,
    ${_pageBuilder}
    
}
`;

export const getPageLinkedFeatureFlagsQuery = groq`
*[_type == "abTest" && !(_id in path("drafts.**")) && references($id)][0]{
  feature,
  "variants":variants[]{
    key,
    resource->{
      _type,
      "slug":slug.current
    }
  }
}
`;

export const getVariantsFromMiddlewareQuery = groq`
  *[slug.current == $slug][0]{
    "test": *[_type =="abTest" && references(^._id)][0]{
    feature,
    "variants":variants[]{
      key,
      resource->{
        _type,
        "slug":slug.current
      }
    }
  }
}
`;

export const getPageLinkedFeatureFlagVariantQuery = groq`
*[_type == "abTest" && !(_id in path("drafts.**")) && references($id)][0].variants[@.key == $key][0].resource->{
  _type,
  "slug": slug.current,
  language
}
`;
export const getMarketingModalDataQuery = groq`
*[_type == "marketingModal" && isActive][0]{
    _id,
    title,
    description,
    ${_form}    
}
`;
// export const ogQueryWrapper = (condition: string) => groq`
// *[${condition}][0]{
//   ${[
//     coalesceConditions('title', ['ogTitle', 'title']),
//     coalesceConditions('description', ['ogDescription', 'description']),
//     coalesceConditions('image', [
//       'seoImage',
//       'image',
//       groq`*[_type =="logo"][0].image`,
//     ]),
//   ].join(',')}
// }
// `;

export const getOGDataQuery = groq`
*[_id == $id][0]{
    _id,
    "title":coalesce(ogTitle,title),
    "description":coalesce(ogDescription,description),
    "image": coalesce(seoImage, image, *[_type == "logo"][0].image).asset->{
      "url": url + "?w=566&h=566&dpr=2&fit=max",
    },
    "palette": coalesce(seoImage, image, *[_type == "logo"][0].image).asset->metadata.palette,
    "type":coalesce(_type, "Page"),
    "date":coalesce(date, "Recent")
}
`;
