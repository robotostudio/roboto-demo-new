import { Loader2 } from 'lucide-react';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Footer } from '~/components/global/footer';
import { Navbar } from '~/components/global/navbar';
import { CSPostHogProvider } from '~/components/global/posthog-provider';
import { PreviewBar } from '~/components/global/preview-bar';
import { locales } from '~/config';
import { getBootstrapData } from '~/lib/posthog';
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
  const bootstrapData = await getBootstrapData();

  const { isEnabled } = draftMode();
  return (
    <html lang={locale}>
      <CSPostHogProvider bootstrapData={bootstrapData}>
        <body>
          <NextIntlClientProvider locale={locale}>
            <Navbar />
            {isEnabled ? (
              <PreviewProvider token={token}>{children}</PreviewProvider>
            ) : (
              children
            )}
            {isEnabled && <PreviewBar />}
            <Suspense
              fallback={
                <div className="mx-auto max-w-7xl overflow-hidden bg-primary px-6 py-20 sm:py-24 lg:px-8">
                  <div className="flex h-full w-full items-center justify-center gap-2  text-gray-200">
                    <Loader2 className="animate-spin " />
                    Loading footer
                  </div>
                </div>
              }
            >
              <Footer />
            </Suspense>
          </NextIntlClientProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
