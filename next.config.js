/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dipzinapplications.s3.us-west-1.amazonaws.com'],
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts'
  },
  output: "standalone",
  experimental: {
    appDir: true,
    // isrMemoryCacheSize: 5000,
    // enableUndici: true
  },
  optimizeFonts: false,
}

module.exports = nextConfig
