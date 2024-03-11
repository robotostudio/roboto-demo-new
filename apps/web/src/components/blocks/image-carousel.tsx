import { FC } from 'react';
import Balancer from 'react-wrap-balancer';
import { ImageCarousel } from '~/schema';
import { SanityButtons } from '~/types';
import { Buttons } from '../global/buttons';
import { RichText } from '../global/richText';
import { SanityImage } from '../global/sanity-image';

export type ImageCarouselBlockProps = Omit<ImageCarousel, 'buttons'> & {
  buttons: SanityButtons;
};

export type CarouselBlockProps = Pick<ImageCarouselBlockProps, 'carousel'>;

export const CarouselBlock: FC<CarouselBlockProps> = ({ carousel }) => {
  if (!Array.isArray(carousel)) return <></>;
  return (
    <div className="grid grid-cols-2 gap-2">
      {carousel.map((slide) => (
        <div key={slide?._key}>
          <div className="flex flex-col items-center">
            <SanityImage
              image={slide.image}
              width={900}
              height={600}
              className="aspect-video h-auto w-auto"
            />
            <span>{slide?.caption}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ImageCarouselBlock: FC<ImageCarouselBlockProps> = ({
  buttons,
  carousel,
  eyebrow,
  richText,
  title,
}) => {
  return (
    <section className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <span>{eyebrow}</span>
            <Balancer>{title}</Balancer>
            <RichText value={richText} />
            <Buttons buttons={buttons} />
          </div>
          <div />
        </div>
        <div className="my-10">
          <CarouselBlock carousel={carousel} />
        </div>
      </div>
    </section>
  );
};
