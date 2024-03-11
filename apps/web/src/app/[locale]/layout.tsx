import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Navbar } from '~/components/global/navbar';
import { PreviewBar } from '~/components/global/preview-bar';
import { locales } from '~/config';
import { token } from '~/lib/sanity/sanity-server-fetch';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const PreviewProvider = dynamic(
  () => import('~/components/global/preview-provider'),
);

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) return notFound();
  unstable_setRequestLocale(locale);

  const { isEnabled } = draftMode();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <Navbar />
          {isEnabled ? (
            <PreviewProvider token={token}>{children}</PreviewProvider>
          ) : (
            children
          )}
          {isEnabled && <PreviewBar />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
