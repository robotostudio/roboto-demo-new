import { FC } from 'react';
import { Hero, SanityKeyed } from '~/schema';
import { SanityButtons } from '~/types';
import { Buttons } from '../global/buttons';
import { RichText } from '../global/richText';

export type HeroBlockProps = Omit<SanityKeyed<Hero>, 'buttons'> & {
  buttons: SanityButtons;
};

export const HeroBlock: FC<HeroBlockProps> = ({
  title,
  buttons,
  richText,
  isTitleH1,
}) => {
  return (
    <section
      key="1"
      className="flex flex-col items-center justify-center py-12 lg:py-24"
    >
      <div className="container px-4 text-center md:px-6">
        {isTitleH1 ? (
          <h1 className="mb-4 text-3xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h1>
        ) : (
          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-5xl">
            {title}
          </h2>
        )}
        <div className="py-4">
          <RichText value={richText} className="prose-invert" />
        </div>
        <Buttons
          buttons={buttons}
          wrapperProps={{
            className:
              'flex flex-col items-center justify-center gap-4 md:flex-row',
          }}
        />
      </div>
    </section>
  );
};
