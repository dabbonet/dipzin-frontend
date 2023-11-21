/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['dipzinapplications.s3.us-west-1.amazonaws.com'],
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts'
  },
  optimizeFonts: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ios',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
