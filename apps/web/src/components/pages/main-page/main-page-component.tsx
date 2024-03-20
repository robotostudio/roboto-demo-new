import { FC } from 'react';
import { PageBuilderBlock } from '~/components/global/pagebuilder';
import { PageComponentProps } from '~/types';
import { GetMainPageDataQueryResponse } from './main-page-query';

export type MainPageComponentProps =
  PageComponentProps<GetMainPageDataQueryResponse>;

export const MainPageComponent: FC<MainPageComponentProps> = ({ data }) => {
  const { description, title, pageBuilder } = data ?? {};
  return (
    <main>
      <PageBuilderBlock pageBuilder={pageBuilder} />
      {/* <div className="p-10 ">{feature}</div> */}
    </main>
  );
};
