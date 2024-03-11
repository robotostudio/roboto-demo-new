import { FC } from 'react';
import { PageComponentProps } from '~/types';
import { GetSlugPageDataQueryResponse } from './slug-page-query';
import { PageBuilderBlock } from '~/components/global/pagebuilder';

export type SlugPageProps = PageComponentProps<GetSlugPageDataQueryResponse>;

export const SlugPage: FC<SlugPageProps> = ({ data, ...props }, ...args) => {
  console.log('🚀 ~ props:', props, args);
  const { slug, title, pageBuilder } = data ?? {};
  return (
    <main>
      <div>
        <h1>{title}</h1>
      </div>
      <PageBuilderBlock pageBuilder={pageBuilder} />
    </main>
  );
};
