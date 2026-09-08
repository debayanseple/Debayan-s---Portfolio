/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  outputFileTracingRoot: '/Users/rnd/Debayan Portfolio/Project1',
  allowedDevOrigins: ['192.168.1.5', '192.168.1.5:3000'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
