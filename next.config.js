/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF primeiro: a foto do hero cai para ~1/3 do tamanho em WebP
    formats: ['image/avif', 'image/webp'],
  },
  // a listagem /projetos saiu do site; os casos ficam em /projetos/[slug]
  async redirects() {
    return [{ source: '/projetos', destination: '/#cases', permanent: false }]
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
