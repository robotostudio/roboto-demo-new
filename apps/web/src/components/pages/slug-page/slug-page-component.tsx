import { FC } from 'react';
import { PageBuilderBlock } from '~/components/global/pagebuilder';
import { GetSlugPageDataQueryResult, PageBuilder } from '~/sanity.types';
import { PageComponentProps } from '~/types';

export type SlugPageProps = PageComponentProps<GetSlugPageDataQueryResult>;

export const SlugPage: FC<SlugPageProps> = ({ data }) => {
  const { title, pageBuilder } = data ?? {};
  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      {Array.isArray(pageBuilder) && (
        <PageBuilderBlock pageBuilder={pageBuilder as unknown as PageBuilder} />
      )}
    </main>
  );
};
