import { Locale } from '~/config';

export async function handleErrors<T>(
  promise: Promise<T>,
): Promise<[T | undefined, unknown]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    if (err instanceof Error) {
      console.log('errr', err.name, err.message);
      // } else if (isAxiosError(err)) {
      //   console.log('eror', err.response);
    } else {
      console.log('eror', JSON.stringify(err));
    }

    return [undefined, err];
  }
}

export const getLocalizedSlug = (slug: string, locale: Locale) => {
  if (locale === 'en-GB') return `/${slug}`;
  return `/${locale}/${slug}`;
};
