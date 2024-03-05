import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, locales } from './config';

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
  localePrefix: 'as-needed',
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const shouldHandle =
    pathname === '/' ||
    new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(
      request.nextUrl.pathname,
    );
  if (!shouldHandle) return;

  return intlMiddleware(request);
}

// import createMiddleware from 'next-intl/middleware';
// import { DEFAULT_LOCALE, Locale, locales } from './config';

// export default createMiddleware({
//   locales: locales,
//   defaultLocale: DEFAULT_LOCALE as Locale,
//   localeDetection: false,
//   localePrefix: 'as-needed',
// });

// export const config = {
//   // Skip all paths that should not be internationalized
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
// };
