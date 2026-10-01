/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF primeiro: a foto do hero cai para ~1/3 do tamanho em WebP
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
