import type { ComponentType, FC } from 'react';
import type { PageBuilder } from '~/sanity.types';
import { CtaBlock, DynamicIntroBlock, HeroBlock } from '../blocks';
import { ImageCarouselBlock } from '../blocks/image-carousel';
import { SplitFormBlock } from '../blocks/split-form';

export type PageBuilderBlockProps<T> = {
  pageBuilder?: T | null;
  bucket?: string;
};

type BlockTypeKeys = PageBuilder[number]['_type'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Blocks: Record<BlockTypeKeys, FC<any> | ComponentType<any>> = {
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

export const PageBuilderBlock: FC<PageBuilderBlockProps<PageBuilder>> = ({
  pageBuilder,
  bucket,
}) => {
  if (!Array.isArray(pageBuilder)) return <section />;
  return (
    <section className="flex flex-col gap-4">
      {pageBuilder.map((block) => {
        const Comp = Blocks[block._type] ?? BlockNotFound;
        return <Comp {...block} key={block._key} bucket={bucket} />;
      })}
    </section>
  );
};
