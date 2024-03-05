import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { locales } from '~/config';
import { PageParams } from '~/types';

export default async function LocaleLayout({
  children,
  params: { locale },
}: PageParams & PropsWithChildren) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) return notFound();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
