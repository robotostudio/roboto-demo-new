import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, Locale, locales } from './config';

import { NextFetchEvent, NextRequest } from 'next/server';
import { getBucket } from './lib/ab-testing';

function withMiddleware() {
  const m = createMiddleware({
    locales: locales,
    defaultLocale: DEFAULT_LOCALE as Locale,
    localeDetection: false,
    localePrefix: 'as-needed',
  });
  return (req: NextRequest, _next: NextFetchEvent) => {
    const res = m(req);
    const userBucket = req.cookies.get('user-bucket')?.value;
    if (!userBucket) {
      const bucket = getBucket(['control', 'variant']);
      res.cookies.set('user-bucket', bucket);
    }

    return res;
  };
}

export default withMiddleware();

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
