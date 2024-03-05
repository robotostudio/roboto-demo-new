import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { GetMainPageDataQueryResponse } from './main-page-query';

export type MainPageComponentProps =
  PageComponentProps<GetMainPageDataQueryResponse>;

export const MainPageComponent: FC<MainPageComponentProps> = ({ data }) => {
  const { description, title } = data ?? {};
  return <div>main page {JSON.stringify(data)}</div>;
};
