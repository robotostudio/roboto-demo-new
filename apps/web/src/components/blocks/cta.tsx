import { FC } from 'react';
import { Cta, SanityKeyed } from '~/schema';
import { SanityButtons } from '~/types';
import Meteors from '../global/meteor';
import { Buttons } from '../global/buttons';
import { RichText } from '../global/richText';

export type CtaBlockProps = SanityKeyed<Cta> & {
  buttons: SanityButtons;
};

export const CtaBlock: FC<CtaBlockProps> = ({ title, richText, buttons }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 md:py-32">
      <Meteors number={30} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
          <div className="py-4 text-white text-opacity-80">
            <RichText value={richText} />
          </div>
          <Buttons
            buttons={buttons}
            wrapperProps={{
              className:
                'flex flex-col items-center justify-center gap-4 md:flex-row',
            }}
          />
        </div>
      </div>
    </section>
  );
};
