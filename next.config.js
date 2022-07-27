/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nus-gso.constructdigital.net'],
  },
};

module.exports = nextConfig;
