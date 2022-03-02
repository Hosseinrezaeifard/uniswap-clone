/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    sanityToken:
      "Your Sanity Token",
    sanityProjectId: "Your Sanity Project Id",
  },
};

module.exports = nextConfig;
