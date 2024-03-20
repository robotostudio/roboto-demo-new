import { FC, Suspense } from 'react';
import { SearchParamsText } from '../atoms/searchParamsText';
import { DynamicIntro } from '~/schema';
import { ProcessPageBuilderBlock } from '~/types';
import { RichText } from '../global/richText';
import { Buttons } from '../global/buttons';

export type DynamicIntroBlockProps = ProcessPageBuilderBlock<DynamicIntro>;

export const DynamicIntroBlock: FC<DynamicIntroBlockProps> = ({
  buttons,
  richText,
  title,
}) => {
  return (
    <section>
      <div className="w-full py-6">
        <div className="container flex flex-col items-start gap-4 px-4 md:px-6">
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold tracking-tighter">
              Hey!{' '}
              <Suspense>
                <SearchParamsText
                  param={'name'}
                  fallback={'Buddy'}
                  className=""
                />
              </Suspense>
            </h2>
            <div className="max-w-4xl">
              <p className=" text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
                {title}
              </p>
              <RichText value={richText} />
            </div>
          </div>
          <Buttons buttons={buttons} />
        </div>
      </div>
    </section>
  );
};
