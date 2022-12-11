/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['files.stripe.com', 'placeimg.com'],
  },
};

module.exports = nextConfig;
