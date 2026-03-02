import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // Changed: Removed 'eslint' property - no longer valid in Next.js 16 NextConfig type
}

export default nextConfig