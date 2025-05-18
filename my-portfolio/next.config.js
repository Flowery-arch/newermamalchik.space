/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images-ext-1.discordapp.net',
      'github.com',
      'avatars.githubusercontent.com',
      'openweathermap.org',
      'cdn.discordapp.com',
      'media.discordapp.net'
    ],
  },
}

module.exports = nextConfig 