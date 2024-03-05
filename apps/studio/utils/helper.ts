import {
  CustomValidator,
  Slug,
  SlugIsUniqueValidator,
  SlugifierFn,
  ValidationContext,
} from 'sanity';
import slugify from 'slugify';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

export const getTitleCase = (name: string) => {
  const titleTemp = name.replace(/([A-Z])/g, ' $1');
  return titleTemp.charAt(0).toUpperCase() + titleTemp.slice(1);
};

export const isUniqueAcrossAllDocuments: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const { document, getClient } = context;
  const client = getClient({ apiVersion: '2022-12-07' });
  const id = document?._id.replace(/^drafts\./, '');
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
  };
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
  const result = await client.fetch<boolean>(query, params);
  return result;
};

const indexPageTypes = ['blogIndex'];

export const processLanguage = (lang: string) => {
  if (lang === 'en-GB') return '';
  return lang;
};
export const getDocTypePrefix = (type: string) => {
  if (type === 'mainPage' || type === 'page') {
    return '';
  }

  if (indexPageTypes.includes(type)) {
    return type.slice(0, -5);
  }
  return type;
};

export const serializeSlug = (input: string, language = 'en-GB', type = '') => {
  const locale = processLanguage(language);
  const prefix = getDocTypePrefix(type);
  console.log('lo', { input, language, type, prefix, locale });
  const slug =
    '/' +
    [
      locale,
      prefix,
      slugify(input, {
        lower: true,
        remove: /[^a-zA-Z0-9 ]/g,
      }),
    ]
      .filter(Boolean)
      .join('/');

  return slug;
};

export const getFlag = (lang: string) => {
  if (lang === 'en-GB') return getUnicodeFlagIcon('GB');
  if (lang === 'en-US') return getUnicodeFlagIcon('US');
  return getUnicodeFlagIcon(lang);
};

export const createSlug: SlugifierFn = (input, _, { parent }) => {
  const { language = 'en-GB', _type } = parent as {
    _type: string;
    language: string;
  };
  return serializeSlug(
    [...indexPageTypes, 'mainPage'].includes(_type) ? '' : input,
    language,
    _type,
  );
};

export const validateSlugIndexPages: CustomValidator<Slug | undefined> = (
  slug: Slug | undefined,
  context: ValidationContext,
): string | true => {
  let language: string = '';
  if (context.document != null && context.document.language != null) {
    language = context.document?.language as string;
  }

  if (context.document?._type == null) {
    return 'doc type not set';
  }

  const slugValue = serializeSlug(
    getDocTypePrefix(context.document?._type),
    language,
  );
  if (slug?.current != slugValue) {
    return `only ${slugValue} is allowed`;
  }
  return true;
};
