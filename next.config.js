/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dipzinapplications.s3.us-west-1.amazonaws.com",
      }
    ],
  },
  output: "standalone",
  experimental: {
    appDir: true,
    isrMemoryCacheSize: 5000,
    enableUndici: true
  },
  optimizeFonts: false,
}

module.exports = nextConfig
