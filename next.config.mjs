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
    agentUpgrade: "security",
  },
}

export default nextConfig
