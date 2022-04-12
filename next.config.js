/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "i.imgur.com",
    ],
  },
  i18n: {
    locales: ["pt-BR"],
    defaultLocale: "pt-BR",
  },
};

module.exports = nextConfig;
