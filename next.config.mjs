/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.197.232.1'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    inlineCss: true,
  },
}

export default nextConfig
