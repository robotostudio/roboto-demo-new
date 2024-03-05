import { FC } from 'react';
import { Cta, SanityKeyed } from '~/schema';

export type CtaBlockProps = SanityKeyed<Cta>;

export const CtaBlock: FC<CtaBlockProps> = ({ title, subtitle }) => {
  return (
    <section>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </section>
  );
};
