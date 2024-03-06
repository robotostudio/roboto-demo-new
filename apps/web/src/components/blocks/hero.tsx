import Link from 'next/link';
import { FC } from 'react';
import { Hero, SanityKeyed } from '~/schema';
import { Buttons } from '../global/buttons';
import { SanityButtons } from '~/types';
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
          <RichText value={richText} />
        </div>
        {/* <p className="mx-auto mb-6 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
          The fastest way to ship your frontend. Instantly build and deploy your
          sites to our global edge network.
        </p> */}
        <Buttons
          buttons={buttons}
          wrapperProps={{
            className:
              'flex flex-col items-center justify-center gap-4 md:flex-row',
          }}
        />

        {/* <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Get Started
          </Link>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Contact Sales
          </Link> */}
      </div>
    </section>
  );
};
