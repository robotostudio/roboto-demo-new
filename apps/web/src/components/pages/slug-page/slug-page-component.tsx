import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { GetSlugPageDataQueryResponse } from './slug-page-query';

export type SlugPageProps = PageComponentProps<GetSlugPageDataQueryResponse>;

export const SlugPage: FC<SlugPageProps> = ({ data }) => {
  const { slug, title } = data ?? {};
  return <main>SlugPage : {title}</main>;
};
