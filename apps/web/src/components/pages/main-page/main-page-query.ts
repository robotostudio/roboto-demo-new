import { groq } from 'next-sanity';

export const getMainPageDataQuery = groq`
*[_type == "mainPage"][0]{
  title,
  description,
}
`;

export type GetMainPageDataQueryResponse = {
  title: string;
  description: string;
};
