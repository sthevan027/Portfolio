/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pageshot.site',
        pathname: '/v1/screenshot',
      },
    ],
  },
};

module.exports = nextConfig; 