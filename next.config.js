/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features if needed
  },
  // Configure images if needed
  images: {
    domains: [],
  },
  // Configure webpack for Vite compatibility
  webpack: (config, { dev, isServer }) => {
    // Add any custom webpack configuration here
    return config;
  },
  // Set output file tracing root to fix workspace warning
  outputFileTracingRoot: process.cwd(),
};

module.exports = nextConfig;
