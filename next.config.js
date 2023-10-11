/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["localhost", "github.githubassets.com"],
  },
};

module.exports = nextConfig;
