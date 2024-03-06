import { groq } from 'next-sanity';

export const localeMatch = groq`select(($locale == 'en-GB' || $locale == '' ) => 
  (!defined(language) || language == 'en-GB'), language == $locale => language == $locale)`;

export const refExtend = (
  name: string,
  isArray = false,
  ext: Array<string> = [],
) => groq`
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
  groq`defined(${name})=>{${name}${isArray ? '[]' : ''}{${
    spread ? '...,' : ''
  } ${ext.join(',')}}}`;

export const selectConditions = (
  key: string,
  inputs: string[],
  fallback?: unknown,
) => {
  const ifCondition = [
    ...inputs.map((input) => groq`defined(${input})=>${input}`),
    JSON.stringify(fallback),
  ].join(',');
  return groq`"${key}": select(${ifCondition})`;
};

export const coalesceConditions = (key: string, inputs: string[]) => {
  return groq`"${key}": coalesce(${inputs.join(',')})`;
};

export const internal = groq`internal->slug.current`;

export const extractLink = coalesceConditions('href', [
  'internal->slug.current',
  'external',
]);

export const button = extent(
  'url',
  false,
  ['openInNewTab', extractLink],
  false,
);

export const extractIcon = extent('icon', false, ['svg'], false);

export const buttons = extent('buttons', true, [button, extractIcon]);

export const link = extent('link', false, [button], false);

export const dropDownLink = extent('columns', true, [button, extractIcon]);

export const links = extent('links', true, [button, dropDownLink]);
