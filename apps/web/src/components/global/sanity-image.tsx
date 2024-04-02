import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { getImageDimensionProps } from '~/lib/helper';
import { urlFor } from '~/lib/sanity';

import { SanityImage as SanityImageProp } from '~/types';

const getDimension = (
  image: SanityImageProp,
  width?: number,
  height?: number,
) => {
  const dimension = getImageDimensionProps(image);
  return {
    width: width ?? dimension.width,
    height: height ?? dimension.height,
  };
};

export const getImageBlurProps = (image?: SanityImageProp) => {
  if (!image) return {};
  if ('blurData' in image) {
    const op: Pick<ImageProps, 'placeholder' | 'blurDataURL'> = {
      placeholder: 'blur',
      blurDataURL: image.blurData as string,
    };
    return op;
  }
  return {};
};

export const SanityImage: FC<{
  image?: SanityImageProp;
  className?: string;
  options?: Omit<ImageProps, 'className' | 'src' | 'width' | 'height'>;
  width?: number;
  height?: number;
}> = ({ image, className, options, height, width }) => {
  if (!image?.asset) return <></>;

  const dimension = getDimension(image, width, height);

  const blurProps = getImageBlurProps(image);

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        alt={image?.asset._ref ?? 'image-broken'}
        src={urlFor(image)
          .width(dimension.width)
          .height(dimension.height)
          .quality(100)
          .url()}
        sizes="(max-width: 640px) 100vw, 80vw"
        width={dimension.width}
        height={dimension.height}
        className={className}
        {...blurProps}
        {...options}
      />
    </div>
  );
};
