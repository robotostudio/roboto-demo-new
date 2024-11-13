import type { SanityDocument } from 'sanity';

const previewSecret = '9f2db3e3-2b1c-4ffd-b074-ff4f467ae8aa';

const localUrl = 'http://localhost:3000';
const remoteUrl = 'https://template.roboto.studio';

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
  previewUrl.pathname = '/api/draft';
  previewUrl.searchParams.append('secret', previewSecret);
  previewUrl.searchParams.append('slug', slug);
  return previewUrl.toString();
}
