import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: { fullUrl: true },
  },
  cacheMaxMemorySize: 0,
};

export default withNextIntl(nextConfig);
