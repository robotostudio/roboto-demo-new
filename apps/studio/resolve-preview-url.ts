import { SanityDocument, Slug } from 'sanity';

const previewSecret = 'kgkygaskd87bas787bcby2b89u8h3nfb398435';

const localUrl = `http://localhost:3000`;

const remoteUrl = 'https://roboto-demo-new-web.vercel.app';

const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl;

export function resolvePreviewUrl(
  doc: SanityDocument & {
    slug?: {
      current: string;
    };
  },
) {
  const previewUrl = new URL(baseUrl);
  const slug = doc?.slug?.current ?? '/';
  previewUrl.pathname = `/api/draft`;
  previewUrl.searchParams.append(`secret`, previewSecret);
  previewUrl.searchParams.append(`slug`, slug);
  return previewUrl.toString();
}
