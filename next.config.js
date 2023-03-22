/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dipzinapplications.s3.us-west-1.amazonaws.com']
  },
  experimental: {
    appDir: true,
  },
  optimizeFonts: true,
}

module.exports = nextConfig
