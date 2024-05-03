import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, Locale, locales } from './config';

import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { getBucket, getVariantFromMiddleware } from './lib/ab-testing';

function withMiddleware() {
  const m = createMiddleware({
    locales: locales,
    defaultLocale: DEFAULT_LOCALE as Locale,
    localeDetection: false,
    localePrefix: 'as-needed',
  });
  return async (req: NextRequest, _next: NextFetchEvent) => {
    let userBucket = req.cookies.get('user-bucket')?.value;
    const hasBucket = !!userBucket;
    if (!userBucket) userBucket = getBucket(['control', 'variant']);
    const { pathname } = req.nextUrl;
    const url = req.nextUrl.clone();
    const variant = await getVariantFromMiddleware(
      pathname,
      userBucket === 'variant',
    );
    if (variant) {
      url.pathname = variant;
      const _res = NextResponse.redirect(url);
      if (!hasBucket) _res.cookies.set('user-bucket', userBucket);
      return _res;
    }
    const res = m(req);
    if (!hasBucket) res.cookies.set('user-bucket', userBucket);
    return res;
  };
}

export default withMiddleware();

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
