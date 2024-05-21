import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, Locale, locales } from './config';

import { NextRequest } from 'next/server';

function withMiddleware(req: NextRequest) {
  const m = createMiddleware({
    locales: locales,
    defaultLocale: DEFAULT_LOCALE as Locale,
    localeDetection: false,
    localePrefix: 'as-needed',
  });

  // let userBucket = req.cookies.get('user-bucket')?.value;
  // if (!userBucket) {
  //   userBucket = getBucket(['control', 'variant']);
  //   const res = NextResponse.redirect(req.nextUrl.clone());
  //   res.cookies.set('user-bucket', userBucket);
  //   return res;
  // }
  return m(req);
}

export default withMiddleware;

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
