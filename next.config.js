/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['playwright', '@prisma/client'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.seloger.com' },
      { protocol: 'https', hostname: '**.leboncoin.fr' },
      { protocol: 'https', hostname: '**.bienici.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

module.exports = nextConfig
