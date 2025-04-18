/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.sanity.io',
      'images.unsplash.com',
      'plus.unsplash.com',
      'tailwindui.com',
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
};

module.exports = nextConfig; 