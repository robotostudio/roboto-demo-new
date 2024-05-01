import createMiddleware from 'next-intl/middleware';
import { DEFAULT_LOCALE, Locale, locales } from './config';

import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';
import { uuidv7 } from 'uuidv7';

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

function stackMiddlewares(
  functions: MiddlewareFactory[] = [],
  index = 0,
): NextMiddleware {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    return current(next);
  }
  return () => NextResponse.next();
}

export const abTestMiddleware: MiddlewareFactory =
  (next) => (request: NextRequest, _next: NextFetchEvent) => {
    const userId = request.cookies.get('user-id');
    if (!userId) {
      const url = request.nextUrl.clone();
      const res = NextResponse.redirect(url);
      res.cookies.set('user-id', uuidv7());
      return res;

      // const res = NextResponse.next();
      // res.cookies.set('user-id', uuidv7());
      // return res;
      // request.cookies.set('user-id', uuidv7());
    }
    return next(request, _next);
  };
const localeMiddleWare: MiddlewareFactory = () =>
  createMiddleware({
    locales: locales,
    defaultLocale: DEFAULT_LOCALE as Locale,
    localeDetection: false,
    localePrefix: 'as-needed',
  });

export default stackMiddlewares([abTestMiddleware, localeMiddleWare]);

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
