/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "image.shutterstock.com",
      "media.istockphoto.com",
      "qtma-2022-team-4.s3.us-east-2.amazonaws.com",
      "qtma-2022-team-4.s3.amazonaws.com",
    ],
  },
};
