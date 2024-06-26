import { FC } from 'react';
import { PageBuilderBlock } from '~/components/global/pagebuilder';
import { PageComponentProps } from '~/types';

import { GetMainPageDataQueryResult, PageBuilder } from '~/sanity.types';

export type MainPageComponentProps =
  PageComponentProps<GetMainPageDataQueryResult>;

export const MainPageComponent: FC<MainPageComponentProps> = ({
  data,
  bucket,
}) => {
  const { pageBuilder } = data ?? {};
  return (
    <main>
      <PageBuilderBlock
        pageBuilder={pageBuilder as unknown as PageBuilder}
        bucket={bucket}
      />
    </main>
  );
};
