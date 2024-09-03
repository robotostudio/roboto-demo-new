/* eslint-disable @next/next/no-img-element */
import { Palette } from 'lucide-react';
import { ImageResponse } from 'next/og';
import { ImageResponseOptions } from 'next/server';

import { ogImageDimensions } from '~/config';
import { getClient } from '~/lib/sanity';
import { getOGDataQuery } from '~/lib/sanity/query';
import { GetOGDataQueryResult } from '~/sanity.types';

export const runtime = 'edge';

async function getTtfFont(
  family: string,
  axes: string[],
  value: number[],
): Promise<ArrayBuffer> {
  const familyParam = axes.join(',') + '@' + value.join(',');

  // Get css style sheet with user agent Mozilla/5.0 Firefox/1.0 to ensure non-variable TTF is returned
  const cssCall = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:${familyParam}&display=swap`,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 Firefox/1.0',
      },
    },
  );

  const css = await cssCall.text();
  const ttfUrl = css.match(/url\(([^)]+)\)/)?.[1];

  if (!ttfUrl) {
    throw new Error('Failed to extract font URL from CSS');
  }

  return await fetch(ttfUrl).then((res) => res.arrayBuffer());
}

const getOptions = async (): Promise<ImageResponseOptions> => {
  const interRegular = await getTtfFont('Inter', ['wght'], [400]);
  const interBold = await getTtfFont('Inter', ['wght'], [700]);
  const interSemiBold = await getTtfFont('Inter', ['wght'], [600]);

  return {
    width: ogImageDimensions.width,
    height: ogImageDimensions.height,
    fonts: [
      {
        name: 'Inter',
        data: interRegular,
        style: 'normal',
        weight: 400,
      },
      {
        name: 'Inter',
        data: interBold,
        style: 'normal',
        weight: 700,
      },
      {
        name: 'Inter',
        data: interSemiBold,
        style: 'normal',
        weight: 600,
      },
    ],
  };
};

async function getOGData(id: string) {
  const data = await getClient().fetch<GetOGDataQueryResult>(getOGDataQuery, {
    id,
  });
  console.log('🚀 ~ data ~ data:', data);

  if (!data) return undefined;

  return data;
}

const Generic = async ({ id }: any) => {
  const data = await getOGData(id);
  let content = (
    <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
      <div tw="flex w-full h-full items-center justify-center">
        <h1 style={{ fontFamily: 'Inter' }}>
          Something went Wrong with image generation
        </h1>
      </div>
    </div>
  );
  if (data) {
    const { description, image, title, type, date, palette } = data;
    console.log('🚀 ~ Generic ~ palette:', palette);
    const truncatedDesc = description?.slice(0, 160).concat('...');
    const dominantColor = palette?.dominant?.background || '#3B82F6';
    content = (
      <div
        tw={`bg-[${dominantColor}] flex flex-row overflow-hidden relative w-full`}
        style={{ fontFamily: 'Inter' }}
      >
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'transparent' }} />
              <stop offset="100%" style={{ stopColor: 'white' }} />
            </linearGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#gradient)"
            opacity="0.2"
          />
        </svg>

        <div tw="flex-1 p-10 flex flex-col justify-between relative z-10">
          <div tw="flex justify-between items-start w-full">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                fill="white"
              ></path>
            </svg>
            <div tw="bg-white flex bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
              {date}
            </div>
          </div>

          <h1 tw="text-5xl font-bold leading-tight max-w-[90%] text-white">
            {title}
          </h1>

          <div
            tw={`bg-white text-[${dominantColor}] flex px-5 py-2 rounded-full text-base font-semibold self-start`}
          >
            {type
              .split(/(?=[A-Z])/)
              .join(' ')
              .toLowerCase()
              .replace(/^\w/, (c) => c.toUpperCase())}
          </div>
        </div>

        <div tw="w-[630px] h-[630px] flex items-center justify-center p-8 relative z-10">
          <div tw="w-[566px] h-[566px] bg-white bg-opacity-20 flex flex-col justify-center items-center rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03),0_4px_6px_-1px_rgba(0,0,0,0.05),0_8px_10px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
            <div tw="flex relative w-full h-full">
              {image?.url && (
                <img
                  src={image.url}
                  tw="w-full h-full rounded-3xl shadow-2xl"
                  width={566}
                  height={566}
                  alt="Dynamic Image from Page"
                  style={{
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return new ImageResponse(content, await getOptions());
};

const NotFound = async ({ image }: any) => {
  return new ImageResponse(
    (
      <div
        tw="flex flex-col w-full h-full items-center justify-center bg-white"
        style={{ fontFamily: 'Inter' }}
      >
        <div tw=" flex w-full h-full items-center justify-center ">
          <h1>Something went Wrong with image generation</h1>
        </div>
      </div>
    ),
    await getOptions(),
  );
};

const block = {
  notFound: Generic,
  page: Generic,
  mainPage: Generic,
} as const;

export async function GET({ url }: Request): Promise<ImageResponse> {
  const { searchParams } = new URL(url);
  const type = searchParams.get('type') as keyof typeof block;
  const para = Object.fromEntries(searchParams.entries());
  console.log('🚀 ~ GET ~ type:', type, para);

  const image = block[type] ?? block['notFound'];

  try {
    return await image(para);
  } catch (err) {
    console.log(err);
    return await block['notFound']({});
  }
}
