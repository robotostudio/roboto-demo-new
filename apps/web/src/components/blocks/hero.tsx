import { FC } from 'react';
import { Hero, SanityKeyed } from '~/schema';

export type HeroBlockProps = SanityKeyed<Hero>;

export const HeroBlock: FC<HeroBlockProps> = ({ title }) => {
  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
};
