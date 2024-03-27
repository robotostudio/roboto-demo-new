import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { PageBuilderBlock } from '~/components/global/pagebuilder';
import { GetSlugPageDataQueryResponse } from './slug-page-api';

export type SlugPageProps = PageComponentProps<GetSlugPageDataQueryResponse>;

export const SlugPage: FC<SlugPageProps> = ({ data }) => {
  const { title, pageBuilder } = data ?? {};
  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      <PageBuilderBlock pageBuilder={pageBuilder} />
    </main>
  );
};
