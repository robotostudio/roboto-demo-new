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
    <section className="overflow-x-auto">
      {/* Grid container - this is what makes them into a row of cards */}
      <div className="grid grid-flow-col gap-4 bg-blue-500 p-4">
        {carousel.map((slide) => (
          // Card container - This contains the image and title, one below each other
          <div key={slide?._key} className="w-[600px] bg-green-500">
            <SanityImage image={slide.image} width={900} height={600} />
            {slide?.caption && <span>{slide?.caption}</span>}
          </div>
        ))}
      </div>
    </section>
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
    <section>
      <div className="mx-auto w-full max-w-6xl bg-yellow-600">
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <span>{eyebrow}</span>
            <h2 className="text-2xl">
              <Balancer>{title}</Balancer>
            </h2>
            <RichText value={richText} />
            <Buttons buttons={buttons} />
          </div>
          <div />
        </div>
      </div>
      <CarouselBlock carousel={carousel} />
    </section>
  );
};
