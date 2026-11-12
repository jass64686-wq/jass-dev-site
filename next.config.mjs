/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.197.232.1'],
  skipTrailingSlashRedirect: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://posthog.com/:path*',
      },
    ]
  },
}

export default nextConfig
