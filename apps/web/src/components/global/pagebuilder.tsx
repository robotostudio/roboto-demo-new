import { FC } from 'react';
import { PageBuilder } from '~/schema';
import { HeroBlock, CtaBlock } from '../blocks';
import { SplitFormBlock } from '../blocks/split-form';

export type PageBuilderBlockProps = {
  pageBuilder?: PageBuilder;
};

type BlockTypeKeys = PageBuilder[number]['_type'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Blocks: Record<BlockTypeKeys, FC<any>> = {
  hero: HeroBlock,
  cta: CtaBlock,
  splitForm: SplitFormBlock,
};

const BlockNotFound: FC<{ _type: string }> = ({ _type }) => {
  return <div className="">Block Not Found : {_type}</div>;
};

export const PageBuilderBlock: FC<PageBuilderBlockProps> = ({
  pageBuilder,
}) => {
  if (!Array.isArray(pageBuilder)) return <section></section>;
  return (
    <section>
      {pageBuilder.map((block) => {
        const Comp = Blocks[block._type] ?? BlockNotFound;
        return <Comp {...block} key={block._key} />;
      })}
    </section>
  );
};
