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
}

export default nextConfig
