import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { GetMainPageDataQueryResponse } from './main-page-query';
import { PageBuilderBlock } from '~/components/global/pagebuilder';

export type MainPageComponentProps =
  PageComponentProps<GetMainPageDataQueryResponse>;

export const MainPageComponent: FC<MainPageComponentProps> = ({ data }) => {
  const { description, title, pageBuilder } = data ?? {};
  return (
    <main>
      <PageBuilderBlock pageBuilder={pageBuilder} />
    </main>
  );
};
