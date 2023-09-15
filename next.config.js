/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
