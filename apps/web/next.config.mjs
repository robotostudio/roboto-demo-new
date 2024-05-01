import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'development'
    ? {
        logging: {
          // fetches: { fullUrl: true }
        },
      }
    : {}),

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
};

export default withNextIntl(nextConfig);
