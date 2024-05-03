import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getPageLinkedFeatureFlags } from '~/components/pages/slug-page/slug-page-api';
import { sanityServerFetch } from './sanity/sanity-server-fetch';
import { getVariantsFromMiddlewareQuery } from './sanity/query';
import { handleErrors } from './helper';
import { GetVariantsFromMiddlewareQueryResult } from '~/sanity.types';

export function getBucket(buckets: readonly string[]) {
  // Get a random number between 0 and 1
  let n = cryptoRandom() * 100;
  // Get the percentage of each bucket
  const percentage = 100 / buckets.length;
  // Loop through the buckets and see if the random number falls
  // within the range of the bucket
  return (
    buckets.find(() => {
      n -= percentage;
      return n <= 0;
    }) ?? buckets[0]
  );
}

function cryptoRandom() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1);
}

export const getVariants = async (data: { _id: string; slug: string }) => {
  const bucket = cookies().get('user-bucket')?.value ?? 'control';
  // console.log('🚀 ~ getVariants ~ bucket:', bucket, data?._id);
  const [featureFlag] = await getPageLinkedFeatureFlags(data._id);
  // console.log('🚀 ~ getVariants ~ featureFlag:', featureFlag);
  const isVariant = bucket === 'variant';

  if (featureFlag && isVariant) {
    const variant = featureFlag?.variants?.find((v) => v?.key === 'variant');
    // console.log('🚀 ~ getVariants ~ variant:', variant);
    const variantSlug = variant?.resource?.slug;
    if (variantSlug && variantSlug !== data.slug) redirect(variantSlug);
  }
};

export const getVariantFromMiddleware = async (
  slug: string,
  version: boolean,
) => {
  const _variant = version ? 'variant' : 'control';

  const [feature] = await handleErrors(
    sanityServerFetch<GetVariantsFromMiddlewareQueryResult>({
      query: getVariantsFromMiddlewareQuery,
      params: {
        slug,
      },
    }),
  );
  if (feature) {
    const variant = feature.test?.variants?.find((v) => v.key === _variant);
    if (variant?.resource?.slug && variant?.resource?.slug !== slug)
      return variant?.resource?.slug;
  }

  return undefined;
};