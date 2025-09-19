/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },dd
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vietnqw.github.io' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/vietnqw.github.io' : '',
}

export default nextConfig
