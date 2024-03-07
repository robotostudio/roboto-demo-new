import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '~/components/global/navbar';
import { locales } from '~/config';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) return notFound();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
