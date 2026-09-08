/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  outputFileTracingRoot: import.meta.dirname,
  allowedDevOrigins: ['192.168.1.5', '192.168.1.5:3000'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
