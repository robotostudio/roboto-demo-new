import { FC } from 'react';
import { PageBuilder } from '~/schema';
import { HeroBlock, CtaBlock, DynamicIntroBlock } from '../blocks';
import { SplitFormBlock } from '../blocks/split-form';
import { ImageCarouselBlock } from '../blocks/image-carousel';

export type PageBuilderBlockProps = {
  pageBuilder?: PageBuilder;
};

type BlockTypeKeys = PageBuilder[number]['_type'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Blocks: Record<BlockTypeKeys, FC<any>> = {
  hero: HeroBlock,
  cta: CtaBlock,
  dynamicIntro: DynamicIntroBlock,
  splitForm: SplitFormBlock,
  imageCarousel: ImageCarouselBlock,
};

const BlockNotFound: FC<{ _type: string }> = ({ _type }) => {
  return (
    <div className="grid place-items-center">Block Not Found : {_type}</div>
  );
};

export const PageBuilderBlock: FC<PageBuilderBlockProps> = ({
  pageBuilder,
}) => {
  if (!Array.isArray(pageBuilder)) return <section></section>;
  return (
    <section className="flex flex-col gap-4">
      {pageBuilder.map((block) => {
        const Comp = Blocks[block._type] ?? BlockNotFound;
        return <Comp {...block} key={block._key} />;
      })}
    </section>
  );
};
